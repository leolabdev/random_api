import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
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

    const handleDeletingTable = async (event) => {

        event.preventDefault();

        const reqObj = {
            name: tableName,
        };

        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify(reqObj),
            credentials: 'include'
        }

        //TODO how to delete this table?
        // const resp = await fetch(`${apiBasePath}/userDatabase`, reqOptions);
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
                <Button variant="danger"  onClick={()=>handleDeletingTable()}>Delete</Button>
                {errorMessage && <span style={{color:'red'}}>{errorMessage}</span>}
            </div>
        </div>
    );
};

export default DeleteUserHasAccessTable;
