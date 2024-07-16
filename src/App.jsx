import './App.css';
import Layout from './layouts/Layout';
import AppRoutes from './routes/AppRoutes';
import AuthRoutes from './routes/AuthRoutes';
import { useAuth } from './hooks/AuthContext';
import { useFetchUserData } from './hooks/useFetchUserData';
import LoadingPage from './components/loaders/LoadingPage';

function App() {
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
