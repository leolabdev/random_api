import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import LoginRegisterModal from "../components/LoginRegisterComponents/LoginRegisterModal";

function LoginRegisterPage(props) {
    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [statusLogin, setStatusLogin] = useState('');

    const [usernameRegister, setUsernameRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');

    const [passwordAgainRegister, setPasswordAgainRegister] = useState('');
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

        setUsernameLogin("");
        setPasswordLogin("");
    }

    const registerUser = async (event) => {
        event.preventDefault();


        if(passwordAgainRegister === passwordRegister){

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
        else{
            setStatusRegister("Passwords are not same, please try again");
        }

        setUsernameRegister('');
        setPasswordRegister('');
        setPasswordAgainRegister('');

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
                    setPasswordAgainRegister={setPasswordAgainRegister}

                    loginUser = {loginUser}
                    registerUser={registerUser}

                    statusLogin={statusLogin}
                    statusRegister={statusRegister}

                />
            </div>
    );
}

export default LoginRegisterPage;
