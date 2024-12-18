import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchPersonalitys, updatePersonalityName} from "store/slices/personalitysSlice.ts";
import PersonalityCard from "components/PersonalityCard/PersonalityCard.tsx";
import Bin from "components/Bin/Bin.tsx";

const PersonalitysListPage = () => {

    const dispatch = useAppDispatch()

    const {personalitys, personality_name} = useAppSelector((state) => state.personalitys)

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {draft_company_id, personalitys_count} = useAppSelector((state) => state.companys)

    const hasDraft = draft_company_id != null

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
                {is_authenticated && !is_superuser &&
                    <Col className="d-flex flex-row justify-content-end" md="6">
                        <Bin isActive={hasDraft} draft_company_id={draft_company_id} personalitys_count={personalitys_count} />
                    </Col>
                }
            </Row>
            <Row className="mt-5 d-flex">
                {personalitys?.map(personality => (
                    <Col key={personality.id} className="mb-5 d-flex justify-content-center" sm="12" md="6" lg="4">
                        <PersonalityCard personality={personality} showAddBtn={is_authenticated} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PersonalitysListPage
