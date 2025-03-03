import { FC, HTMLAttributes, useState } from 'react';
import styles from './ConfirmCard.module.scss';
import clsx from 'clsx';
import CloseIcon from '@shared/icons/32/x close no.svg?react';

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  description: string;
}
export const ConfirmCard: FC<CardProps> = ({ description }) => {
  const [isActive, setIsActive] = useState(true);

  if (!isActive) return null;
  return (
    <div className={clsx('confirm-card', styles['confirm-card'])}>
      <p>{description}</p>
      <div
        className={styles['close-button']}
        onClick={() => setIsActive(false)}
      >
        <CloseIcon />
      </div>
    </div>
  );
};
