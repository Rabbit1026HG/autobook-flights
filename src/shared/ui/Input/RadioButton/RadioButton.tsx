import { FC } from 'react';
interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
import './RadioButton.scss';
const RadioButton: FC<RadioButtonProps> = ({ label, ...other }) => {
  return (
    <label className="radio-button-container" htmlFor={other.id}>
      <input type="radio" {...other} />
      <span className="radio-button"></span>
      {label && <span className="label">{label}</span>}
    </label>
  );
};

export default RadioButton;
