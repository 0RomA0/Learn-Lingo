import style from './TeacherInfo.module.css';
import { toggleFavorite } from '../../redux/favorites/slice';
import toast from 'react-hot-toast';
import DetailItem from '../DetailItem/DetailItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useState } from 'react';
import BookinTrialForm from '../BookTrialForm/BookTrialForm';
import { selectFilters } from '../../redux/filters/selectors';

export default function TeacherInfo({
  id,
  teacherPhoto,
  teacherName,
  surname,
  lessons_done,
  rating,
  price,
  favorites,
  languages,
  lesson_info,
  conditions,
  experience,
  reviews,
  levels,
}) {
  const [expandedId, setExpandedId] = useState(null);
  const [openModalBooking, setOpenModalBooking] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(false);
  const loggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const handleClickBooking = (teacher) => {
    setSelectedTeacher(teacher);
    setOpenModalBooking(true);
  };

  const closeModal = () => {
    setOpenModalBooking(false);
  };

  return (
    <>
      <div className={style.imgBorder}>
        <img className={style.image} src={teacherPhoto} alt={teacherName} />
        <svg className={style.statusSvg}>
          <use href="/sprite.svg#icon-Group-82" />
        </svg>
      </div>
      <div className={style.divContainer}>
        <div className={style.textContainer}>
          <div className={style.divName}>
            <p className={style.textLang}> Languages </p>
            <h2 className={style.title}>
              {teacherName} {surname}
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

              <p className={style.textLesson}>Lessons done: {lessons_done}</p>
              <span className={style.divider}></span>
              <div className={style.textReating}>
                <svg className={style.starSvg}>
                  <use href="/sprite.svg#icon-star" />
                </svg>

                <p className={style.textLesson}>Rating: {rating}</p>
              </div>
              <span className={style.divider}></span>
              <p className={style.textLesson}>
                Price / 1 hour:{' '}
                <span className={style.spanPrice}>{price}$</span>
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
                dispatch(toggleFavorite(id));
              }}
            >
              <svg className={style.svgHeart}>
                <use
                  href={`/sprite.svg#${
                    favorites && loggedIn ? 'icon-color-heart' : 'icon-heart'
                  }`}
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={style.details}>
          <p className={style.detailsItem}>
            <span className={style.label}>Speaks:</span>
            <span className={style.underlined}>{languages.join(', ')}</span>
          </p>
          <p className={style.detailsItem}>
            <span className={style.label}>Lesson info:</span>
            <span>{lesson_info}</span>
          </p>
          <p className={style.detailsItem}>
            <span className={style.label}>Conditions:</span>
            <span>{conditions}</span>
          </p>
        </div>

        <button
          className={style.btnReadMore}
          onClick={() => {
            if (!loggedIn) {
              toast('This feature is available only for authorized users.', {
                icon: 'ℹ',
              });
              return;
            }
            toggleExpand(id);
          }}
        >
          Read more
        </button>
        {expandedId === id && (
          <DetailItem experience={experience} reviews={reviews} />
        )}
        <div className={style.levels}>
          {levels.map((level) => (
            <span
              key={level}
              className={`${style.level} ${
                filters.level === level ? style.activeLevel : ''
              }`}
            >
              #{level}
            </span>
          ))}
        </div>
        {expandedId === id && (
          <button
            className={style.btnBooking}
            onClick={() =>
              handleClickBooking({ id, teacherName, surname, teacherPhoto })
            }
          >
            Book trial lesson
          </button>
        )}
      </div>

      {openModalBooking && selectedTeacher && (
        <BookinTrialForm
          onClose={closeModal}
          teacherPhoto={selectedTeacher.teacherPhoto}
          teacherName={selectedTeacher.teacherName}
          surname={selectedTeacher.surname}
        />
      )}
    </>
  );
}
