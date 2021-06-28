import Link from 'next/link';
import paths from '../utils/paths';

interface props {
	children: React.ReactNode;
}

const Layout = ({ children }: props) => {
	return (
		<div>
			<div className='flex flex-col min-h-screen'>
				<header className='h-16 flex justify-between items-center px-6 bg-gray-800 text-white font-medium'>
					<Link href={paths.home}>
						<a className='font-bold text-xl'>Logo</a>
					</Link>
					<div className='flex space-x-3'>
						<Link href={paths.contact}>
							<a className='text-yellow-500 capitalize underline'>contact us</a>
						</Link>
						<Link href={paths.profile}>
							<a className='text-yellow-500 capitalize underline'>Profile</a>
						</Link>
					</div>
				</header>
				<div className='flex-1 px-6 my-16 sm:px-0 container mx-auto'>{children}</div>
				<footer className='h-12 flex justify-center items-center border-t border-gray-300'>
					<p className='text-gray-900 font-medium'>
						© {new Date().getFullYear()} Developed by{' '}
						<a href='https://www.linkedin.com/in/alamariful1727/' target='_blank' rel='noopener noreferrer'>
							Ariful Alam
						</a>
					</p>
				</footer>
			</div>
		</div>
	);
};

export default Layout;
