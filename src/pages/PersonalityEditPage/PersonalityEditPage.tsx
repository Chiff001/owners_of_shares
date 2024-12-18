import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deletePersonality,
    fetchPersonality,
    removeSelectedPersonality,
    updatePersonality,
    updatePersonalityImage
} from "store/slices/personalitysSlice.ts";
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.tsx";

const PersonalityEditPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {personality} = useAppSelector((state) => state.personalitys)

    const {is_superuser} = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>(personality?.name)

    const [description, setDescription] = useState<string>(personality?.description)

    const [type, setType] = useState<number>(personality?.type)

    const [number, setNumber] = useState<number>(personality?.number)

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const navigate = useNavigate()

    const [imgFile, setImgFile] = useState<File>()
    const [imgURL, setImgURL] = useState<string>(personality?.image)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }

    const savePersonality = async() => {
        if (imgFile) {
            const form_data = new FormData()
            form_data.append('image', imgFile, imgFile.name)
            await dispatch(updatePersonalityImage({
                personality_id: personality.id,
                data: form_data
            }))
        }

        const data = {
            name,
            description,
            type,
            number
        }

        await dispatch(updatePersonality({
            personality_id: personality.id,
            data
        }))

        navigate("/personalitys-table/")
    }

    useEffect(() => {
        dispatch(fetchPersonality(id))
        return () => dispatch(removeSelectedPersonality())
    }, []);

    useEffect(() => {
        setName(personality?.name)
        setDescription(personality?.description)
        setNumber(personality?.number)
        setType(personality?.type)
        setImgURL(personality?.image)
    }, [personality]);

    const handleDeletePersonality = async () => {
        await dispatch(deletePersonality(id))
        navigate("/personalitys-table/")
    }

    const typeOptions = {
        1: "Физическое",
        2: "Юридическое"
    }

    if (!personality) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <img src={imgURL} alt="" className="w-100"/>
                    <Container className="mt-3 d-flex justify-content-center">
                        <UploadButton handleFileChange={handleFileChange} />
                    </Container>
                </Col>
                <Col md={6}>
                    <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName}/>
                    <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription}/>
                    <CustomDropdown label="Тип лица" options={typeOptions} selectedItem={type} setSelectedItem={setType} className="d-flex flex-column mb-3"/>
                    <CustomInput label="Код лица" placeholder="Введите код" value={number} setValue={setNumber}/>
                    <Col className="d-flex justify-content-center gap-5 mt-5">
                        <Button color="success" className="fs-4" onClick={savePersonality}>Сохранить</Button>
                        <Button color="danger" className="fs-4" onClick={handleDeletePersonality}>Удалить</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default PersonalityEditPage
