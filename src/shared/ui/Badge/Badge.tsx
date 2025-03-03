import clsx from 'clsx';
import { FC } from 'react';
import './Badge.scss';
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'green' | 'orange' | 'red';
  contrast?: boolean;
  className?: string;
}
export const Badge: FC<BadgeProps> = ({
  children,
  color,
  contrast,
  className,
  ...other
}) => {
  return (
    <div
      className={clsx(className, 'badge', color, contrast && 'contrasted')}
      {...other}
    >
      {children}
    </div>
  );
};
