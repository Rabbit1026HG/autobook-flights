import clsx from 'clsx';
import { FC } from 'react';
import './Pill.scss';
import ChevronDown from '@shared/icons/18/chevron down.svg?react';
import ChevronUp from '@shared/icons/18/chevron up.svg?react';
import { Icon } from '@iconify/react/dist/iconify.js';
interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rounded' | 'square' | 'selected';
  opened?: boolean;
  disabled?: boolean;
  cross?: boolean;
  crossClick?: () => void;
}
const Pill: FC<PillProps> = ({
  variant,
  opened,
  disabled,
  children,
  cross,
  crossClick,
  ...other
}) => {
  return (
    <div
      className={clsx('pill-chit', variant)}
      aria-disabled={disabled}
      tabIndex={0}
    >
      <span className="text" {...other}>
        {children}
      </span>
      {cross ? (
        <Icon
          onClick={crossClick}
          icon="radix-icons:cross-2"
          width="20"
          height="20"
        />
      ) : (
        <span className="icon" {...other}>
          {opened ? <ChevronUp /> : <ChevronDown />}
        </span>
      )}
    </div>
  );
};

export default Pill;
