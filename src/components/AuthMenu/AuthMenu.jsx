import style from './AuthMenu.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../redux/auth/operations';

export default function AuthMenu({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  isLoggedIn,
}) {
  const NavLinkActiveClass = ({ isActive }) =>
    clsx(style.link, isActive && style.active);

  const dispatch = useDispatch();
  const location = useLocation();
  const prevPathnameRef = useRef(location.pathname);

  useEffect(() => {
    if (isOpen && prevPathnameRef.current !== location.pathname) {
      onClose();
    }
    prevPathnameRef.current = location.pathname;
  }, [location.pathname, isOpen, onClose]);

  const handleOverlayClick = () => {
    if (onClose) onClose();
  };

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <div
      className={`${style.overlay} ${isOpen ? style.open : ''}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`${style.menu} ${isOpen ? style.open : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={style.closeBtn} onClick={onClose}>
          <svg className={style.closeIcon} width="32" height="32">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        <div className={style.container}>
          <nav className={style.nav}>
            <NavLink to="/" className={NavLinkActiveClass}>
              Home
            </NavLink>
            <NavLink to="/teachers" className={NavLinkActiveClass}>
              Teachers
            </NavLink>
            {isLoggedIn && (
              <NavLink to="/favorites" className={NavLinkActiveClass}>
                Favorites
              </NavLink>
            )}
          </nav>

          {!isLoggedIn && (
            <div className={style.btnContainer}>
              <button
                className={style.btnLogIn}
                onClick={() => {
                  onClose();
                  onLogin();
                }}
              >
                <svg className={style.iconLogIn} width="20" height="20">
                  <use href="/sprite.svg#icon-log-in-01" />
                </svg>
                Log in
              </button>
              <button
                className={style.btnRegistration}
                onClick={() => {
                  onClose();
                  onRegister();
                }}
              >
                Registration
              </button>
            </div>
          )}

          {isLoggedIn && (
            <button
              className={style.btnLogOut}
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
