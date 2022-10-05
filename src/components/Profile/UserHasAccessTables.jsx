import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

/**
 * Component for displaying tables to which an user has the access
 * @returns {JSX.Element}
 * @constructor
 */
const UserHasAccessTables = () => {

    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

    const [userHasAccessTables, setUserHasAccessTables] = useState([{}]);

    useEffect(() => {
        fetchUserHasAccessTables();
    }, []);

    const fetchUserHasAccessTables = async () => {
        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'GET',
            credentials: 'include'
        }

        const resp = await fetch(`${apiBasePath}/userAllowed`, reqOptions);
        const respJson = await resp.json();
        setUserHasAccessTables(respJson.result);
    }


    return (
        <div id="tables">

            <h3>You have access tables:</h3>


            <br/>

            <ListGroup as="ol" numbered className='gap-2 gap-lg-3 gap-xl-3  gap-sm-3 gap-md-3 gap-xxl-4'>
                {
                    (userHasAccessTables[0] != null)  ?
                    userHasAccessTables.map((item, i)=>{
                        return <ListGroup.Item  as='li' style={{cursor:'pointer' ,backgroundColor :'#FFB6C1'}} className=' w-50' key={i} onClick={()=>{ alert("hello")} }>{item.name} </ListGroup.Item>
                    })
                        :
                        <span></span>
                }
            </ListGroup>
        </div>
    );
};

export default UserHasAccessTables;
