import { useEffect } from 'react';
import style from './FavoritesPage.module.css';
import { fetchTeachers } from '../../redux/teachers/operations';
import { useDispatch, useSelector } from 'react-redux';
import TeachersList from '../../components/TeachersList/TeachersList';
import Filters from '../../components/Filters/Filters';
import { selectUser } from '../../redux/auth/selectors';

export default function FavoritesPage() {
  const user = useSelector(selectUser);
  const favorites = useSelector(
    (state) => state.favorites.byUser[user?.uid]?.items || [],
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachers({ limit: 4 }));
  }, [dispatch]);

  if (!user?.uid) return null;

  return (
    <div className={style.container}>
      <Filters />
      <TeachersList favoritesOnly={true} favorites={favorites} />
    </div>
  );
}
