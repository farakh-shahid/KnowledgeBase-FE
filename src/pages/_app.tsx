import './globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { StoreProvider } from '@/contextStore/storeProvider';
import RouteGuard from '@/utils/routeGuard';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <StoreProvider value={{}}>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
        <ToastContainer position="top-right" autoClose={2000} />
      </StoreProvider>
    </>
  );
}
