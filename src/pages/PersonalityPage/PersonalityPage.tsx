import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchPersonality, removeSelectedPersonality} from "store/slices/personalitysSlice.ts";
import {PERSONALITY_TYPE_DICT} from "modules/consts.ts";

const PersonalityPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {personality} = useAppSelector((state) => state.personalitys)

    useEffect(() => {
        dispatch(fetchPersonality(id))
        return () => dispatch(removeSelectedPersonality())
    }, []);

    if (!personality) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={personality.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{personality.name}</h1>
                    <p className="fs-5">Описание: {personality.description}</p>
                    <p className="fs-5">Тип лица: {PERSONALITY_TYPE_DICT[personality.type]}</p>
                    <p className="fs-5">Код: {personality.number}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default PersonalityPage
