import React, { FC, useEffect, useState } from 'react';
import styles from './TableCell.module.scss';
import { Flight } from '@shared/types';
import useWindowWidth from '@hooks/useWindowWidth';

interface FlightDataRow
  extends Omit<React.HtmlHTMLAttributes<HTMLTableRowElement>, 'id'> {
  flight: Flight;
  onToggle: (fligt: Flight) => void;
}
export const TableCell: FC<FlightDataRow> = ({ flight, ...other }) => {
  const windowWidth = useWindowWidth();
  const [showTd, setShowTd] = useState(true);
  useEffect(() => {
    windowWidth > 500 ? setShowTd(true) : setShowTd(false);
  }, [windowWidth]);

  return (
    <tr className={styles['table-cell']} tabIndex={0} {...other}>
      <td className={styles['logo']}>
        <img src={flight.logo} alt="" />
      </td>
      <td>
        {!showTd && <p>{flight.time}</p>}
        <p className="duration">{flight.duration}</p>
        <p className="airline">{flight.airline}</p>
      </td>
      {showTd && (
        <td>
          <p>{flight.time}</p>
          <p>_</p>
        </td>
      )}
      <td>
        <p>
          {flight.stops?.length === 0
            ? 'Nonstop'
            : flight.stops?.length +
              ' stop' +
              `${flight.stops?.length === 1 ? '' : 's'}`}
        </p>
        {flight.stops?.map((stop, index) => (
          <p key={index}>
            {stop.duration} in {stop.name}
          </p>
        ))}
      </td>
      <td>
        <p>${flight.price?.total}</p>
        <p>{flight.flightType}</p>
      </td>
    </tr>
  );
};
export type { FlightDataRow };
