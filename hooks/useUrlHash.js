import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useUrlHash = (initialValue) => {
  const router = useRouter();
  const [hash, setHash] = useState(initialValue);

  useEffect(() => {
    const updateHash = (url) => {
      if (!url) return;
      const updatedUrl = url.split('#')[1];
      setHash(updatedUrl);
    };

    const onWindowHashChange = () => updateHash(window.location.hash);
    const onNextJSHashChange = (url) => updateHash(url);

    router.events.on('hashChangeStart', onNextJSHashChange);
    window.addEventListener('hashchange', onWindowHashChange);
    window.addEventListener('load', onWindowHashChange);
    return () => {
      router.events.off('hashChangeStart', onNextJSHashChange);
      window.removeEventListener('load', onWindowHashChange);
      window.removeEventListener('hashchange', onWindowHashChange);
    };
  }, [router.asPath, router.events]);

  return { hash };
};

export default useUrlHash;
