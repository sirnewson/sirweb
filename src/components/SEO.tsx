import { useEffect } from 'react';

import { PUBLICATION_ORIGIN, STUDIO_ORIGIN, isPublicationPath } from '../lib/site';

const SITE_URL = STUDIO_ORIGIN;
const DEFAULT_IMAGE = `${SITE_URL}/og-card.png`;

type SEOProps = {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  /** Route path, e.g. "/work". Used for canonical + og:url. */
  path?: string;
  /** Set false for pages that should not be indexed (client proposals, dashboards). */
  index?: boolean;
  /** Optional JSON-LD injected for this page. */
  jsonLd?: Record<string, unknown>;
  /**
   * Forces the origin a canonical is built against. Only the publication's
   * front page needs it: its path is "/", which belongs to the studio on one
   * host and to the publication on the other.
   */
  origin?: string;
};

const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
  const selector = `meta[${attr}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertLink = (rel: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const toAbsolute = (value: string) =>
  value.startsWith('http') ? value : `${SITE_URL}${value.startsWith('/') ? '' : '/'}${value}`;

const SEO = ({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  path,
  index = true,
  jsonLd,
  origin,
}: SEOProps) => {
  useEffect(() => {
    // A publication page lives on drift.sirnewson.com even when it is being
    // served from the studio host, so its canonical has to say so.
    const isPublication = origin === PUBLICATION_ORIGIN || (!!path && isPublicationPath(path));
    const base = origin ?? (isPublication ? PUBLICATION_ORIGIN : SITE_URL);
    const url = path ? `${base}${path === '/' ? '/' : path}` : window.location.href;
    const absoluteImage = toAbsolute(image);

    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', index ? 'index, follow, max-image-preview:large' : 'noindex, nofollow');
    if (keywords) upsertMeta('name', 'keywords', keywords);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', absoluteImage);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', isPublication ? 'Drift — Sir Newson' : 'Sir Newson');
    upsertMeta('property', 'og:locale', 'en_KE');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', absoluteImage);

    upsertLink('canonical', url);
  }, [title, description, keywords, image, path, index, origin]);

  useEffect(() => {
    if (!jsonLd) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seoPage = 'true';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [jsonLd]);

  return null;
};

export default SEO;
