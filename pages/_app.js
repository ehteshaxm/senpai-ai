import '@/styles/globals.css';
import { AuthContextProvider } from '../context/AuthContext';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
      <Analytics />
    </AuthContextProvider>
  );
}
