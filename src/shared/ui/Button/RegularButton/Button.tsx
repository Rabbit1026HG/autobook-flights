import clsx from 'clsx';
import { FC } from 'react';
import './Button.scss';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'tertiary';
  state?: 'active' | 'error';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export const Button: FC<ButtonProps> = ({
  size = 'md',
  variant = 'primary',
  children,
  leftIcon,
  rightIcon,
  state,
  type,
  className,
  ...other
}) => {
  return (
    <button
      className={clsx('button', variant, size, state, className)}
      {...other}
      type={type}
    >
      {leftIcon && <span className="button-icon">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="button-icon">{rightIcon}</span>}
    </button>
  );
};
