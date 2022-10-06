import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TableAccessDescription from "./TableAccessDescription";
import DeleteTable from "./DeleteTable";
import UpdateTable from "./UpdateTable";
import {Button, ListGroup} from "react-bootstrap";
// import DeleteTable from "./deleteTable";
import './TableInfo.css'

const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

/**
 * Component for showing the certain table's info
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function TableInfo(props) {

    const navigate = useNavigate();

    const [table,setTable] = useState({});

    const [updateMode,setUpdateMode] = useState(false);

    useEffect(() => {
        fetchTableData();
    },[]);

    /**
     * Function fetch the certain table data from the server
     * @param e
     * @returns {Promise<void>}
     */
    const fetchTableData = async (e) => {
        // e.stopPropagation();
        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'GET',
            credentials: 'include'
        }

        const resp = await fetch(`${apiBasePath}/userDatabase/${props.name}?owner=${props.owner}&includingElements=true`, reqOptions);
        const respJson = await resp.json();
        const result = respJson.result;

        setTable(result);

        // if element doesnt have values we cannot use it
        !props.name && navigate('/');

        console.log(result);

    }


    return (
        <div id="tableInfo" style={{}}>
            <br/>
            <TableAccessDescription/>

            <br/>
            {!updateMode && <div><button onClick={() => navigate('/profile')}>Go back</button><br/><br/></div>  }


            {updateMode !== true ?
                <div style={{maxWidth:'100%'}}>
                    <ListGroup style={table?.accessType == "0"
                        ?
                        {backgroundColor: '#90EE90',padding : '20px 0px 20px 20px'}
                        :
                        table.accessType == "1"
                            ? {backgroundColor: '#FFD580',padding : '20px' }
                            : {backgroundColor: '#ADD8E6',padding : '20px'}}>

                    <h3>Table information</h3>

                    <h4 >Description</h4>
                    <p>{table.description && table.description}</p>

                    <h4>Owner</h4>
                    <p>{table.username && table.username}</p>

                        <h4>Table Elements</h4>
                        <div className="elements" style={{maxHeight : "200px" ,overflow: 'auto'}}>
                            <ul>
                            {table.elements && table.elements.map((element,id) => (
                                    <li key={element.id}>{element.value}</li>
                            ))}
                            </ul>
                        </div>

                    <h3>Update Table</h3>
                    <Button style={{maxWidth:'80px'}} onClick={()=>setUpdateMode(!updateMode)}>Update</Button>

                    <br/>

                    <DeleteTable tableName={table.name}/>
                    </ListGroup>
                </div>
                :
                <div>
                    <UpdateTable
                        table={table}
                        setUpdateMode={setUpdateMode}
                    />
                </div>
            }

            <br/>



        </div>
    );
}

export default TableInfo;
