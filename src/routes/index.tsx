import { Route, Routes, BrowserRouter } from 'react-router-dom';
import DefaultTemplateMenu from '../templates/DefaultTemplateMenu';
import Login from '../views/Login/Login';
import Orders from '../views/Orders/Orders';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
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
