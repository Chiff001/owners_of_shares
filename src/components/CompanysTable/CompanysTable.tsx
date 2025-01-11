import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {formatDate} from "src/utils/utils.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {Button} from "reactstrap";
import {Company} from "src/api/Api.ts";
import {acceptCompany, fetchCompanys, rejectCompany} from "store/slices/companysSlice.ts";
import {E_CompanyStatus} from "modules/types.ts";
import {ACCREDITATION_DICT} from "modules/consts.ts";
import CustomPagination from "components/CustomPagination/CustomPagination.tsx";

type Props = {
    companys:Company[]
    page: number
    setPage: (page:number) => void
    pageCount: number
    refetch: () => void
}

const CompanysTable = ({companys, page, setPage, pageCount, refetch}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleClick = (company_id) => {
        navigate(`/companys/${company_id}`)
    }

    const handleAcceptCompany = async (company_id) => {
        await dispatch(acceptCompany(company_id))
        await dispatch(fetchCompanys())
        refetch()
    }

    const handleRejectCompany = async (company_id) => {
        await dispatch(rejectCompany(company_id))
        await dispatch(fetchCompanys())
        refetch()
    }

    const STATUSES = {
        1: "Черновик",
        2: "В работе",
        3: "Завершен",
        4: "Отменён",
        5: "Удалён"
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Статус',
                accessor: 'status',
                Cell: ({ value }) => STATUSES[value]
            },
            {
                Header: 'Аккредитация',
                accessor: 'accreditation',
                Cell: ({ value }) => ACCREDITATION_DICT[value]
            },
            {
                Header: 'Дата создания',
                accessor: 'date_created',
                Cell: ({ value }) => formatDate(value)
            },
            {
                Header: 'Дата формирования',
                accessor: 'date_formation',
                Cell: ({ value }) => formatDate(value)
            },
            {
                Header: 'Дата завершения',
                accessor: 'date_complete',
                Cell: ({ value }) => formatDate(value)
            }
        ],
        []
    )

    if (is_superuser) {
        columns.push(
            {
                Header: "Пользователь",
                accessor: "owner",
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "accept_button",
                Cell: ({ cell }) => (
                    cell.row.values.status == E_CompanyStatus.InWork && <Button color="primary" onClick={() => handleAcceptCompany(cell.row.values.id)}>Принять</Button>
                )
            },
            {
                Header: "Действие",
                accessor: "decline_button",
                Cell: ({ cell }) => (
                    cell.row.values.status == E_CompanyStatus.InWork && <Button color="primary" onClick={() => handleRejectCompany(cell.row.values.id)}>Отклонить</Button>
                )
            }
        )
    }

    return (
        <>
            <CustomTable columns={columns} data={companys} page={page} onClick={handleClick}/>
            <CustomPagination page={page} pageCount={pageCount} setPage={setPage} />
        </>
    )
};

export default CompanysTable
