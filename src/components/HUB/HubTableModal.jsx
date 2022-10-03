import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {FormText} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";


const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

const HubTableModal = ({table ,show , handleClose}) => {

    console.log(table)

    const [accessMessage,setAccessMessage] = useState('');

    const [requestResult,setRequestResult] = useState('');

    const sendAccessRequest = async (e) => {
        e.preventDefault();
        const reqData = {
            tableName: table.name,
            receiver: table.username,
            message: accessMessage,
        }
        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({...reqData})
        }

        const resp = await fetch(`${apiBasePath}/accessRequest`, reqOptions);
        const respJson = await resp.json();

        setRequestResult(respJson.message)

    }

    const addToOwnCollectionRequest = async (e) => {
        e.preventDefault();
        const reqData = {
            tableName: table.name,
            username: table.username,
        }
        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({...reqData})
        }

        const resp = await fetch(`${apiBasePath}/userAllowed`, reqOptions);
        const respJson = await resp.json();

        setRequestResult(respJson.message)
        alert(respJson.message)
    }





    return (
        <div>
            <Modal show={show} onHide={handleClose}  size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>{table.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormText>Desctiption: {table.description}</FormText>
                    <br/>
                    Owner : {table.username}


                    {
                        table.accessType &&
                        <Form.Group className="mb-3" controlId="AccessMessage">
                            <Form.Label>Message:</Form.Label>
                            <Form.Control type="text" placeholder="Enter message" value={accessMessage} onChange={(e) => { setAccessMessage(e.target.value); }}/>
                        </Form.Group>
                    }


                    {requestResult && <div>{requestResult}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>

                    {
                        table.accessType == 1 ? <Button className='accessButton' onClick={sendAccessRequest} variant="success">Send Access Request</Button>
                            : <Button className='addToOwnButton' onClick={addToOwnCollectionRequest} variant="success">Add to own collection</Button>
                    }
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default HubTableModal;
