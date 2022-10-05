import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {convertStringToArr} from "../../utils/convertStringToArr";

/**
 * Component for updating own tables
 * @param table
 * @param setUpdateMode
 * @returns {JSX.Element}
 * @constructor
 */
const UpdateTable = ({table, setUpdateMode}) => {

    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

    const [updatableTable,setUpdatableTable] = useState({...table});

    const [elements,setElements] = useState(table.elements.map(el => el['value']).join(', '));

    const [updateRequestResult,setUpdateRequestResult] = useState('')


    const [validated, setValidated] = useState(false);


    /**
     * update tables request
     * @param event
     * @returns {Promise<void>}
     */
    const updateTable = async (event) => {
        const form = event.currentTarget;

        event.preventDefault();

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
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

            const resp = await fetch(`${apiBasePath}/userDatabase`, reqOptions);
            const respJson = await resp.json();
            setUpdateRequestResult(respJson.message)
            alert(respJson);
        }
        setValidated(true);
    }

    console.log("ourTable",table);


    return (
        <div>


            <h3>Update Table</h3>

            <Form noValidate validated={validated} onSubmit={updateTable}>
                <Form.Group className="mb-3" controlId="tableName">
                    <Form.Label>Table name </Form.Label>
                    <Form.Control disabled type="text" placeholder="Enter table name" value={updatableTable.name}
                    />

                </Form.Group>

                <Form.Group className="mb-3" controlId="tableDescription">
                    <Form.Label>Description </Form.Label>
                    <Form.Control as="textarea" required placeholder="Enter table description" value={updatableTable.description}
                                  onChange={(e)=>{
                                      setUpdatableTable(current => {
                                          let description = {...current.description};
                                          description = e.target.value;
                                          return {...current,description}
                                      })
                                  }}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter table description
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="tableElements">
                    <Form.Label>Table elements </Form.Label>
                    <Form.Control as="textarea"  required placeholder="Enter table elements"
                                  value={elements}
                                  onChange={(e)=>setElements(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter table elements
                    </Form.Control.Feedback>
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

                    <Button variant="success" type="submit">
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
