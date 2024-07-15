import './App.css';
import Layout from './layouts/Layout';
import AppRoutes from './routes/AppRoutes';
import AuthRoutes from './routes/AuthRoutes';
import { useAuth } from './hooks/AuthContext';
import { useFetchUserData } from './hooks/useFetchUserData';
import LoadingPage from './components/loaders/LoadingPage';

function App() {
  if (location.pathname === '/') location.pathname = '/linkedin-clone/';
  const { accessToken } = useAuth();
  const { isLoading } = useFetchUserData();
  return (
    <>
      {!accessToken && <AuthRoutes />}

      {isLoading && <LoadingPage />}

      {accessToken && !isLoading && (
        <Layout>
          <AppRoutes />
        </Layout>
      )}
    </>
  );
}

export default App;
