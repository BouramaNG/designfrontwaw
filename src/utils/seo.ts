type SeoOptions = {
  title: string;
  description?: string;
  canonicalPath?: string; // ex: "/starlink"
  ogImage?: string;
  keywords?: string;
  jsonLd?: object | object[];
};

function upsertMetaByName(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(data: object | object[]) {
  // Remove existing page-level JSON-LD (not the base Organization one)
  document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"][data-page]').forEach(el => el.remove());
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-page', 'true');
  script.textContent = JSON.stringify(Array.isArray(data) ? data : [data]);
  document.head.appendChild(script);
}

export function applySeo({ title, description, canonicalPath, ogImage, keywords, jsonLd }: SeoOptions) {
  document.title = title;

  if (description) {
    upsertMetaByName('description', description);
  }

  if (keywords) {
    upsertMetaByName('keywords', keywords);
  }

  upsertMetaByName('robots', 'index, follow');

  // Open Graph
  upsertMetaByProperty('og:title', title);
  if (description) upsertMetaByProperty('og:description', description);
  upsertMetaByProperty('og:type', 'website');
  upsertMetaByProperty('og:site_name', 'WAW Telecom');
  upsertMetaByProperty('og:locale', 'fr_SN');

  // Twitter
  upsertMetaByName('twitter:card', ogImage ? 'summary_large_image' : 'summary');
  upsertMetaByName('twitter:title', title);
  if (description) upsertMetaByName('twitter:description', description);
  upsertMetaByName('twitter:site', '@WAWTelecom');

  if (ogImage) {
    upsertMetaByProperty('og:image', ogImage);
    upsertMetaByName('twitter:image', ogImage);
  }

  const canonicalUrl = canonicalPath
    ? `${window.location.origin}${canonicalPath}`
    : window.location.href;

  upsertLink('canonical', canonicalUrl);
  upsertMetaByProperty('og:url', canonicalUrl);

  if (jsonLd) {
    upsertJsonLd(jsonLd);
  }
}

