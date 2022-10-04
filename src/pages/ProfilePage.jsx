
import ProfileMain from "../components/Profile/ProfileMain";

/**
 * Profile page
 * @param setTableInfoName
 * @param setTableInfoOwner
 * @returns {JSX.Element}
 * @constructor
 */
function ProfilePage({setTableInfoName,setTableInfoOwner}) {
    return (

        <div>
            <ProfileMain setTableInfoName={setTableInfoName} setTableInfoOwner={setTableInfoOwner}/>
        </div>
    );
}

export default ProfilePage;
