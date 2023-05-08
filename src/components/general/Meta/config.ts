import * as T from './types';

/* TODO: add origin after deployment */
export const origin = '';

export const siteMetaGenerator = (canonicalPath: string): T.IMeta => ({
  title: 'Web Mini Games Collection',
  description: 'Web mini games collection playground using Next.js 🤖',
  ogType: T.MetaOgType.website,
  canonicalPath,
});
