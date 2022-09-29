
import ProfileMain from "../components/Profile/ProfileMain";

function ProfilePage(props) {
    return (

        <div>
            <ProfileMain setTableInfoName={props.setTableInfoName} setTableInfoOwner={props.setTableInfoOwner}/>
        </div>
    );
}

export default ProfilePage;
