import './App.css'
import React, {useEffect} from 'react';
import { useState } from 'react';
import { useCookies } from "react-cookie";
/*import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';*/
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';


import NewTableForm from "./components/Profile/NewTableForm";
import TableInfo from "./components/Profile/TableInfo";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import Error from "./pages/Error";
import NavbarComponent from "./components/Navbar/Navbar";
import ProfilePage from "./pages/ProfilePage";
import HubPage from "./pages/HubPage";

import SettingsPage from "./pages/SettingsPage";


import AboutPage from "./pages/AboutPage";
import {Container} from "react-bootstrap";
import ControlAccessPage from "./pages/ControlAccessPage";



function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [loginAccess, setLoginAccess] = useState(false);

  const [tableInfoName, setTableInfoName] = useState('');
  const [tableInfoOwner, setTableInfoOwner] = useState('');

    useEffect(() => {
          if(cookies.jwt != null){
              setLoginAccess(() => true);
          }
      }, [cookies]);

  return (
      <div className="App" id="container">

          <BrowserRouter>
              <NavbarComponent loginAccess={loginAccess}/>
              <Container>
              <Routes>
                  <Route path="/" element={loginAccess || cookies.jwt != null ? <Navigate replace to="/profile" /> : <LoginRegisterPage setLoginAccess={setLoginAccess}/>} />

                  <Route path="/profile" element={loginAccess || cookies.jwt != null ?   <ProfilePage setTableInfoName={setTableInfoName} setTableInfoOwner={setTableInfoOwner}/> :<Navigate replace to="/"/>} />
                  <Route path="/newTable" element={<NewTableForm/>} />
                  <Route path="/tableInfo" element={<TableInfo name={tableInfoName} owner={tableInfoOwner} />} />

                  <Route path="/hub" element={<HubPage/>} />

                  <Route path="/controlAccess" element={<ControlAccessPage/>} />

                  <Route path="/settings" element={ loginAccess || cookies.jwt != null ? <SettingsPage/> : <Navigate replace to="/" />} />

                  <Route path="/about" element={<AboutPage/>} />

                  <Route path="404"  element={<Error/>}/>
                  <Route
                      path="*"
                      element={<Navigate to="404" replace />}
                  />
              </Routes>
              </Container>
          </BrowserRouter>

      </div>
  );
}

export default App;
