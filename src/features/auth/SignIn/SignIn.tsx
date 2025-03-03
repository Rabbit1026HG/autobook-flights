import { TextField } from '@shared/ui/Input';
import * as yup from 'yup';
import styles from './SignIn.module.scss';
import Button from '@shared/ui/Button';
import GoogleIcon from '@shared/icons/18/google.svg?react';
import FacebookIcon from '@shared/icons/18/facebook.svg?react';
import CloseIcon from '@shared/icons/32/x close no.svg?react';
import { FC, HTMLAttributes } from 'react';
import { useFormik } from 'formik';
import useApi from '@hooks/useApi';
import { useGoogleLogin } from '@react-oauth/google';
interface SignInProps extends HTMLAttributes<HTMLDivElement> {
  setOpen: (open: boolean) => void;
}

const formSchema = yup.object({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export const SignIn: FC<SignInProps> = ({ setOpen }) => {
  const { Signin, GoogleLogin } = useApi();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      password2: '',
    },
    validationSchema: formSchema,
    onSubmit: async ({ email, password }) => {
      const result = await Signin({ email, password });
      console.log('result:', result);

      result && setOpen(false);
    },
  });

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (response) => {
      console.log(response);
      const { access_token } = response;
      const result = await GoogleLogin(access_token);
      console.log('access_token', access_token);
      result && setOpen(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <form className={styles['signin']} onSubmit={formik.handleSubmit}>
      <div>
        <h3>Sign In for Autobookflights</h3>
        <CloseIcon className={styles['close']} onClick={() => setOpen(false)} />
      </div>
      <p>
        Autobookflights is totally free to use. Sign in using your email address
        or phone number below to get started.
      </p>
      <TextField
        placeholder="Email or phone number"
        value={formik.values.email}
        onChange={formik.handleChange('email')}
      />
      {formik.touched.email && formik.errors.email && (
        <div className={styles['error']}>{formik.errors.email}</div>
      )}
      <TextField
        label="Password"
        type="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <div className={styles['error']}>{formik.errors.password}</div>
      )}

      <Button type="submit">Login</Button>
      <span className={styles['or']}>or</span>
      <Button
        type="button"
        variant="secondary"
        leftIcon={<GoogleIcon />}
        className="google-btn"
        onClick={() => handleGoogleSignIn()}
      >
        Continue with Google
      </Button>
      <Button
        type="button"
        variant="secondary"
        leftIcon={<FacebookIcon />}
        className="fb-btn"
      >
        Continue with Facebook
      </Button>
    </form>
  );
};
