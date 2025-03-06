import { FC, HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.scss';
import clsx from 'clsx';
interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  img: string;
  title: ReactNode | string;
  description: string;
  price?: number;
  saturation?: boolean;
  spanColor?: string;
}
export const Card: FC<CardProps> = ({
  img,
  title,
  description,
  className,
  price,
  saturation,
  ...other
}) => {
  return (
    <div className={clsx('card', styles.card, className)} {...other}>
      <img
        src={img}
        alt=''
        loading='lazy'
        style={{ filter: saturation ? 'saturate(1.7)' : 'none' }}
      />
      <div className={clsx('text', styles['text'])}>
        <div className={clsx('header-text', styles['header-text'])}>
          <h4 className={styles['title']}>{title}</h4>
          {price && <h4 className={styles['price']}>${price}</h4>}
        </div>
        <p className={clsx('description', styles['description'])}>
          {description}
        </p>
      </div>
    </div>
  );
};
