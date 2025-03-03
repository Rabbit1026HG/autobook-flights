import React, { FC } from 'react';
import './CheckBox.scss';
import clsx from 'clsx';
interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: 'mixed';
}
const CheckBox: FC<CheckBoxProps> = ({ label, variant, ...other }) => {
  return (
    <label className={clsx('checkbox-container', variant)} htmlFor={other.id}>
      <input type="checkbox" {...other} />
      <span className="checkbox"></span>
      {label && <span className="label">{label}</span>}
    </label>
  );
};

export default CheckBox;
