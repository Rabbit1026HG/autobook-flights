import { FC, HTMLAttributes } from 'react';
import styles from './CardRow.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import ArrowRightIcon from '@shared/icons/32/arrowRight.svg?react';
import { Card } from '../Card/Card';
import Button from '../../Button';

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode | string;
  viewAllUrl?: string;
  viewAllBottomButton?: string;
  cards: {
    img: string;
    title: React.ReactNode | string;
    description: string;
    saturation?: boolean;
    price?: number;
  }[];
}
export const CardRow: FC<CardProps> = ({
  title,
  className,
  viewAllUrl,
  viewAllBottomButton,
  cards,
  ...other
}) => {
  return (
    <div className={clsx(styles['card-row'], className)} {...other}>
      <div className={styles['header']}>
        <h3 className={styles['title']}>{title}</h3>
        <Link
          className={clsx('view-all', styles['view-all'])}
          to={viewAllUrl || '/'}
        >
          <span>All</span>
          <ArrowRightIcon />
        </Link>
      </div>
      <div className={styles.container}>
        {cards.map((card, index) => (
          <Card {...card} key={index} />
        ))}
      </div>
      {viewAllBottomButton && (
        <Link to={viewAllUrl || '/'}>
          <Button size='lg' variant='primary' type='button'>
            {viewAllBottomButton}
          </Button>
        </Link>
      )}
    </div>
  );
};
