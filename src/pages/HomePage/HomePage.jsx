import { NavLink } from 'react-router-dom';
import style from './HomePage.module.css';

export default function HomePage() {
  return (
    <section className={style.section}>
      <div className={style.sectionContainer}>
        <div className={style.textContainer}>
          <h1 className={style.article}>
            {' '}
            Unlock your potential with the best{' '}
            <span className={style.span}>language</span> tutors{' '}
          </h1>
          <p className={style.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <NavLink to={'/teachers'} className={style.btn}>
            Get started
          </NavLink>
        </div>

        <div className={style.container}>
          <svg className={style.imgFace} width="339" height="339">
            <use href="../../../sticker.svg" />
          </svg>

          <svg className={style.imgImac} width="359" height="247">
            <use href="../../../iMac.svg" />
          </svg>
        </div>

        <div className={style.infoContainer}>
          {/* SVG рамка з рисками */}
          <svg
            className={style.borderSvg}
            viewBox="0 0 1312 116"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1.5"
              y="1.5"
              width="1309"
              height="113"
              rx="30"
              ry="30"
              stroke="#f4c550"
              strokeWidth="1"
              strokeDasharray="20 10"
            />
          </svg>

          <div className={style.textInfo}>
            <p className={style.textNumber}>32,000 +</p>
            <p className={style.textDescription}>Experienced tutors</p>
          </div>

          <div className={style.textInfo}>
            <p className={style.textNumber}>300,000 +</p>
            <p className={style.textDescription}>5-star tutor reviews</p>
          </div>

          <div className={style.textInfo}>
            <p className={style.textNumber}>120 +</p>
            <p className={style.textDescription}>Subjects taught</p>
          </div>

          <div className={style.textInfo}>
            <p className={style.textNumber}>200 +</p>
            <p className={style.textDescription}>Tutor nationalities</p>
          </div>
        </div>
      </div>
    </section>
  );
}
