import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, ListGroup} from "react-bootstrap";
import DeleteTable from "./DeleteTable";
import TableAccessDescription from "./TableAccessDescription";
import TablePath from "./TablePath";

/**
 * The information about the certain table where an user has access
 * @param tableName
 * @param tableOwner
 * @returns {JSX.Element}
 * @constructor
 */
const UserHasAccessTableInfo = ({tableName,tableOwner}) => {

    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;


    const navigate = useNavigate();

    const [table,setTable] = useState({});


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

        //TODO plz implement me
        const resp = await fetch(`${apiBasePath}/userAllowed/${tableName}?owner=${tableOwner}&includingElements=true`, reqOptions);
        const respJson = await resp.json();
        const result = respJson.result;
        setTable(result);
        console.log(result)
    }

    return (
        <div id="tableInfo">
            <br/>
            <TableAccessDescription/>

            <br/>
             <div><button onClick={() => navigate('/profile')}>Go back</button><br/><br/></div>

        <div style={{maxWidth:'100%'}}>
            <ListGroup style={{backgroundColor: '#FFB6C1',padding:'20px'}}>

                <h3>Table information</h3>

                <h4 >Name</h4>
                <p>{table.name && table.name}</p>

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
                <TablePath tableName={table.name} username={table.username} />
                <br/>
            </ListGroup>
        </div>

        </div>
    );
};

export default UserHasAccessTableInfo;
