import {Container, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function NavbarComponent(props) {


    const navigate = useNavigate();

    // const UserMenu = (
    //     <Image
    //         src={'./profile.svg'}
    //         alt="UserName profile image"
    //        /* roundedCircle*/
    //         style={{ width: '40px' }}
    //     />
    // )

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand onClick={()=>navigate('/')} style={{cursor : 'pointer'}}>Random-API</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link  onClick={()=> navigate('/hub')}>HUB</Nav.Link>
                        <Nav.Link onClick={()=> navigate('/about')}>About</Nav.Link>
                        {/*<Nav.Link href="#pricing">Pricing</Nav.Link>*/}

                        {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">*/}
                        {/*    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="#action/3.2">*/}
                        {/*        Another action*/}
                        {/*    </NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Divider />*/}
                        {/*    <NavDropdown.Item href="#action/3.4">*/}
                        {/*        Separated link*/}
                        {/*    </NavDropdown.Item>*/}
                        {/*</NavDropdown>*/}

                    </Nav>

                    <Nav>

                    {/*    <Nav.Link href="#features"></Nav.Link>*/}

                        {
                            props.loginAccess !== false

                            ?
                                <NavDropdown title="Profile Img Here">

                                    <NavDropdown.Item onClick={()=>navigate('/profile')}>Profile</NavDropdown.Item>

                                    <NavDropdown.Item onClick={()=>navigate('/settings')}>Settings</NavDropdown.Item>

                                    <NavDropdown.Divider />

                                    <NavDropdown.Item href="#action/1.3" style={{color: 'red'}}>
                                        Log out
                                    </NavDropdown.Item>

                                </NavDropdown>
                            :
                                    <Nav.Link onClick={()=>navigate('/')}>Log in</Nav.Link>
                        }


                        {/*<Nav.Link eventKey={2} href="#memes">
                            Profile
                        </Nav.Link>*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
