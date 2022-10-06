import {Container, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

import './Navbar.css'
import { ReactComponent as ProfileSvg } from '../../img/profile.svg';
import {useEffect, useState} from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {useCookies} from "react-cookie";

/**
 * Navbar menu component for moving around the application
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function NavbarComponent(props) {

    const [cookies] = useCookies(['cookie-name']);



    const {width} = useWindowDimensions();

    console.log(width)

    const navigate = useNavigate();

    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

    const [hover, setHover] = useState(false);

    const  logMeOut = async () => {
        const reqOptions = {
            method: 'GET',
            credentials: 'include'
        }

        const resp = await fetch(`${apiBasePath}/login/logout`,reqOptions);
        const respJson = await resp.json();
        const respResult = respJson.isSuccess;
        const respMessage = respJson.message;

        if(respResult == true){

            window.location.reload(false);
            navigate('/');


        }
    }



    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand onClick={()=>navigate('/')} style={{cursor : 'pointer'}}>Random-API</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {width < 991 && <Nav.Link onClick={()=>navigate('/')}>{cookies?.username}</Nav.Link>}
                        <Nav.Link  onClick={()=> navigate('/hub')}>HUB</Nav.Link>
                        <Nav.Link onClick={()=> navigate('/about')}>About</Nav.Link>
                    </Nav>

                    <Nav>

                        {
                            props.loginAccess !== false

                            ?
                                <NavDropdown title={
                                    (width > 991)
                                        ?
                                        <div className='d-flex flex-wrap gap-2'
                                             onMouseEnter={()=>{
                                                 setHover(true);}}
                                             onMouseLeave={()=>{
                                                 setHover(false);
                                             }}
                                        >
                                            <span className='mt-1' style={hover ? {color : '#E0E0E0'} :{color:'white' } }>{cookies?.username}</span>
                                            <ProfileSvg

                                                style={{width : '33px' }}
                                                fill = {hover ? '#E0E0E0' : 'white'} stroke={hover ? '#E0E0E0' : 'white'}  />
                                        </div>

                                :
                                        <span className='menu_text' style={{fontWeight : '700'}}>Menu  </span>
                                }>

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
