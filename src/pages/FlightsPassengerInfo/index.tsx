// import { SelectedFlights } from '@features/flights/SelectedFlights/SelectedFlights';
import { useParamsData } from '@hooks/useParamsData';
import {
  BookedFlights,
  CreditInfo,
  EmergencyInfo,
  Flight,
  FlightSearchValues,
  Passenger,
} from '@shared/types';
import styles from './style.module.scss';
import clsx from 'clsx';
import CreditCardIcon from '@shared/icons/18/credit card.svg?react';
import GooglePayIcon from '@shared/icons/18/google.svg?react';
import AppleIcon from '@shared/icons/18/apple mac.svg?react';
import PaypalIcon from '@shared/icons/18/paypal.svg?react';
import CryptoIcon from '@shared/icons/18/bitcoin money currency crypto.svg?react';
import { PassengerForm } from '@features/PassengerInfo/PassengerForm/PassengerForm';
import { EmergencyForm } from '@features/PassengerInfo/EmergencyForm/EmergencyForm';
import { BagForm } from '@features/PassengerInfo/BagForm/BagForm';
import PersonSittingIcon from '@shared/icons/32/person sitting.svg?react';
import BagIcon from '@shared/icons/32/bag.svg?react';
import Button from '@shared/ui/Button';
import { useNavigate } from 'react-router-dom';
// import { getAuth } from '@util/auth';
import { FormikHelpers, useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { CreditPaymentSection } from '@features/payment/CreditPaymentSection/CreditPaymentSection';
import { SelectedFlight } from '@features/flights/SelectedFlights/SelectedFlight';
import { passengerFormSchema } from '@shared/formschema';
// import { SelectedFlight } from '@features/flights/SelectedFlights/SelectedFlight';

const getPassengersList = (passengers?: { adults: number; minors: number }) => {
  if (!passengers) return [];
  const passengerList: ('Adult' | 'Minor')[] = [];
  for (let i = 0; i < passengers.adults; i++) {
    passengerList.push('Adult');
  }
  for (let i = 0; i < passengers.minors; i++) {
    passengerList.push('Minor');
  }
  return passengerList;
};

export const FlightPassengerInfo = () => {
  // const [isSeatOption, setIsSeatOption] = useState<boolean>(false);
  const { data: paramsData } = useParamsData<{
    autoBook: string[];
    selectedFlights: Flight[];
    searchValues: FlightSearchValues;
  } | null>(null);

  const formValues: {
    passengers: Passenger[];
    emergency?: EmergencyInfo;
    bags?: number[];
  } = { passengers: [], bags: [] };
  const passengersList = getPassengersList(
    paramsData?.searchValues.passengerCount,
  );
  // const passengerref = useRef();
  const navigate = useNavigate();
  const handleFormSubmit = (isSeat: boolean) => {
    const values: BookedFlights = {
      selectedDates: paramsData?.searchValues.slectedDates,
      from: paramsData?.searchValues.from,
      to: paramsData?.searchValues.to,
      passengers: formValues.passengers,
      emergency: formValues.emergency,
      bags: formValues.bags,
      flights: paramsData?.selectedFlights,
    };
    // sessionStorage.setItem('bookedFlights', JSON.stringify(values));
    localStorage.setItem('bookedFlights', JSON.stringify(values));
    isSeat
      ? navigate('/flights/select-seats')
      : navigate('/flights/payment/success');

    // navigate('/flights/select-seats');
  };

  const [selectedPayment, setSelectedPayment] = useState('credit card');

  const formik = useFormik<CreditInfo>({
    initialValues: {
      cardNumber: '',
      cardHolderName: '',
      expiryDate: '',
      cvv: '',
    },
    // validate,
    onSubmit: (
      values: CreditInfo,
      { setSubmitting }: FormikHelpers<CreditInfo>,
    ) => {
      console.log('Submission Successful:', values);
      navigate('/flights/payment/success');
      setSubmitting(false);
    },
  });

  const formikPassenger = useFormik({
    initialValues: {
      passengers: passengersList.map(() => ({
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        dob: '',
        email: '',
        phone: '',
        redress: '',
        knownTraveler: '',
      })),
    },
    validationSchema: yup.object({
      passengers: yup.array().of(passengerFormSchema),
    }),
    onSubmit: (values) => {
      console.log('Submitted Values: ', values);
    },
  });

  return (
    <>
      <div className={clsx('page-container', styles['passenger-info'])}>
        <div className={styles['inner-container']}>
          <div className={styles['left']}>
            <h3 className={styles['review-title']}>Review and Pay</h3>
            {/* <SelectedFlight flights={paramsData?.selectedFlights || []} /> */}

            <SelectedFlight flights={paramsData?.selectedFlights || []} />

            <div className={styles['view-seat']}>
              <h4 className={styles['seat-title']}>
                <PersonSittingIcon width={50} height={50} />
                View Seats
              </h4>
              <div className={styles['view-seat-content']}>
                <div>View a map of the plane and select your seats</div>
                <Button
                  variant="primary"
                  className={styles['confirm-btn']}
                  onClick={() => handleFormSubmit(true)}
                >
                  SELECT SEATS
                </Button>
              </div>
            </div>
            <div className={styles['bag-passenger-info']}>
              <h4 className={styles['bag-passenger-title']}>
                <BagIcon color="#6f7492" width={50} />
                Baggage Allowance (Per Passenger)
              </h4>
              <div className={styles['bag-info-container']}>
                <div className={styles['bag-info-row']}>
                  <div>
                    <div className={styles['sub-title']}>Depart</div>
                    <div className={styles['main-content']}>JSD-DFR</div>
                  </div>
                  <div>
                    <div className={styles['sub-title']}>Carry-on</div>
                    <div className={styles['main-content']}>Free</div>
                  </div>
                  <div>
                    <div className={styles['sub-title']}>1st Bag</div>
                    <div className={styles['main-content']}>$75</div>
                    <div className={styles['sub-content']}>(50kg/23kg)</div>
                  </div>
                  <div>
                    <div className={styles['sub-title']}>2nd Bag</div>
                    <div className={styles['main-content']}>$100</div>
                    <div className={styles['sub-content']}>(50kg/23kg)</div>
                  </div>
                </div>
                <div className={styles['bag-info-row']}>
                  <div>
                    <div className={styles['sub-title']}>Return</div>
                    <div className={styles['main-content']}>DFR-JSD</div>
                  </div>
                  <div>
                    <div className={styles['sub-title']}>Carry-on</div>
                    <div className={styles['main-content']}>Free</div>
                  </div>
                  <div>
                    <div className={styles['sub-title']}>1st Bag</div>
                    <div className={styles['main-content']}>$58</div>
                    <div className={styles['sub-content']}>(50kg/23kg)</div>
                  </div>
                  <div>
                    <div className={styles['sub-title']}>2nd Bag</div>
                    <div className={styles['main-content']}>$78</div>
                    <div className={styles['sub-content']}>(50kg/23kg)</div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className={styles['title']}>Passenger information</h3>
            <p className={styles['description']}>
              Enter the required information for each traveler and be sure that
              it exactly matches the government-issued ID presented at the
              airport.
            </p>

            <div className={styles['form']}>
              <form onSubmit={formikPassenger.handleSubmit}>
                {passengersList?.map((ageGroup, i) => (
                  <PassengerForm
                    key={i}
                    passengerNo={i + 1}
                    ageGroup={ageGroup}
                    getValues={(values) => {
                      formikPassenger.values.passengers[i] = values;
                    }}
                    errors={formikPassenger.errors.passengers?.[i]} // Pass errors to the form
                    touched={formikPassenger.touched.passengers?.[i]} // Pass touched state to the form
                    handleChange={formikPassenger.handleChange} // Pass handleChange to the form
                    handleBlur={formikPassenger.handleBlur} // Pass handleBlur to the form
                  />
                ))}
                <button type="submit">submit</button>
              </form>
              <div className={styles['divider']}></div>
              <EmergencyForm
                getValues={(values) => (formValues['emergency'] = values)}
              />
              <div className={styles['divider']}></div>
              <BagForm
                passengers={formValues.passengers}
                getValues={(values) => (formValues.bags = values)}
              />
              <div className={styles['divider']}></div>
            </div>
            <h3 className={styles['title']}>Payment method</h3>
            <p className={styles['description']}>
              Select a payment method below. Autobookflights processes your
              payment securely with end-to-end encryption.
            </p>
            <div className={styles['payment-options']}>
              <button
                className={clsx(
                  styles['payment-button'],
                  selectedPayment === 'credit card' && styles['selected'],
                )}
                onClick={() => setSelectedPayment('credit card')}
              >
                <CreditCardIcon />
                Credit Card
              </button>
              <button
                className={clsx(
                  styles['payment-button'],
                  selectedPayment === 'google pay' && styles['selected'],
                )}
                onClick={() => setSelectedPayment('google pay')}
              >
                <GooglePayIcon />
                Google Pay
              </button>
              <button
                className={clsx(
                  styles['payment-button'],
                  selectedPayment === 'apple pay' && styles['selected'],
                )}
                onClick={() => setSelectedPayment('apple pay')}
              >
                <AppleIcon />
                Apple Pay
              </button>
              <button
                className={clsx(
                  styles['payment-button'],
                  selectedPayment === 'paypal' && styles['selected'],
                )}
                onClick={() => setSelectedPayment('paypal')}
              >
                <PaypalIcon />
                Paypal
              </button>
              <button
                className={clsx(
                  styles['payment-button'],
                  selectedPayment === 'crypto' && styles['selected'],
                )}
                onClick={() => setSelectedPayment('crypto')}
              >
                <CryptoIcon />
                Crypto
              </button>
            </div>
            <form onSubmit={formik.handleSubmit} className={styles['form']}>
              <CreditPaymentSection formik={formik} />
            </form>
          </div>
          <div className={styles['right']}>
            <div className={styles['details']}>
              <h5>
                <span className={styles['detail-title']}>Trip Total</span>
                <span className={styles['detail-title-description']}>
                  Currency Calculator
                </span>
              </h5>
              <h5 className={styles['total-content']}>Passenger</h5>
              <h5>
                <span>Flights</span>
                <span className={styles['detail-value']}>$400</span>
              </h5>
              <h5>
                <span>Autobook & change</span>
                <span className={styles['detail-value']}>$500</span>
              </h5>
              <h5>
                <span>Total Price</span>
                <span className={styles['detail-value']}>$900</span>
              </h5>
              {paramsData?.autoBook.length == 2 && (
                <>
                  <h5 className={styles['autobook-content']}>
                    <span>Auto Book Price</span>
                    <span className={styles['detail-value']}>
                      ${paramsData?.autoBook[0]}
                    </span>
                  </h5>
                  <h5 className={styles['autobook-content']}>
                    <span>Cancel or purchase by Date</span>
                    <span className={styles['detail-value']}>
                      {paramsData?.autoBook[1]}
                    </span>
                  </h5>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles['inner-container']}>
          <div className={styles['left']}>
            <div className={styles['form']}>
              <div className={styles['policy']}>
                <h4 className={styles['policy-title']}>Cancellation policy</h4>
                <p className={styles['policy-description']}>
                  This flight has a flexible cancellation policy. If you cancel
                  or change your flight up to 30 days before the departure date,
                  you are eligible for a free refund. All flights booked on
                  Autobookflights are backed by our satisfaction guarantee,
                  however cancellation policies vary by airline. See the{' '}
                  <span>full cancellation policy</span> for this flight.
                </p>
              </div>
            </div>
            {/* <div className={styles['seat-option']}>
              <CheckBox
                name="isSeatOption"
                checked={isSeatOption}
                onChange={(e) => setIsSeatOption(e.target.checked)}
                label="Please check this box if you would like to select seats for all passengers."
              />
            </div> */}
            <div className={styles['control-group']}>
              <Button
                type="submit"
                variant="secondary"
                className={styles['back-btn']}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <Button
                variant="primary"
                className={styles['confirm-btn']}
                onClick={() => handleFormSubmit(false)}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
