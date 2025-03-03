import flightImage from '/images/flightRoute.png';
import styles from './FlightRoute.module.scss';

const FlightRoute = () => {
  return (
    <div className={styles['flight-route-container']}>
      <img src={flightImage} alt="Flight Route" />
    </div>
  );
};

export default FlightRoute;
