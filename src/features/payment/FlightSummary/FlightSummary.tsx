import { FC } from 'react';
import styles from './FlightSummary.module.scss';
import { Flight } from '@shared/types';

interface FlightSummaryProps {
  flight: Flight;
}

export const FlightSummary: FC<FlightSummaryProps> = ({ flight }) => {
  return (
    <div className={styles['flight-summary']}>
      <div className="logo">
        <img src={flight.logo} alt="" />
      </div>
      <div className={styles['airline']}>
        <p className={styles['airline-duration']}>16h 45m</p>
        <p className={styles['airline-name']}>Hawaiian Airlines</p>
      </div>

      <div className={styles['period']}>
        <p className={styles['time']}>7:00AM - 4:15PM</p>
        <p className={styles['value']}>value</p>
      </div>
      <div className={styles['stops']}>
        <p className={styles['stop']}>1 stop</p>
        <p className={styles['place']}>2h 45m in HNL</p>
      </div>
      <div className={styles['price']}>
        <p className={styles['amount']}>$ 624</p>
        <p className={styles['trip']}>round trip</p>
      </div>
    </div>
  );
};
