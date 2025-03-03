import { FC, useState } from 'react';
import { TableCell } from './TableCell';
import styles from './FlightTable.module.scss';
import Button from '@shared/ui/Button';
import { Flight } from '@shared/types';

interface FlightTable {
  flights: Flight[];
  setFlights: (flights: Flight[]) => void;
  selectedId?: string;
  getSelectedId: (id: string) => void;
}

export const FlightTable: FC<FlightTable> = ({
  flights,
  setFlights,
  getSelectedId,
  selectedId,
}) => {
  const [tableExpanded, setTableExpanded] = useState(false);

  const handleToggle = (element: Flight) => {
    const index = flights.findIndex((flight) => flight.id === element.id);
    const updatedFlights = [...flights];

    updatedFlights[index] = element;
    setFlights(updatedFlights);
  };

  return (
    <div className={styles['flight-table']}>
      <div className={styles['table-wrapper']}>
        <div className={styles['scroll-container']}>
          <table cellSpacing={'1px'}>
            <tbody>
              {flights
                .slice(0, tableExpanded ? flights.length : 3)
                .map((flight, index) => (
                  <TableCell
                    key={'ft' + index}
                    flight={flight}
                    onToggle={handleToggle}
                    onClick={() => getSelectedId(flight.id)}
                    aria-selected={flight.id === selectedId}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles['button-container']}>
        <Button
          variant="secondary"
          size="lg"
          type="button"
          onClick={() => setTableExpanded((old) => !old)}
        >
          {tableExpanded ? 'Show less flights' : 'Show all flights'}
        </Button>
      </div>
    </div>
  );
};
