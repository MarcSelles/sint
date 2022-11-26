import '../styles/global.css';

import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

import Layout from '../layout';
import { GTM_ID, pageview } from '../lib/gtm';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview);
    return () => {
      router.events.off('routeChangeComplete', pageview);
    };
  }, [router.events]);
  return (
    <>
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `
        }}
      />
      <Layout
        navigation={pageProps.navigation}
        footer={pageProps.footer}
        meta={pageProps.meta_data ?? pageProps.meta}
        preview={pageProps.preview}
      >
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
