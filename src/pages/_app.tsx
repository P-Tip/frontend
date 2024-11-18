// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import '../app/globals.css';
import '../components/Layout/BaseBlock.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;