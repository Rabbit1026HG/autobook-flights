import { Badge } from '@shared/ui/Badge/Badge';
import clsx from 'clsx';
import { FC } from 'react';
import styles from './ClassInfo.module.scss';
import PointIcon from '@shared/icons/24/point-heavy.svg?react';
import Checkmark from '@shared/icons/24/check heavy.svg?react';
interface ClassInfoProps {
  className?: string;
  title: 'Business' | 'Economy';
  description: string;
  img: string;
  pros: string[];
  selected?: boolean;
}
export const ClassInfo: FC<ClassInfoProps> = ({
  className,
  pros,
  title,
  description,
  img,
  selected,
}) => {
  return (
    <div className={clsx(styles['class-info'], className)}>
      <div className={styles['image']}>
        <img src={img} alt={title} loading="lazy" />
      </div>
      <div className={styles['info']}>
        <div className={styles['title']}>
          <h4>{title}</h4>
          {selected && <Badge className={styles['selected']}>Selected</Badge>}
        </div>
        <p className={styles['description']}>{description}</p>
        <span className={clsx(styles['divider'], styles[title])}></span>
        <ul className={styles['pros']}>
          {pros.map((pro, index) => (
            <li key={title + index}>
              <span className={clsx(styles['point'], styles[title])}>
                {title === 'Business' ? <Checkmark /> : <PointIcon />}
              </span>
              {pro}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
