import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, FileText, ExternalLink, Download, Smartphone, Monitor } from 'lucide-react';
import type { PageType } from '../App';

interface StarlinkPressPageProps {
  onNavigate: (page: PageType) => void;
}

/** Détecte iOS (iPhone, iPad, iPod) — les seuls appareils où l'iframe PDF est bloquée */
function useIsIOS() {
  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !(window as Window & { MSStream?: unknown }).MSStream);
  }, []);
  return isIOS;
}

const PDF_URL = '/docs/communique.pdf';

const StarlinkPressPage = ({ onNavigate }: StarlinkPressPageProps) => {
  const isIOS = useIsIOS();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);

  /* Sur desktop : si l'iframe se charge en <1s avec un contenu vide (certains Android/Firefox)
     on bascule aussi sur le fallback */
  useEffect(() => {
    if (isIOS) return;
    const timer = setTimeout(() => {
      try {
        const doc = iframeRef.current?.contentDocument;
        if (doc && doc.body && doc.body.innerHTML === '') setIframeFailed(true);
      } catch {
        // cross-origin — l'iframe a bien chargé le PDF, pas d'erreur
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isIOS]);

  const showFallback = isIOS || iframeFailed;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-yellow-50/10 pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header + retour */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onNavigate('home2')}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 border border-gray-200 text-gray-700 text-sm shadow-sm hover:bg-white hover:shadow-md transition-all"
          >
            <ArrowLeft size={16} />
            <span>Retour à l&apos;accueil</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="hidden sm:inline">Document officiel WAW Telecom</span>
            {isIOS
              ? <span className="inline-flex items-center gap-1 text-orange-500 font-medium"><Smartphone size={12} />Mobile</span>
              : <span className="hidden sm:inline-flex items-center gap-1 text-blue-500 font-medium"><Monitor size={12} />Desktop</span>
            }
          </div>
        </div>

        {/* Titre + description */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-waw-dark tracking-tight">
            Communiqué de presse Starlink — WAW Telecom
          </h1>
          <p className="text-sm sm:text-base text-gray-700 max-w-3xl">
            Retrouvez ici le communiqué de presse officiel présentant le partenariat Starlink avec WAW Telecom, les
            usages visés et les bénéfices pour les entreprises et organisations au Sénégal.
          </p>
        </div>

        {/* Carte viewer PDF */}
        <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

          {/* Barre de titre */}
          <div className="px-4 sm:px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-waw-yellow/15 via-white to-blue-50/40">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-waw-yellow text-waw-dark flex items-center justify-center shadow-sm">
                <FileText size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-waw-dark">Communiqué de presse Starlink</span>
                <span className="text-[11px] text-gray-500">
                  {showFallback ? 'Aperçu non disponible sur mobile — ouvrez dans Safari' : 'Format PDF · Lecture en ligne'}
                </span>
              </div>
            </div>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-waw-dark bg-white border border-waw-yellow/40 hover:bg-waw-yellow/10 transition-colors"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Télécharger</span>
              <span className="sm:hidden">PDF</span>
            </a>
          </div>

          {/* ── FALLBACK iOS / mobile ── */}
          {showFallback ? (
            <div className="flex flex-col items-center justify-center gap-6 py-16 px-6 text-center bg-gradient-to-b from-gray-50 to-white">

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                <a
                  href={PDF_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-waw-dark text-white font-bold text-sm shadow-lg hover:bg-waw-dark/90 transition-all hover:-translate-y-0.5"
                >
                  <ExternalLink size={16} />
                  Ouvrir le PDF
                </a>
                <a
                  href={PDF_URL}
                  download
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-white border-2 border-gray-200 text-waw-dark font-bold text-sm hover:border-waw-yellow/50 hover:bg-waw-yellow/5 transition-all"
                >
                  <Download size={16} />
                  Télécharger
                </a>
              </div>
            </div>

          ) : (
            /* ── VIEWER desktop ── */
            <div className="relative h-[70vh] bg-gray-100">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 border-t-waw-yellow animate-spin" />
                    <span className="text-xs">Chargement du document…</span>
                  </div>
                </div>
              )}
              <iframe
                ref={iframeRef}
                src={PDF_URL}
                title="Communiqué de presse Starlink — WAW Telecom"
                className="w-full h-full border-0"
                onLoad={() => setIframeLoaded(true)}
                onError={() => setIframeFailed(true)}
              />
            </div>
          )}
        </section>

      </div>
    </main>
  );
};

export default StarlinkPressPage;
