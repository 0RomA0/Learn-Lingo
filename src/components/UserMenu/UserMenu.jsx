import style from './UserMenu.module.css';
import { logOutUser } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';

export default function UserMenu({ user }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <div className={style.container}>
      <p className={style.username}>Welcome, {user.name}</p>
      <button className={style.btn} type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
