import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import LoginRegisterModal from "../components/Navbar/LoginRegisterComponents/LoginRegisterModal";

function LoginRegisterPage(props) {
    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [statusLogin, setStatusLogin] = useState('');

    const [usernameRegister, setUsernameRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [statusRegister, setStatusRegister] = useState('');

    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

    let [authMode, setAuthMode] = useState("signin")

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    const [modalShow, setModalShow] = useState(true);

    const loginUser = async (event) => {
        event.preventDefault();

        const reqObj = {
            username: usernameLogin,
            password: passwordLogin
        };

        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(reqObj),
            credentials: 'include'
        }

        const resp = await fetch(`${apiBasePath}/login`, reqOptions);
        const respJson = await resp.json();
        const respResult = respJson.hasAccess;
        const respMessage = respJson.message;
        setStatusLogin(respMessage);
        props.setLoginAccess(respResult);
    }

    const registerUser = async (event) => {
        event.preventDefault();

        const reqObj = {
            username: usernameRegister,
            password: passwordRegister
        };

        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(reqObj)
        }

        const resp = await fetch(`${apiBasePath}/register`, reqOptions);
        const respJson = await resp.json();
        const respResult = respJson.result;
        setStatusRegister(respResult);
    }

    return (
            <div>
                <LoginRegisterModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}

                    setUsernameLogin={setUsernameLogin}
                    setPasswordLogin={setPasswordLogin}

                    setUsernameRegister={setUsernameRegister}
                    setPasswordRegister={setPasswordRegister}

                    loginUser = {loginUser}
                    registerUser={registerUser}

                    statusLogin={statusLogin}
                    statusRegister={statusRegister}

                />
            </div>
        // <div id="container">
        //     <br/>
        //     {
        //         authMode === "signin"
        //             ?
        //             <Form centered>
        //                 {/*<Form.Text  className="text-muted">*/}
        //                 {/*    Sign In*/}
        //                 {/*</Form.Text>*/}
        //                 <h3 className="text-center">Sign In</h3>
        //
        //
        //                 <div className="text-center">
        //                     Not registered yet?{" "}
        //                     <span className="link-primary" onClick={changeAuthMode} style={{cursor:'pointer'}}>
        //                     Sign Up
        //                      </span>
        //                 </div>
        //
        //                 <Form.Group className="mb-3" controlId="formBasicEmail">
        //                     <Form.Label>Username</Form.Label>
        //                     <Form.Control type="text" placeholder="Enter username" onChange={(event)=>{
        //                         event.preventDefault();
        //                         setUsernameLogin(event.target.value);
        //                     }}/>
        //                 </Form.Group>
        //
        //                 <Form.Group className="mb-3" controlId="formBasicPassword">
        //                     <Form.Label>Password</Form.Label>
        //                     <Form.Control type="password" placeholder="Password" onChange={(event)=>{
        //                         event.preventDefault();
        //                         setPasswordLogin(event.target.value);
        //                     }}/>
        //                 </Form.Group>
        //                 <div className='d-grid gap-2'>
        //                     <Button variant="primary" type="submit"  onClick={loginUser}>
        //                         Submit
        //                     </Button>
        //                 </div>
        //                 <br/>
        //                 <Form.Text className="text-muted">
        //                     {statusLogin}
        //                 </Form.Text>
        //             </Form>
        //             :
        //             <Form>
        //
        //                 <h3 className="text-center">Sign Up</h3>
        //                 <div className="text-center">
        //                     Already registered?{" "}
        //                     <span className="link-primary" onClick={changeAuthMode} style={{cursor:'pointer'}}>
        //                     Sign In
        //                      </span>
        //                 </div>
        //                 <Form.Group className="mb-3" controlId="formBasicEmail">
        //                     <Form.Label>Username</Form.Label>
        //                     <Form.Control type="text" placeholder="Enter username" onChange={(event)=>{
        //                         event.preventDefault();
        //                         setUsernameRegister(event.target.value);
        //                     }}/>
        //                 </Form.Group>
        //
        //                 <Form.Group className="mb-3" controlId="formBasicPassword">
        //                     <Form.Label>Password</Form.Label>
        //                     <Form.Control type="password" placeholder="Password" onChange={(event)=>{
        //                         event.preventDefault();
        //                         setPasswordRegister(event.target.value);
        //                     }}/>
        //                 </Form.Group>
        //
        //                 <div className='d-grid gap-2'>
        //                     <Button id="registerButton" variant="primary" type="submit" onClick={registerUser}>
        //                         Submit
        //                     </Button>
        //                 </div>
        //
        //
        //                 <br/>
        //                 <Form.Text className="text-muted">
        //                     {statusRegister}
        //                 </Form.Text>
        //             </Form>
        //     }
        //     {/*<br/>*/}
        //     {/*<div>OR</div>*/}
        //     {/*<br/>*/}
        // </div>
    );
}

export default LoginRegisterPage;
