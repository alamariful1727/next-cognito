import type { AppProps } from 'next/app';
import React from 'react';
import Layout from '../components/Layout';
import 'react-toastify/dist/ReactToastify.css';
import './../styles/tailwind.css';
import { ThemeProvider } from '@material-ui/core';
import { theme } from '../config/mui';
import '../config/amplify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
export default MyApp;
