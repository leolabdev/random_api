import {useEffect, useState} from "react";

const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

function TableInfo(props) {
    const [tableName, setTableName] = useState('');
    const [tableDescription, setTableDescription] = useState('');
    const [tableOwner, setTableOwner] = useState('');

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
    }

    return (
        <div id="tableInfo">
            <br/>
            <h3>{tableName} table information</h3>

            <h4>Description</h4>
            <p>{tableDescription}</p>

            <h4>Owner</h4>
            <p>{tableOwner}</p>
        </div>
    );
}

export default TableInfo;
