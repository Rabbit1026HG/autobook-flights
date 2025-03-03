import { FC } from 'react';
import './ToggleSwitch.scss';
import clsx from 'clsx';
interface ToggleSwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
const ToggleSwitch: FC<ToggleSwitchProps> = ({ label, ...other }) => {
  return (
    <label
      className={clsx('toggle-switch', other.disabled && 'disabled')}
      htmlFor={other.id}
    >
      <input type="checkbox" {...other} />
      <span className="slider"></span>
      {label && <span className="label">{label}</span>}
    </label>
  );
};

export default ToggleSwitch;
