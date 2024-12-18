import {Container, Row} from "reactstrap";
import './HomePage.css';

const HomePage = () => {
	return (
		<div className="homepage-background">
        <Container className="homepage-content">
          <Row className="homepage-text">
              <h1>Добро пожаловать!</h1>
              <p>
                На нашем сайте Вы сможете найти информацию о физических/юридических лицах и компаниях, которыми они владеют.
              </p>
          </Row>
        </Container>
      </div>
	)
}

export default HomePage
