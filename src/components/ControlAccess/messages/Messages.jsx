import {ListGroup, ListGroupItem} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";

const Messages = () => {

    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;


    let [messages,setMessages] = useState([
        // { id: 7, sender: "test", receiver: "mike", tableName: "cars", message: null },
        // {id : 1, username : "petya" , message : "hello i am petya" },
        // {id : 2, username : "vasya" , message : "hello i am vasya" },
        // {id : 3, username : "misha" , message : "hello i am misha" },
        // {id : 4, username : "leo" , message : "hello i am leo" },
        // {id : 5, username : "andrew" , message : "hello i am andrew" }]);
]);


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


    const findMessage = id => messages.find(({id})=> id === id);

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

        if(respResult){ setMessages(current => current.filter(message => message.id != id))}

        alert(respMessage)

    }

    const confirmAccess = async (e,...params) => {
        // alert("plz implement confirm")

         // e.preventDefault();

        const message = findMessage(params.id);

        console.log(message)

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

        const resp = await fetch(`${apiBasePath}/userDatabase`, reqOptions);
        const respJson = await resp.json();

        console.log(reqData);
        // setPostResult(respJson.message)

        if(respJson.isSuccess) {
            setMessages(current => current.filter(message => message.id != params.id));
        }
        alert(respJson.message);
    }




    return (

        <div>
            {
                (messages[0] != undefined) &&
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
