import { FC } from 'react';
import styles from './FlightRow.module.scss';
import { Flight } from '@shared/types';
interface FlightRowProps {
  flight: Flight;
  isReview?: boolean;
  id?: number;
}
export const FlightRow: FC<FlightRowProps> = ({ flight, isReview, id }) => {
  return (
    <div className={styles['flight-row']}>
      {isReview && (
        <div className={styles['flight-review']}>
          <b>{id === 0 ? 'Depart' : 'Return'}</b>
        </div>
      )}
      <div className="logo">
        <img src={flight.logo} alt="" />
      </div>
      <div className={styles['airline']}>
        <p className={styles['airline-name']}>{flight.airline}</p>
        <p className={styles['trip-number']}>{flight.flightNumber}</p>
      </div>

      <div className={styles['times']}>
        <p className={styles['duration']}>{flight.duration}</p>
        <p className={styles['time']}>{flight.time}</p>
        <div className={styles['stops']}>
          {flight.stops?.map((ele, i) => (
            <p key={'stop' + i}>
              {ele.duration} in {ele.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
