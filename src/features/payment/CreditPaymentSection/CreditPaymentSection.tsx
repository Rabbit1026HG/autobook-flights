import { CheckBox, TextField } from '@shared/ui/Input';
import styles from './CreditPaymentSection.module.scss';
import InformationIcon from '@shared/icons/18/information.svg?react';
import { FC } from 'react';
import { FormikProps } from 'formik';
import { CreditInfo } from '@shared/types';

interface Props {
  formik: FormikProps<CreditInfo>;
}

export const CreditPaymentSection: FC<Props> = ({ formik }) => {
  return (
    <div className={styles['payment-details-form']}>
      <h4 className={styles['title']}>Credit card details</h4>
      <CheckBox
        name="remember-passenger"
        value="remember-passenger"
        label="Billing address is same as Passenger 1"
      />
      <div className={styles['details']}>
        <TextField
          type="text"
          id="cardHolderName"
          name="cardHolderName"
          value={formik.values.cardHolderName}
          onInput={formik.handleChange}
          placeholder="Name on Card"
        />
        <TextField
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formik.values.cardNumber}
          onInput={formik.handleChange}
          placeholder="Card Number"
        />
        <div className={styles['details-row']}>
          <TextField
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={formik.values.expiryDate}
            onInput={formik.handleChange}
            helperText="MM/YY"
            placeholder="Expiration Date"
          />
          <TextField
            type="text"
            id="cvv"
            name="cvv"
            value={formik.values.cvv}
            onInput={formik.handleChange}
            endIcon={<InformationIcon />}
            placeholder="CVV"
          />
        </div>
      </div>
    </div>
  );
};
