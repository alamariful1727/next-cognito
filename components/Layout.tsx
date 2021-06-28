import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Hub, Auth } from 'aws-amplify';
import { Social } from '../config';
import paths from '../utils/paths';
import SEO from '../components/SEO';

interface props {
  children: React.ReactNode;
}

const Layout = ({ children }: props) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  const handleLogout = async () => {
    await Auth.signOut();
    router.push('/');
  };

  // ? AUTH: client-side
  useEffect(() => {
    async function authListener() {
      Hub.listen('auth', (data) => {
        switch (data.payload.event) {
          case 'signIn':
            return setIsLogin(true);
          case 'signOut':
            return setIsLogin(false);
        }
      });
      try {
        await Auth.currentAuthenticatedUser();
        setIsLogin(true);
      } catch (err) {
        setIsLogin(false);
      }
    }
    authListener();
  });

  return (
    <div>
      <SEO />
      <div className="flex flex-col min-h-screen">
        <header className="h-16 flex justify-between items-center px-6 bg-gray-800 text-white font-medium">
          <Link href={paths.home}>
            <a className="font-bold text-xl">Next Cognito</a>
          </Link>
          <Link href={paths.browse}>
            <a className="text-white font-semibold capitalize hover:underline">Browse</a>
          </Link>
          <div className="space-x-3">
            {isLogin ? (
              <>
                <Link href={paths.profile}>
                  <a className="text-white font-semibold capitalize hover:underline">Profile</a>
                </Link>
                <button onClick={handleLogout} className="text-white font-semibold capitalize hover:underline">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href={paths.signin}>
                  <a className="text-white font-semibold capitalize hover:underline">Sign In</a>
                </Link>
                <Link href={paths.contact}>
                  <a className="text-white font-semibold capitalize hover:underline">contact us</a>
                </Link>
              </>
            )}
          </div>
        </header>
        <div className="flex-1 container mx-auto px-6 my-16">{children}</div>
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
