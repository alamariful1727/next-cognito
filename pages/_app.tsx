import type { AppProps } from 'next/app';
import React from 'react';
import Layout from '../components/Layout';
import 'react-toastify/dist/ReactToastify.css';
import './../styles/tailwind.css';
import { ThemeProvider } from '@material-ui/core';
import { theme } from '../config/mui';
import '../config/amplify';
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <NextNprogress color="#4BE193" startPosition={0.1} stopDelayMs={200} height={3} showOnShallow={true} />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
export default MyApp;
