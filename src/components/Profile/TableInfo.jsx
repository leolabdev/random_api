import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TableAccessDescription from "./TableAccessDescription";
import DeleteTable from "./DeleteTable";
import UpdateTable from "./UpdateTable";
import {Button, ListGroup} from "react-bootstrap";
// import DeleteTable from "./deleteTable";

const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

function TableInfo(props) {

    const navigate = useNavigate();

    const [table,setTable] = useState({});

    const [updateMode,setUpdateMode] = useState(false);

    useEffect(() => {
        fetchTableData();
    },[]);

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

                    <h3> table information</h3>

                    <h4 >Description</h4>
                    <p>{table.description && table.description}</p>

                    <h4>Owner</h4>
                    <p>{table.username && table.username}</p>

                        <div className="elements" style={{maxHeight : "200px"}}>
                            <h4>Table Elements</h4>

                            {table.elements && table.elements.map((element,id) => (
                                <ul key={id}>
                                    <li key={id}>{element.value}</li>
                                </ul>
                            ))}
                        </div>
                    <br/>
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
