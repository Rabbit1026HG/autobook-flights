import { FC } from 'react';
import styles from './PriceInfo.module.scss';

export const PriceInfo: FC = () => {
  return (
    <div className={styles['price-info']}>
      <h3>Price breakdown</h3>
      <div className={styles['price-info-item']}>
        <div>Departing Flight</div>
        <div>$ 251.50</div>
      </div>
      <div className={styles['price-info-item']}>
        <div>Arriving Flight</div>
        <div>$ 251.50</div>
      </div>
      <div className={styles['price-info-item']}>
        <div>Baggage fees</div>
        <div>$ 0</div>
      </div>
      <div className={styles['price-info-item']}>
        <div>Seat upgrade (business)</div>
        <div>$199</div>
      </div>
      <div className={styles['price-info-item']}>
        <div>Subtotal</div>
        <div>$702</div>
      </div>
      <div className={styles['price-info-item']}>
        <div>Taxes (24%)</div>
        <div>$168.48</div>
      </div>
      <div className={styles['total-price']}>
        <div>Auto Book Amount Authorized</div>
        <div>$798</div>
      </div>
    </div>
  );
};
