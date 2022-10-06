import {useCookies} from "react-cookie";
import CopyTextButton from "../Shared/CopyTextButton";
import {ListGroupItem} from "react-bootstrap";

/**
 * Component for copying a table path
 * @param username
 * @param tableName
 * @returns {JSX.Element}
 * @constructor
 */
const TablePath = ({username,tableName}) => {



   const defaultPath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}/rand/${username}/${tableName}?token={your_token}&count=10`

    return (
        <div>
            <h3>API path</h3>
                <ListGroupItem style={{overflowX:'auto', whiteSpace:'nowrap'}}>{defaultPath}</ListGroupItem>
            <CopyTextButton value={defaultPath}/>
        </div>
    );
};

export default TablePath;
