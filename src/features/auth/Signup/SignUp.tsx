import { CheckBox, TextField } from '@shared/ui/Input';
import * as yup from 'yup';
import styles from './SignUp.module.scss';
import Button from '@shared/ui/Button';
import GoogleIcon from '@shared/icons/18/google.svg?react';
import FacebookIcon from '@shared/icons/18/facebook.svg?react';
import CloseIcon from '@shared/icons/32/x close no.svg?react';
import { FC, HTMLAttributes } from 'react';
import { useFormik } from 'formik';
import useApi from '@hooks/useApi';
import { useGoogleLogin } from '@react-oauth/google';
interface SignUpProps extends HTMLAttributes<HTMLDivElement> {
  setOpen: (open: boolean) => void;
}

const formSchema = yup.object({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      'Password must be at least 8 characters long and contain at least one letter and one number',
    ),
  password2: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const SignUp: FC<SignUpProps> = ({ setOpen }) => {
  const { Signup, GoogleRegister } = useApi();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      password2: '',
    },
    validationSchema: formSchema,
    onSubmit: async ({ email, password, password2 }) => {
      const result = await Signup({ email, password, password2 });
      result && setOpen(false);
    },
  });

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (response) => {
      console.log(response);
      const { access_token } = response;
      const result = await GoogleRegister(access_token);
      console.log('access_token', access_token);
      result && setOpen(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <form className={styles['signup']} onSubmit={formik.handleSubmit}>
      <div>
        <h3>Sign up for Autobookflights</h3>
        <CloseIcon className={styles['close']} onClick={() => setOpen(false)} />
      </div>
      <p>
        Autobookflights is totally free to use. Sign up using your email address
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
      <TextField
        label="Password2"
        type="password"
        placeholder="Confirm Password"
        value={formik.values.password2}
        onChange={formik.handleChange('password2')}
      />
      {formik.touched.password2 && formik.errors.password2 && (
        <div className={styles['error']}>{formik.errors.password2}</div>
      )}
      <CheckBox label="I agree to the terms and conditions" />
      <CheckBox label="Send me the latest deal alerts" />
      <Button type="submit">Create account</Button>
      <span className={styles['or']}>or</span>
      <Button
        type="button"
        variant="secondary"
        leftIcon={<GoogleIcon />}
        className="google-btn"
        onClick={() => handleGoogleSignup()}
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
