import React from 'react';
import Button from "react-bootstrap/Button";
import DeleteAccount from "./DeleteAccount";
import UserTokens from "./UserTokens";

/**
 * Main component of the settings page
 * @returns {JSX.Element}
 * @constructor
 */
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
