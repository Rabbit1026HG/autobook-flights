import { FC, useState, useEffect } from 'react';
import logo from '@shared/logos/logo.png';
import MenuIcon from '@shared/icons/32/menu.svg?react';
import CloseIcon from '@shared/icons/32/x close no.svg?react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { Button } from '@shared/ui/Button';
import { Modal } from '@shared/ui/Modal/Modal';
import { SignUp } from '@features/auth/Signup/SignUp';
import clsx from 'clsx';
import useWindowWidth from '@hooks/useWindowWidth';
import { SignIn } from '@features/auth/SignIn/SignIn';
import useApi from '@hooks/useApi';
import { useAuth } from '@hooks/useAuth';

interface HeaderProps {
  className?: string;
  variant?: 'full' | 'basic';
}

export const Header: FC<HeaderProps> = ({ className, variant }) => {
  const { token } = useAuth();
  const { Logout } = useApi();
  const windowWidth = useWindowWidth();
  const [showAuthSignInDialog, setShowAuthSignInDialog] = useState(false);
  const [showAuthSignUpDialog, setShowAuthSignUpDialog] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (windowWidth > 768) {
      setShowMenu(false);
    }
  }, [windowWidth]);

  return (
    <header className={clsx(styles.header, className, styles[variant || ''])}>
      <div>
        <MenuIcon
          className={styles['menu-icon']}
          onClick={() => setShowMenu((prev) => !prev)}
        />
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="logo" loading="lazy" />
        </Link>
      </div>
      <ul className={styles.nav}>
        <li>
          <Link to="/flights">Flights</Link>
        </li>
        {token && (
          <>
            <div className={styles.avatar} onClick={() => Logout()}>
              <img src="/images/avatar.png" alt="" loading="lazy" />
            </div>
          </>
        )}
        {!token && (
          <>
            <li>
              <Link to="" onClick={() => setShowAuthSignInDialog(true)}>
                Sign in
              </Link>
            </li>
            <Button size="sm" onClick={() => setShowAuthSignUpDialog(true)}>
              Sign up
            </Button>
          </>
        )}
      </ul>
      <Modal opened={showAuthSignInDialog} setOpened={setShowAuthSignInDialog}>
        <SignIn setOpen={setShowAuthSignInDialog} />
      </Modal>
      <Modal opened={showAuthSignUpDialog} setOpened={setShowAuthSignUpDialog}>
        <SignUp setOpen={setShowAuthSignUpDialog} />
      </Modal>
      {showMenu && (
        <div className={styles['mobile-menu']}>
          <div
            className={styles['close-button']}
            onClick={() => setShowMenu(false)}
          >
            <CloseIcon />
          </div>
          <ul>
            <li>
              <Link to="/flights" onClick={() => setShowMenu(false)}>
                Flights
              </Link>
            </li>
            {token && (
              <>
                <li>
                  <Link to="/profile" onClick={() => setShowMenu(false)}>
                    Profile
                  </Link>
                </li>
              </>
            )}
            {!token && (
              <>
                <li>
                  <Link
                    to=""
                    onClick={() => {
                      setShowAuthSignInDialog(true);
                      setShowMenu(false);
                    }}
                  >
                    Sign in
                  </Link>
                </li>
                <Button
                  size="lg"
                  onClick={() => {
                    setShowAuthSignUpDialog(true);
                    setShowMenu(false);
                  }}
                >
                  Sign up
                </Button>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};
