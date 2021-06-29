import Document, { Html, Head, Main, NextScript } from 'next/document';
import { App_Description, App_Title, Profile_Image_URL, Social } from '../config';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Ariful Alam" />
          <meta name="apple-mobile-web-app-capable" content="yes" />

          {/* <!-- Primary Meta Tags --> */}
          {/* <meta name="description" content={App_Description} /> */}

          {/* <!-- Open Graph / Facebook --> */}
          {/* <meta property="og:type" content="website" />
          <meta property="og:title" content={App_Title} />
          <meta property="og:description" content={App_Description} />
          <meta property="og:url" content={Social.linkedin} />
          <meta property="og:image" content={Profile_Image_URL} /> */}

          {/* <!-- Twitter --> */}
          {/* <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:creator" content={Social.twitter} />
          <meta property="twitter:title" content={App_Title} />
          <meta property="twitter:description" content={App_Description} />
          <meta property="twitter:url" content={Social.linkedin} />
          <meta property="twitter:image" content={Profile_Image_URL} /> */}

          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
