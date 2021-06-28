import Link from 'next/link';
import { Social } from '../utils';
import paths from '../utils/paths';
import SEO from '../components/SEO';

interface props {
  children: React.ReactNode;
}

const Layout = ({ children }: props) => {
  return (
    <div>
      <SEO />
      <div className="flex flex-col min-h-screen">
        <header className="h-16 flex justify-between items-center px-6 bg-gray-800 text-white font-medium">
          <Link href={paths.home}>
            <a className="font-bold text-xl">Next Cognito</a>
          </Link>
          <div className="flex space-x-3">
            <Link href={paths.contact}>
              <a className="text-yellow-400 capitalize underline">contact us</a>
            </Link>
            <Link href={paths.profile}>
              <a className="text-yellow-400 capitalize underline">Profile</a>
            </Link>
          </div>
        </header>
        <div className="flex-1 px-6 my-16 sm:px-0 container mx-auto">{children}</div>
        <footer className="h-12 flex justify-center items-center bg-gray-800">
          <p className="text-white font-medium">
            © {new Date().getFullYear()} Developed by{' '}
            <a className="underline" href={Social.linkedin} target="_blank" rel="noopener noreferrer">
              Ariful Alam
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
