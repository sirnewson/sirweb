/* ---------------------------------------------------------------
   Two brands, one deployment.

   sirnewson.com       — the studio. Work, services, rates, proposals.
   drift.sirnewson.com — the publication. Stories, Drift, Sport,
                         Originals, Visuals, the Desk.

   Both are served by this same SPA build: the host decides which of the
   two owns `/`, and cross-brand links resolve to absolute URLs so a
   reader moving between them actually changes site.

   In local development there is only one origin, so everything stays
   relative and both halves remain reachable from either host. Chrome
   resolves `*.localhost` to 127.0.0.1, so `drift.localhost:5182` will
   also exercise the real subdomain behaviour.
   --------------------------------------------------------------- */

export const STUDIO_ORIGIN = 'https://www.sirnewson.com';
export const PUBLICATION_ORIGIN = 'https://drift.sirnewson.com';

/** Every path the publication owns, apart from the front page. */
export const PUBLICATION_PATHS = [
    '/read',
    '/stories',
    '/drift',
    '/sport',
    '/originals',
    '/visuals',
    '/desk',
    '/about',
    '/search',
    '/tag',
    '/watch',
];

const hostname = () => (typeof window === 'undefined' ? '' : window.location.hostname);

/** True while the two brands share an origin — local dev and previews. */
export const isSingleOrigin = () => {
    const h = hostname();
    return h === 'localhost' || h.endsWith('.localhost') || h === '127.0.0.1' || h === '';
};

/** True when this request arrived on the publication's subdomain. */
export const isPublicationHost = () => hostname().startsWith('drift.');

/** Does this path belong to the publication? `/` only does on its own host. */
export const isPublicationPath = (pathname: string) => {
    if (pathname === '/') return isPublicationHost();
    return PUBLICATION_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
};

const cross = (origin: string, path: string) => (isSingleOrigin() ? path : `${origin}${path}`);

/** Href for a studio page, from anywhere. */
export const studioUrl = (path = '/') => cross(STUDIO_ORIGIN, path);

/** Href for a publication page, from anywhere. */
export const publicationUrl = (path = '/') => cross(PUBLICATION_ORIGIN, path);
