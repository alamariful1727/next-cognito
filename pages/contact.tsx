import Head from 'next/head';
import { App_Title } from '../utils';

const Contact = () => {
	return (
		<div>
			<Head>
				<title>Contact | {App_Title}</title>
			</Head>
			<h1>Contact</h1>
		</div>
	);
};

export default Contact;
