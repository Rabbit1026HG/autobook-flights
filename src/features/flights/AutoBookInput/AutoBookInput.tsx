import styles from './AutoBookInput.module.scss';
import { TextField } from '@shared/ui/Input';
import { DatePickerOne } from '@shared/ui/Input/DatePicker/DatePickerOne';
import InformationIcon from '@shared/icons/18/information.svg?react';
import MoneyPriceCostIcon from '@shared/icons/32/money-price-cost.svg?react';
import { FC } from 'react';
import { Tooltip } from 'react-tooltip';
// import { useNavigate } from 'react-router-dom';

interface AutoBookInputProps {
  price: string;
  getPrice: (price: string) => void;
  date: string[];
  getDate: (dates: string[]) => void;
}
export const AutoBookInput: FC<AutoBookInputProps> = ({
  price,
  date,
  getDate,
  getPrice,
}) => {
  return (
    <div className={styles['autobook-wrapper']}>
      <div>
        <Tooltip id="my-tooltip" style={{ zIndex: 1000 }} />
        <h5 className={styles['autobook-label']}>
          AutoBook price
          <InformationIcon
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Input the price you want to pay for your autobook order."
            data-tooltip-place="top"
          />
        </h5>
        <div>
          <TextField
            placeholder="Autobook Price"
            startIcon={<MoneyPriceCostIcon />}
            type="number"
            required
            id={'emergency-firstName'}
            name="firstName"
            autoComplete="off"
            value={price}
            onChange={(e) => getPrice(e.target.value)}
          />
        </div>
      </div>
      <div>
        <h5 className={styles['autobook-label']}>
          Cancel Date
          <InformationIcon
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Input the date by which we should cancel your autobook order if your price is not reached"
            data-tooltip-place="top"
          />
        </h5>
        <DatePickerOne
          type="single"
          selectedDates={date}
          getSelectedDates={getDate}
        />
      </div>
    </div>
  );
};
