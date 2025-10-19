import { useEffect, useState } from 'react';
import style from './TeachersPage.module.css';
import { fetchTeachers } from '../../redux/teachers/operations';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/favorites/slice';
import { selectFavorites } from '../../redux/favorites/selectors';
import {
  selectHasMore,
  selectLastKey,
  selectLoading,
  selectTeachers,
} from '../../redux/teachers/selectors';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import toast from 'react-hot-toast';
import DetailItem from '../../components/DetailItem/DetailItem';
import BookinTrialForm from '../../components/BookTrialForm/BookTrialForm';

export default function TeachersPage() {
  const [expandedId, setExpandedId] = useState(null);
  const [openModalBooking, setOpenModalBooking] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(false);

  const teachers = useSelector(selectTeachers);
  const loading = useSelector(selectLoading);
  const lastKey = useSelector(selectLastKey);
  const favorites = useSelector(selectFavorites);
  const hasMore = useSelector(selectHasMore);
  const loggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (teachers.length === 0) {
      dispatch(fetchTeachers({ limit: 4 }));
    }
  }, [teachers, dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchTeachers({ limit: 4, startAfterKey: lastKey }));
  };
  const handleClickBooking = (teacher) => {
    setSelectedTeacher(teacher);
    setOpenModalBooking(true);
  };

  const closeModal = () => {
    setOpenModalBooking(false);
  };

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  if (loading && teachers.length === 0)
    return <p className={style.emptyText}>Loading teachers...</p>;

  return (
    <div className={style.container}>
      <ul className={style.list}>
        {teachers.map((teacher) => {
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
                  <div className={style.contentContainer}>
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
                      <div className={style.textReating}>
                        <svg className={style.starSvg}>
                          <use href="/sprite.svg#icon-star" />
                        </svg>

                        <p className={style.textLesson}>
                          Rating: {teacher.rating}
                        </p>
                      </div>
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
                      onClick={() => {
                        if (!loggedIn) {
                          toast(
                            'This feature is available only for authorized users.',
                            {
                              icon: 'ℹ',
                            },
                          );
                          return;
                        }
                        dispatch(toggleFavorite(teacher.id));
                      }}
                    >
                      <svg className={style.svgHeart}>
                        <use
                          href={`/sprite.svg#${
                            isFavorite && loggedIn
                              ? 'icon-color-heart'
                              : 'icon-heart'
                          }`}
                        />
                      </svg>
                    </button>
                  </div>
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

                <button
                  className={style.btnReadMore}
                  onClick={() => {
                    if (!loggedIn) {
                      toast(
                        'This feature is available only for authorized users.',
                        {
                          icon: 'ℹ',
                        },
                      );
                      return;
                    }
                    toggleExpand(teacher.id);
                  }}
                >
                  Read more
                </button>
                {expandedId === teacher.id && (
                  <DetailItem
                    experience={teacher.experience}
                    reviews={teacher.reviews}
                  />
                )}
                <div className={style.levels}>
                  {teacher.levels.map((level) => (
                    <span key={level} className={style.level}>
                      #{level}
                    </span>
                  ))}
                </div>
                {expandedId === teacher.id && (
                  <button
                    className={style.btnBooking}
                    onClick={() => handleClickBooking(teacher)}
                  >
                    Book trial lesson
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {openModalBooking && selectedTeacher && (
        <BookinTrialForm
          onClose={closeModal}
          photo={selectedTeacher.avatar_url}
          name={selectedTeacher.name}
          surname={selectedTeacher.surname}
        />
      )}

      {hasMore && !loading && (
        <button onClick={handleLoadMore} className={style.loadMoreBtn}>
          Load more
        </button>
      )}
    </div>
  );
}
