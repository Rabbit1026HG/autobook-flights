// import React from "react";
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';
import { RouterProvider } from 'react-router-dom';
import { router } from 'src/util/router.tsx';
import { Provider } from 'jotai';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthProvider from '@Provider/Auth';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="770965122138-20n1chk206h1rdd2cm46um46qt4ltqkv.apps.googleusercontent.com">
    <Provider>
      <AuthProvider>
        <ToastContainer limit={5} />
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </GoogleOAuthProvider>,
);
