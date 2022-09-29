import UserTokens from "./UserTokens";
import Tables from "./Tables";
import UserHasAccessTables from "./UserHasAccessTables";

const ProfileMain = (props) => {
    return (
        <div id="container">
            <br/>
            <UserTokens></UserTokens>
            <br/>

            <Tables setTableInfoName={props.setTableInfoName} setTableInfoOwner={props.setTableInfoOwner}></Tables>

            <UserHasAccessTables/>
            <br/>
        </div>
    );
};

export default ProfileMain;
