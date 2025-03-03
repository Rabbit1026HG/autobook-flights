import { FC, HTMLAttributes, useRef, useState } from 'react';
import { TextField } from '..';
import styles from './PlaceList.module.scss';
import clsx from 'clsx';
import useFocusOut from '@hooks/useFocusOut';
import ChevronDown from '@shared/icons/18/chevron down.svg?react';
import ChevronUp from '@shared/icons/18/chevron up.svg?react';
import data from '@shared/json/airportData.json';
interface PlaceListProps extends HTMLAttributes<HTMLDivElement> {
  // options: string[];
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
export const PlaceList: FC<PlaceListProps> = ({
  // options,
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

  const menuRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  useFocusOut(menuRef, () => {
    if (
      typeof value === 'string' &&
      !data.some((airport) => airport.code === value) &&
      value !== ''
    ) {
      getSelected('');
    }
    setMenuOpen(false);
  });
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
    setSelectedIndex(-1);
    setMenuOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuOpen(true);
    getSelected(e.target.value.toUpperCase());
    setSelectedIndex(-1);
  };

  const findAirportCodes = (prefix: string | string[] | undefined) => {
    if (prefix === '') return [];
    const regex = new RegExp(`^${prefix}`, 'i'); // Case-insensitive search
    return data.filter((airport) => regex.test(airport.code)).slice(0, 10); // Get first 10 matches
  };

  const filteredCodes = findAirportCodes(value);

  let placeholderText = '';
  if (filteredCodes.length && value) {
    const firstMatch =
      selectedIndex < 0 ? filteredCodes[0] : filteredCodes[selectedIndex];
    placeholderText = firstMatch.code.slice(
      typeof value === 'string' ? value.length : 0,
    );
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle arrow key events
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (selectedIndex < filteredCodes.length - 1) {
        setSelectedIndex(selectedIndex + 1);
        // Scroll the selected item into view
        const listItems = listRef.current?.children;
        if (listItems && listItems[selectedIndex + 1]) {
          listItems[selectedIndex + 1].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        }
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
        // Scroll the selected item into view
        const listItems = listRef.current?.children;
        if (listItems && listItems[selectedIndex - 1]) {
          listItems[selectedIndex - 1].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        }
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (selectedIndex >= 0) {
        getSelected(filteredCodes[selectedIndex].code); // Set input to the selected value
        setSelectedIndex(-1); // Reset selection
        setMenuOpen(false);
      }
    }
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
        disValue={typeof value === 'string' ? value : ''}
        preValue={placeholderText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        overMode={placeholderText ? 'true' : 'false'}
        endIcon={
          menuOpen ? (
            <ChevronUp onClick={() => setMenuOpen(false)} />
          ) : (
            <ChevronDown onClick={() => setMenuOpen(true)} />
          )
        }
      />
      {value && (
        <div className={styles['ul-container']} ref={menuRef}>
          <ul
            className={styles['select-list-menu']}
            aria-expanded={menuOpen}
            ref={listRef}
          >
            {filteredCodes.length ? (
              filteredCodes.map((option, index) => (
                <li
                  key={index}
                  className={
                    selectedIndex >= 0 && selectedIndex === index
                      ? styles['menu-item']
                      : ''
                  }
                  onClick={() => handleSingleSelect(option.code)}
                  aria-selected={option.code === value}
                >
                  {option.code}
                  <span
                    className={styles['list-description']}
                  >{`${option.city}, ${option.country}`}</span>
                </li>
              ))
            ) : (
              <div className={styles['no-select']}>
                <i>No matching location</i>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
