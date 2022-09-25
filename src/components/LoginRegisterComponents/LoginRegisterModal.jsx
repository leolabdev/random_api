import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";





const LoginRegisterModal = (props) => {

    let [authMode, setAuthMode] = useState("signin")

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    return (
        <div>
            {
                authMode === "signin"
                    ?
                    <Modal
                        {...props}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        backdrop="static"
                    >
                        <Modal.Header className='text-center'>
                            {/*<Modal.Title   id="contained-modal-title-vcenter " >*/}
                            {/*    */}
                            {/*</Modal.Title>*/}
                            <h3 className="modal-title w-100 ">Sign In</h3>
                        </Modal.Header>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode} style={{cursor:'pointer'}}>
                            Sign Up
                        </span>
                        </div>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" onChange={(event)=>{
                                    event.preventDefault();
                                    props.setUsernameLogin(event.target.value);
                                }}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(event)=>{
                                    event.preventDefault();
                                    props.setPasswordLogin(event.target.value);
                                }}/>
                            </Form.Group>
                            <Form.Text className="text-muted">
                                {props.statusLogin}
                            </Form.Text>
                            {/*<h4>Centered Modal</h4>*/}
                            {/*<p>*/}
                            {/*    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,*/}
                            {/*    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac*/}
                            {/*    consectetur ac, vestibulum at eros.*/}
                            {/*</p>*/}

                        </Modal.Body>
                        <Modal.Footer style={{display:'block'}}>
                            {/*<Button onClick={props.onHide}>Close</Button>*/}
                            <div className='d-grid gap-2'>
                                <Button variant="primary" type="submit"  onClick={props.loginUser}>
                                    Submit
                                </Button>
                            </div>

                        </Modal.Footer>
                    </Modal>
                    :
                    <Modal
                        {...props}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        backdrop="static"
                    >
                        <Modal.Header className='text-center'>
                            {/*<Modal.Title   id="contained-modal-title-vcenter " >*/}
                            {/*    */}
                            {/*</Modal.Title>*/}
                            <h3 className="modal-title w-100 ">Sign Up</h3>
                        </Modal.Header>
                        <div className="text-center">
                            Already registered?{" "}
                            <span className="link-primary" onClick={changeAuthMode} style={{cursor:'pointer'}}>
                            Sign In
                             </span>
                        </div>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username " onChange={(event)=>{
                                    event.preventDefault();
                                    props.setUsernameRegister(event.target.value);
                                }}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password " onChange={(event)=>{
                                    event.preventDefault();
                                    props.setPasswordRegister(event.target.value);
                                }}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password again</Form.Label>
                                <Form.Control type="password" placeholder="Password again" onChange={(event)=>{
                                    event.preventDefault();
                                    props.setPasswordAgainRegister(event.target.value);
                                }}/>
                            </Form.Group>
                            <Form.Text className="text-muted">
                                {props.statusRegister}
                            </Form.Text>
                            {/*<h4>Centered Modal</h4>*/}
                            {/*<p>*/}
                            {/*    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,*/}
                            {/*    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac*/}
                            {/*    consectetur ac, vestibulum at eros.*/}
                            {/*</p>*/}

                        </Modal.Body>
                        <Modal.Footer style={{display:'block'}}>
                            {/*<Button onClick={props.onHide}>Close</Button>*/}
                            {/*<div className='d-grid gap-2'>*/}
                            {/*    <Button variant="primary" type="submit"  onClick={props.loginUser}>*/}
                            {/*        Submit*/}
                            {/*    </Button>*/}
                            {/*</div>*/}
                            <div className='d-grid gap-2'>
                                <Button id="registerButton" variant="primary" type="submit" onClick={props.registerUser}>
                                    Submit
                                </Button>
                            </div>

                        </Modal.Footer>
                    </Modal>

            }

        </div>
    );
};

export default LoginRegisterModal;
