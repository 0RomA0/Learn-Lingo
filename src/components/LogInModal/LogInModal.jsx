import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import style from './LoginModal.module.css';
import { logInUser } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export default function LoginModal({ onClose }) {
  const [eyeOpen, setEyeOpen] = useState(false);
  const [firebaseError, setFirebaseError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const LogInSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format (e.g. username@mail.com)')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(30, 'Password must be at most 30 characters')
      .required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LogInSchema),
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
    setFirebaseError('');
    setLoading(true);

    try {
      await dispatch(logInUser(data)).unwrap();
      toast.success('Log in was successful!');
      reset();
      onClose();
    } catch (error) {
      toast.error('Emeil or password is incorrect!');
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

          <h1 className={style.title}>Log in</h1>
          <p className={style.description}>
            Welcome back! Please enter your credentials to access your account
            and continue your search for a teacher.
          </p>

          <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.inputContainer}>
              <input
                className={style.inputEmail}
                type="email"
                {...register('email')}
                placeholder="Email"
              />
              {errors.email && (
                <p className={style.error}>{errors.email.message}</p>
              )}
            </div>

            <div className={style.inputContainer}>
              <input
                className={style.inputPassword}
                type={eyeOpen ? 'text' : 'password'}
                {...register('password')}
                placeholder="Password"
              />
              <button
                type="button"
                className={style.eyeBtn}
                onClick={() => setEyeOpen(!eyeOpen)}
              >
                <svg className={style.eyeIcon} width="20" height="20">
                  <use
                    href={`/sprite.svg#${
                      eyeOpen ? 'icon-eye-on' : 'icon-eye-off'
                    }`}
                  />
                </svg>
              </button>
              {errors.password && (
                <p className={style.error}>{errors.password.message}</p>
              )}
            </div>

            {firebaseError && <p className={style.error}>{firebaseError}</p>}

            <button className={style.btn} type="submit">
              {loading ? 'Loading...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
