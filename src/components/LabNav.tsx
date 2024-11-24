import { FC } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import './../style.css'
import { Link } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from "./../Routes";

interface Props {
  company_name: string
}

const LabNavigation: FC<Props> = ({ company_name }) => (
  <Navbar key="md" expand="md" className='myheader bg-body-tertiary mb-3'>
    <Container>
      <Navbar.Brand href="/"><Link to={ROUTES.HOME || ""}>{company_name}</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
      <Nav className="justify-content-end">
      <Nav.Link><Link to={ROUTES.HOME || ""}>{ROUTE_LABELS.HOME}</Link></Nav.Link>
      <Nav.Link><Link to={ROUTES.PERSONALITIES || ""}>{ROUTE_LABELS.PERSONALITIES}</Link></Nav.Link>
      </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

export default LabNavigation
