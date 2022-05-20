//import {useState} from 'react'
//import styles from './NavBar.module.css'
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = ({}) => {
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home">HyuCamp</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/campgrounds">All Campgrounds</Nav.Link>
            <Nav.Link href="/campgrounds/new">New Campground</Nav.Link>
            <Nav.Link href="#pricing">Edit Campground</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
export default NavBar;
