import Head from 'next/head';
import { App_Title } from '../utils';

const Home = () => {
	return (
		<div>
			<Head>
				<title>{App_Title}</title>
			</Head>
			<h1 className='text-4xl text-center font-semibold'>Welcome to Next World!!</h1>
		</div>
	);
};

export default Home;
