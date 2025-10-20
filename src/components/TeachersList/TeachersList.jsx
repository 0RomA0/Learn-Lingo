import style from './TeachersList.module.css';
import { fetchTeachers } from '../../redux/teachers/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites } from '../../redux/favorites/selectors';
import {
  selectHasMore,
  selectLastKey,
  selectLoading,
  selectTeachers,
} from '../../redux/teachers/selectors';
import TeacherInfo from '../TeacherInfo/TeacherInfo';
import { selectFilters } from '../../redux/filters/selectors';

export default function TeachersList({ favoritesOnly }) {
  const teachers = useSelector(selectTeachers);
  const isLoading = useSelector(selectLoading);
  const lastKey = useSelector(selectLastKey);
  const favorites = useSelector(selectFavorites);
  const hasMore = useSelector(selectHasMore);
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  const handleLoadMore = () => {
    dispatch(fetchTeachers({ limit: 4, startAfterKey: lastKey, filters }));
  };

  let filteredTeachers = teachers;

  if (favoritesOnly) {
    filteredTeachers = filteredTeachers.filter((t) => favorites.includes(t.id));
  }

  if (filters.language) {
    filteredTeachers = filteredTeachers.filter((t) =>
      t.languages.includes(filters.language),
    );
  }

  if (filters.level) {
    filteredTeachers = filteredTeachers.filter((t) =>
      t.levels.includes(filters.level),
    );
  }

  if (filters.price) {
    filteredTeachers = filteredTeachers.filter(
      (t) => t.price_per_hour <= filters.price,
    );
  }

  if (!isLoading && filteredTeachers.length === 0) {
    return (
      <p className={style.emptyText}>
        {favoritesOnly
          ? 'No favorite teachers yet 💔'
          : 'Nothing found, please reload the page 😔'}
      </p>
    );
  }

  return (
    <div className={style.container}>
      <ul className={style.list}>
        {filteredTeachers.map((teacher) => {
          const isFavorite = favorites.includes(teacher.id);
          return (
            <li className={style.item} key={teacher.id}>
              <TeacherInfo
                teacher={teacher}
                id={teacher.id}
                teacherPhoto={teacher.avatar_url}
                teacherName={teacher.name}
                surname={teacher.surname}
                lessons_done={teacher.lessons_done}
                rating={teacher.rating}
                price={teacher.price_per_hour}
                languages={teacher.languages}
                lesson_info={teacher.lesson_info}
                conditions={teacher.conditions}
                experience={teacher.experience}
                reviews={teacher.reviews}
                levels={teacher.levels}
                favorites={isFavorite}
              />
            </li>
          );
        })}
      </ul>

      {isLoading && (
        <div className={style.loaderWrapper}>
          <div className={style.loader}></div>
        </div>
      )}

      {hasMore && !isLoading && !favoritesOnly && (
        <button onClick={handleLoadMore} className={style.loadMoreBtn}>
          Load more
        </button>
      )}
    </div>
  );
}
