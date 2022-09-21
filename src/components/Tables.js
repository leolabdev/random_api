import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function Tables() {
    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

    const [userTables, setUserTables] = useState([]);

    const navigate = useNavigate();

    const createNewTable = async () => {
        let path = `/newTable`;
        navigate(path);
    }

    useEffect(() => {
        fetchUserTables();
    }, []);

    const fetchUserTables = async () => {
        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'GET',
            credentials: 'include'
        }

        const resp = await fetch(`${apiBasePath}/userDatabase`, reqOptions);
        const respJson = await resp.json();
        setUserTables(respJson.result);
    }

    return (
        <div id="tables">
            <h3>Your tables</h3>
            <Button variant="primary" onClick={createNewTable}>Create a new table</Button>
            <ListGroup>
                {
                    userTables.map((item, i)=>{
                        return <ListGroup.Item key={i}>{item.name}</ListGroup.Item>
                    })
                }
            </ListGroup>
        </div>
    );
}

export default Tables;