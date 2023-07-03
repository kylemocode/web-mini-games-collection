import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import DynamicTheme from '@/themes/DynamicTheme';
import Meta from '@/components/general/Meta/Meta';

// if (process.env.NODE_ENV === 'production') {
//   require('@newrelic/next');
// }

function MyApp({ Component, pageProps }: AppProps) {
  console.log('test');
  return (
    <DynamicTheme>
      <Meta />
      <Component {...pageProps} />
    </DynamicTheme>
  );
}

export default MyApp;
