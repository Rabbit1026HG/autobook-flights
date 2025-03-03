import { FC, useRef, useState } from 'react';
import Pill from '@shared/ui/Pill/Pill';
import useFocusOut from '@hooks/useFocusOut';
import { RadioButton } from '@shared/ui/Input';
import styles from './Emissions.module.scss';
import useWindowWidth from '@hooks/useWindowWidth';
interface EmissionsFilterProps {
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
  type?: 'any' | 'only' | string;
  getType: (type: 'any' | 'only' | string) => void;
}

export const EmissionsFilter: FC<EmissionsFilterProps> = ({
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
    if (val === 'any') {
      getFilter(null);
      setIsSelected(false);
    } else {
      getFilter('emissions');
      setIsSelected(true);
    }
  };

  const onCrossClick = () => {
    getType('any');
    setIsSelected(false);
    getFilter(null);
  };

  const windowWidth = useWindowWidth();
  const leftPosition =
    windowWidth - (menuRef.current?.getBoundingClientRect()?.left ?? 0) - 300;

  return (
    <div className={styles['emissions-filter']} ref={menuRef}>
      {isSelected ? (
        <Pill
          onClick={() => setMenuOpen((old) => !old)}
          crossClick={onCrossClick}
          opened={menuOpen}
          cross={isSelected}
          variant="selected"
        >
          Less emissions
        </Pill>
      ) : (
        <Pill
          onClick={() => setMenuOpen((old) => !old)}
          opened={menuOpen}
          cross={isSelected}
        >
          Emissions
        </Pill>
      )}
      {menuOpen && (
        <div
          className={styles['emissions-select']}
          style={{ left: leftPosition > 0 ? '0' : leftPosition }}
        >
          <RadioButton
            label="Any emissions"
            name="emissiontype"
            id="any"
            checked={type === 'any'}
            onChange={() => handletypeChange('any')}
          />
          <RadioButton
            label="Less emissions only"
            name="emissiontype"
            id="only"
            checked={type === 'only'}
            onChange={() => handletypeChange('only')}
          />
        </div>
      )}
    </div>
  );
};
