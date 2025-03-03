import { createContext, useState } from 'react';
// import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<{
  token: string | null;
  setToken: (token: string | null) => void;
}>({
  token: null,
  setToken: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // To store the token
  console.log('--------Auth--------------');
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
