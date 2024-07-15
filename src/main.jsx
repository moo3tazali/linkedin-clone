import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './services/store/store.js';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router basename='/linkedin-clone/'>
          <App />
        </Router>
      </QueryClientProvider>
    </Provider>
  </AuthProvider>
);
