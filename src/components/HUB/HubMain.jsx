import React, {useEffect, useState} from 'react';
import HubSearch from "./HubSearch";
import {Card, ListGroup, ListGroupItem, Pagination} from "react-bootstrap";
import HubTables from "./HubTables";

const HubMain = () => {
    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;
    const [hubTables,setHubTables] = useState([{}])


    const fetchHubTables = async () => {
        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'GET',
            credentials: 'include'
        }

        const resp = await fetch(`${apiBasePath}/userDatabase`, reqOptions);
        const respJson = await resp.json();
        setHubTables(respJson.result);
    }

    useEffect( () => {
         fetchHubTables();
    }, []);

    return (
        <div style= {{textAlign:'center'}} >
            <br/>
            <h1>Global Hub</h1>
            <h2>Everybody is welcome to share and use the tables!</h2>
            <div  className='d-flex justify-content-center gap-3'
                   style={{textAlign : 'left'}}
            >
                    <div style={{color: "#ADD8E6", fontWeight: '700'}}>&#9632; <span>Private(Yours)</span></div>
                    <div style={{color: "#FFE898",fontWeight: '700'}}>&#9632; <span>Access required</span></div>
                    <div style={{color: "#90EE90",fontWeight: '700'}}>&#9632; <span>Public</span></div>
            </div>

            <h3>Search the certain table here:</h3>
            <HubSearch hubTables={hubTables}/>
            <hr />
            <br />
            <h1>All tables</h1>
            <HubTables hubTables={hubTables}/>
        </div>
    );
};

export default HubMain;
