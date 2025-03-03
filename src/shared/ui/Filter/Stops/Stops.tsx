import { FC, useRef, useState } from 'react';
import Pill from '@shared/ui/Pill/Pill';
import useFocusOut from '@hooks/useFocusOut';
// import clsx from "clsx";
import { RadioButton } from '@shared/ui/Input';
import './Stops.scss';
import useWindowWidth from '@hooks/useWindowWidth';
// import { RangeSlider } from "@shared/ui/Input/RangeSlider/RangeSlider";
// import MultiRangeSlider from "@shared/ui/Input/RangeSlider/MultiRangeSlider";

interface StopsFilterProps {
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
  type?: 'all' | 'none' | 'one' | 'two' | string;
  getType: (type: 'all' | 'none' | 'one' | 'two' | string) => void;
}

export const StopsFilter: FC<StopsFilterProps> = ({
  getFilter,
  getType,
  type,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useFocusOut(menuRef, () => setMenuOpen(false));

  const handletypeChange = (val: string) => {
    getType(val);
    if (val === 'all') {
      getFilter(null);
      setIsSelected(false);
    } else {
      getFilter('stops');
      setIsSelected(true);
    }
  };

  const onCrossClick = () => {
    getType('all');
    setIsSelected(false);
    getFilter(null);
  };

  const windowWidth = useWindowWidth();
  const leftPosition =
    windowWidth - (menuRef.current?.getBoundingClientRect()?.left ?? 0) - 250;

  return (
    <div className="stop-filter" ref={menuRef}>
      {isSelected ? (
        <Pill
          onClick={() => setMenuOpen((old) => !old)}
          crossClick={onCrossClick}
          opened={menuOpen}
          cross={isSelected}
          variant="selected"
        >
          {type === 'none'
            ? 'Non stop'
            : type === 'one'
              ? '1 stop or fewer'
              : '2 stop or fewer'}
        </Pill>
      ) : (
        <Pill
          onClick={() => setMenuOpen((old) => !old)}
          opened={menuOpen}
          cross={isSelected}
        >
          Stops
        </Pill>
      )}
      {menuOpen && (
        <div
          className="stops-select"
          style={{ left: leftPosition > 0 ? '0' : leftPosition }}
        >
          <RadioButton
            label="Any number of stops"
            name="stoptypes"
            id="all"
            checked={type === 'all'}
            onChange={() => handletypeChange('all')}
          />
          <RadioButton
            label="Non stop"
            name="stoptypes"
            id="none"
            checked={type === 'none'}
            onChange={() => handletypeChange('none')}
          />
          <RadioButton
            label="1 stop or fewer"
            name="stoptypes"
            id="one"
            checked={type === 'one'}
            onChange={() => handletypeChange('one')}
          />
          <RadioButton
            label="2 stop or fewer"
            name="stoptypes"
            id="two"
            checked={type === 'two'}
            onChange={() => handletypeChange('two')}
          />
        </div>
      )}
    </div>
  );
};
