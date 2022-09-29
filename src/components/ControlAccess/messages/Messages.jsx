import {ListGroup, ListGroupItem} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Messages = () => {

    const messages = [
        {id : 1, username : "petya" , message : "hello i am petya" },
        {id : 2, username : "vasya" , message : "hello i am vasya" },
        {id : 3, username : "misha" , message : "hello i am misha" },
        {id : 4, username : "leo" , message : "hello i am leo" },
        {id : 5, username : "andrew" , message : "hello i am andrew" },
    ]

    return (

        <div>
            {
                messages.map((m)=> (

                    <ListGroup>
                       <ListGroupItem>
                           id : {m.id} , username: {m.username}, message: {m.message}
                           <br/><br/>
                           <div className="mb-2">
                               <Button variant="success">Confirm</Button>{' '}
                               <Button variant="danger">Decline</Button>
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
