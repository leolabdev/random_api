import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import {FormText, ListGroup, ListGroupItem} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";

const DeleteAccount = () => {

    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [usernameDelete,setUsernameDelete] = useState('')
    const [passwordDelete,setPasswordDelete] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const handleDeletingAccount = async (event) => {

        event.preventDefault();

        const reqObj = {
            username: usernameDelete,
            password: passwordDelete
        };

        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify(reqObj),
            credentials: 'include'
        }

        const resp = await fetch(`${apiBasePath}/register`, reqOptions);
        const respJson = await resp.json();
        const respResult = respJson.hasAccess;
        const respMessage = respJson.message;

        if(respResult === true){
            navigate('/');
            alert(respMessage)
        }
        else {
            respMessage ? setErrorMessage(respMessage) : setErrorMessage("server not available , try later")
        }
    }




    return (
        <div>

            <div className='list-group-flush'>
                <div>
                    <h3>Delete Account</h3>
                    <Button variant="danger" onClick={handleShow}>Confirm</Button>
                </div>
            </div>


            <Modal show={show} onHide={handleClose}  size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirming</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure? All data will be lost =(  <br/>
                    If you are sure, please feel the required information and press yes to delete the account:
                    <br/>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={(event)=>{
                            event.preventDefault();
                            setUsernameDelete(event.target.value);
                        }}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(event)=>{
                            event.preventDefault();
                            setPasswordDelete(event.target.value);
                        }}/>
                        <FormText>{errorMessage}</FormText>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeletingAccount}>
                       Yes
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
};

export default DeleteAccount;
