import { FC, HTMLAttributes, useRef, useState } from 'react';

import styles from './SortList.module.scss';
import clsx from 'clsx';
import useFocusOut from '@hooks/useFocusOut';
import SortListIcon from '@shared/icons/32/sort.svg?react';
interface SortListProps extends HTMLAttributes<HTMLDivElement> {
  options: string[];
  value?: string | string[];
  getSelected: (selected: string | string[]) => void;
}
export const SortList: FC<SortListProps> = ({
  options,
  value,
  getSelected,
  className,
  ...other
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useFocusOut(menuRef, () => setMenuOpen(false));
  const handleSingleSelect = (option: string) => {
    getSelected(option);
    setMenuOpen(false);
  };

  return (
    <div
      className={clsx(styles['select-list-container'], className)}
      {...other}
    >
      <div
        className={styles['sortItem']}
        onClick={() => setMenuOpen((old) => !old)}
      >
        Sort by: <SortListIcon width={22} height={22} />
      </div>
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
