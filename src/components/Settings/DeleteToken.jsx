import Button from "react-bootstrap/Button";
import React from "react";

const DeleteToken = ({token}) => {

    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

    const deleteToken = async (event) => {
        event.preventDefault();

        const reqObj = {
            token: token,
        };

        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify(reqObj),
            credentials: 'include'
        }

        const resp = await fetch(`${apiBasePath}/jwt`, reqOptions);
        const respJson = await resp.json();
        const respResult = respJson.isSuccess;
        const respMessage = respJson.message;
        if(!respResult){alert(respMessage)};
    }

    return (
        <div>
            <Button variant="danger" onClick={deleteToken}>Delete Token</Button>
        </div>
    );
};

export default DeleteToken;
