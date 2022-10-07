import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import { useCookies } from 'react-cookie';
import {useNavigate} from "react-router-dom";

/**
 * It deletes tables which user adds from the hub
 * @param tableName
 * @returns {JSX.Element}
 * @constructor
 */
const DeleteUserHasAccessTable = ({tableName}) => {

    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('')

    const [cookies] = useCookies();

    const handleDeletingTable = async (event) => {

        event.preventDefault();

        const reqObj = {
            name: tableName,
            username: cookies.username
        };
a
        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify(reqObj),
            credentials: 'include'
        }

        const resp = await fetch(`${apiBasePath}/userAllowed`, reqOptions);
        const respJson = await resp.json();
        const respResult = respJson.isSuccess;
        const respMessage = respJson.message;

        if(respResult == true){
            navigate(-1);
        }
        else {
            respMessage ? setErrorMessage(respMessage) : setErrorMessage("server not available , try later")
        }
    }


    return (
        <div className='list-group-flush'>
            <div>
                <h3>Delete Table</h3>
                <Button variant="danger"  onClick={(e)=>handleDeletingTable(e)}>Delete</Button>
                {errorMessage && <span style={{color:'red'}}>{errorMessage}</span>}
            </div>
        </div>
    );
};

export default DeleteUserHasAccessTable;
