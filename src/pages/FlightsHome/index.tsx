import { FlightHero } from '@features/flights/FlightHero/FlightHero';
import { Reviews } from '@features/Reviews/Reviews';
import {  flightDeals1, topFlightDeal } from '@shared/data';
import { CardRow } from '@shared/ui/Card/CardRow/CardRow';
import { RowTitle } from '@shared/ui/RowTitle/RowTitle';
import styles from './style.module.scss';
import { Card } from '@shared/ui/Card/Card/Card';
export const FlightsHome = () => {
  return (
    <>
      <FlightHero />
      <div className="page-container">
        <div className={styles['section']}>
          <h3 className={styles['main-title']}>HOW IT WORKS</h3>
          <div className={styles['main-description']}>
            Autobook Flights takes the hassle out of finding low fares by
            monitoring prices and auto-booking once your target is met. Simply
            set a price sit back and let our automated flight booking service
            secure the best deals on airface for you. Explore the simpleness of
            having your desired flights auto-booked with ease.
          </div>
          <div className={styles['description-container']}>
            <div>
              <h3 className={styles['title']}>1. FIND A FLIGHT</h3>
              <div className={styles['description']}>
                Use our robust and powerful search to find a flight for your
                upcoming trip
              </div>
            </div>
            <div>
              <h3 className={styles['title']}>2. NAME YOUR PRICE</h3>
              <div className={styles['description']}>
                Set your price and cancel by date
              </div>
            </div>
            <div>
              <h3 className={styles['title']}>3. WAIT & SAVE</h3>
              <div className={styles['description']}>
                Sit back & relax while we keep an eye on your desired flight and
                auto-book for you when your criteria is met
              </div>
            </div>
          </div>
        </div>       
        <CardRow
          title={
            <RowTitle
              info="Flights recently"
              span="autobooked by customers"
              color="var(--brand-color)"
            />
          }
          cards={flightDeals1}
          viewAllUrl="/flights"
        />
        <Card {...topFlightDeal} style={{ marginBottom: '40px' }} />
        <Reviews />
      </div>
    </>
  );
};
