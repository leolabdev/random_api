import { useState } from 'react';
import { useCookies } from "react-cookie";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import LoginRegisterForm from './components/LoginRegisterForm';
import ProfilePage from './components/ProfilePage';
import NewTableForm from "./components/NewTableForm";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [loginAccess, setLoginAccess] = useState(false);

  return (
      <div id="container">
        <Router>
          <Routes>
            <Route path="/" element={loginAccess || cookies.jwt != null ? <Navigate replace to="/profile" /> : <LoginRegisterForm setLoginAccess={setLoginAccess}/>} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/newTable" element={<NewTableForm />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
