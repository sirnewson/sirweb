import { useEffect } from 'react';

const SITE_URL = 'https://www.sirnewson.com';
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
}: SEOProps) => {
  useEffect(() => {
    const url = path ? `${SITE_URL}${path === '/' ? '/' : path}` : window.location.href;
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
    upsertMeta('property', 'og:site_name', 'Sir Newson');
    upsertMeta('property', 'og:locale', 'en_KE');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', absoluteImage);

    upsertLink('canonical', url);
  }, [title, description, keywords, image, path, index]);

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
