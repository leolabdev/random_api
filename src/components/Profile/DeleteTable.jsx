import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useNavigate} from "react-router-dom";


const DeleteTable = ({tableName}) => {

    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [errorMessage, setErrorMessage] = useState('')

    const handleDeletingTable = async (event) => {

        event.preventDefault();

        const reqObj = {
            name: tableName,
        };

        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify(reqObj),
            credentials: 'include'
        }

        const resp = await fetch(`${apiBasePath}/userDatabase`, reqOptions);
        const respJson = await resp.json();
        const respResult = respJson.isSuccess;
        const respMessage = respJson.message;

        if(respResult == true){
            navigate(-1);
        }
        else {
            respMessage ? setErrorMessage(respMessage) : setErrorMessage("server not available , try later")
        }
    }



    return (
        <div>
            <div className='list-group-flush'>
                <div>
                    <h3>Delete Table</h3>
                    <Button variant="danger" onClick={handleShow}>Delete</Button>
                </div>
            </div>


            <Modal show={show} onHide={handleClose}  size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirming</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   Are you sure? <br/>
                    {errorMessage && <span style={{color:'red'}}>{errorMessage}</span>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeletingTable}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DeleteTable;
