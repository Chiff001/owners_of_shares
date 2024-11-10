import { FC } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import './../style.css'

interface Props {
    company_name: string
}

const LabNavigation: FC<Props> = ({company_name}) => (
    <Navbar expand="lg" className='myheader'>
        <Container>
          <Navbar.Brand href="/">{company_name}</Navbar.Brand>
        </Container>
      </Navbar>
)

export default LabNavigation