import Login from './components/login.jsx'
import Registration from './components/register.jsx'
import MenuPage from './components/menuPage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/menu' element={<MenuPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
