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
          <img
            className={style.imgFace}
            srcSet="../../../sticker-1x.png, ../../../sticker-2x.png"
            src="../../../sticker 2x.png"
            alt="sticker"
          />

          <img
            className={style.imgImac}
            srcSet="../../../iMac-1x.png, ../../../iMac-2x.png"
            src="../../../iMac-1x.png"
            alt="iMac"
          />
        </div>

        <div className={style.infoContainer}>
          {/* SVG рамка з рисками */}
          <svg className={style.borderSvg}>
            <rect className={style.borderRect} />
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
