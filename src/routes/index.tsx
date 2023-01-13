import { Route, Routes, BrowserRouter } from 'react-router-dom';
import DefaultTemplateMenu from '../templates/DefaultTemplateMenu';
import Login from '../views/Login/Login';
import Welcome from "../views/Welcome";
import Orders from '../views/Orders/Orders';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/home" element={<Welcome />} />
        <Route
          path='/orders'
          element={
            <DefaultTemplateMenu>
              <Orders />
            </DefaultTemplateMenu>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
