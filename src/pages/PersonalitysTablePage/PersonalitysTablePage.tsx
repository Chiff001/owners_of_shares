import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchPersonalitys, updatePersonalityName} from "store/slices/personalitysSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import PersonalitysTable from "components/PersonalitysTable/PersonalitysTable.tsx";

const PersonalitysTablePage = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {personalitys, personality_name} = useAppSelector((state) => state.personalitys)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updatePersonalityName(e.target.value))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchPersonalitys())
    }

    useEffect(() => {
        dispatch(fetchPersonalitys())
    }, [])

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_authenticated, is_superuser]);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={personality_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col className="d-flex flex-row justify-content-end" md="6">
                    <Link to="/personalitys/add">
                        <Button color="primary">Новое лицо</Button>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-5 d-flex">
                {personalitys.length > 0 ? <PersonalitysTable personalitys={personalitys} fetchPersonalitys={fetchPersonalitys}/> : <h3 className="text-center mt-5">Лица не найдены</h3>}
            </Row>
        </Container>
    );
};

export default PersonalitysTablePage
