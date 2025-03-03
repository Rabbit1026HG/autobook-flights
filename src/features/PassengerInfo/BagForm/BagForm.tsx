import { Count } from '@shared/ui/Input/Count/Count';
import styles from './BagForm.module.scss';
import { FC, useState } from 'react';
import { Passenger } from '@shared/types';
interface BagFormProps {
  passengers: Passenger[];
  values?: number[];
  getValues: (values: number[]) => void;
}
export const BagForm: FC<BagFormProps> = ({
  passengers,
  values,
  getValues,
}) => {
  const [bags, setBags] = useState<number[]>(values || []);
  return (
    <form className={styles['bag-form']}>
      <h4>Bag information</h4>
      <p>
        Each passenger is allowed one free carry-on bag and one personal item.
        First checked bag for each passenger is also free. Second bag check fees
        are waived for loyalty program members. See the{' '}
        <a href="/" target="_blank">
          full bag policy
        </a>
        .
      </p>
      <ul className={styles['list']}>
        {passengers.map((passenger, i) => (
          <li key={i} className={styles['list-item']}>
            <div>
              <h4>{`Passenger ${i + 1}`}</h4>
              <h4>Checked bags</h4>
            </div>
            <div>
              <h4>{`${passenger.firstName} ${passenger.lastName}`}</h4>
              <Count
                value={bags[i] || 0}
                getNewValue={(value) => {
                  bags[i] = value;
                  setBags([...bags]);
                  getValues(bags);
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </form>
  );
};
