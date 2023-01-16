import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Welcome from '../views/Welcome';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
