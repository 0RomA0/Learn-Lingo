# ** 🏫 Learn Lingo — Online Language Learning Platform **

Learn Lingo is a modern web application for a company that offers online language lessons with professional tutors.
Users can browse teachers, filter them by language, student level, and hourly rate, add them to Favorites, and book trial lessons.
The app is built using React, Firebase, Redux Toolkit, and React Router.

🚀 [Live Demo](https://learn-lingo-coral.vercel.app/)

🧩 Pages

🏠 Home

- A welcome page describing the company's benefits.
- Includes a "Get Started" button that redirects to the Teachers page.

👩‍🏫 Teachers

- Displays a list of teachers (4 per request).
- Allows users to load more teachers with the Load more button.

Users can:

- Filter teachers by language, student level, and price per hour;
- Add teachers to Favorites;
- Expand teacher cards with Read more;
- Book trial lessons via Book trial lesson button.

❤️ Favorites

- A private page accessible only to logged-in users.
- Displays the list of teachers added to Favorites.

🔐 Authentication

- User authentication is implemented using Firebase Authentication.

Supported features:

- New user registration;
- Login/logout;
- Persistent session after page reload.
  Authentication and registration forms are implemented using react-hook-form and Yup, with required field validation.

💾 Data Handling
The app uses Firebase Realtime Database:

- Stores teacher data;
- Keeps a list of each user's favorite teachers;
- Fetches data dynamically on "Load more" button click.

⚙️ Core Technologies

- React
- Redux Toolkit
- React Router
- Firebase Authentication
- Firebase Realtime Database
- react-hook-form + Yup Form handling & validation
- Vite
- CSS Modules
- React Hot Toast

🧠 Main Functionality

- User authentication
- Teacher filtering by parameters
- Add/remove teachers from favorites
- Favorite state persists after page reload
- Modal windows for forms and booking
- Responsive design for mobile and tablets
- Private route protection for Favorites
- Real-time interaction with Firebase

📐 [Design](https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/%D0%9F%D0%B5%D1%82-%D0%BF%D1%80%D0%BE%D1%94%D0%BA%D1%82-%D0%B4%D0%BB%D1%8F-%D0%9A%D0%A6?type=design&node-id=0-1&mode=design&t=jCmjSs9PeOjObYSc-0)

📐 [Technical task](https://docs.google.com/document/d/1ZB_MFgnnJj7t7OXtv5hESSwY6xRgVoACZKzgZczWc3Y/edit?tab=t.0)

📋 Technical Requirements

1. Implement 3 main pages: Home, Teachers, and Favorites.
2. Use Firebase for authentication and teacher database.
3. Implement filtering by language, student level, and hourly rate.
4. Add modal windows for login, registration, and lesson booking.
5. Use react-hook-form + Yup for form validation.
6. Save favorite teachers per user.
7. Ensure full responsive design.
8. Use React Router for navigation.
9. Deploy the app on Netlify or GitHub Pages.

🙂 Developer
Roman Halukh | Fullstack Developer
