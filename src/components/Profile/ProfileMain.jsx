import UserTokens from "./UserTokens";
import Tables from "./Tables";

const ProfileMain = (props) => {
    return (
        <div id="container">
            <br/>
            <UserTokens></UserTokens>
            <br/>

            <Tables setTableInfoName={props.setTableInfoName} setTableInfoOwner={props.setTableInfoOwner}></Tables>
        </div>
    );
};

export default ProfileMain;
