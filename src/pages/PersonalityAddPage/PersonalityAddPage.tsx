import {Button, Col, Container, Row} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import React, {useEffect, useState} from "react";
import mock from "src/assets/mock.png"
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";
import {createPersonality} from "store/slices/personalitysSlice.ts";
import {T_PersonalityAddData} from "modules/types.ts";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.tsx";

const PersonalityAddPage = () => {

    const {is_superuser} = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>()

    const [description, setDescription] = useState<string>()

    const [type, setType] = useState<number>()

    const [number, setNumber] = useState<string>()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const navigate = useNavigate()

    const [imgFile, setImgFile] = useState<File>()
    const [imgURL, setImgURL] = useState(mock)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }

    const handleCreatePersonality = async() => {
        if (!name || !description || !type || !number) {
            return
        }

        const formData = new FormData()

        console.log(number)

        formData.append('name', name)
        formData.append('description', description)
        formData.append('number', number as string)
        formData.append('type', type as string)

        if (imgFile != undefined) {
            formData.append('image', imgFile, imgFile.name)
        }

        await dispatch(createPersonality(formData as T_PersonalityAddData))

        navigate("/personalitys-table/")
    }

    const typeOptions = {
        1: "Физическое",
        2: "Юридическое"
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <img src={imgURL as string} alt="" className="w-100"/>
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
                        <Button color="primary" className="fs-4" onClick={handleCreatePersonality}>Создать</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default PersonalityAddPage
