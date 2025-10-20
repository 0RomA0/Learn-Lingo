import { useEffect } from 'react';
import style from './TeachersPage.module.css';
import { fetchTeachers } from '../../redux/teachers/operations';
import { useDispatch } from 'react-redux';

import TeachersList from '../../components/TeachersList/TeachersList';
import Filters from '../../components/Filters/Filters';

export default function TeachersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachers({ limit: 4 }));
  }, [dispatch]);

  return (
    <div className={style.container}>
      <Filters />
      <TeachersList />
    </div>
  );
}
