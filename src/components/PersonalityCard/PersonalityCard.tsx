import {Button, Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {T_Personality} from "modules/types.ts";
import {
    removePersonalityFromDraftCompany,
    updatePersonalityValue
} from "store/slices/companysSlice.ts";
import {useEffect, useState} from "react";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {addPersonalityToCompany, fetchPersonalitys} from "store/slices/personalitysSlice.ts";
import {PERSONALITY_TYPE_DICT} from "modules/consts.ts";

type Props = {
    personality: T_Personality,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean
}

const PersonalityCard = ({personality, showAddBtn=false, showRemoveBtn=false, editMM=false}:Props) => {

    const dispatch = useAppDispatch()

    const {is_superuser} = useAppSelector((state) => state.user)

    const {save_mm} = useAppSelector(state => state.companys)

    const [local_count, setLocal_count] = useState(personality.count)

    const location = useLocation()

    const isCompanyPage = location.pathname.includes("companys")

    const handeAddToDraftCompany = async () => {
        await dispatch(addPersonalityToCompany(personality.id))
        await dispatch(fetchPersonalitys())
    }

    const handleRemoveFromDraftCompany = async () => {
        await dispatch(removePersonalityFromDraftCompany(personality.id))
    }

    useEffect(() => {
        save_mm && updateValue()
    }, [save_mm]);

    const updateValue = async () => {
        dispatch(updatePersonalityValue({
            personality_id: personality.id,
            count: local_count
        }))
    }

    if (isCompanyPage) {
        return (
            <Card key={personality.id}>
                <Row>
                    <Col>
                        <img
                            alt=""
                            src={personality.image}
                            style={{"width": "100%"}}
                        />
                    </Col>
                    <Col md={8}>
                        <CardBody>
                            <CardTitle tag="h5">
                                {personality.name}
                            </CardTitle>
                            <CardText>
                                Тип лица: {PERSONALITY_TYPE_DICT[personality.type]}
                            </CardText>
                            <CustomInput label="Количество акций" type="number" value={local_count} setValue={setLocal_count} disabled={!editMM || is_superuser} className={"w-25"}/>
                            <Col className="d-flex gap-5">
                                <Link to={`/personalitys/${personality.id}`}>
                                    <Button color="primary" type="button">
                                        Открыть
                                    </Button>
                                </Link>
                                {showRemoveBtn &&
                                    <Button color="primary" onClick={handleRemoveFromDraftCompany}>
                                        Удалить
                                    </Button>
                                }
                            </Col>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card key={personality.id} style={{width: '18rem' }}>
            <img
                alt=""
                src={personality.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {personality.name}
                </CardTitle>
                <CardText>
                    Тип лица: {PERSONALITY_TYPE_DICT[personality.type]}
                </CardText>
                <Col className="d-flex justify-content-between">
                    <Link to={`/personalitys/${personality.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {!is_superuser && showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftCompany}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default PersonalityCard
