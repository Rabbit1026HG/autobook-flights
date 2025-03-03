import { FC } from 'react';
import styles from './RangeSlider.module.scss';
interface RangeSliderProps {
  min?: number;
  max?: number;
  val?: number;
  getVal: (val: number) => void;
  state?: boolean;
}

export const RangeSlider: FC<RangeSliderProps> = ({
  min,
  max,
  val,
  getVal,
  state,
}) => {
  return (
    <div>
      {state ? (
        <div className={styles['slider-value']}>
          {val === max ? 'All prices' : `up to $${val}`}
        </div>
      ) : (
        <div className={styles['slider-value']}>
          Flight duration {val === max ? 'Any' : `Under ${val} hr`}
        </div>
      )}
      <input
        type="range"
        onChange={(e) => getVal(Number(e.target.value))}
        value={val}
        min={min}
        max={max}
        className={styles['range-slider-1']}
      />
    </div>
  );
};
