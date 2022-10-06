import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";
import LoginRegisterModal from "../components/LoginRegisterComponents/LoginRegisterModal";

/**
 * Page for handling signin/signup
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function LoginRegisterPage(props) {
    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [statusLogin, setStatusLogin] = useState('');

    const [usernameRegister, setUsernameRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');

    const [passwordAgainRegister, setPasswordAgainRegister] = useState('');
    const [statusRegister, setStatusRegister] = useState('');

    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

    let [authMode, setAuthMode] = useState("signin");

    // const loginObjectValidator = {
    //
    // }

    let [loginObjectValidator,setLoginObjectValidator] = useState({
        loginV: '',
        passV: ''
    }) ;

    const [registerObjectValidator,setRegisterObjectValidator] = useState({
        loginV: '',
        passV: '',
        passAgV: ''
    });


    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }


    const [modalShow, setModalShow] = useState(true);


    /**
     * Login user request , we have an jwt in cookies
     * @param event
     * @returns {Promise<void>}
     */
    const loginUser = async (event) => {


        if(usernameLogin !== ''){
            setLoginObjectValidator(prev => ({...prev,loginV:''}))
        }
        if(passwordLogin !==''){
            setLoginObjectValidator(prev => ({...prev,passV:''}))
        }

        if(usernameLogin!== "" && passwordLogin !== ""){


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
            window.location.reload();

            // setUsernameLogin("");
            // setPasswordLogin("");
        }
        else{
            if(usernameLogin === ''){
                setLoginObjectValidator(prev => ({...prev,loginV:'Should not be empty!'}))
            }
            if(passwordLogin ===''){
                setLoginObjectValidator(prev => ({...prev,passV:'Should not be empty!'}))
            }

        }
    }


    /**
     * register an new user request
     * @param event
     * @returns {Promise<void>}
     */
    const registerUser = async (event) => {

        if(usernameRegister !== ''){
            setRegisterObjectValidator(prev => ({...prev,loginV:''}))
        }
        if(passwordRegister !==''){
            setRegisterObjectValidator(prev => ({...prev,passV:''}))
        }
        if(passwordAgainRegister !==''){
            setRegisterObjectValidator(prev => ({...prev,passAgV:''}))
        }

        if(usernameRegister!== '' && passwordRegister !== '' && passwordAgainRegister !== ''){
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

            // setUsernameRegister('');
            // setPasswordRegister('');
            // setPasswordAgainRegister('');

        }
        else {
            if(usernameRegister === ''){
                setRegisterObjectValidator(prev => ({...prev,loginV:'Should not be empty!'}))
            }
            if(passwordRegister ===''){
                setRegisterObjectValidator(prev => ({...prev,passV:'Should not be empty!'}))
            }
            if(passwordAgainRegister ===''){
                setRegisterObjectValidator(prev => ({...prev,passAgV:'Should not be empty!'}))
            }
        }


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

                    loginObjectValidator={loginObjectValidator}
                    registerObjectValidator={registerObjectValidator}

                />
            </div>
    );
}

export default LoginRegisterPage;
