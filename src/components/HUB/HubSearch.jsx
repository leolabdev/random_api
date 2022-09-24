import {useState} from 'react';
import {Card, Container} from "react-bootstrap";

function HubSearch(props) {

    const {hubTables} = props
    // const [tableSearchValue, setTableSearchValue] = useState();
    let [table, setTable] = useState({});

    function tableSearch(value) {

        let result = hubTables.filter(t => t.name.includes(value));
        console.log(result)
        if(result[0] !== undefined && value.length !== 0){
            setTable(result[0]);
        }
        else{setTable({})}
    }

    return (
        <div>
            <br />
            <input
                placeholder="Enter table name"
                // onChange={e => setTableSearchValue(e.target.value)}
                onChange={e => tableSearch(e.target.value)}
            />{" "}
            {/*<button onClick={tableSearch}>Search</button>*/}

            <Container
                style={{
                    margin: "0 auto",
                    padding: "3rem 7.5%",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly"
                }}
            >
                {Object.keys(table).length !== 0  ? (
                    <Card
                        key={table.id}
                        style={{ width: "25rem", margin: "1rem", textAlign: "center" ,cursor: 'pointer'}}
                    >
                        <Card.Body>
                            <Card.Title>
                                {/*{" "}*/}
                                <span style={{ fontWeight: "bold" }}>Table:</span>{" "}
                                {table.name}
                            </Card.Title>
                            <Card.Text>
                                <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
                                {table.description}
                            </Card.Text>
                            <Card.Text>
                                <span style={{ fontWeight: "bold" }}>Owner:</span>{" "}
                                {table.owner}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ) : (
                    ""
                )}
            </Container>
        </div>
    );
}

export default HubSearch;

