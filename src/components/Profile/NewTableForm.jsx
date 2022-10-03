import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import TableAccessDescription from "./TableAccessDescription";
import {convertStringToArr} from "../../utils/convertStringToArr";

const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

function NewTableForm() {

    const navigate = useNavigate();

    const [tableName, setTableName] = useState('');
    const [tableDescription, setTableDescription] = useState('');
    const [tableElements, setTableElements] = useState('');
    const [accessType , setAccessType] = useState("0");

    const [postResult , setPostResult] = useState('');

    const createNewTable = async (e) => {
        e.preventDefault();
        const reqData = {
            name: tableName,
            description: tableDescription,
            accessType: accessType,
            elements: convertStringToArr(tableElements)
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

        setPostResult(respJson.message)

    }



    return (
        <div id="newTableForm">
            <br/>

            <TableAccessDescription/>
            <br/>

            <button onClick={() => navigate(-1)}>Go back</button>
            <br/><br/>
            <h3>Create new table</h3>

            <Form>
                <Form.Group className="mb-3" controlId="tableName">
                    <Form.Label>Table name </Form.Label>
                    <Form.Control type="text" placeholder="Enter table name" onChange={(e) => { setTableName(e.target.value); }}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="tableDescription">
                    <Form.Label>Description </Form.Label>
                    <Form.Control as="textarea" placeholder="Enter table description" onChange={(e) => { setTableDescription(e.target.value); }}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="tableElements">
                    <Form.Label>Table elements </Form.Label>
                    <Form.Control as="textarea" placeholder="Enter table elements" onChange={(e) => { setTableElements(e.target.value); }}/>
                    <Form.Text className="text-muted">
                        Type elements separated by comma. Example: cat, dog, turtle
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="tableElements">
                    <Form.Label>Access type </Form.Label>
                <Form.Select tclassName="mb-3" aria-label="Default select example" value={accessType} onChange={(e)=> setAccessType(e.target.value)}>
                    <option value="0">Public</option>
                    <option value="1">Access required</option>
                    <option value="2">Private</option>
                </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={createNewTable}>
                    Create table
                </Button>
                <br/>
                <Form.Text>{postResult}</Form.Text>
            </Form>
        </div>
    );
}

export default NewTableForm;
