import Head from 'next/head';
import { App_Description, App_Title, Profile_Image_URL, Social } from '@/config/index';

type props = {
  siteTitle?: string;
  description?: string;
  url?: string;
  image?: string;
};

export const SEO = ({ siteTitle, description, url, image }: props) => {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      {/* <!-- Primary Meta Tags --> */}
      <title>{siteTitle ? `${siteTitle} | ${App_Title}` : App_Title}</title>
      <meta name="description" content={description || App_Description} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle ? `${siteTitle} | ${App_Title}` : App_Title} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:description" content={description || App_Description} />
      <meta property="og:url" content={url || Social.linkedin} />
      <meta property="og:image" content={image || Profile_Image_URL} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:creator" content={Social.twitter} />
      <meta property="twitter:title" content={siteTitle ? `${siteTitle} | ${App_Title}` : App_Title} />
      <meta property="twitter:description" content={description || App_Description} />
      <meta property="twitter:url" content={url || Social.linkedin} />
      <meta property="twitter:image" content={image || Profile_Image_URL} />
    </Head>
  );
};

export default SEO;
