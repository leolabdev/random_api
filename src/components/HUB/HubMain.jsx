import React, {useState} from 'react';
import HubSearch from "./HubSearch";
import {Card, Pagination} from "react-bootstrap";

const HubMain = () => {

   const [hubTables,setHubTables] = useState([

       {    id: 6,
            name: "test6",
            description: "The best kings ever",
            owner: "The king"
       },
       {    id: 1,
           name: "test1",
           description: "The best bomjes ever",
           owner: "The bomj"
       },
       {    id: 3,
           name: "test3",
           description: "The best students ever",
           owner: "The student"
       },
       {    id: 4,
           name: "test4",
           description: "The best lawyers ever",
           owner: "The lawyer"
       },
       {    id: 5,
           name: "test5",
           description: "The best bosses ever",
           owner: "The boss"
       },
       {   id: 10,
           name: "superbossbeforesleep",
           description: "The best superbossesbeforesleep ever",
           owner: "The Leo"
       },
   ]);

    return (
        <div style= {{textAlign:'center'}} >
            <br/>
            <h1>Global Hub</h1>
            <h2>Everybody is welcome to share and use the tables!</h2>
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
                ))}
            </div>
            <div className="container d-flex justify-content-center">
            </div>
        </div>
    );
};

export default HubMain;
