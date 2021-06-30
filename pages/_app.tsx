import type { AppProps } from 'next/app';
import React from 'react';
import NextNprogress from 'nextjs-progressbar';
import Layout from '@/components/Layout';
import { ThemeProvider } from '@material-ui/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { theme } from '@/config/mui';
import '@/config/amplify';
import 'react-toastify/dist/ReactToastify.css';
import './../styles/tailwind.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Layout>
          <NextNprogress color="#4BE193" startPosition={0.1} stopDelayMs={200} height={3} showOnShallow={true} />
          <Component {...pageProps} />
        </Layout>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
