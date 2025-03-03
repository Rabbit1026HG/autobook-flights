// import Pill from '@shared/ui/Pill/Pill';
import styles from './FlightFilter.module.scss';
import { FC, useState } from 'react';
import { StopsFilter } from '@shared/ui/Filter/Stops/Stops';
import { MaxpriceFilter } from '@shared/ui/Filter/Maxprice/Maxprice';
import { TimeFilter } from '@shared/ui/Filter/Times/TimeFileter';
import { BagsFilter } from '@shared/ui/Filter/Bags/BagsFilter';
import { EmissionsFilter } from '@shared/ui/Filter/Emissions/Emissions';
import { AirlinesFilter } from '@shared/ui/Filter/Airlines/Airlines';
import { DurationFilter } from '@shared/ui/Filter/Duration/Duration';
interface FlightFilterProps {
  current?:
    | 'price'
    | 'stops'
    | 'times'
    | 'airlines'
    | 'emissions'
    | 'connecting'
    | 'duration'
    | 'bags'
    | null;
  getFilter: (
    filter:
      | 'price'
      | 'stops'
      | 'times'
      | 'airlines'
      | 'emissions'
      | 'connecting'
      | 'duration'
      | 'bags'
      | null,
  ) => void;
}
export const FlightFilter: FC<FlightFilterProps> = ({ current, getFilter }) => {
  const [stopfilter, setStopfilter] = useState<string>('all');
  const [emissionfilter, setEmissionfilter] = useState<string>('any');
  const [pricefilter, setPricefilter] = useState<number>(10000);
  const [durationfilter, setDurationfilter] = useState<number>(38);
  return (
    <div className={styles['flight-filter']}>
      <MaxpriceFilter
        getFilter={getFilter}
        min={1000}
        max={10000}
        price={pricefilter}
        getPrice={setPricefilter}
      />
      <StopsFilter
        current={current}
        getFilter={getFilter}
        type={stopfilter}
        getType={setStopfilter}
      />
      <TimeFilter current={current} getFilter={getFilter} />
      <BagsFilter current={current} getFilter={getFilter} />
      <EmissionsFilter
        current={current}
        getFilter={getFilter}
        type={emissionfilter}
        getType={setEmissionfilter}
      />
      <AirlinesFilter current={current} getFilter={getFilter} />
      <DurationFilter
        current={current}
        getFilter={getFilter}
        min={0}
        max={38}
        duration={durationfilter}
        getDuration={setDurationfilter}
      />
      {/* <Pill onClick={() => getFilter('airlines')} opened={current === 'airlines'}>Airlines</Pill>
      <Pill onClick={() => getFilter('seatclass')} opened={current === 'seatclass'}>Seat class</Pill>
      <Pill >More</Pill> */}
    </div>
  );
};
