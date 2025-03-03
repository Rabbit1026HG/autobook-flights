import { FC, useEffect, useRef, useState } from 'react';
import Pill from '@shared/ui/Pill/Pill';
import useFocusOut from '@hooks/useFocusOut';
import { RangeSlider } from '@shared/ui/Input/RangeSlider/RangeSlider';
// import  "./Stops.scss";
import styles from './Maxprice.module.scss';
import useWindowWidth from '@hooks/useWindowWidth';

interface MaxpriceFilterProps {
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
  price: number;
  getPrice: (prices: number) => void;
  min?: number;
  max: number;
}

export const MaxpriceFilter: FC<MaxpriceFilterProps> = ({
  getFilter,
  min,
  max,
  price,
  getPrice,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useFocusOut(menuRef, () => setMenuOpen(false));

  useEffect(() => {
    if (price === max) {
      getFilter(null);
      setIsSelected(false);
      getPrice(max);
    } else {
      getFilter('price');
      setIsSelected(true);
    }
  }, [price, max, getFilter, setIsSelected, getPrice]);
  const onCrossClick = () => {
    setIsSelected(false);
    getFilter(null);
    getPrice(max);
  };

  const windowWidth = useWindowWidth();
  const leftPosition =
    windowWidth - (menuRef.current?.getBoundingClientRect()?.left ?? 0) - 300;

  return (
    <div className={styles['maxprice-filter']} ref={menuRef}>
      {isSelected ? (
        <Pill
          onClick={() => setMenuOpen((old) => !old)}
          crossClick={onCrossClick}
          opened={menuOpen}
          cross={isSelected}
          variant="selected"
        >{`up to $${price}`}</Pill>
      ) : (
        <Pill
          onClick={() => setMenuOpen((old) => !old)}
          opened={menuOpen}
          cross={isSelected}
        >
          Max price
        </Pill>
      )}
      {menuOpen && (
        <div
          className={styles['maxprice-select']}
          style={{ left: leftPosition > 0 ? '0' : leftPosition }}
        >
          <RangeSlider
            min={min}
            max={max}
            val={price}
            getVal={getPrice}
            state={true}
          />
        </div>
      )}
    </div>
  );
};
