import style from './PrivateRoute.module.css';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectRefreshing } from '../../redux/auth/selectors';
import { useEffect, useState } from 'react';

export default function PrivateRoute({ component }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectRefreshing);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isRefreshing) {
      setReady(true);
    }
  }, [isRefreshing]);

  if (!ready) return <p className={style.emptyText}>Refreshing...</p>;

  return isLoggedIn ? component : <Navigate to="/" replace />;
}
