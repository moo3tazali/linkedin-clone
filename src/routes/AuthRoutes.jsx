import { Routes, Route } from 'react-router-dom';
import SignUp from '../pages/auth/SignUp';
import Login from '../pages/auth/Login';
import RedirectCover from '../components/redirectCover/RedirectCover';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='signUp' element={<SignUp />} />
      <Route path='login' element={<Login />} />
      <Route path='*' element={<RedirectCover next='/login' />} />
    </Routes>
  );
};

export default AuthRoutes;
