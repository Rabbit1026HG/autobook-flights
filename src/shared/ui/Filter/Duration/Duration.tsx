import { FC, useEffect, useRef, useState } from 'react';
import Pill from '@shared/ui/Pill/Pill';
import useFocusOut from '@hooks/useFocusOut';
import { RangeSlider } from '@shared/ui/Input/RangeSlider/RangeSlider';
// import  "./Stops.scss";
import styles from './Duration.module.scss';
import useWindowWidth from '@hooks/useWindowWidth';

interface DurationFilterProps {
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
  duration: number;
  getDuration: (prices: number) => void;
  min?: number;
  max: number;
}

export const DurationFilter: FC<DurationFilterProps> = ({
  getFilter,
  min,
  max,
  duration,
  getDuration,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useFocusOut(menuRef, () => setMenuOpen(false));

  useEffect(() => {
    if (duration === max) {
      getFilter(null);
      setIsSelected(false);
      getDuration(max);
    } else {
      getFilter('price');
      setIsSelected(true);
    }
  }, [duration, max, getFilter, setIsSelected, getDuration]);
  const onCrossClick = () => {
    setIsSelected(false);
    getFilter(null);
    getDuration(max);
  };

  const windowWidth = useWindowWidth();
  const leftPosition =
    windowWidth - (menuRef.current?.getBoundingClientRect()?.left ?? 0) - 300;

  return (
    <div className={styles['duration-filter']} ref={menuRef}>
      {isSelected ? (
        <Pill
          onClick={() => setMenuOpen((old) => !old)}
          crossClick={onCrossClick}
          opened={menuOpen}
          cross={isSelected}
          variant="selected"
        >{`Under ${duration} hr`}</Pill>
      ) : (
        <Pill
          onClick={() => setMenuOpen((old) => !old)}
          opened={menuOpen}
          cross={isSelected}
        >
          Duration
        </Pill>
      )}
      {menuOpen && (
        <div
          className={styles['duration-select']}
          style={{ left: leftPosition > 0 ? '0' : leftPosition }}
        >
          <RangeSlider
            min={min}
            max={max}
            val={duration}
            getVal={getDuration}
            state={false}
          />
        </div>
      )}
    </div>
  );
};
