import style from './AuthMenu.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export default function AuthMenu({
  isOpen,
  onClose,
  onLogin,
  onRegister,
  isLoggedIn,
}) {
  const NavLinkActiveClass = ({ isActive }) =>
    clsx(style.link, isActive && style.active);

  return (
    <div
      className={`${style.overlay} ${isOpen ? style.open : ''}`}
      onClick={onClose}
    >
      <div
        className={`${style.menu} ${isOpen ? style.open : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🔹 Кнопка закриття */}
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
              <button className={style.btnLogIn} onClick={onLogin}>
                <svg className={style.iconLogIn} width="20" height="20">
                  <use href="/sprite.svg#icon-log-in-01" />
                </svg>
                Log in
              </button>
              <button className={style.btnRegistration} onClick={onRegister}>
                Registration
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
