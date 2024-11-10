import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../Routes";
import { Button, Col, Container, Row } from "react-bootstrap";
import LabNavigation from "../components/LabNav";
import "../style.css"

export const HomePage: FC = () => {
  return (
    
    <Container>
      <LabNavigation company_name="Rusprofile"/>
      <Row>
        <Col md={6}>
          <h1>Добро пожаловать!</h1>
          <p>
            На нашем сайте Вы сможете найти информацию о физических/юридических лицах и компаниях, которыми они владеют.
          </p>
          <Link to={ROUTES.PERSONALITIES}>
            <Button variant="primary">Просмотреть физ/юр лица</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};