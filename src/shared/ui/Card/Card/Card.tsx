import { FC, HTMLAttributes } from 'react';
import styles from './Card.module.scss';
import clsx from 'clsx';
interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  img: string;
  departure: string;
  destination: string;
  oprice: number;
  price: number;
  saturation?: boolean;
}
export const Card: FC<CardProps> = ({
  // img,
  className,
  departure,
  oprice,
  price,
  destination,
  // saturation,
  ...other
}) => {
  return (
    <div className={clsx('card', styles.card, className)} {...other}>
      {/* <img
        src={img}
        alt=""
        loading="lazy"
        style={{ filter: saturation ? 'saturate(1.7)' : 'none' }}
      /> */}
      <div className={clsx('text', styles['text'])}>
        <div className={styles['place-text']}>
          {`${departure} to ${destination}`}
        </div>
        <div className={styles['header-text']}>
          <div>
            Original price: <span className={styles['oprice']}>${oprice}</span>
          </div>
          <div>
            Autobook price: <span className={styles['price']}>${price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
