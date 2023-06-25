import { useEffect } from 'react';

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetch('/api/health').then(() => console.log('fetch api'));
  }, []);

  return <>Main Page</>;
};

export default index;
