import { Badge } from '@shared/ui/Badge/Badge';
import styles from './PriceRating.module.scss';
export const PriceRating = () => {
  return (
    <div className={styles['price-rating']}>
      <div>
        <h4 className={styles['title']}>Price rating</h4>
        <Badge color="green">Buy soon</Badge>
      </div>
      <div>
        <p>
          We recommend booking soon. The average cost of this flight is $750,
          but could rise 18% to $885 in two weeks.
        </p>
        <p>
          Autobookflights analyzes thousands of flights, prices, and trends to
          ensure you get the best deal.
        </p>
      </div>
    </div>
  );
};
