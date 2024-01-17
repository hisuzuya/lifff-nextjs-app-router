import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { LiffProvider } from '@/app/components/LiffProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LiffProvider liffId={process.env.NEXT_PUBLIC_LIFF_ID || ''}>
      <Component {...pageProps} />;
    </LiffProvider>
  );
}

export default MyApp;
