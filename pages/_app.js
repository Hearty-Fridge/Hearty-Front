import '@styles/globals.css';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';

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
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
