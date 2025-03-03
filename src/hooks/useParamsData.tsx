import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useParamsData = <T,>(initialValue: T, callBack?: () => void) => {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState(false);
  const { search: searchParams } = useLocation();
  useEffect(() => {
    setError(false);
    try {
      const params = searchParams.slice(1);
      const decoded = JSON.parse(decodeURIComponent(params));
      setData(decoded);
    } catch (error) {
      console.error('Error parsing search params');
      setError(true);
    }
    callBack && callBack();
  }, [searchParams, callBack]);
  return { data, error };
};
