import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {FormText} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";



const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

/**
 * Modal window for seeing the extra information about the table ,
 * and also it gives possibility add this table to the own collection'
 * (add directly if allowed or send request)
 * @param table
 * @param show
 * @param handleClose
 * @returns {JSX.Element}
 * @constructor
 */
const HubTableModal = ({table ,show , handleClose}) => {

    // console.log(table)

    const [accessMessage,setAccessMessage] = useState('');

    const [requestMessage,setRequestMessage] = useState('');

    const [requestResult,setRequestResult] = useState(true);

    const [hubTable,setHubTable] = useState({});

    const [cookie] = useCookies();

    /**
     * Here we get from the server the table
     * @param e event
     * @returns {Promise<void>}
     */
    const fetchHubTable = async (e)=> {
        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'GET',
            credentials: 'include'
        }
        const resp = await fetch(`${apiBasePath}/userDatabase/${table.name}?owner=${table.username}&includingElements=true`, reqOptions);

        const respJson = await resp.json();
        setHubTable(respJson.result);
    }

    /**
     * This function send the access request to the table's owner for adding the table to the own collection
     * @param e
     * @returns {Promise<void>}
     */
    const sendAccessRequest = async (e) => {
        e.preventDefault();
        const reqData = {
            tableName: hubTable.name,
            receiver: hubTable.username,
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

        setRequestMessage(respJson.message);

        setRequestResult(respJson.isSuccess);

    }

    /**
     * This function sends the request for adding the table to the own collection
     * @param e
     * @returns {Promise<void>}
     */
    const addToOwnCollectionRequest = async (e) => {
        e.preventDefault();
        const reqData = {
            name: hubTable.name,
            username: cookie.username,
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

        setRequestMessage(respJson.message);

        setRequestResult(respJson.isSuccess);

        console.log(respJson);

    }


    useEffect(()=>{
        if(show){
            fetchHubTable();
        }
    },[show])

    useEffect(()=>{
        setRequestMessage('')
    },[show])

    return (
        <div>
            <Modal show={show} onHide={handleClose}  size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton style={hubTable.accessType != 1 ?{backgroundColor:'lightgreen'} : {backgroundColor:'#ffd580'}}>
                    <Modal.Title>{hubTable.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormText>Description: {hubTable.description}</FormText>
                    <br/>
                    Owner : {hubTable.username}
                    <br/>
                    <span>Elements:</span>
                    <div style={{maxHeight: '150px',overflow : 'auto',marginTop: '0.3rem'}}>
                        <ul>
                        {hubTable?.elements?.map(element=>(
                               <li key={element.id}>{element.value}</li>
                        ) )}
                        </ul>
                    </div>


                    {
                        hubTable.accessType == 1 ?
                        <Form.Group className="mb-3" controlId="AccessMessage">
                            <Form.Label>Message:</Form.Label>
                            <Form.Control type="text" placeholder="Enter message" value={accessMessage} onChange={(e) => { setAccessMessage(e.target.value); }}/>
                        </Form.Group>
                            :
                            <span></span>
                    }


                    {requestMessage.length != '' ? <div style={requestResult === false ? {color: 'red'} : {color:''}}>{requestMessage}</div> : <span></span>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>

                    {
                        hubTable.accessType == 1 ? <Button className='accessButton' onClick={sendAccessRequest} variant="success">Send Access Request</Button>
                            : <Button className='addToOwnButton' onClick={addToOwnCollectionRequest} variant="success">Add to own collection</Button>
                    }
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default HubTableModal;
