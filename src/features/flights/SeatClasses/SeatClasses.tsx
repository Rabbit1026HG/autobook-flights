import { FC } from 'react';
import ArrowRight from '@shared/icons/32/arrowRight.svg?react';
import clsx from 'clsx';
import styles from './SeatClasses.module.scss';
import { ClassInfo } from './ClassInfo';
import { Flight } from '@shared/types';

interface SeatClassesProps {
  from?: string;
  to?: string;
  selectedDates?: string[];
  selectedClass?: 'Economy' | 'Business';
  className?: string;
  children?: React.ReactNode;
  flights?: Flight[];
  departing?: boolean;
  setDeparting?: (departing: boolean) => void;
}

export const SeatClasses: FC<SeatClassesProps> = ({
  className,
  children,
  selectedClass,
  from,
  to,
  selectedDates,
  flights,
  departing,
  setDeparting,
}) => {
  const departureDate = new Date(selectedDates?.[0] || '');
  const arrivalDate = new Date(selectedDates?.[1] || '');
  return (
    <div className={clsx(styles['seat-classes'], className)}>
      <div className={styles['header']}>
        <div>
          <div className={styles['code']}>{from?.toUpperCase()}</div>
          <div>
            <ArrowRight />
          </div>
          <div className={styles['code']}>{to?.toUpperCase()}</div>
        </div>
        <div
          className={styles['progress-step']}
          aria-selected={departing}
          onClick={() => !departing && setDeparting?.(true)}
        >
          <p>
            {departureDate.toDateString().split(' ').splice(1, 2).join(' ')}{' '}
            <span>|</span> {flights?.[0].time}
          </p>
          <p>Departing</p>
        </div>
        {selectedDates?.length === 2 && (
          <div
            className={styles['progress-step']}
            aria-selected={!departing}
            onClick={() => departing && setDeparting?.(false)}
          >
            <p>
              {arrivalDate.toDateString().split(' ').splice(1, 2).join(' ')}{' '}
              <span>|</span> {flights?.[1].time}
            </p>
            <p>Arriving</p>
          </div>
        )}
      </div>
      <div className={styles['classes-comparison']}>
        <ClassInfo
          img="/images/Economy-Seats.png"
          title="Economy"
          selected={selectedClass === 'Economy'}
          pros={economyPros}
          description="Rest and recharge during your flight with extended leg room, personalized service, and a multi-course meal service"
        />
        <ClassInfo
          img="/images/Business-Seats.png"
          title="Business"
          selected={selectedClass === 'Business'}
          pros={businessPros}
          description="Rest and recharge during your flight with extended leg room, personalized service, and a multi-course meal service"
        />
      </div>
      <div className={styles['footer']}>{children}</div>
    </div>
  );
};
const economyPros = [
  'Built-in entertainment system',
  'Complimentary snacks and drinks',
  'One free carry-on and personal item',
];

const businessPros = [
  'Extended leg room',
  'First two checked bags free',
  'Priority boarding',
  'Personalized service',
  'Enhanced food and drink service',
  'Seats that recline 40% more than economy',
];
