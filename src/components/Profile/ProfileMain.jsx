// import UserTokens from "./UserTokens";
import Tables from "./Tables";
import UserHasAccessTables from "./UserHasAccessTables";
import React from "react";
import TableAccessDescription from "./TableAccessDescription";

const ProfileMain = (props) => {
    return (
        <div id="container">

            <br/>
            {/*<UserTokens></UserTokens>*/}
           <TableAccessDescription/>
            <br/>

            <Tables setTableInfoName={props.setTableInfoName} setTableInfoOwner={props.setTableInfoOwner}></Tables>

            <UserHasAccessTables/>
            <br/>
        </div>
    );
};

export default ProfileMain;
