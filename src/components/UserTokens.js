import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';

function UserTokens() {
    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

    const [userTokens, setUserTokens] = useState([]);

    const createNewToken = async () => {
        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include'
        }

        await fetch(`${apiBasePath}/jwt`, reqOptions);
        fetchUserTokens();
    }

    useEffect(() => {
        fetchUserTokens();
    }, []);

    const fetchUserTokens = async () => {
        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'GET',
            credentials: 'include'
        }

        const resp = await fetch(`${apiBasePath}/jwt`, reqOptions);
        const respJson = await resp.json();
        setUserTokens(respJson.result);
    }

    return (
        <div id={userTokens}>
            <h3>Your active tokens</h3>
            <Button variant="primary" onClick={createNewToken}>Create a new access token</Button>
            <ListGroup>
                {
                    userTokens.map((item, i)=>{
                        return <ListGroup.Item key={i}>{item.token}</ListGroup.Item>
                    })
                }
            </ListGroup>
        </div>
    );
}

export default UserTokens;