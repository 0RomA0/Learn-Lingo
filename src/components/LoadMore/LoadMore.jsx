import style from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={style.loadMoreBtn}
    >
      {disabled ? 'Loading...' : 'Load More'}
    </button>
  );
}
