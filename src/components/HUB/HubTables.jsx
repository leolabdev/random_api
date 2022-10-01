import {Card} from "react-bootstrap";
import React, {useState} from "react";
import HubTableModal from "./HubTableModal";

const HubTables = ({hubTables}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (modalTable) =>{

        setModalTable(modalTable)
        setShow(true);
    }

    const [modalTable, setModalTable] = useState('')


    return (
        <div className="container d-flex flex-wrap justify-content-center">
            {hubTables.map((hubT) => (
                <div>
                    <Card
                        onClick={() => handleShow(hubT)}
                        key={hubT.id}
                        style={{ width: "25rem", margin: "2rem", textAlign: "center",cursor:'pointer' }}
                    >
                        <Card.Body style = {hubT.accessType == "0" ?  {backgroundColor: '#90EE90'} : hubT.accessType == "1" ? {backgroundColor: '#FFE898' } : {backgroundColor: '#ADD8E6'}}>
                            <Card.Title>
                                {" "}
                                <span style={{ fontWeight: "bold" }}>Table:</span> {hubT.name}
                            </Card.Title>
                            <Card.Text>
                                <span className='d-inline-block text-truncate' style={{maxWidth : '250px' ,fontWeight :'bold'}}>Description: {hubT.description}</span>
                            </Card.Text>
                            <Card.Text>
                                <span style={{ fontWeight: "bold" }}>Owner:</span> {hubT.username}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

            ))}
            <HubTableModal table={modalTable} handleClose={handleClose} show={show}/>
        </div>
    );
};

export default HubTables;
