import { Fragment, useMemo, memo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { siteMetaGenerator, origin } from './config';

const Meta = () => {
  const router = useRouter();
  const data = useMemo(() => {
    return siteMetaGenerator(router.asPath);
  }, [router.asPath]);

  return (
    <Head>
      {/* basic */}
      {data.title && <title>{data.title}</title>}
      {data.description && (
        <meta key='description' name='description' content={data.description} />
      )}
      {data.keywords && !!data.keywords.length && (
        <meta
          key='keywords'
          name='keywords'
          content={data.keywords.join(', ')}
        />
      )}
      {data.canonicalPath && (
        <>
          <link
            key='canonical'
            rel='canonical'
            href={`${origin}${data.canonicalPath}`}
          />
          {(router.locales || []).map(lang => (
            <link
              key={lang}
              rel='alternate'
              hrefLang={lang}
              href={
                lang === router.defaultLocale
                  ? `${origin}${router.asPath}`
                  : `${origin}/${lang}${router.asPath}`
              }
            />
          ))}
        </>
      )}
      {data.url && (
        <meta key='url' name='url' itemProp='url' content={data.url} />
      )}

      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, minimum-scale=1, viewport-fit=cover'
      />

      {/* og */}
      {data.description && (
        <meta
          key='og:description'
          property='og:description'
          content={data.description}
        />
      )}
      <meta
        key='og:site_name'
        property='og:site_name'
        content='Frontend Framework Trend'
      />
      {data.title && (
        <meta key='og:title' property='og:title' content={data.title} />
      )}
      {data.ogType && (
        <meta key='og:type' property='og:type' content={data.ogType} />
      )}
      {data.url && <meta key='og:url' property='og:url' content={data.url} />}

      {/* twitter */}
      {data.title && (
        <meta
          key='twitter:title'
          property='twitter:title'
          content={data.title}
        />
      )}
      {data.description && (
        <meta
          key='twitter:description'
          property='twitter:description'
          content={data.description}
        />
      )}
      {/* images */}
      {data.images &&
        !!data.images.length &&
        data.images
          .filter(image => image.startsWith('http'))
          .map((image, k) => (
            <Fragment key={k}>
              <meta
                key={`image-${k}`}
                name='image'
                itemProp='image'
                content={image}
              />
              <meta key={`og:image-${k}`} property='og:image' content={image} />
              <meta
                key={`og:image:secure_url-${k}`}
                property='og:image:secure_url'
                content={image}
              />
              <meta
                key={`twitter:image-${k}`}
                property='twitter:image'
                content={image}
              />
            </Fragment>
          ))}

      {/* videos */}
      {data.videos &&
        !!data.videos.length &&
        data.videos.map((video, k) => (
          <Fragment key={k}>
            <meta key={`og:video-${k}`} property='og:video' content={video} />
            <meta
              key={`og:video:secure_url-${k}`}
              property='og:video:secure_url'
              content={video}
            />
          </Fragment>
        ))}

      {/* audios */}
      {data.audios &&
        !!data.audios.length &&
        data.audios.map((audio, k) => (
          <Fragment key={k}>
            <meta key={`og:audio-${k}`} property='og:audio' content={audio} />
            <meta
              key={`og:audio:secure_url-${k}`}
              property='og:audio:secure_url'
              content={audio}
            />
          </Fragment>
        ))}
      {data.noIndex && <meta name='robots' content='noindex, nofollow' />}
    </Head>
  );
};

export default memo(Meta);
