import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from '../views/Login';
import Welcome from '../views/Welcome';
import Orders from '../views/Orders';
import CancelView from '../views/CancelView';
import OrderView from '../views/OrderView';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='home' element={<Welcome />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/orderview/:orderId' element={<OrderView />} />
        <Route path='/cancelorder/:orderId' element={<CancelView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
