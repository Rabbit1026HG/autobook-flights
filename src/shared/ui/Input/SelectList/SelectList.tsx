import { FC, HTMLAttributes, useRef, useState } from 'react';
import { TextField } from '..';
import styles from './SelectList.module.scss';
import clsx from 'clsx';
import useFocusOut from '@hooks/useFocusOut';
import ChevronDown from '@shared/icons/18/chevron down.svg?react';
import ChevronUp from '@shared/icons/18/chevron up.svg?react';
interface SelectListProps extends HTMLAttributes<HTMLDivElement> {
  options: string[];
  value?: string | string[];
  multiSelect?: boolean;
  getSelected: (selected: string | string[]) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  placeholder?: string;
  name?: string;
}
export const SelectList: FC<SelectListProps> = ({
  options,
  value,
  getSelected,
  className,
  error,
  helperText,
  required,
  disabled,
  startIcon,
  endIcon,
  placeholder,
  name,
  ...other
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  // const [options, setOptions] = useState([]);
  useFocusOut(menuRef, () => setMenuOpen(false));
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
  const handleSingleSelect = (option: string) => {
    getSelected(option);
    setMenuOpen(false);
  };

  return (
    <div
      className={clsx(styles['select-list-container'], className)}
      {...other}
    >
      <TextField
        className={styles['select-list-textfield']}
        {...TextFieldProps}
        onClick={() => setMenuOpen((old) => !old)}
        value={value}
        readOnly
        endIcon={
          menuOpen ? (
            <ChevronUp onClick={() => setMenuOpen(false)} />
          ) : (
            <ChevronDown onClick={() => setMenuOpen(true)} />
          )
        }
      />
      <ul
        className={styles['select-list-menu']}
        aria-expanded={menuOpen}
        ref={menuRef}
      >
        {options.map((option) => (
          <li
            key={option}
            className={styles['menu-item']}
            onClick={() => handleSingleSelect(option)}
            aria-selected={option === value}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
