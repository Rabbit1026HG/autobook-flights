import styles from './style.module.scss';
import clsx from 'clsx';
import { ConfirmCard } from '@shared/ui/Card/ConfirmCard/ConfirmCard';
import { FlightSummary } from '@features/payment/FlightSummary/FlightSummary';
import { PriceInfo } from '@features/payment/PriceInfo/PriceInfo';
// import ShareForm from '@features/payment/ShareForm/ShareForm';
// import FlightRoute from '@features/flights/FlightRoute/FlightRoute';
import { CardRow } from '@shared/ui/Card/CardRow/CardRow';
import { RowTitle } from '@shared/ui/RowTitle/RowTitle';
import { flightDeals1 } from '@shared/data';

const FlightsPaymentSuccessPage = () => {
  const data = localStorage.getItem('bookedFlights');
  const { flights: selectedFlights } = data ? JSON.parse(data) : [];
  return (
    <div className={clsx('page-container', styles['confirm-page'])}>
      <div className={styles['left']}>
        <div className={styles['confirm-info']}>
          <ConfirmCard description="Your auto book has been successfully logged! Your confirmation number is #381029404387" />
          <h3 className={styles['confirm-name']}>Bon voyage, Sophia!</h3>
          <p className={styles['confirm-number']}>
            Confirmation number: #381029404387
          </p>
          <p className={styles['confirm-description']}>
            Thank you for submitting your auto-book! If the price reaches the
            amount you requested, Autobook Flights will automatically book your
            trip. Below is a summary of your requested trip to Narita airport in
            Tokyo, Japan. We’ve sent a copy of your booking confirmation to your
            email address. You can also find this page again in My trips.
          </p>
        </div>
        <div className={styles['summary']}>
          <h3>Flight summary</h3>
          <div className={styles['flight-summary']}>
            <h4>Departing February 25th, 2021</h4>
            <FlightSummary flight={selectedFlights[0]} />
            <p className={styles['seat-info']}>
              Seat 9F (economy, window), 1 checked bag
            </p>
          </div>
          <div className={styles['flight-summary']}>
            <h4>Arriving March 21st, 2021</h4>
            <FlightSummary flight={selectedFlights[0]} />
            <p className={styles['seat-info']}>
              Seat 4F (business, window), 1 checked bag
            </p>
          </div>
        </div>
        <div className={styles['price-breakdown']}>
          <PriceInfo />
        </div>
        <div className={styles['payment-method']}>
          <h3>Payment method</h3>
          <img src="/images/visa.png" alt="payment-method" />
        </div>
        {/* <ShareForm /> */}
        {/* <FlightRoute /> */}
      </div>
      <div className={styles['right']}>
        <CardRow
          title={
            <RowTitle
              info="Find your next adventure with these"
              span="flight deals"
              color="var(--brand-color)"
            />
          }
          cards={flightDeals1}
          viewAllUrl="/flights"
        />
      </div>
    </div>
  );
};

export default FlightsPaymentSuccessPage;
