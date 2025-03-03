import { FC, useEffect, useRef, useState } from 'react';
import Pill from '@shared/ui/Pill/Pill';
import useFocusOut from '@hooks/useFocusOut';
import ArrivalIcon from '@shared/icons/32/arrival.svg?react';
import DepartIcon from '@shared/icons/32/departure.svg?react';
import styles from './TimeFilter.module.scss';
import MultiRangeSlider from '@shared/ui/Input/RangeSlider/MultiRangeSlider';
import clsx from 'clsx';
import useWindowWidth from '@hooks/useWindowWidth';

interface TimeFilterProps {
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
  className?: string;
}

export const TimeFilter: FC<TimeFilterProps> = ({ getFilter }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [departure1, setDeparture1] = useState<number>(0);
  const [arrival1, setArrival1] = useState<number>(0);
  const [departure2, setDeparture2] = useState<number>(24);
  const [arrival2, setArrival2] = useState<number>(24);
  const [returnDeparture1, setReturnDeparture1] = useState<number>(0);
  const [returnArrival1, setReturnArrival1] = useState<number>(0);
  const [returnDeparture2, setReturnDeparture2] = useState<number>(24);
  const [returnArrival2, setReturnArrival2] = useState<number>(24);
  const [isState, setIsState] = useState<boolean>(false);
  useFocusOut(menuRef, () => setMenuOpen(false));
  useEffect(() => {
    if (
      departure1 === 0 &&
      departure2 === 24 &&
      arrival1 === 0 &&
      arrival2 === 24 &&
      returnDeparture1 === 0 &&
      returnDeparture2 === 24 &&
      returnArrival1 === 0 &&
      returnArrival2 === 24
    ) {
      setIsSelected(false);
      getFilter(null);
    }
    if (
      departure1 !== 0 ||
      departure2 !== 24 ||
      arrival1 !== 0 ||
      arrival2 !== 24 ||
      returnDeparture1 !== 0 ||
      returnDeparture2 !== 24 ||
      returnArrival1 !== 0 ||
      returnArrival2 !== 24
    ) {
      setIsSelected(true);
      getFilter('times');
    }
  }, [
    departure1,
    departure2,
    arrival1,
    arrival2,
    returnArrival1,
    returnArrival2,
    returnDeparture1,
    returnDeparture2,
    getFilter,
  ]);

  const onCrossClick = () => {
    setIsSelected(false);
    getFilter(null);
    setDeparture1(0);
    setDeparture2(24);
    setArrival1(0);
    setArrival2(24);
    setReturnDeparture1(0);
    setReturnDeparture2(24);
    setReturnArrival1(0);
    setReturnArrival2(24);
  };

  const windowWidth = useWindowWidth();
  const leftPosition =
    windowWidth - (menuRef.current?.getBoundingClientRect()?.left ?? 0) - 300;

  return (
    <div className={styles['times-filter']} ref={menuRef}>
      {isSelected ? (
        <Pill
          onClick={() => {
            setMenuOpen((old) => !old);
            setIsState(false);
          }}
          crossClick={onCrossClick}
          opened={menuOpen}
          cross={isSelected}
          variant="selected"
        >
          Times
        </Pill>
      ) : (
        <Pill
          onClick={() => {
            setMenuOpen((old) => !old);
            setIsState(false);
          }}
          opened={menuOpen}
          cross={isSelected}
        >
          Times
        </Pill>
      )}
      {menuOpen && (
        <>
          <div
            className={styles['times-select']}
            style={{ left: leftPosition > 0 ? '0' : leftPosition }}
          >
            <div className={styles['time-state']}>
              <div className={styles['line']}></div>
              <div
                className={clsx(
                  styles['time-state-item'],
                  !isState && styles['selected'],
                )}
                onClick={() => setIsState(false)}
              >
                Outbound
              </div>
              <div
                className={clsx(
                  styles['time-state-item'],
                  isState && styles['selected'],
                )}
                onClick={() => setIsState(true)}
              >
                Return
              </div>
            </div>
            {!isState ? (
              <>
                <div className={styles['times-value']}>
                  <DepartIcon />
                  Departure
                  <span className={styles['select-value']}>
                    {departure1 !== 0 || departure2 !== 24
                      ? ` ${departure1}:00 - ${departure2}:00`
                      : ' Any time'}
                  </span>
                </div>
                <MultiRangeSlider
                  min={0}
                  max={24}
                  minVal={departure1}
                  maxVal={departure2}
                  setMinVal={setDeparture1}
                  setMaxVal={setDeparture2}
                />
                <div className={styles['times-value']}>
                  <ArrivalIcon />
                  Arrival
                  <span className={styles['select-value']}>
                    {arrival1 !== 0 || arrival2 !== 24
                      ? ` ${arrival1}:00 - ${arrival2}:00`
                      : ' Any time'}
                  </span>
                </div>
                <MultiRangeSlider
                  min={0}
                  max={24}
                  minVal={arrival1}
                  maxVal={arrival2}
                  setMinVal={setArrival1}
                  setMaxVal={setArrival2}
                />
              </>
            ) : (
              <>
                <div className={styles['times-value']}>
                  <DepartIcon style={{ transform: 'rotateY(180deg)' }} />
                  Departure
                  <span className={styles['select-value']}>
                    {returnDeparture1 !== 0 || returnDeparture2 !== 24
                      ? ` ${returnDeparture1}:00 - ${returnDeparture2}:00`
                      : ' Any time'}
                  </span>
                </div>
                <MultiRangeSlider
                  min={0}
                  max={24}
                  minVal={returnDeparture1}
                  maxVal={returnDeparture2}
                  setMinVal={setReturnDeparture1}
                  setMaxVal={setReturnDeparture2}
                />
                <div className={styles['times-value']}>
                  <ArrivalIcon style={{ transform: 'rotateY(180deg)' }} />
                  Arrival
                  <span className={styles['select-value']}>
                    {returnArrival1 !== 0 || returnArrival2 !== 24
                      ? ` ${returnArrival1}:00 - ${returnArrival2}:00`
                      : ' Any time'}
                  </span>
                </div>
                <MultiRangeSlider
                  min={0}
                  max={24}
                  minVal={returnArrival1}
                  maxVal={returnArrival2}
                  setMinVal={setReturnArrival1}
                  setMaxVal={setReturnArrival2}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
