import { useEffect, useState } from 'react';
import style from './FavoritesPage.module.css';
import { fetchTeachers } from '../../redux/teachers/operations';
import { useDispatch, useSelector } from 'react-redux';
import TeachersList from '../../components/TeachersList/TeachersList';
import Filters from '../../components/Filters/Filters';
import { selectUser } from '../../redux/auth/selectors';
import FiltersModal from '../../components/FiltersModal/FiltersModal';

export default function FavoritesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <button className={style.filersBtn} onClick={() => setIsModalOpen(true)}>
        Filters
      </button>

      <FiltersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className={style.filtersDesktop}>
        <Filters />
      </div>
      <TeachersList favoritesOnly={true} favorites={favorites} />
    </div>
  );
}
