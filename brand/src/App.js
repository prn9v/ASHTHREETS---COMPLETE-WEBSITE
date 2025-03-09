import { Route, Routes } from 'react-router-dom';
import CustomerRouter from './Routers/CustomerRouter';
import AdminRouters from './Routers/AdminRouters';

function App() {
  return (
    <>
    <Routes>
      <Route path='/*' element={<CustomerRouter/>}></Route>
      <Route path='/admin/*' element={<AdminRouters/>}></Route>
    </Routes>
    </>
  );
}

export default App;
