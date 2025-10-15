import { useEffect, useState } from 'react';
import style from './TeachersPage.module.css';
import { getTeachers } from '../../services/teachers';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className={style.div}>
      <h1>Hi I'm TeachersPage </h1>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            <img src={teacher.avatar_url} alt={teacher.name} />
            <h2>
              {teacher.name} {teacher.surname}
            </h2>
            <p>Price per hour: ${teacher.price_per_hour}</p>
            <p>Rating: {teacher.rating}</p>
            <p>Lessons done: {teacher.lessons_done}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
