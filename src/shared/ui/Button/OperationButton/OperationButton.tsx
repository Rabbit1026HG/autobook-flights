import IncrementIcon from '@shared/icons/32/plus.svg?react';
import DecrementIcon from '@shared/icons/32/minus.svg?react';
import { FC } from 'react';
import './OperationButton.scss';
interface OperationButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant: 'increment' | 'decrement';
}
export const OperationButton: FC<OperationButtonProps> = ({
  variant,
  ...other
}) => {
  return (
    <button {...other} className="op-button" type="button">
      {variant === 'increment' ? <IncrementIcon /> : <DecrementIcon />}
    </button>
  );
};
