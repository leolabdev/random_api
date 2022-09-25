import React, {useState} from 'react';
import {Card, Container} from "react-bootstrap";

function HubSearch(props) {

    const {hubTables} = props
    const [tableSearchValue, setTableSearchValue] = useState('');
    const [matchedtables, setMatchedtables] = useState([{}]);

    function tableSearch(value) {

        setTableSearchValue(value)
        let result = hubTables.filter(t => t.name.includes(value));
        if(result[0] !== undefined && value.length !== 0){
            setMatchedtables(result);
        }
        else{setMatchedtables([])}
    }

    return (
        <div>
            <br />
            <input
                placeholder="Enter table name"
                onChange={e => tableSearch(e.target.value)}
            />{" "}
            {(matchedtables.length != 0 && tableSearchValue) && <><br/> <br/><h4>Matched Values:</h4></> }
            <div className="container d-flex flex-wrap justify-content-center">
                {(matchedtables.length != 0 && tableSearchValue)
                    ?
                    matchedtables.map((hubT) => (
                    <Card
                        key={hubT.id}
                        style={{ width: "25rem", margin: "2rem", textAlign: "center",cursor:'pointer' }}
                    >
                        <Card.Body>
                            <Card.Title>
                                {" "}
                                <span style={{ fontWeight: "bold" }}>Table:</span> {hubT.name}
                            </Card.Title>
                            <Card.Text>
                                <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
                                {hubT.description}
                            </Card.Text>
                            <Card.Text>
                                <span style={{ fontWeight: "bold" }}>Owner:</span> {hubT.owner}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
                    :
                        <span></span>
                }
            </div>
        </div>
    );
}

export default HubSearch;

