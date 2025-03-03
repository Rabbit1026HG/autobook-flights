import clsx from 'clsx';
import { FC } from 'react';
import './Popover.scss';
interface PopoverProps extends React.HTMLAttributes<HTMLLIElement> {
  value?: string;
}
export const Popover: FC<PopoverProps> = ({
  className,
  children,
  ...other
}) => {
  return (
    <li
      className={clsx('popover', className)}
      {...other}
      role="option"
      tabIndex={0}
    >
      {children}
    </li>
  );
};
