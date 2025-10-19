import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import style from './BookTrialForm.module.css';
import toast from 'react-hot-toast';

export default function BookinTrialForm({ onClose, photo, name, surname }) {
  const [firebaseError, setFirebaseError] = useState('');
  const [loading, setLoading] = useState(false);

  const BookinSchema = Yup.object().shape({
    purpose: Yup.string().required('Please select your goal'),
    fullName: Yup.string()
      .min(2, 'Full Name must be at least 2 characters')
      .max(50, 'Full Name must be at most 50 characters')
      .matches(/^[A-Za-z\s]+$/, 'Full Name can contain only letters and spaces')
      .required('Full Name is required'),
    email: Yup.string()
      .email('Invalid email format (e.g. username@mail.com)')
      .required('Email is required'),
    phone: Yup.string()
      .matches(
        /^\+?\d{8,15}$/,
        'Phone number must contain only digits and may start with + (8-15 digits total)',
      )
      .required('Phone number is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(BookinSchema),
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const onSubmit = async (data) => {
    console.log('Form data:', data);
    setFirebaseError('');
    setLoading(true);

    try {
      toast.success('Booking a lesson was successful!');
      reset();
      onClose();
    } catch (error) {
      setFirebaseError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={style.backdrop} onClick={onClose}>
        <div className={style.modal} onClick={(e) => e.stopPropagation()}>
          <button className={style.closeBtn} onClick={onClose}>
            <svg className={style.closeIcon} width="32" height="32">
              <use href="/sprite.svg#icon-close" />
            </svg>
          </button>

          <h1 className={style.title}>Book trial lesson</h1>
          <p className={style.description}>
            Our experienced tutor will assess your current language level,
            discuss your learning goals, and tailor the lesson to your specific
            needs.
          </p>

          <div className={style.containerInfo}>
            <img className={style.image} src={photo} alt={name} />

            <div className={style.divName}>
              <p className={style.textLang}> Your teacher </p>
              <h2 className={style.titleName}>
                {name} {surname}
              </h2>
            </div>
          </div>

          <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <p className={style.radioTitle}>
              What is your main reason for learning English?
            </p>
            <div className={style.radioGroup}>
              {[
                'Career and business',
                'Lesson for kids',
                'Living abroad',
                'Exams and coursework',
                'Culture, travel or hobby',
              ].map((option) => (
                <label key={option} className={style.radioLabel}>
                  <input
                    {...register('purpose')}
                    type="radio"
                    value={option}
                    className={style.inputRadio}
                  />
                  {option}
                </label>
              ))}

              {errors.purpose && (
                <p className={style.error}>{errors.purpose.message}</p>
              )}
            </div>
            <div className={style.inputGap}>
              <div className={style.inputContainer}>
                <input
                  className={style.inputName}
                  {...register('fullName')}
                  type="text"
                  placeholder="Full Name"
                />
                {errors.fullName && (
                  <p className={style.error}>{errors.fullName.message}</p>
                )}
              </div>

              <div className={style.inputContainer}>
                <input
                  className={style.inputEmail}
                  {...register('email')}
                  type="email"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className={style.error}>{errors.email.message}</p>
                )}
              </div>

              <div className={style.inputContainer}>
                <input
                  className={style.inputPhone}
                  {...register('phone')}
                  type="text"
                  placeholder="Phone number"
                />
                {errors.phone && (
                  <p className={style.error}>{errors.phone.message}</p>
                )}
              </div>
            </div>

            {firebaseError && <p className={style.error}>{firebaseError}</p>}

            <button className={style.btn} type="submit">
              {loading ? 'Booking...' : 'Book'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
