import '@styles/globals.css';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';
import { GoogleOAuthProvider } from '@react-oauth/google';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={client}>
      {process.env.NODE_ENV !== 'production' ? (
        <ReactQueryDevtools initialsOpen={false} />
      ) : null}
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID}
      >
        <ThemeProvider theme={theme}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </ThemeProvider>
      </GoogleOAuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
