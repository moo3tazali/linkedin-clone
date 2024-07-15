import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home/Home';
import Profile from '../pages/profile/Profile';
import LoadingPage from '../components/loaders/LoadingPage';
import ComingSoon from '../pages/NotFound/ComingSoon';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/in/:userName' element={<Profile />} />
      <Route path='*' element={<ComingSoon />} />
    </Routes>
  );
};

export default AppRoutes;
