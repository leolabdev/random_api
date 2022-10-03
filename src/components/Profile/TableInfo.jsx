import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TableAccessDescription from "./TableAccessDescription";
import DeleteTable from "./DeleteTable";
import UpdateTable from "./UpdateTable";
import {Button} from "react-bootstrap";
// import DeleteTable from "./deleteTable";

const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

function TableInfo(props) {

    const navigate = useNavigate();

    const [tableName, setTableName] = useState('');
    const [tableDescription, setTableDescription] = useState('');
    const [tableOwner, setTableOwner] = useState('');
    const [tableAccessType, setTableAccessType] = useState('');
    const [tableId, setTableId] = useState('');

    const [updateMode,setUpdateMode] = useState(false);

    useEffect(() => {
        fetchTableData();
    });

    const fetchTableData = async () => {
        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'GET',
            credentials: 'include'
        }

        const resp = await fetch(`${apiBasePath}/userDatabase/${props.name}?owner=${props.owner}`, reqOptions);
        const respJson = await resp.json();
        const result = respJson.result;
        setTableName(result.name);
        setTableDescription(result.description);
        setTableOwner(result.username);
        setTableAccessType(result.accessType)
        setTableId(result.id);
    }

    return (
        <div id="tableInfo">
            <br/>
            <TableAccessDescription/>

            <br/>
            <button onClick={() => navigate(-1)}>Go back</button>
            <br/><br/>

            {updateMode !== true ?
                <div>
                    <h3   style={tableAccessType == "0"
                        ?
                        {backgroundColor: '#90EE90'}
                        :
                        tableAccessType == "1"
                            ? {backgroundColor: '#FFD580' }
                            : {backgroundColor: '#ADD8E6'}}>{tableName} table information</h3>

                    <h4>Description</h4>
                    <p>{tableDescription}</p>

                    <h4>Owner</h4>
                    <p>{tableOwner}</p>

                    <h3>Update Table</h3>
                    <Button onClick={()=>setUpdateMode(!updateMode)}>Update</Button>
                    <br/>
                    <br/>

                    <DeleteTable tableName={tableName}/>
                </div>
                :
                <div>
                    <UpdateTable
                        updateMode={updateMode}
                        setUpdateMode={setUpdateMode}
                        tableName={tableName}
                        tableOwner={tableOwner}
                    />
                </div>
            }

            <br/>



        </div>
    );
}

export default TableInfo;
