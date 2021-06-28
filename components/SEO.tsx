import Head from 'next/head';
import { App_Description, App_Title, Profile_Image_URL, Social } from '../utils';

type props = {
	siteTitle?: string;
	description?: string;
	url?: string;
	image?: string;
};

export const SEO = ({ siteTitle, description, url, image }: props) => {
	return (
		<Head>
			{/* <!-- Primary Meta Tags --> */}
			<title>{siteTitle ? `${App_Title} | ${siteTitle}` : App_Title}</title>
			<meta name='description' content={App_Description || description} />

			{/* <!-- Open Graph / Facebook --> */}
			<meta property='og:type' content='website' />
			<meta property='og:title' content={App_Title} />
			<meta property='og:site_name' content={siteTitle} />
			<meta property='og:description' content={App_Description || description} />
			<meta property='og:url' content={url || Social.linkedin} />
			<meta property='og:image' content={image || Profile_Image_URL} />

			{/* <!-- Twitter --> */}
			<meta property='twitter:card' content='summary_large_image' />
			<meta property='twitter:creator' content={Social.twitter} />
			<meta property='twitter:title' content={siteTitle ? `${App_Title} | ${siteTitle}` : App_Title} />
			<meta property='twitter:description' content={App_Description || description} />
			<meta property='twitter:url' content={url || Social.linkedin} />
			<meta property='twitter:image' content={image || Profile_Image_URL} />
		</Head>
	);
};

export default SEO;
