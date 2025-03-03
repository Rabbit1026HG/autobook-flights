import { FC, HTMLAttributes } from 'react';
import { Header } from './Header/Header';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import { Footer } from './Footer/Footer';
import { useScrollToTop } from '@hooks/useScrollToTop';
import { useLocation } from 'react-router-dom';
interface LayoutProps extends HTMLAttributes<HTMLDivElement> {}
export const Layout: FC<LayoutProps> = () => {
  const location = useLocation();
  useScrollToTop();
  const isSelectionSeats = location.pathname.includes('/select-seats');

  return (
    <div>
      <Header variant={isSelectionSeats ? 'basic' : 'full'} />
      <div className={styles.container}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
