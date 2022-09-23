import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import {useCookies} from "react-cookie";

function Tables(props) {
    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    const [userTables, setUserTables] = useState([]);

    const navigate = useNavigate();

    const createNewTable = async () => {
        let path = `/newTable`;
        navigate(path);
    }

    const showTableInfo = async (tableName, tableOwner) => {
        props.setTableInfoName(tableName);
        props.setTableInfoOwner(tableOwner);
        let path = `/tableInfo`;
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

        const resp = await fetch(`${apiBasePath}/userDatabase?username=${cookies.username}`, reqOptions);
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
                        return <ListGroup.Item key={i} onClick={()=>{ showTableInfo(item.name, item.username)} }>{item.name}</ListGroup.Item>
                    })
                }
            </ListGroup>
        </div>
    );
}

export default Tables;