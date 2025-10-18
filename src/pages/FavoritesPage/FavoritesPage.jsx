import { useEffect } from 'react';
import style from './FavoritesPage.module.css';
import { fetchTeachers } from '../../redux/teachers/operations';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/favorites/slice';
import { selectFavorites } from '../../redux/favorites/selectors';
import {
  selectLastKey,
  selectLoading,
  selectTeachers,
} from '../../redux/teachers/selectors';

export default function FavoritesPage() {
  const teachers = useSelector(selectTeachers);
  const loading = useSelector(selectLoading);
  const lastKey = useSelector(selectLastKey);
  const favorites = useSelector(selectFavorites);

  const dispatch = useDispatch();

  useEffect(() => {
    if (teachers.length === 0) {
      dispatch(fetchTeachers({ limit: 4 }));
    }
  }, [teachers, dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchTeachers({ limit: 4, startAfterKey: lastKey }));
  };

  if (loading && teachers.length === 0) return <p>Loading teachers...</p>;

  const favoriteTeachers = teachers.filter((t) => favorites.includes(t.id));

  const showLoadMore = favoriteTeachers.length < favorites.length && !loading;

  if (favoriteTeachers.length === 0) {
    return <p className={style.emptyText}>No favorite teachers yet 💔</p>;
  }

  if (loading && teachers.length === 0)
    return <p>Loading favorites teachers...</p>;

  return (
    <div className={style.container}>
      <ul className={style.list}>
        {favoriteTeachers.map((teacher) => {
          const isFavorite = favorites.includes(teacher.id);
          return (
            <li className={style.item} key={teacher.id}>
              <div className={style.imgBorder}>
                <img
                  className={style.image}
                  src={teacher.avatar_url}
                  alt={teacher.name}
                />
                <svg className={style.statusSvg}>
                  <use href="/sprite.svg#icon-Group-82" />
                </svg>
              </div>
              <div className={style.divContainer}>
                <div className={style.textContainer}>
                  <div className={style.divName}>
                    <p className={style.textLang}> Languages </p>
                    <h2 className={style.title}>
                      {teacher.name} {teacher.surname}
                    </h2>
                  </div>
                  <div className={style.infoText}>
                    <div className={style.bookDiv}>
                      <svg className={style.bookSvg}>
                        <use href="/sprite.svg#icon-book-open" />
                      </svg>
                      <p className={style.onlineText}>Lessons online</p>
                    </div>
                    <span className={style.divider}></span>

                    <p className={style.textLesson}>
                      Lessons done: {teacher.lessons_done}
                    </p>
                    <span className={style.divider}></span>
                    <p className={style.textLesson}>Rating: {teacher.rating}</p>
                    <span className={style.divider}></span>
                    <p className={style.textLesson}>
                      Price / 1 hour:{' '}
                      <span className={style.spanPrice}>
                        {teacher.price_per_hour}$
                      </span>
                    </p>
                  </div>

                  <button
                    className={style.heartBtn}
                    onClick={() => dispatch(toggleFavorite(teacher.id))}
                  >
                    <svg className={style.svgHeart}>
                      <use
                        href={`/sprite.svg#${
                          isFavorite ? 'icon-color-heart' : 'icon-heart'
                        }`}
                      />
                    </svg>
                  </button>
                </div>

                <div className={style.details}>
                  <p className={style.detailsItem}>
                    <span className={style.label}>Speaks:</span>
                    <span className={style.underlined}>
                      {teacher.languages.join(', ')}
                    </span>
                  </p>
                  <p className={style.detailsItem}>
                    <span className={style.label}>Lesson info:</span>
                    <span>{teacher.lesson_info}</span>
                  </p>
                  <p className={style.detailsItem}>
                    <span className={style.label}>Conditions:</span>
                    <span>{teacher.conditions}</span>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {showLoadMore && (
        <button onClick={handleLoadMore} className={style.loadMoreBtn}>
          Load more
        </button>
      )}
    </div>
  );
}
