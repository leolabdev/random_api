import './App.css'


import { useState } from 'react';
import { useCookies } from "react-cookie";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import ProfilePage from './components/ProfilePage';
import NewTableForm from "./components/NewTableForm";
import TableInfo from "./components/TableInfo";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import Error from "./pages/Error";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [loginAccess, setLoginAccess] = useState(false);

  const [tableInfoName, setTableInfoName] = useState('');
  const [tableInfoOwner, setTableInfoOwner] = useState('');

  return (
      <div className="App" id="container">
          <Router>
              <Routes>
                  <Route path="/" element={loginAccess || cookies.jwt != null ? <Navigate replace to="/profile" /> : <LoginRegisterPage setLoginAccess={setLoginAccess}/>} />
                  <Route path="/profile" element={<ProfilePage setTableInfoName={setTableInfoName} setTableInfoOwner={setTableInfoOwner}/>} />
                  <Route path="/newTable" element={<NewTableForm/>} />
                  <Route path="/tableInfo" element={<TableInfo name={tableInfoName} owner={tableInfoOwner} />} />
                  <Route path="404"  element={<Error/>}/>
                  <Route
                      path="*"
                      element={<Navigate to="404" replace />}
                  />
              </Routes>
          </Router>
      </div>
  );
}

export default App;
