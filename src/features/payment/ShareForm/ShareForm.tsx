import { TextField } from '@shared/ui/Input';
import styles from './ShareForm.module.scss';
import Button from '@shared/ui/Button';

const ShareForm = () => {
  return (
    <div className={styles['share-form']}>
      <h3>Share your travel itinerary</h3>
      <p>
        You can email your itinerary to anyone by entering their email address
        here.
      </p>
      <TextField type="text" placeholder="Email address" />
      <TextField type="text" placeholder="Email address" />
      <TextField type="text" placeholder="Email address" />
      <div className={styles['button-group']}>
        <Button type="submit" variant="primary">
          Email itinerary
        </Button>
        <Button variant="secondary">Add another</Button>
      </div>
    </div>
  );
};

export default ShareForm;
