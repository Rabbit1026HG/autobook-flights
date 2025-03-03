import { FlightSearchBar } from '@features/flights/FlightSearchBar/FlightSearchBar';
import styles from './FlightHero.module.scss';
export const FlightHero = () => {
  return (
    <div className="page-container">
      <div className={styles.hero}>
        <p className={styles['hero-text']}>
          It’s more than
          <br /> just a trip
        </p>
        <FlightSearchBar />
      </div>
    </div>
  );
};
