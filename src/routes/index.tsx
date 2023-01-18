import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from '../views/Login';
import Welcome from '../views/Welcome';
import Orders from '../views/Orders';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='home' element={<Welcome />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
