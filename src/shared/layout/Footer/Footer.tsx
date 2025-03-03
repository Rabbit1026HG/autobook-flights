import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.scss';
import logo from '@shared/logos/logo.png';
import TwitterIcon from '@shared/icons/24/twitter.svg?react';
import InstgramIcon from '@shared/icons/24/instagram.svg?react';
import FacebookIcon from '@shared/icons/24/facebook.svg?react';

const aboutList = [
  { title: 'About Autobookflights', link: '/' },
  { title: 'How it works', link: '/' },
];
// const partnerList = [
//   { title: 'Partnership programs', link: '/' },
//   { title: 'Affiliate program', link: '/' },
//   { title: 'Connectivity partners', link: '/' },
//   { title: 'Promotions and events', link: '/' },
//   { title: 'Integrations', link: '/' },
//   { title: 'Community', link: '/' },
//   { title: 'Loyalty program', link: '/' },
// ];
const supportList = [
  { title: 'Help Center', link: '/' },
  { title: 'Contact us', link: '/' },
  { title: 'Privacy policy', link: '/' },
  { title: 'Terms of service', link: '/' },
  { title: 'Trust and safety', link: '/' },
  { title: 'Accessibility', link: '/' },
];
export const Footer = () => {
  const location = useLocation();

  if (location.pathname.includes('/select-seats')) return null;

  return (
    <footer className={styles['footer']}>
      <div className={styles['top-container']}>
        {' '}
        <div className={styles['logo']}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className={styles['about']}>
          <p className={styles['title']}>About</p>
          {aboutList.map((item, index) => {
            return (
              <div className={styles['link']} key={'about' + index}>
                <Link to={item.link}>{item.title}</Link>
              </div>
            );
          })}
        </div>
        <div className={styles['support']}>
          <p className={styles['title']}>Support</p>
          {supportList.map((item, index) => {
            return (
              <div className={styles['link']} key={'support' + index}>
                <Link to={item.link}>{item.title}</Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles['bottom-container']}>
        <div className={styles['social']}>
          <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
            <TwitterIcon />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <InstgramIcon />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <FacebookIcon />
          </a>
        </div>
        <p className={styles['copyright']}>
          © {new Date().getFullYear()} Autobookflights incorporated
        </p>
      </div>
    </footer>
  );
};
