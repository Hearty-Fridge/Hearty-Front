import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * @param initialValue hash router를 사용하는 페이지에서의 initialValue 입니다.
 * @desc hash router를 next.js에서 사용하기 위해 사용합니다. next/link에 hash를 사용할 경우 scroll 이 예상처럼 동작하지 않아, a태그와 함께 사용합니다.
 * @returns 현재 바라보는 hash router의 hash 값을 반환합니다.
 * @example fullPage.js는 a태그 + hash router에 애니메이션을 걸어두어서 해당 훅을 활용했습니다.
 */
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
