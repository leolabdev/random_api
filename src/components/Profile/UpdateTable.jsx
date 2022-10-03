import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {convertStringToArr} from "../../utils/convertStringToArr";

const UpdateTable = ({table, setUpdateMode}) => {

    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

    const [updatableTable,setUpdatableTable] = useState({...table});

    const [elements,setElements] = useState(table.elements.map(el => el['value']).join(', '));

    const [updateRequestResult,setUpdateRequestResult] = useState('')


    const updateTable = async (event) => {
        event.preventDefault()
        const reqData = {
            name: updatableTable.name,
            description: updatableTable.description,
            accessType: updatableTable.accessType,
            elements: convertStringToArr(elements)
        }
        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify({...reqData})
        }

        const resp = await fetch(`${apiBasePath}/userDatabas`, reqOptions);
        const respJson = await resp.json();
        setUpdateRequestResult(respJson.message)
        alert(respJson);
    }

    console.log("ourTable",table);


    // useEffect(()=>{
    //     fetchUpdatableTable();
    // },[])

    return (
        <div>


            <h3>Update Table</h3>

            <Form>
                <Form.Group className="mb-3" controlId="tableName">
                    <Form.Label>Table name </Form.Label>
                    <Form.Control disabled type="text" placeholder="Enter table name" value={updatableTable.name}

                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tableDescription">
                    <Form.Label>Description </Form.Label>
                    <Form.Control as="textarea" placeholder="Enter table description" value={updatableTable.description}
                                  onChange={(e)=>{
                                      setUpdatableTable(current => {
                                          let description = {...current.description};
                                          description = e.target.value;
                                          return {...current,description}
                                      })
                                  }}

                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tableElements">
                    <Form.Label>Table elements </Form.Label>
                    <Form.Control as="textarea" placeholder="Enter table elements"
                                  value={elements}
                                  onChange={(e)=>setElements(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        Type elements separated by comma. Example: cat, dog, turtle
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="tableElements">
                    <Form.Label>Access type </Form.Label>
                    <Form.Select tclassName="mb-3" aria-label="Default select example" value={updatableTable.accessType}
                                 onChange={(e)=>{
                                     setUpdatableTable(current => {
                                         let accessType = {...current.accessType};
                                         accessType = e.target.value;
                                         return {...current,accessType}
                                     })
                                 }}
                    >
                        <option value="0">Public</option>
                        <option value="1">Access required</option>
                        <option value="2">Private</option>
                    </Form.Select>
                </Form.Group>

                <div className="d-flex gap-2">
                    <Button variant="primary" type="submit" onClick={()=>setUpdateMode(false)}>
                        Cancel
                    </Button>

                    <Button variant="success" type="submit" onClick={()=>updateTable()}>
                        Update table
                    </Button>
                </div>

                <br/>
                <Form.Text>{updateRequestResult}</Form.Text>
            </Form>

        </div>
    );
};

export default UpdateTable;
