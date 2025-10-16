import { useEffect, useState } from 'react';
import style from './TeachersPage.module.css';
import { getTeachers } from '../../services/teachers';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const isFavorite = teachers.includes(teachers.id);
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getTeachers();
        setTeachers(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) return <p>Loading teachers...</p>;

  return (
    <div className={style.container}>
      <ul className={style.list}>
        {teachers.map((teacher) => (
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
                <div className={style.div}>
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

                <button className={style.heartBtn}>
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
        ))}
      </ul>

      {/* <button> Load more </button> */}
    </div>
  );
}
