export enum MetaOgType {
  article = 'article',
  website = 'website',
}

export interface IMeta {
  title?: string;
  titleSuffix?: string;
  description?: string;
  ogType?: MetaOgType;
  keywords?: string[];
  canonicalPath?: string;
  url?: string;
  images?: string[];
  videos?: string[];
  audios?: string[];
  noIndex?: boolean;
}
