import { FC, useEffect, useRef, useState } from 'react';
import Pill from '@shared/ui/Pill/Pill';
import useFocusOut from '@hooks/useFocusOut';
// import  "./Stops.scss";
import styles from './Bags.module.scss';
import { Count } from '@shared/ui/Input/Count/Count';
import useWindowWidth from '@hooks/useWindowWidth';

interface BagsFilterProps {
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

export const BagsFilter: FC<BagsFilterProps> = ({ getFilter }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [bagCount, setBagCount] = useState<number>(0);
  const menuRef = useRef<HTMLDivElement>(null);
  useFocusOut(menuRef, () => setMenuOpen(false));

  useEffect(() => {
    if (bagCount === 0) {
      getFilter(null);
      setIsSelected(false);
      setBagCount(0);
    } else {
      getFilter('bags');
      setIsSelected(true);
    }
  }, [bagCount, getFilter, setIsSelected]);
  const onCrossClick = () => {
    setIsSelected(false);
    setBagCount(0);
  };

  const windowWidth = useWindowWidth();
  const leftPosition =
    windowWidth - (menuRef.current?.getBoundingClientRect()?.left ?? 0) - 300;

  return (
    <div className={styles['bags-filter']} ref={menuRef}>
      {isSelected ? (
        <Pill
          onClick={() => setMenuOpen((old) => !old)}
          crossClick={onCrossClick}
          opened={menuOpen}
          cross={isSelected}
          variant="selected"
        >{`${bagCount} check-in bag`}</Pill>
      ) : (
        <Pill
          onClick={() => setMenuOpen((old) => !old)}
          opened={menuOpen}
          cross={isSelected}
        >
          Bags
        </Pill>
      )}
      {menuOpen && (
        <div
          className={styles['bags-select']}
          style={{ left: leftPosition > 0 ? '0' : leftPosition }}
        >
          <Count
            name="Check-in bags"
            value={bagCount}
            getNewValue={(val) => setBagCount(val)}
          />
        </div>
      )}
    </div>
  );
};
