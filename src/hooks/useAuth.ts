import { AuthContext } from '@Provider/Auth';
import { useContext } from 'react';

export const useAuth = () => {
  return useContext(AuthContext);
};
