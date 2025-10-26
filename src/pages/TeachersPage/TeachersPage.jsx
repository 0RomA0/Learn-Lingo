import { useEffect } from 'react';
import style from './TeachersPage.module.css';
import { fetchTeachers } from '../../redux/teachers/operations';
import { useDispatch, useSelector } from 'react-redux';

import TeachersList from '../../components/TeachersList/TeachersList';
import Filters from '../../components/Filters/Filters';
import { selectUser } from '../../redux/auth/selectors';
import { selectFavoritesItems } from '../../redux/favorites/selectors';

export default function TeachersPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const favorites = useSelector((state) =>
    selectFavoritesItems(state, user?.uid),
  );

  useEffect(() => {
    dispatch(fetchTeachers({ limit: 4 }));
  }, [dispatch]);

  return (
    <div className={style.container}>
      {/* <Filters /> */}
      <TeachersList favorites={favorites} />
    </div>
  );
}
