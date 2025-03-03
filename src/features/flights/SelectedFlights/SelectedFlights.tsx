import { Flight } from '@shared/types';
import { FC } from 'react';
import { FlightRow } from './FlightRow';
import styles from './SelectedFlights.module.scss';

interface SelectedFlightsProps {
  isReview?: boolean;
  flights: Flight[];
  autoBookPrice?: string;
  autoBookDate?: string;
  autoBookState?: boolean;
}

export const SelectedFlights: FC<SelectedFlightsProps> = ({
  flights,
  autoBookDate,
  autoBookPrice,
  autoBookState,
  isReview,
}) => {
  return (
    <div className={styles['selected-flights']}>
      <div className={styles['flights']}>
        {flights.map((flight, index) => (
          <FlightRow
            flight={flight}
            key={'f12' + flight.id}
            isReview={isReview}
            id={index}
          />
        ))}
      </div>
      <div className={styles['details']}>
        <h5 className="total">
          <span>Total</span>
          <span className={styles['detail-value']}>
            $
            {`${flights.reduce(
              (old, current) => old + (current.price?.total || 0),
              0,
            )}`}
          </span>
        </h5>
        {autoBookState && (
          <>
            <h5 className={styles['autobook']}>
              <span>Auto Book price</span>
              <span className={styles['detail-value']}>${autoBookPrice}</span>
            </h5>
            <h5 className={styles['autobook']}>
              <span>Cancel or purchase by Date</span>
              <span className={styles['detail-value']}>
                {autoBookDate && autoBookDate}
              </span>
            </h5>
          </>
        )}
      </div>
    </div>
  );
};
