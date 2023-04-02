import { Navbar, Nav, Button,  Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CustomNavbar() {

  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">CinemaRank</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/top-rated">
              <Button variant="primary" className="btn-custom">
                Top Rated
              </Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/now-playing">
              <Button variant="primary" className="btn-custom">
                Now Playing
              </Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/upcoming">
              <Button variant="primary" className="btn-custom">
                Upcoming
              </Button>
            </Nav.Link>
          </Nav>
   
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;