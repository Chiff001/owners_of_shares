import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftCompany,
    fetchCompany,
    removeCompany, sendDraftCompany,
    triggerUpdateMM, updateCompany
} from "store/slices/companysSlice.ts";
import {Button, Col, Form, Row} from "reactstrap";
import {E_CompanyStatus, T_Personality} from "modules/types.ts";
import PersonalityCard from "components/PersonalityCard/PersonalityCard.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";

const CompanyPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const company = useAppSelector((state) => state.companys.company)

    const [name, setName] = useState<string>(company?.name)

    const [description, setDescription] = useState<string>(company?.description)

    const [accreditation, setAccreditation] = useState<string>(company?.accreditation)

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/403/")
        }
    }, [is_authenticated]);

    useEffect(() => {
        is_authenticated && dispatch(fetchCompany(id))
        return () => dispatch(removeCompany())
    }, []);

    useEffect(() => {
        setName(company?.name)
        setDescription(company?.description)
        setAccreditation(company?.accreditation)
    }, [company]);

    const sendCompany = async (e) => {
        e.preventDefault()

        await saveCompany()

        await dispatch(sendDraftCompany())

        navigate("/companys/")
    }

    const saveCompany = async (e?) => {
        e?.preventDefault()

        const data = {
            name,
            description
        }

        await dispatch(updateCompany(data))
        await dispatch(triggerUpdateMM())
        await dispatch(triggerUpdateMM())
    }

    const deleteCompany = async () => {
        await dispatch(deleteDraftCompany())
        navigate("/personalitys/")
    }

    if (!company) {
        return (
            <></>
        )
    }

    const isDraft = company.status == E_CompanyStatus.Draft
    const isCompleted = company.status == E_CompanyStatus.Completed

    return (
        <Form onSubmit={sendCompany} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновая заявка" : `Заявка №${id}` }</h2>
            <Row className="mb-5 fs-5 w-25">
                <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName} disabled={!isDraft || is_superuser}/>
                <CustomTextarea label="Описание" placeholder="Введите название" value={description} setValue={setDescription} disabled={!isDraft || is_superuser}/>
                {isCompleted && <CustomInput label="Аккредитация" value={accreditation ? "Есть" : "Нет"} disabled={true}/>}
            </Row>
            <Row>
                {company.personalitys.length > 0 ? company.personalitys.map((personality:T_Personality) => (
                    <Row key={personality.id} className="d-flex justify-content-center mb-5">
                        <PersonalityCard personality={personality} showRemoveBtn={isDraft} editMM={isDraft}/>
                    </Row>
                )) :
                    <h3 className="text-center">Лица не добавлены</h3>
                }
            </Row>
            {isDraft && !is_superuser &&
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center">
                        <Button color="primary" className="fs-4" onClick={saveCompany}>Сохранить</Button>
                        <Button color="primary" className="fs-4" type="submit">Отправить</Button>
                        <Button color="primary" className="fs-4" onClick={deleteCompany}>Удалить</Button>
                    </Col>
                </Row>
            }
        </Form>
    );
};

export default CompanyPage
