import UserTokens from "../components/UserTokens";
import Tables from "../components/Tables";



function ProfilePage(props) {
    // const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

    return (

        <div id="container">
            <br/>
            <UserTokens></UserTokens>
            <br/>

            <Tables setTableInfoName={props.setTableInfoName} setTableInfoOwner={props.setTableInfoOwner}></Tables>
        </div>
    );
}

export default ProfilePage;
