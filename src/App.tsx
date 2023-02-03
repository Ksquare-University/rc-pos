import Router from './routes';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { AuthProvider } from './context/AuthCtx';

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <div className='App'>
          <Router />
        </div>
      </Provider>
    </AuthProvider>
  );
};
export default App;
