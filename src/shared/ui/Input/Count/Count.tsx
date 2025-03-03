import { FC } from 'react';
import styles from './Count.module.scss';
import { OperationButton } from '@shared/ui/Button/OperationButton/OperationButton';

interface CountProps {
  name?: string;
  value?: number;
  getNewValue?: (val: number) => void;
}

export const Count: FC<CountProps> = ({ name, value = 0, getNewValue }) => {
  return (
    <div className={styles['list-item']}>
      <span className={styles['name']}>{name}</span>
      <div>
        <OperationButton
          variant="decrement"
          onClick={() => {
            getNewValue && getNewValue(value - 1 < 0 ? 0 : value - 1);
          }}
        />
        <span className={styles['value']}>{value}</span>
        <OperationButton
          variant="increment"
          onClick={() => {
            getNewValue && getNewValue(value + 1);
          }}
        />
      </div>
    </div>
  );
};
