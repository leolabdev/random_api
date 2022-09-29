import {Card} from "react-bootstrap";
import React from "react";

const HubTables = ({hubTables}) => {
    return (
        <div className="container d-flex flex-wrap justify-content-center">
            {hubTables.map((hubT) => (
                <Card
                    onClick={()=>console.log(hubTables)}
                    key={hubT.id}
                    style={{ width: "25rem", margin: "2rem", textAlign: "center",cursor:'pointer' }}
                >
                    <Card.Body style = {hubT.accessType == "0" ?  {backgroundColor: '#ADD8E6'} : hubT.accessType == "1" ? {backgroundColor: '#FFE898' } : {backgroundColor: '#90EE90'}}>
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
            ))}
        </div>
    );
};

export default HubTables;
