import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import DynamicTheme from '@/themes/DynamicTheme';
import Meta from '@/components/Meta/Meta';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DynamicTheme>
      <Meta />
      <Component {...pageProps} />
    </DynamicTheme>
  );
}

export default MyApp;
