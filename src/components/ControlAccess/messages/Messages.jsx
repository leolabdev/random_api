import {ListGroup, ListGroupItem} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";

const Messages = () => {

    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;


    let [messages,setMessages] = useState([
        { id: 7, sender: "test", receiver: "mike", tableName: "cars", message: null },
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



    const declineAccess = (id) => {
        alert("plz implement decline")
        setMessages(current => current.filter(message => message.id != id))
    }

    const confirmAccess = (id) => {
        alert("plz implement confirm")
        setMessages(current => current.filter(message => message.id != id))
    }


    return (

        <div>
            {
                (messages[0] != undefined) &&
                messages.map((m)=> (

                    <ListGroup>
                       <ListGroupItem>
                           id : {m.id} , tableName : {m.tableName}, sender: {m.sender}, message: {m.message}
                           <br/><br/>
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
