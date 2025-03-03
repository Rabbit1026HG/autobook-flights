import { TextField } from '@shared/ui/Input';
import { useFormik } from 'formik';
import styles from './EmergencyForm.module.scss';
import { FC } from 'react';
import { EmergencyInfo } from '@shared/types';
interface EmergencyFormProps {
  getValues: (values: EmergencyInfo) => void;
}
export const EmergencyForm: FC<EmergencyFormProps> = ({ getValues }) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  getValues(formik.values);
  return (
    <form className={styles['emergency-form']}>
      <h4 className={styles['title']}>Emergency contact information</h4>
      <div>
        <TextField
          placeholder="First Name"
          required
          id={'emergency-firstName'}
          name="firstName"
          onChange={formik.handleChange}
          autoComplete="on"
        />
        <TextField
          placeholder="Last Name"
          required
          id={'emergency-lastName'}
          name="lastName"
          onChange={formik.handleChange}
          autoComplete="on"
        />
        <TextField
          placeholder="Email"
          required
          id={'emergency-email'}
          name="email"
          onChange={formik.handleChange}
          autoComplete="on"
        />
        <TextField
          placeholder="Phone Number"
          required
          id={'emergency-phone'}
          name="phone"
          onChange={formik.handleChange}
          autoComplete="on"
        />
      </div>
    </form>
  );
};
