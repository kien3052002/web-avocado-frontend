import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  faAtom,
  faCompassDrafting,
  faFilm,
  faMicrochip,
  faPalette,
  faPenNib,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../static/images/avocado.png";

const NavigationBar = () => {
  let navigate = useNavigate();

  function changeLocation(path) {
    if (window.location.pathname === path) {
      navigate(path, { replace: true });
      window.location.reload();
    }
  }

  const { currUser, logout } = useContext(AuthContext);
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} />
          Avocado
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="username">{currUser?.username}</div>

          <Nav>
            {currUser ? (
              <>
                <Nav.Link href="/myPosts">My Posts</Nav.Link>
                <Nav.Link href="/write">
                  <FontAwesomeIcon icon={faPenNib} /> Write
                </Nav.Link>
              </>
            ) : (
              <></>
            )}
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item href="/?cat=art">
                <FontAwesomeIcon icon={faPalette} /> Art
              </NavDropdown.Item>
              <NavDropdown.Item href="/?cat=science">
                <FontAwesomeIcon icon={faAtom} /> Science
              </NavDropdown.Item>
              <NavDropdown.Item href="/?cat=design">
                <FontAwesomeIcon icon={faCompassDrafting} /> Design
              </NavDropdown.Item>
              <NavDropdown.Item href="/?cat=cinema">
                <FontAwesomeIcon icon={faFilm} /> Cinema
              </NavDropdown.Item>
              <NavDropdown.Item href="/?cat=food">
                <FontAwesomeIcon icon={faUtensils} /> Food
              </NavDropdown.Item>
              <NavDropdown.Item href="/?cat=technology">
                <FontAwesomeIcon icon={faMicrochip} /> Technology
              </NavDropdown.Item>
            </NavDropdown>
            {currUser ? (
              <Nav.Link onClick={logout}>
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link href="/login">
                  <FontAwesomeIcon icon={faRightToBracket} /> Login
                </Nav.Link>
                <Nav.Link href="/register">
                  <FontAwesomeIcon icon={faUserPlus} size="sm" /> Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
