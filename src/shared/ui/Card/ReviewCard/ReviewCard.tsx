import { FC } from "react";
import StarRow from "@shared/icons/24/star-unfilled.svg?react";
import StarFilled from "@shared/icons/24/star-filled.svg?react";
import StarHalf from "@shared/icons/24/star-half-filled.svg?react";
import clsx from "clsx";
import styles from "./ReviewCard.module.scss";
import { Link } from "react-router-dom";
interface ReviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar: string;
  name: string;
  address: string;
  date: string;
  stars: number;
  review: string;
  url?: string;
}
export const ReviewCard: FC<ReviewCardProps> = ({
  avatar,
  name,
  date,
  address,
  stars,
  review,
  url,
  className,
  ...other
}) => {
  return (
    <div {...other} className={clsx(styles["review-card"], className)}>
      <div className={styles["avatar"]}>
        <img src={avatar} alt={name} loading="lazy" />
      </div>
      <div className={styles["review-content"]}>
        <h4>{name}</h4>
        <p>
          {address}
          <span> | </span>
          {date}
        </p>
        <div className={styles["stars"]}>
          {[...Array(5)].map((_, index) => {
            const starId = index + 1;
            if (starId <= stars) {
              return (
                <StarFilled key={index} className={styles["star-filled"]} />
              );
            }
            if (starId - stars < 1) {
              return <StarHalf key={index} className={styles["star-half"]} />;
            }
            return <StarRow key={index} className={styles["star-row"]} />;
          })}
        </div>
        <p className={styles["review"]}>
          {review.slice(0, 204)}{" "}
          {review.length > 170 && url && <Link to={url}>read more...</Link>}
        </p>
      </div>
    </div>
  );
};
