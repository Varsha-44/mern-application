import React, { useContext } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { UserContext } from '../../App';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavBar = ({ setSelectedComponent }) => {
  const user = useContext(UserContext);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleOptionClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <h3>Study App</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <NavLink className="nav-link" to="#" onClick={() => handleOptionClick('home')}>Home</NavLink>
            {user.userData.type === 'Teacher' && (
              <NavLink className="nav-link" to="#" onClick={() => handleOptionClick('addcourse')}>Add Course</NavLink>
            )}
            {user.userData.type === 'Admin' && (
              <NavLink className="nav-link" to="#" onClick={() => handleOptionClick('courses')}>Courses</NavLink>
            )}
            {user.userData.type === 'Student' && (
              <NavLink className="nav-link" to="#" onClick={() => handleOptionClick('enrolledcourses')}>Enrolled Courses</NavLink>
            )}
          </Nav>
          <Nav className="ml-auto">
            <h5 className="mx-3">Hi {user.userData.name}</h5>
            <Button onClick={handleLogout} size="sm" variant="outline-danger">Log Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavBar.propTypes = {
  setSelectedComponent: PropTypes.func.isRequired,
};

export default NavBar;
