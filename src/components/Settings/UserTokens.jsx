import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';

//TODO: add delete token button

/**
 * Component for displaying users tokens, which are needed for getting a data from the server
 * @returns {JSX.Element}
 * @constructor
 */
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

    /**
     * fetch users' tokens request
     * @returns {Promise<void>}
     */
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
        <div id="userTokens">
            <h3>Your active tokens</h3>
            <Button variant="primary" onClick={createNewToken}>Create a new access token</Button>
            <br/>
            <br/>
            <ListGroup as="ol"  className = 'gap-2 gap-lg-3 gap-xl-3  gap-sm-3 gap-md-3 gap-xxl-4' numbered >
                {
                    userTokens.map((item, i)=>{
                        return <ListGroup.Item   as="li" key={i}  className='mt-6 p-6 text-nowrap' style={{overflow: 'auto'}}>{item.token  }</ListGroup.Item>
                    })
                }
            </ListGroup>
        </div>
    );
}

export default UserTokens;
