import "../style.css";
import { FC, useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Personality, PersonalityResult, getPersonalityByName, getPersonality } from "../modules/PersonalityApi";
import InputField from "../components/InputField";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { PersonalityCard } from "../components/PersonalityCard";
import LabNavigation from "../components/LabNav";
import { useNavigate } from "react-router-dom";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { PERSONALITIES_MOCK } from "../modules/mock";

const PersonalityCatalog: FC = () => {
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [catalog, setCatalog] = useState<PersonalityResult>()
    const [[application_id, application_count], setApplication] = useState([-1, 0])

    const navigate = useNavigate();

    const handleSearch = async () => {
        setLoading(true)
        getPersonalityByName(searchValue)
        .then((response) => setCatalog(response))
        .catch(() => { // В случае ошибки используем mock данные, фильтруем по имени
            setCatalog(
                PERSONALITIES_MOCK
            )})
        setLoading(false)
    };

    const handleCardClick = (id: number) => {
        // клик на карточку, переход на страницу оборудования
        navigate(`${ROUTES.PERSONALITIES}/${id}`);
    };

    const handleAddToApplication = async (id: number) => {
        await addToApplication(id);
        await handleSearch();
    }

    useEffect(() => {
        setLoading(true)
        getPersonalityByName(searchValue)
        .then((response) => setCatalog(response))
        .catch(() => { // В случае ошибки используем mock данные, фильтруем по имени
            setCatalog(
                PERSONALITIES_MOCK
            )})
        setLoading(false)
    }, [])

    return (
        <Container>
            <LabNavigation company_name="Rusprofile"/>
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.PERSONALITIES }]} />

            <InputField
                value={searchValue}
                setValue={(value) => setSearchValue(value)}
                loading={loading}
                onSubmit={handleSearch}
            />

            {loading && ( // здесь можно было использовать тернарный оператор, но это усложняет читаемость
                <div className="loadingBg">
                    <Spinner animation="border" />
                </div>
            )}
            {!loading &&
                (!catalog /* Проверка на существование данных */ ? (
                    <div>
                        <h1>К сожалению, пока ничего не найдено :(</h1>
                    </div>
                ) : (
                    <Row xs={4} md={4} className="g-4">
                        {catalog.personalities.map((item, index) => (
                            <Col key={index}>
                                <PersonalityCard
                                    imageClickHandler={() => handleCardClick(item.id)}
                                    addToApplication={() => handleAddToApplication(item.id)}
                                    {...item}
                                />
                            </Col>
                        ))}
                    </Row>
                ))}
        </Container>
    );
};

export default PersonalityCatalog