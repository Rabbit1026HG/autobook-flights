import { FC, HTMLAttributes, useRef, useState } from 'react';
import { TextField } from '..';
import styles from './PlaceListTest.module.scss';
import clsx from 'clsx';
import useFocusOut from '@hooks/useFocusOut';
import ChevronDown from '@shared/icons/18/chevron down.svg?react';
import BackIcon from '@shared/icons/32/arrowLeft.svg?react';
import ChevronUp from '@shared/icons/18/chevron up.svg?react';
import data from '@shared/json/airportData.json';
import useWindowWidth from '@hooks/useWindowWidth';
interface PlaceListTestProps extends HTMLAttributes<HTMLDivElement> {
  value?: string | string[];
  getSelected: (selected: string | string[]) => void;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  placeholder?: string;
  name?: string;
}
export const PlaceListTest: FC<PlaceListTestProps> = ({
  value,
  getSelected,
  className,
  required,
  disabled,
  startIcon,
  placeholder,
  name,
  ...other
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectValue, setSelectValue] = useState(value);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const maxWidth = useWindowWidth();
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
    required,
    disabled,
    startIcon,
    placeholder,
    name,
  };
  const handleSingleSelect = (option: string) => {
    getSelected(option);
    setSelectedIndex(-1);
    setMenuOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValue(e.target.value);
    setSelectedIndex(-1);
  };

  const findAirportCodes = (prefix: string | string[] | undefined) => {
    if (prefix === '') return [];
    const regex = new RegExp(`^${prefix}`, 'i'); // Case-insensitive search

    return data
      .filter((airport) => {
        let score = 0;

        if (prefix?.length === 3 && regex.test(airport.code)) {
          score += 3; // Highest priority
        }

        if (regex.test(airport.city + ', ' + airport.country)) {
          score += 2; // Medium priority
        }

        // Increase score for matching country only
        if (regex.test(airport.country)) {
          score += 1; // Lowest priority
        }

        return score > 0;
      })
      .sort((a, b) => {
        const scoreA =
          (prefix?.length === 3 && regex.test(a.code) ? 3 : 0) +
          (regex.test(a.city + ', ' + a.country) ? 2 : 0) +
          (regex.test(a.country) ? 1 : 0);
        const scoreB =
          (prefix?.length === 3 && regex.test(b.code) ? 3 : 0) +
          (regex.test(b.city + ', ' + b.country) ? 2 : 0) +
          (regex.test(b.country) ? 1 : 0);

        return scoreB - scoreA; // Sort in descending order
      })
      .slice(0, 10); // Get first 10 matches
  };

  const filteredCodes = findAirportCodes(selectValue);

  let placeholderText = '';
  if (filteredCodes.length && selectValue) {
    const regex1 = new RegExp(`^${selectValue}`, 'i');
    const firstMatch =
      selectedIndex < 0 ? filteredCodes[0] : filteredCodes[selectedIndex];

    placeholderText = regex1.test(firstMatch.city + ', ' + firstMatch.country)
      ? (firstMatch.city + ', ' + firstMatch.country).slice(
          typeof selectValue === 'string' ? selectValue.length : 0,
        )
      : '';
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
        getSelected(filteredCodes[selectedIndex].city); // Set input to the selected value
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
        onClick={() => {
          setMenuOpen(true);
          setSelectValue(value);
        }}
        value={value}
        readOnly
        endIcon={menuOpen ? <ChevronUp /> : <ChevronDown />}
      />
      {menuOpen && (
        <div className={styles['ul-container']} ref={menuRef}>
          <TextField
            className={styles['select-list-textfield']}
            {...TextFieldProps}
            value={selectValue}
            startIcon={
              maxWidth > 768 ? (
                startIcon
              ) : (
                <BackIcon onClick={() => setMenuOpen(false)} />
              )
            }
            disValue={typeof selectValue === 'string' ? selectValue : ''}
            preValue={placeholderText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoFocus
            overMode={placeholderText ? 'true' : 'false'}
          />
          <ul className={styles['select-list-menu']} ref={listRef}>
            {filteredCodes.length ? (
              filteredCodes.map((option, index) => (
                <li
                  key={index}
                  className={
                    selectedIndex >= 0 && selectedIndex === index
                      ? styles['menu-item']
                      : ''
                  }
                  onClick={() => handleSingleSelect(option.city)}
                  aria-selected={option.code === value}
                >
                  {`${option.city}, ${option.country}`}
                  <span className={styles['list-description']}>
                    {option.code}
                  </span>
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
