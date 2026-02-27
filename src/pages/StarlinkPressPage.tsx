import { ArrowLeft, FileText } from 'lucide-react';
import type { PageType } from '../App';

interface StarlinkPressPageProps {
  onNavigate: (page: PageType) => void;
}

const StarlinkPressPage = ({ onNavigate }: StarlinkPressPageProps) => {
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
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Document officiel WAW Telecom</span>
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
          <div className="px-4 sm:px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-waw-yellow/15 via-white to-blue-50/40">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-waw-yellow text-waw-dark flex items-center justify-center shadow-sm">
                <FileText size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-waw-dark">Communiqué de presse Starlink</span>
                <span className="text-[11px] text-gray-500">Format PDF · Lecture en ligne</span>
              </div>
            </div>
            <a
              href="/docs/communique.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-waw-dark bg-white border border-waw-yellow/40 hover:bg-waw-yellow/10 transition-colors"
            >
              <span>Télécharger le PDF</span>
            </a>
          </div>

          <div className="h-[70vh] bg-gray-100">
            <iframe
              src="/docs/communique.pdf"
              title="Communiqué de presse Starlink — WAW Telecom"
              className="w-full h-full border-0"
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default StarlinkPressPage;

