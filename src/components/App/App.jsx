import style from './App.module.css';
import 'modern-normalize';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Header from '../Header/Header';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectRefreshing } from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';
import PrivateRoute from '../PrivateRoute/Privateroute';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const TeachersPage = lazy(() =>
  import('../../pages/TeachersPage/TeachersPage'),
);
const FavoritesPage = lazy(() =>
  import('../../pages/FavoritesPage/FavoritesPage'),
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage'),
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <p className={style.emptyText}> Refreshing user... </p>
  ) : (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<HomePage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route
              path="/favorites"
              element={<PrivateRoute component={<FavoritesPage />} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
