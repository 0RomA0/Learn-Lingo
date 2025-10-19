import style from './DetailItem.module.css';

export default function DetailItem({ experience, reviews }) {
  return (
    <>
      <div className={style.container}>
        <p className={style.text}>{experience} </p>
        <div className={style.reviewsContainer}>
          {reviews.map((review, index) => {
            return (
              <div key={index} className={style.textContainer}>
                <div className={style.info}>
                  <p className={style.reviewName}> {review.reviewer_name} </p>
                  <div className={style.textReating}>
                    <svg className={style.starSvg}>
                      <use href="/sprite.svg#icon-star" />
                    </svg>
                    <p className={style.reviewReating}>
                      {review.reviewer_rating}.0
                    </p>
                  </div>
                </div>

                <p className={style.reviewComment}> {review.comment} </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
