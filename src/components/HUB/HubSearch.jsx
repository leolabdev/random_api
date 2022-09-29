import React, {useState} from 'react';
import {Card, Container} from "react-bootstrap";
import HubTables from "./HubTables";

function HubSearch(props) {

    const {hubTables} = props
    const [tableSearchValue, setTableSearchValue] = useState('');
    const [matchedTables, setMatchedTables] = useState([{}]);

    function tableSearch(value) {

        setTableSearchValue(value)
        let result = hubTables.filter(t => t.name.includes(value));
        if(result[0] !== undefined && value.length !== 0){
            setMatchedTables(result);
        }
        else{setMatchedTables([])}
    }

    return (
        <div>
            <br />

            <input
                placeholder="Enter table name"
                onChange={e => tableSearch(e.target.value)}
            />{" "}
            {(matchedTables.length != 0 && tableSearchValue) && <><br/> <br/><h4>Matched Values:</h4></> }
            <div className="container d-flex flex-wrap justify-content-center">
                {(matchedTables.length != 0 && tableSearchValue)
                    ?
                    <div><HubTables hubTables={matchedTables} /> </div>
                    :
                        <span></span>
                }
            </div>
        </div>
    );
}

export default HubSearch;

