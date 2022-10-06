import {ListGroup, ListGroupItem} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";


/**
 * Messages for giving access by request of an user
 * @returns {JSX.Element}
 * @constructor
 */
const Messages = () => {

    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;


    let [messages,setMessages] = useState([]);


    /**
     * Here we get them from the server
     */
    useEffect(  () => {
        fetchAccessRequests();
    }, []);

    const fetchAccessRequests = async () => {
        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'GET',
            credentials: 'include'
        }

        const resp = await fetch(`${apiBasePath}/accessRequest`, reqOptions);
        const respJson = await resp.json();
        setMessages(respJson.result);
        console.log(respJson.result)
    }


    /**
     * function gives us a certain message from array of the messages
     * @param id
     * @returns {object} message
     */
    const findMessage = id => messages.find(({id})=> id === id);


    /**
     * By this function we decline an user's request for the access
     * @param id
     * @returns {Promise<void>}
     */
    const declineAccess = async (id) => {
        // alert("plz implement decline")

        const reqObj = {
            id: id,
        };

        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify(reqObj),
            credentials: 'include'
        }

        const resp = await fetch(`${apiBasePath}/accessRequest`, reqOptions);
        const respJson = await resp.json();
        const respResult = respJson.isSuccess;
        const respMessage = respJson.message;

        if(respResult){ setMessages(current => current.filter(message => message.id !== id))}

        alert(respMessage)

    }

    /**
     * Function for giving access to the required table
     * @param e
     * @param id{number}
     * @returns {Promise<void>}
     */
    const confirmAccess = async (id) => {

        const message = findMessage(id);

        const reqData = {
            username: message.sender,
            name: message.tableName,
        }
        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({...reqData})
        }

        const resp = await fetch(`${apiBasePath}/userAllowed`, reqOptions);
        const respJson = await resp.json();
        // setPostResult(respJson.message)

        if(respJson.isSuccess){
            const reqObj = {
                id: id
            };

            const reqOptions = {
                headers:{
                    'Content-Type': 'application/json'
                },
                method: "DELETE",
                body: JSON.stringify(reqObj),
                credentials: 'include'
            }

            await fetch(`${apiBasePath}/accessRequest`, reqOptions);
        }
    }


    return (

        <div>
            {
                (messages[0] !== undefined) &&
                messages.map((m)=> (

                    <ListGroup>
                       <ListGroupItem>
                           <ul>
                               <li> id : {m.id} </li>
                               <li>tableName : {m.tableName}</li>
                               <li>sender: {m.sender}</li>
                               <li>message: {m.message}</li>
                           </ul>
                           <div className="mb-2">
                               <Button variant="success" onClick={() =>confirmAccess(m.id)}>Confirm</Button>{' '}
                               <Button variant="danger" onClick={() => declineAccess(m.id)}>Decline</Button>
                           </div>
                       </ListGroupItem>
                        <br/>
                    </ListGroup>
                ))
            }
        </div>
    );
};

export default Messages;
