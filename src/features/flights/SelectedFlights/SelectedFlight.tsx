import { Flight } from '@shared/types';
import { FC } from 'react';
import { FlightRow } from './FlightRow';
import styles from './SelectedFlights.module.scss';

interface SelectedFlightsProps {
  flights: Flight[];
}

export const SelectedFlight: FC<SelectedFlightsProps> = ({ flights }) => {
  return (
    <div className={styles['selected-flights']}>
      <div className={styles['flights']}>
        {flights.map((flight, index) => (
          <FlightRow
            isReview={true}
            id={index}
            flight={flight}
            key={'f12' + flight.id}
          />
        ))}
      </div>
    </div>
  );
};
