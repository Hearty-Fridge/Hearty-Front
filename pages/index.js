import Layout from '@components/Layout';

const Home = () => {
  return (
    <Layout>
      <div style={{ textAlign: 'center', color: 'black' }}>
        This is Index Page
      </div>
    </Layout>
  );
};

// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery('hello', () => callApi());
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

export default Home;
