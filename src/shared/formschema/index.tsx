import * as yup from 'yup';

export const passengerFormSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  middleName: yup.string(),
  lastName: yup.string().required('Last Name is required'),
  suffix: yup.string(),
  dob: yup.string().required('Date of Birth is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  redress: yup.string(),
  knownTraveler: yup.string().required('Known Traveler is required'),
});
