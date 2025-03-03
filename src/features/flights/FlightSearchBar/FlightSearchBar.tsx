import { DatePicker } from '@shared/ui/Input';
import DepartureIcon from '@shared/icons/32/departure.svg?react';
import ArrivalIcon from '@shared/icons/32/arrival.svg?react';
import PersonIcon from '@shared/icons/32/person solid.svg?react';

import PersonSittingIcon from '@shared/icons/32/person sitting.svg?react';
import styles from './FlightSearchBar.module.scss';
import Button from '@shared/ui/Button';
import { useFormik } from 'formik';
import { SelectList } from '@shared/ui/Input/SelectList/SelectList';
import { PassengerList } from '@shared/ui/Input/PassengerList/PassengerList';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import clsx from 'clsx';
import { FlightSearchValues } from '@shared/types';
import { toast } from 'react-toastify';
// import { PlaceList } from '@shared/ui/Input/SelectList/PlaceList ';
import { PlaceListTest } from '@shared/ui/Input/SelectList/PlaceListTest';
interface FlightSearchBarProps {
  className?: string;
  initialValues?: FlightSearchValues;
  setFlightType?: (type: string) => void;
}

export const FlightSearchBar: FC<FlightSearchBarProps> = ({
  initialValues: initVal,
  className,
  setFlightType,
}) => {
  const navigate = useNavigate();
  // const [isReturn, setIsReturn] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      from: initVal?.from || '',
      to: initVal?.to || '',
      flightType: initVal?.flightType || 'multiple',
      slectedDates: initVal?.slectedDates || [],
      passengerCount: initVal?.passengerCount || {
        adults: 1,
        minors: 0,
        infants: 0,
      },
      cabin: initVal?.cabin || 'Economy',
    },
    onSubmit: (values) => {
      console.log('Values:', values);
      if (!values.from) toast.error('Departure is required');
      else if (!values.to) {
        toast.error('Destination is required');
      } else if (values.slectedDates.length < 1) {
        toast.error('Departure date is required');
      } else if (values.flightType === 'multiple' && !values.slectedDates[1]) {
        toast.error('Return date is required');
      } else if (
        values.passengerCount.adults === 0 &&
        values.passengerCount.minors === 0
      ) {
        toast.error('Passenger count is required');
      } else {
        setFlightType && setFlightType('departing');
        const encoded = encodeURIComponent(JSON.stringify(values));
        navigate(`/flights/search?${encoded}`);
      }
    },
  });
  return (
    <form
      className={clsx(styles.searchbar, className)}
      onSubmit={formik.handleSubmit}
    >
      <div>
        <PlaceListTest
          key={'from'}
          id="from"
          name="from"
          className="from-where"
          startIcon={<DepartureIcon />}
          placeholder={'Where from?'}
          getSelected={(selected) => formik.setFieldValue('from', selected)}
          value={formik.values.from}
        />
        <PlaceListTest
          key={'to'}
          className="where-to"
          placeholder={'Where to?'}
          name="to"
          startIcon={<ArrivalIcon />}
          id="to"
          value={formik.values.to}
          getSelected={(selected) => formik.setFieldValue('to', selected)}
          // options={destinations}
        />
      </div>
      <div>
        <DatePicker
          type={formik.values.flightType}
          getType={(val) => formik.setFieldValue('flightType', val)}
          selectedDates={formik.values.slectedDates}
          getSelectedDates={(val) => formik.setFieldValue('slectedDates', val)}
          name="travelingDate"
          placeholder="Depart - Arrive"
          radioNames={['Round trip', 'One way']}
        />
        <div>
          <PassengerList
            className="passenger-count"
            placeholder="1 adult"
            startIcon={<PersonIcon />}
            id="passengerCount"
            value={formik.values.passengerCount}
            getValue={(val) => formik.setFieldValue('passengerCount', val)}
            name="passengerCount"
          />
          <SelectList
            key={'cabin'}
            className={styles['cabin-select']}
            placeholder={'cabin'}
            name="cabin"
            id="cabin"
            startIcon={<PersonSittingIcon />}
            value={formik.values.cabin}
            getSelected={(selected) => formik.setFieldValue('cabin', selected)}
            options={cabinSelect}
          />
        </div>
      </div>
      <Button variant="primary" size="lg" type="submit">
        Search
      </Button>
    </form>
  );
};

// const destinations = [
//   'NRT',
//   'PVG',
//   'STL',
//   'ATL',
//   'MSP',
//   'SFO',
//   'JFK',
//   'LAX',
//   'Label',
// ];
const cabinSelect = ['Economy', 'Premium economy', 'Business', 'First'];
