import React from 'react';
import './ToggleButton.scss';

interface ToggleButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ ...other }) => {
  return (
    <div className="toggle-button">
      <input type="checkbox" id="toggle" {...other} />
      <label htmlFor="toggle"></label>
    </div>
  );
};

export default ToggleButton;
