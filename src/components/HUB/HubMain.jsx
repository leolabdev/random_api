import React, {useEffect, useState} from 'react';
import HubSearch from "./HubSearch";
import {Card, ListGroup, ListGroupItem, Pagination} from "react-bootstrap";

const HubMain = () => {
    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;
   // const [hubTables,setHubTables] = useState([
   //
   //     {    id: 6,
   //          name: "test6",
   //          description: "The best kings ever",
   //          owner: "The king"
   //     },
   //     {    id: 1,
   //         name: "test1",
   //         description: "The best bomjes ever",
   //         owner: "The bomj"
   //     },
   //     {    id: 3,
   //         name: "test3",
   //         description: "The best students ever",
   //         owner: "The student"
   //     },
   //     {    id: 4,
   //         name: "test4",
   //         description: "The best lawyers ever",
   //         owner: "The lawyer"
   //     },
   //     {    id: 5,
   //         name: "test5",
   //         description: "The best bosses ever",
   //         owner: "The boss"
   //     },
   //     {   id: 10,
   //         name: "superbossbeforesleep",
   //         description: "The best superbossesbeforesleep ever",
   //         owner: "The Leo"
   //     },
   // ]);

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
                    <div style={{color: "#ADD8E6", fontWeight: '700'}}>&#9632; <span>Private</span></div>
                    <div style={{color: "#FFE898",fontWeight: '700'}}>&#9632; <span>Access required</span></div>
                    <div style={{color: "#90EE90",fontWeight: '700'}}>&#9632; <span>Public</span></div>
            </div>

            <h3>Search the certain table here:</h3>
            <HubSearch hubTables={hubTables}/>
            <hr />
            <br />
            <h1>All tables</h1>
            <div className="container d-flex flex-wrap justify-content-center">
                {hubTables.map((hubT) => (
                    <Card

                        key={hubT.id}
                        style={{ width: "25rem", margin: "2rem", textAlign: "center",cursor:'pointer' }}
                    >
                        <Card.Body style = {hubT.accessType == "0" ?  {backgroundColor: '#ADD8E6'} : hubT.accessType == "1" ? {backgroundColor: '#FFE898' } : {backgroundColor: '#90EE90'}}>
                            <Card.Title>
                                {" "}
                                <span style={{ fontWeight: "bold" }}>Table:</span> {hubT.name}
                            </Card.Title>
                            <Card.Text>
                                <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
                                {hubT.description}
                            </Card.Text>
                            <Card.Text>
                                <span style={{ fontWeight: "bold" }}>Owner:</span> {hubT.username}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <div className="container d-flex justify-content-center">
            </div>
        </div>
    );
};

export default HubMain;
