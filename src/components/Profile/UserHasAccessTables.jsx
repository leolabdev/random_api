import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const UserHasAccessTables = () => {

    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

    const [userHasAccessTables, setUserHasAccessTables] = useState([]);

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
                    userHasAccessTables.map((item, i)=>{
                        return <ListGroup.Item  as='li' style={{cursor:'pointer' }} className=' w-50' key={i} onClick={()=>{ ""} }>{item.name} </ListGroup.Item>
                    })
                }
            </ListGroup>
        </div>
    );
};

export default UserHasAccessTables;