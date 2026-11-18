/**
 * Base path for hosting under a sub-folder (GitHub Pages project sites).
 * Set NEXT_PUBLIC_BASE_PATH=/repo-name for that build; leave it empty locally.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a root-relative path (e.g. "/images/x.jpg") with the base path. */
export const asset = (path: string) => `${BASE_PATH}${path}`;
