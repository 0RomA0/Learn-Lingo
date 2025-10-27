import { useEffect } from 'react';
import style from './FiltersModal.module.css';
import Filters from '../Filters/Filters';

export default function FiltersModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeBtn} onClick={onClose}>
          <svg className={style.closeIcon} width="20" height="20">
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>
        <Filters />
      </div>
    </div>
  );
}
