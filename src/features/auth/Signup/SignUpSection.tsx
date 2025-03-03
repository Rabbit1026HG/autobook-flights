import { CheckBox, TextField } from '@shared/ui/Input';
import styles from './SignUpSection.module.scss';
import Button from '@shared/ui/Button';
import GoogleIcon from '@shared/icons/18/google.svg?react';
import FacebookIcon from '@shared/icons/18/facebook.svg?react';
import { FormikProps } from 'formik';
import { PaymentFormInfo } from '@shared/types';

interface Props {
  formik: FormikProps<PaymentFormInfo>;
}

export const SignUpSection: React.FC<Props> = ({ formik }) => {
  return (
    <div className={styles['signup-section']}>
      <h3 className={styles['title']}>Create an account</h3>
      <p className={styles['description']}>
        Autobookflights is free to use as a guest, but if you create an account
        today, you can save and view flights, manage your trips, earn rewards,
        and more.
      </p>
      <CheckBox
        name="save-later"
        value="save-later"
        label="Save card and create account for later"
      />
      <TextField
        type="email"
        onChange={formik.handleChange}
        value={formik.values.authInfo?.email}
        placeholder="Email address or phone number"
      />
      {/* {formik.errors.authInfo?.email && <div>{formik.errors.email}</div>} */}
      <TextField
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.authInfo?.password}
        placeholder="Password"
      />
      {/* {formik.errors.password && <div>{formik.errors.password}</div>} */}
      <span className={styles['or']}>or</span>
      <Button
        variant="secondary"
        leftIcon={<GoogleIcon />}
        className="google-btn"
      >
        Continue with Google
      </Button>
      <Button
        variant="secondary"
        leftIcon={<FacebookIcon />}
        className="fb-btn"
      >
        Continue with Facebook
      </Button>
    </div>
  );
};
