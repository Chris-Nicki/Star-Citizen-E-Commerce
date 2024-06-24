
//external imports
import { Link } from "react-router-dom"; //Link is essentially <a> tag but associated with the Routes we just created
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// saame as above but less efficient because its importing the whole entire bootstrap package
// import { Container, Nav, Navbar } from 'react-bootstrap; 


//internal import
import style from './NavBar.module.css'; 

function NavBar() {
  return (
    <Navbar expand="lg" className={`${style.navbar} bg-primary navbar-dark`}>
    <Container >
      <Navbar.Brand className="text-white"href="/">SCEC</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="border border-white"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link className={style["nav-links"]} href="/">Home</Nav.Link>
          <Nav.Link className={style["nav-links"]} href="/add-customer">Add Customers</Nav.Link>
          <Nav.Link className={style["nav-links"]} href="/customers">View Customers</Nav.Link>
          <Nav.Link className={style["nav-links"]} href="/add-orders">Add Orders</Nav.Link>
          <Nav.Link className={style["nav-links"]} href="/orders">View Orders</Nav.Link>
          <Nav.Link className={style["nav-links"]} href="/add-reviews">Add Reviews</Nav.Link>
          <Nav.Link className={style["nav-links"]} href="/reviews">View Reviews</Nav.Link>
          <Nav.Link className={style["nav-links"]} href="/add-products">Add Products</Nav.Link>
          <Nav.Link className={style["nav-links"]} href="/products">View Products</Nav.Link>
          
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar
