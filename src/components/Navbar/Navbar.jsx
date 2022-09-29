import {Container, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

import './Navbar.css'



import { ReactComponent as ProfileSvg } from '../../img/profile.svg';
import {useState} from "react";

function NavbarComponent(props) {


    const navigate = useNavigate();

    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

    const [hover, setHover] = useState(false);

    const  logMeOut = async () => {


        const reqOptions = {
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'GET',
        }

        const resp = await fetch(`http://${apiBasePath}/login/logout`,reqOptions);
        const respJson = await resp.json();
        const result = respJson.result;
    }



    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand onClick={()=>navigate('/')} style={{cursor : 'pointer'}}>Random-API</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link  onClick={()=> navigate('/hub')}>HUB</Nav.Link>
                        <Nav.Link onClick={()=> navigate('/about')}>About</Nav.Link>
                    </Nav>

                    <Nav>

                        {
                            props.loginAccess !== false

                            ?
                                <NavDropdown title={<ProfileSvg
                                    onMouseEnter={()=>{
                                        setHover(true);}}
                                    onMouseLeave={()=>{
                                        setHover(false);}}
                                    style={{width : '33px' }}
                                    fill = {hover ? '#E0E0E0' : 'white'} stroke={hover ? '#E0E0E0' : 'white'}  />}>
                                    <NavDropdown.Item onClick={()=>navigate('/profile')}>Profile</NavDropdown.Item>

                                    <NavDropdown.Item onClick={()=>navigate('/controlAccess')}>Access Control</NavDropdown.Item>

                                    <NavDropdown.Item onClick={()=>navigate('/settings')}>Settings</NavDropdown.Item>

                                    <NavDropdown.Divider />

                                    <NavDropdown.Item onClick={() => logMeOut()} style={{color: 'red'}}>
                                        Log out
                                    </NavDropdown.Item>

                                </NavDropdown>
                            :
                                    <Nav.Link onClick={()=>navigate('/')}>Log in</Nav.Link>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
