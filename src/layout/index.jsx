import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { AppConfig } from '../utils/AppConfig';

const Layout = ({ preview, navigation, footer, meta, children }) => {
  const router = useRouter();
  const metaData = meta ?? AppConfig;

  return (
    <>
      <Head>
        <title>Bikkelhart NextJS Boilerplate</title>
        <meta name="description" content="Awesome" />

        <meta charSet="UTF-8" key="charset" />
        <meta name="viewport" content="width=device-width,initial-scale=1" key="viewport" />
        <link rel="apple-touch-icon" href={`${router.basePath}/apple-touch-icon.png`} key="apple" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/favicon-32x32.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/favicon-16x16.png`}
          key="icon16"
        />
        <link rel="icon" href={`${router.basePath}/favicon.ico`} key="favicon" />
      </Head>
      {/**
       * For configuration details see following documentation
       * https://github.com/garmeeh/next-seo#readme
       */}
      <NextSeo
        title={metaData.title}
        description={metaData.description}
        canonical={metaData.canonical}
        openGraph={{
          title: metaData.title,
          description: metaData.description,
          url: metaData.canonical,
          locale: metaData.locale,
          site_name: metaData.site_name
        }}
      />
      {preview && (
        <>
          {/**
           * PreviewBar or notification
           */}
        </>
      )}
      {navigation && (
        <>
          {/**
           * Import navigation component here
           */}
        </>
      )}
      <main>{children}</main>
      {footer && (
        <footer>
          {/**
           * Import footer component here
           */}
        </footer>
      )}
    </>
  );
};

export default Layout;
