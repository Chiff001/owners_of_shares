import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {Button} from "reactstrap";
import {T_Personality} from "modules/types.ts";
import CustomTablePer from "components/CustomTable/CustomTablePer.tsx";
import {deletePersonality} from "store/slices/personalitysSlice.ts";
import {useAppDispatch} from "store/store.ts";

type Props = {
    personalitys:T_Personality[]
}

const PersonalitysTable = ({personalitys}:Props) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleClick = (personality_id) => {
        navigate(`/personalitys/${personality_id}`)
    }

    const openpRroductEditPage = (personality_id) => {
        navigate(`/personalitys/${personality_id}/edit`)
    }

    const handleDeletePersonality = async (personality_id) => {
        dispatch(deletePersonality(personality_id))
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Название',
                accessor: 'name',
                Cell: ({ value }) => value
            },
            {
                Header: 'Тип лица',
                accessor: 'type',
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "edit_button",
                Cell: ({ cell }) => (
                    <Button color="primary" onClick={() => openpRroductEditPage(cell.row.values.id)}>Редактировать</Button>
                )
            },
            {
                Header: "Удалить",
                accessor: "delete_button",
                Cell: ({ cell }) => (
                    <Button color="primary" onClick={() => handleDeletePersonality(cell.row.values.id)}>Удалить</Button>
                )
            }
        ],
        []
    )

    if (!personalitys.length) {
        return (
            <></>
        )
    }

    return (
        <CustomTablePer columns={columns} data={personalitys} onClick={handleClick} />
    )
};

export default PersonalitysTable
