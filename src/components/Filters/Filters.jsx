import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Filters.module.css';
import {
  resetFilters,
  setLanguage,
  setLevel,
  setPrice,
} from '../../redux/filters/slice';
import { selectFilters } from '../../redux/filters/selectors';
import { selectTeachers } from '../../redux/teachers/selectors';
import { fetchTeachers } from '../../redux/teachers/operations';
import { clearTeachers } from '../../redux/teachers/slice';

export default function Filters() {
  const [languagesList, setLanguagesList] = useState([]);
  const [levelsList, setLevelsList] = useState([]);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [levelsOpen, setLevelsOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const teachers = useSelector(selectTeachers);

  const isFiltersSelected = filters.language || filters.level || filters.price;

  const priceList = [10, 20, 30, 40, 50, 60];

  useEffect(() => {
    if (teachers.length > 0) {
      const allLanguages = new Set();
      const allLevels = new Set();

      teachers.forEach((t) => {
        t.languages.forEach((lang) => allLanguages.add(lang));
        t.levels.forEach((level) => allLevels.add(level));
      });

      setLanguagesList(Array.from(allLanguages));
      setLevelsList(Array.from(allLevels));
    }
  }, [teachers]);

  useEffect(() => {
    dispatch(fetchTeachers({ limit: 4, filters }));
  }, [filters.language, filters.level, filters.price, dispatch]);

  const handleClear = () => {
    dispatch(resetFilters());
    clearTeachers();
    dispatch(fetchTeachers({ limit: 4 }));
  };

  return (
    <div className={style.filterContainer}>
      {/* Language */}

      <div className={style.selectWrapper}>
        <label className={style.label}> Languages </label>
        <div
          className={style.selectHeader}
          onClick={() => setLanguageOpen(!languageOpen)}
        >
          {filters.language || 'Language'}
          <svg className={style.icon}>
            <use href="/sprite.svg#icon-chevron-down" />
          </svg>
        </div>
        {languageOpen && (
          <ul className={style.selectList}>
            {languagesList.map((language) => (
              <li
                key={language}
                className={filters.language === language ? style.active : ''}
                onClick={() => {
                  dispatch(setLanguage(language));
                  setLanguageOpen(false);
                }}
              >
                {language}
              </li>
            ))}
            <li
              onClick={() => {
                dispatch(setLanguage(''));
                setLanguageOpen(false);
              }}
            >
              Clear
            </li>
          </ul>
        )}
      </div>

      {/* Levels */}

      <div className={style.selectWrapper}>
        <label className={style.label}> Level of knowledge </label>
        <div
          className={style.selectHeader}
          onClick={() => setLevelsOpen(!levelsOpen)}
        >
          {filters.level || 'Level'}
          <svg className={style.icon}>
            <use href="/sprite.svg#icon-chevron-down" />
          </svg>
        </div>
        {levelsOpen && (
          <ul className={style.selectList}>
            {levelsList.map((level) => (
              <li
                key={level}
                className={filters.level === level ? style.active : ''}
                onClick={() => {
                  dispatch(setLevel(level));
                  setLevelsOpen(false);
                }}
              >
                {level}
              </li>
            ))}
            <li
              onClick={() => {
                dispatch(setLevel(''));
                setLevelsOpen(false);
              }}
            >
              Clear
            </li>
          </ul>
        )}
      </div>

      {/* Price */}

      <div className={style.selectWrapper}>
        <label className={style.label}> Price </label>
        <div
          className={style.selectHeader}
          onClick={() => setPriceOpen(!priceOpen)}
        >
          {filters.price ? `${filters.price} $` : 'Price'}{' '}
          <svg className={style.icon}>
            <use href="/sprite.svg#icon-chevron-down" />
          </svg>
        </div>
        {priceOpen && (
          <ul className={style.selectList}>
            {priceList.map((price) => (
              <li
                key={price}
                className={filters.price === price ? style.active : ''}
                onClick={() => {
                  dispatch(setPrice(price));
                  setPriceOpen(false);
                }}
              >
                {price}
              </li>
            ))}
            <li
              onClick={() => {
                dispatch(setPrice(''));
                setPriceOpen(false);
              }}
            >
              Clear
            </li>
          </ul>
        )}
      </div>

      {/* Reset filters */}
      <button
        className={style.btn}
        onClick={handleClear}
        disabled={!isFiltersSelected}
      >
        Reset Filters
      </button>
    </div>
  );
}
