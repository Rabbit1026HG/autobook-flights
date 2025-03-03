import { FC, useRef, useState } from 'react';
import { TextField } from '..';
import { Count } from '../Count/Count';
import ChevronDown from '@shared/icons/18/chevron down.svg?react';
import ChevronUp from '@shared/icons/18/chevron up.svg?react';
import useFocusOut from '@hooks/useFocusOut';
import './PassengerList.scss';
import clsx from 'clsx';
interface PassengerListProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: { adults: number; minors: number; infants: number };
  getValue?: (value: {
    adults: number;
    minors: number;
    infants: number;
  }) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  placeholder?: string;
  name?: string;
}
export const PassengerList: FC<PassengerListProps> = ({
  value,
  getValue,
  className,
  error,
  helperText,
  required,
  disabled,
  startIcon,
  endIcon,
  placeholder,
  name,
}) => {
  const TextFieldProps = {
    error,
    helperText,
    required,
    disabled,
    startIcon,
    endIcon,
    placeholder,
    name,
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useFocusOut(menuRef, () => setMenuOpen(false));
  const handleChange = (name: string, newVal: number) => {
    if (value) {
      console.log({ ...value, [name]: newVal });
      getValue && getValue({ ...value, [name]: newVal });
    }
  };
  const valueName = () => {
    let val = 0;
    if (value?.adults && value?.adults > 0) {
      val += value.adults;
    }
    if (value?.minors && value.minors > 0) {
      val += value.minors;
    }
    if (value?.infants && value.infants > 0) {
      val += value.infants;
    }
    return val;
  };
  return (
    <div className={clsx('passenger-list-container', className)}>
      <TextField
        {...TextFieldProps}
        value={valueName() || '0'}
        readOnly
        endIcon={
          menuOpen ? (
            <ChevronUp onClick={() => setMenuOpen(false)} />
          ) : (
            <ChevronDown onClick={() => setMenuOpen(true)} />
          )
        }
        onClick={() => setMenuOpen(true)}
      />
      <div ref={menuRef} aria-expanded={menuOpen}>
        <Count
          name="Adults"
          value={value?.adults}
          getNewValue={(val) => handleChange('adults', val)}
        />
        <Count
          name="Children"
          value={value?.minors}
          getNewValue={(val) => handleChange('minors', val)}
        />
        <Count
          name="Infants"
          value={value?.infants}
          getNewValue={(val) => handleChange('infants', val)}
        />
      </div>
    </div>
  );
};
