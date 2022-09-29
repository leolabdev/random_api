import React from 'react';
import Button from "react-bootstrap/Button";
import DeleteAccount from "./DeleteAccount";
import UserTokens from "../Profile/UserTokens";

const SettingsMain = () => {
    return (

        <div>
            <br/>
            <UserTokens/>
            <br/>
            <DeleteAccount/>
        </div>
    );
};

export default SettingsMain;
