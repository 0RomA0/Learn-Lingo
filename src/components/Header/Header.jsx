import style from './Header.module.css';
import { Link, NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { useState } from 'react';
import LoginModal from '../LogInModal/LogInModal';
import RegistrationModal from '../RegistrationModal/RegistrationModal';
import UserMenu from '../UserMenu/UserMenu';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import AuthMenu from '../AuthMenu/AuthMenu';

export default function Header() {
  const [openModalLogIn, setOpenModalLogIn] = useState(false);
  const [openModalRegistration, setOpenModalRegistration] = useState(false);
  const [openAuthMenu, setOpenAuthMenu] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const NavLinkActiveClass = ({ isActive }) => {
    return clsx(style.link, isActive && style.active);
  };

  const heandlerClickLogIn = () => {
    setOpenModalLogIn(true);
  };

  const heandlerClickRegistration = () => {
    setOpenModalRegistration(true);
  };

  const closeModal = () => {
    setOpenModalLogIn(false);
    setOpenModalRegistration(false);
  };

  return (
    <>
      <header className={style.header}>
        <div className={style.navContainer}>
          <div className={style.leftSlide}>
            <Link to="/" className={style.logo}>
              <svg width="28" height="28">
                <use href="/sprite.svg#icon-ukraine" />
              </svg>
              <p className={style.textHeader}>LearnLingo</p>
            </Link>

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
          </div>

          <div className={style.btnContainer}>
            {isLoggedIn && user?.name ? (
              <UserMenu user={user} />
            ) : (
              <>
                <button className={style.btnLogIn} onClick={heandlerClickLogIn}>
                  <svg className={style.iconLogIn} width="20" height="20">
                    <use href="/sprite.svg#icon-log-in-01" />
                  </svg>
                  Log in
                </button>

                <button
                  className={style.btnRegistration}
                  onClick={heandlerClickRegistration}
                >
                  Registration
                </button>
              </>
            )}
            {/* Бургер для SideMenu */}
            <button
              className={style.btnBburger}
              onClick={() => setOpenAuthMenu(true)}
            >
              <svg className={style.iconBurger} width="32" height="32">
                <use href="/sprite.svg#icon-Icon" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      {openModalLogIn && <LoginModal onClose={closeModal} />}
      {openModalRegistration && <RegistrationModal onClose={closeModal} />}
      <AuthMenu
        isOpen={openAuthMenu}
        onClose={() => setOpenAuthMenu(false)}
        onLogin={heandlerClickLogIn}
        onRegister={heandlerClickRegistration}
        isLoggedIn={isLoggedIn}
      />
      <Outlet />
    </>
  );
}
