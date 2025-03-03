import { FlightSearchBar } from '@features/flights/FlightSearchBar/FlightSearchBar';
import { FlightTable } from '@features/flights/FlightTable/FlightTable';
import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { FlightFilter } from '@features/flights/FlightFilter/FlightFilter';
import { SelectedFlights } from '@features/flights/SelectedFlights/SelectedFlights';
import { Flight, FlightSearchValues } from '@shared/types';
import Button from '@shared/ui/Button';
import { PriceHistory } from '@features/flights/PriceHistory/PriceHistory';
import { PriceRating } from '@features/flights/PriceRating/PriceRating';
// import { CardRow } from '@shared/ui/Card/CardRow/CardRow';
// import { RowTitle } from '@shared/ui/RowTitle/RowTitle';
import { departingFlights, returningFlights } from '@shared/data';
import { useParamsData } from '@hooks/useParamsData';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { AutoBookInput } from '@features/flights/AutoBookInput/AutoBookInput';
import { toast } from 'react-toastify';
import useWindowWidth from '@hooks/useWindowWidth';
import { SortList } from '@shared/ui/Input/SelectList/SortList';

function durationToMinutes(duration: string) {
  const regex = /(\d+)h\s*(\d+)m/;
  const match = duration.match(regex);
  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    return hours * 60 + minutes;
  }
  return 0; // Default to 0 if the format is unexpected
}

function timeToDate(time: string) {
  const [timePart, modifier] = time.split(/(AM|PM)/);
  let hours;
  const [hoursStr, minutesStr] = timePart.split(':');
  hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  if (modifier === 'PM' && hours < 12) {
    hours += 12; // Convert PM hours to 24-hour format
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0; // Midnight case
  }

  return new Date(0, 0, 0, hours, minutes); // Create a Date object for comparison
}
const sortData = (data: Flight[], sortBy?: string) => {
  const newArr = [...data];

  if (sortBy === 'Price') {
    newArr.sort((a, b) => (a?.price?.total || 0) - (b?.price?.total || 0));
  }
  if (sortBy === 'Duration') {
    newArr.sort((a, b) =>
      durationToMinutes(a?.duration || '') >
      durationToMinutes(b?.duration || '')
        ? 1
        : -1,
    );
  }
  if (sortBy === 'Departure time') {
    newArr.sort(
      (a, b) =>
        timeToDate(a?.time || '').getTime() -
        timeToDate(b?.time || '').getTime(),
    );
  }
  return newArr;
};

export const FlightsSearch = () => {
  const [dataFilter, setDataFilter] = useState<
    | 'price'
    | 'stops'
    | 'times'
    | 'airlines'
    | 'emissions'
    | 'connecting'
    | 'duration'
    | 'bags'
    | null
  >(null);
  const [flightType, setFlightType] = useState<string>('departing');
  const [selectedFlightsId, setSelectedFlightsId] = useState<
    [string?, string?]
  >([]);

  const [flights, setFlights] = useState<Flight[]>([]);
  const [autoBookDate, setAutoBookDate] = useState<string[]>([]);
  const [autoBookPrice, setAutoBookPrice] = useState<string>('');
  const windowWidth = useWindowWidth();
  const selectedFlightsRef = useRef<HTMLDivElement>(null);
  const [sortFilter, setSortFilter] = useState<string>('Price');

  useEffect(() => {
    if (flightType === 'departing') {
      setFlights(departingFlights);
    } else if (flightType === 'returning') {
      setFlights(returningFlights);
    }
  }, [flightType]);

  const { data: searchValues } = useParamsData<FlightSearchValues | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedFlightsId([]);
  }, [searchValues]);

  useEffect(() => {
    if (searchValues?.flightType === 'multiple') {
      if (selectedFlightsId[0] && !selectedFlightsId[1]) {
        setFlightType('returning');
      }
    }
  }, [selectedFlightsId, searchValues]);

  const scrollToSelectedFlights = () => {
    selectedFlightsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const handleFlightSelection = (id: string) => {
    if (windowWidth < 1024 && flightType == 'returning') {
      scrollToSelectedFlights();
    }
    setSelectedFlightsId((old) => {
      const newArr: [string?, string?] = [...old];
      if (flightType === 'departing') {
        newArr[0] = id;
      } else {
        newArr[1] = id;
      }
      return newArr;
    });
  };

  const handleSubmit = () => {
    const selectedFlightsInfo = [
      ...departingFlights.filter(
        (flight) => flight.id === selectedFlightsId[0],
      ),
      ...returningFlights.filter(
        (flight) => flight.id === selectedFlightsId[1],
      ),
    ];
    const autoBook =
      autoBookPrice && autoBookDate[0] ? [autoBookPrice, autoBookDate[0]] : [];
    if (
      searchValues?.from &&
      searchValues?.to &&
      (searchValues.passengerCount.adults > 0 ||
        searchValues.passengerCount.minors > 0) &&
      ((searchValues.flightType === 'multiple' &&
        searchValues.slectedDates.length > 1) ||
        (searchValues.flightType === 'single' &&
          searchValues.slectedDates.length > 0))
    ) {
      // alert("success")
      const values = {
        selectedFlights: selectedFlightsInfo,
        searchValues,
        autoBook,
      };

      const jsonValues = JSON.stringify(values);
      navigate(`/flights/passenger-info?${encodeURIComponent(jsonValues)}`);
    } else {
      toast.error('Search Data is invalid!');
    }
  };

  if (!searchValues) {
    return (
      <div className={clsx(styles['loading-container'], 'page-container')}>
        <h3>loading</h3>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className={styles['flight-search-container']}>
        <div>
          <FlightSearchBar
            initialValues={searchValues}
            className={styles['flight-searchbar']}
            setFlightType={setFlightType}
          />
          <FlightFilter
            current={dataFilter}
            getFilter={(filter) => setDataFilter(filter)}
          />
        </div>
      </div>
      <div className={styles['flights-container']}>
        <div
          className={clsx(
            windowWidth > 1024 && selectedFlightsId[0]
              ? styles['left']
              : styles['full'],
          )}
        >
          <div className={styles['flight-search-info-title']}>
            <h4 className={styles['flight-table-title']}>
              Choose a&nbsp;{flightType}
              &nbsp;flight
            </h4>
            <SortList
              value={sortFilter}
              getSelected={(value) =>
                setSortFilter(Array.isArray(value) ? value[0] : value)
              }
              options={sortItem}
            />
          </div>
          <FlightTable
            flights={sortData(flights, sortFilter)}
            setFlights={setFlights}
            selectedId={
              flightType === 'departing'
                ? selectedFlightsId[0]
                : selectedFlightsId[1]
            }
            getSelectedId={(id) => handleFlightSelection(id)}
          />
          {windowWidth > 1024 && (
            <>
              <PriceRating />
              <PriceHistory />
            </>
          )}
        </div>
        <div
          className={clsx(
            windowWidth > 1024 && selectedFlightsId[0] && styles['right'],
          )}
        >
          {selectedFlightsId[0] && (
            <div className={styles['selected-flights-container']}>
              <SelectedFlights
                flights={[
                  ...departingFlights.filter(
                    (flight) => flight.id === selectedFlightsId[0],
                  ),
                  ...returningFlights.filter(
                    (flight) => flight.id === selectedFlightsId[1],
                  ),
                ]}
              />
              <AutoBookInput
                price={autoBookPrice}
                getPrice={setAutoBookPrice}
                date={autoBookDate}
                getDate={setAutoBookDate}
              />
            </div>
          )}
          <div className={styles['button-container']}>
            {selectedFlightsId[0] &&
              (searchValues.flightType !== 'multiple' ||
                selectedFlightsId[1]) && (
                <>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleSubmit()}
                  >
                    Next
                  </Button>
                </>
              )}
          </div>
        </div>
        {windowWidth <= 1024 && (
          <>
            <PriceRating />
            <PriceHistory />
          </>
        )}
      </div>
    </div>
  );
};

const sortItem = [
  'Price',
  'Departure time',
  'Arrival time',
  'Duration',
  'Emissions',
];
