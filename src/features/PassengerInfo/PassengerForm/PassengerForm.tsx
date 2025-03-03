import React from 'react';
import { TextField } from '@shared/ui/Input';
import styles from './PassengerForm.module.scss';

interface PassengerFormProps {
  passengerNo: number;
  ageGroup: 'Adult' | 'Minor';
  getValues: (values: any) => void;
  errors: any; // Accept errors from the main component
  touched: any; // Accept touched state from the main component
  handleChange: (e: React.ChangeEvent<any>) => void; // Accept handleChange from the main component
  handleBlur: (e: React.FocusEvent<any>) => void; // Accept handleBlur from the main component
}

export const PassengerForm: React.FC<PassengerFormProps> = ({
  passengerNo,
  ageGroup,
  getValues,
  errors,
  touched,
  handleChange,
  handleBlur,
}) => {
  const initialValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    dob: '',
    email: '',
    phone: '',
    redress: '',
    knownTraveler: '',
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    handleChange(e);
    getValues({ ...initialValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="passenger-form">
      <h4 className={styles['passenger-title']}>
        Passenger {passengerNo} ({ageGroup})
      </h4>
      <div className={styles['first']}>
        <div className={styles['first-one']}>
          <div>
            {touched?.firstName && errors?.firstName && (
              <div className={styles['error']}>{errors.firstName}</div>
            )}
            <TextField
              placeholder="First Name"
              // required
              id={`firstName${passengerNo}`}
              name="firstName"
              onChange={handleInputChange}
              onBlur={handleBlur}
              autoComplete="on"
            />
          </div>
          <TextField
            placeholder="Middle"
            id={`middleName${passengerNo}`}
            name="middleName"
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoComplete="on"
          />
          <div>
            {touched?.lastName && errors?.lastName && (
              <div className={styles['error']}>{errors.lastName}</div>
            )}
            <TextField
              placeholder="Last Name"
              // required
              id={`lastName${passengerNo}`}
              name="lastName"
              onChange={handleInputChange}
              onBlur={handleBlur}
              autoComplete="on"
            />
          </div>
        </div>
        <div className={styles['first-two']}>
          <TextField
            placeholder="Suffix"
            id={`suffix${passengerNo}`}
            name="suffix"
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoComplete="on"
          />
          <div>
            {touched?.dob && errors?.dob && (
              <div className={styles['error']}>{errors.dob}</div>
            )}
            <TextField
              placeholder="Date of Birth"
              // required
              id={`dob${passengerNo}`}
              name="dob"
              onChange={handleInputChange}
              onBlur={handleBlur}
              autoComplete="on"
            />
          </div>
        </div>
      </div>
      <div className={styles['second']}>
        <div>
          {touched?.email && errors?.email && (
            <div className={styles['error']}>{errors.email}</div>
          )}
          <TextField
            placeholder="Email"
            // required
            id={`email${passengerNo}`}
            name="email"
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoComplete="on"
          />
        </div>
        <div>
          {touched?.phone && errors?.phone && (
            <div className={styles['error']}>{errors.phone}</div>
          )}
          <TextField
            placeholder="Phone Number"
            // required
            id={`phone${passengerNo}`}
            name="phone"
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoComplete="on"
          />
          <TextField
            placeholder="Redress Number"
            id={`redress${passengerNo}`}
            name="redress"
            onChange={handleInputChange}
            onBlur={handleBlur}
            autoComplete="on"
          />
          {touched?.knownTraveler && errors?.knownTraveler && (
            <div className={styles['error']}>{errors.knownTraveler}</div>
          )}
        </div>
        <TextField
          placeholder="Known Traveler Number"
          // required
          id={`knownTraveler${passengerNo}`}
          name="knownTraveler"
          onChange={handleInputChange}
          onBlur={handleBlur}
          autoComplete="on"
        />
      </div>
    </div>
  );
};
