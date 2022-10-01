import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {FormText} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";
import ModalContext from "react-bootstrap/ModalContext";

const HubTableModal = ({table ,show , handleClose}) => {
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>

                    {
                        table.accessType == 1 ? <Button className='accessButton' onClick={()=> alert ("implement me")} variant="success">Send Access Request</Button>
                            : <Button className='addToOwnButton' onClick={()=> alert ("implement me")} variant="success">Add to own collection</Button>
                    }
                    {/*<Button variant="success" onClick={()=> alert ("implement me")}>*/}
                    {/*    Yes*/}
                    {/*</Button>*/}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default HubTableModal;
