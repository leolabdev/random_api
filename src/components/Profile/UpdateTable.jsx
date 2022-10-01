import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";

const UpdateTable = ({tableName,tableOwner,updateMode,setUpdateMode}) => {

    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

    const [updatableTable,setUpdatableTable] = useState({});

    const [requestResult, setRequestResult] = useState('');

    const fetchUpdatableTable = async () => {
        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'GET',
            credentials: 'include'
        }

        const resp = await fetch(`${apiBasePath}/userDatabase/${tableName}?owner=${tableOwner}`, reqOptions);
        const respJson = await resp.json();
        setUpdatableTable(respJson.result);
        console.log(respJson.result);

    }


    useEffect(()=>{
        fetchUpdatableTable();
    },[])

    return (
        <div>


            <h3>Update Table</h3>

            <Form>
                <Form.Group className="mb-3" controlId="tableName">
                    <Form.Label>Table name </Form.Label>
                    <Form.Control disabled type="text" placeholder="Enter table name"
                                  // onChange={(e) => { setTableName(e.target.value); }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tableDescription">
                    <Form.Label>Description </Form.Label>
                    <Form.Control as="textarea" placeholder="Enter table description"
                                  // onChange={(e) => { setTableDescription(e.target.value); }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tableElements">
                    <Form.Label>Table elements </Form.Label>
                    <Form.Control as="textarea" placeholder="Enter table elements"
                                  // onChange={(e) => { setTableElements(e.target.value); }}
                    />
                    <Form.Text className="text-muted">
                        Type elements separated by comma. Example: cat, dog, turtle
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="tableElements">
                    <Form.Label>Access type </Form.Label>
                    <Form.Select tclassName="mb-3" aria-label="Default select example" value={updatableTable.accessType}>
                        <option value="0">Public</option>
                        <option value="1">Access required</option>
                        <option value="2">Private</option>
                    </Form.Select>
                </Form.Group>

                <div className="d-flex gap-2">
                    <Button variant="primary" type="submit" onClick={()=>setUpdateMode(false)}>
                        Cancel
                    </Button>

                    <Button variant="success" type="submit" onClick={()=>alert("implement me")}>
                        Update table
                    </Button>
                </div>

                <br/>
                <Form.Text>{requestResult}</Form.Text>
            </Form>



        </div>
    );
};

export default UpdateTable;
