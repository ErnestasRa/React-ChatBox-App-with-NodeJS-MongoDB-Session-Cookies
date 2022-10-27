import * as React from 'react'
import './App.css'
import RegisterPage from './pages/register-page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main-page';
import MainContext from './context/main-context';

function App() {
  const [message, setMessage] = React.useState([])
 
  return (
  <MainContext.Provider value={{message, setMessage}}>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </MainContext.Provider>
  );
}

export default App;
