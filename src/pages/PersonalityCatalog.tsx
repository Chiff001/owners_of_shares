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

import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from "../slices/PersonalitySlice";

const PersonalityCatalog: FC = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector((state: any) => state.search.searchValue);
    const [loading, setLoading] = useState(false)
    const [catalog, setCatalog] = useState<PersonalityResult>()
    const navigate = useNavigate();

    const handleSearch = async () => {
        setLoading(true)
        getPersonalityByName(searchValue)
        .then((response) => setCatalog(response))
        .catch(() => { // В случае ошибки используем mock данные
            setCatalog(
                PERSONALITIES_MOCK
            )})
        setLoading(false)
    };

    const handleCardClick = (id: number) => {
        // клик на карточку, переход на страницу оборудования
        navigate(`${ROUTES.PERSONALITIES}/${id}`);
    };

    useEffect(() => {
        setLoading(true)
        getPersonalityByName(searchValue)
        .then((response) => setCatalog(response))
        .catch(() => { // В случае ошибки используем mock данные
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
                setValue={(value) => dispatch(setSearchValue(value))}
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
                    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                        {catalog.personalities.map((item, index) => (
                            <Col key={index}>
                                <PersonalityCard
                                    imageClickHandler={() => handleCardClick(item.id)}
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
