// import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  GOOGLE_LOGIN_URL,
  GOOGLE_REGISTER_URL,
  LOGIN_URL,
  SIGNUP_URL,
} from '@constant/api';
import { toast } from 'react-toastify';
import { useAuth } from './useAuth';

interface SignupInput {
  email: string;
  password: string;
  password2: string;
}

interface SigninInput {
  email: string;
  password: string;
}

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const useApi = () => {
  // const navigate = useNavigate();
  const { setToken } = useAuth();

  const Signup = async (input: SignupInput) => {
    try {
      await axios.post(SIGNUP_URL, input, config);
      toast.success('Signup successfully');
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data);
        toast.error(error.response.data.errors[0].msg);
      } else {
        console.log('An error occurred:', error);
      }
      return false;
    }
  };

  const Signin = async (input: SigninInput) => {
    try {
      const reponse = await axios.post(LOGIN_URL, input, config);
      console.log(reponse.data.token);
      localStorage.setItem('token', reponse.data.token);
      setToken(reponse.data.token);
      toast.success('Login successfully');
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data);
        toast.error(error.response.data.errors[0].msg);
      } else {
        console.log('An error occurred:', error);
      }
      return false;
    }
  };

  const GoogleLogin = async (access_token: string) => {
    try {
      const reponse = await axios.post(
        GOOGLE_LOGIN_URL,
        JSON.stringify({ access_token }),
        config,
      );
      console.log(reponse.data.token);
      localStorage.setItem('token', reponse.data.token);
      setToken(reponse.data.token);
      toast.success('Login successfully');
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data);
        toast.error(error.response.data.errors[0].msg);
      } else {
        console.log('An error occurred:', error);
      }
      return false;
    }
  };

  const GoogleRegister = async (access_token: string) => {
    try {
      const reponse = await axios.post(
        GOOGLE_REGISTER_URL,
        JSON.stringify({ access_token }),
        config,
      );
      console.log(reponse.data.token);
      localStorage.setItem('token', reponse.data.token);
      setToken(reponse.data.token);
      toast.success(reponse.data.msg);
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data);
        toast.error(error.response.data.errors[0].msg);
      } else {
        console.log('An error occurred:', error);
      }
      return false;
    }
  };

  const Logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return {
    Signup,
    Signin,
    GoogleLogin,
    GoogleRegister,
    Logout,
  };
};

export default useApi;
