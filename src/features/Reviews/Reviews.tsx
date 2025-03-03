import { ReviewCard } from '@shared/ui/Card/ReviewCard/ReviewCard';
import styles from './Reviews.module.scss';
export const Reviews = () => {
  return (
    <div className={styles['reviews']}>
      <h3 className={styles['title']}>
        What <span>Autobookflights</span> users are saying
      </h3>
      <div className={styles['container']}>
        <ReviewCard
          avatar="images/1.png"
          name="Yifei Chen"
          address="Seoul, South Korea"
          date="June 2023"
          stars={4}
          review="What a great experience using Autobookflights! I booked all of my flights for my gap year through Autobookflights and never had any issues. When I had to cancel a flight because of an emergency, Autobookflights support helped me read more..."
          url={'/reviews/yifei-chen'}
        />
        <ReviewCard
          avatar="images/2.png"
          name="Kaori Yamaguchi"
          address="Honolulu, Hawaii"
          date="Jan 2024"
          stars={4.5}
          review="My family and I visit Hawaii every year, and we usually book our flights using other services. Autobookflights was recommened to us by a long time friend, and I’m so glad we tried it out! The process was easy and simple"
          url={'/reviews/kaori-yamaguchi'}
        />
        <ReviewCard
          avatar="images/13.png"
          name="Anthony Lewis"
          address="Berlin, Germany"
          date="April 2023"
          stars={5}
          review="When I was looking to book my flight to Berlin from LAX, Autobookflights had the best browsing experiece so I figured I’d give it a try. It was my first time using Autobookflights, but I’d definitely recommend it to a friend and use it for my next trip!"
          url={'/reviews/anthony-lewis'}
        />
      </div>
    </div>
  );
};
