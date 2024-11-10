import "../style.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { useParams } from "react-router-dom";
import { Personality, getPersonalityById } from "../modules/PersonalityApi";
import LabNavigation from "../components/LabNav";
import { Col, Row, Spinner, Image, Container } from "react-bootstrap";
import default_image from "../1.png";
import { PERSONALITIES_MOCK } from "../modules/mock";


export const PersonalityPage: FC = () => {
  const [pageData, setPageData] = useState<Personality>();

  const { id } = useParams(); // ид страницы, пример: "/albums/12"

  useEffect(() => {
    if (!id) return;
    getPersonalityById(id)
      .then((response) => setPageData(response))
      .catch(
        () =>
          setPageData(
            PERSONALITIES_MOCK.personalities.find(
              (eq) => String(eq.id) == id
            )
          ) /* В случае ошибки используем мок данные, фильтруем по ид */
      );
  }, [id]);

  return (
    <Container>
      <LabNavigation company_name="Rusprofile"/>
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.PERSONALITIES, path: ROUTES.PERSONALITIES },
          { label: pageData?.name || "Физ/Юр лица" },
        ]}
      />
      {pageData ? ( // проверка на наличие данных, иначе загрузка
      <Row>
        <Col md={6}>
        <Image src={pageData.image || default_image}></Image>
        </Col>
        <Col md={6}>
        <h2>{pageData.name}</h2>
        <p className="type">{pageData.type}</p>
        <p>{pageData.number}</p>
        <p>{pageData.info}</p>
        </Col>
      </Row>
          
      ) : (
        <div className="album_page_loader_block">{/* загрузка */}
          <Spinner animation="border" />
        </div>
      )}
    </Container>
  );
};