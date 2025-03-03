import Button from '@shared/ui/Button';
import styles from './UpgradeSeat.module.scss';
import { FC } from 'react';
interface UpgradeSeatProps {
  onConfirm: () => void;
  onCancel: () => void;
}
const UpgradeSeat: FC<UpgradeSeatProps> = ({ onCancel, onConfirm }) => {
  return (
    <div className={styles['upgrade-seat']}>
      <h3>Upgrade seat</h3>
      <p>
        Upgrade your seat for only $199, and enjoy 45 percent more leg room, and
        seats that recline 40 percent more than economy.
      </p>
      <div className={styles['actions']}>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Upgrade for $199</Button>
      </div>
    </div>
  );
};

export default UpgradeSeat;
