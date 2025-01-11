import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

const CustomPagination = ({page, pageCount, setPage}) => {

    const firstPage = () => setPage(1)
    const lastPage = () => setPage(pageCount)
    const nextPage = () => setPage(page => page + 1)
    const previousPage = () =>  setPage(page => page - 1)

    return (
        <Pagination className="mt-4">
            <PaginationItem disabled={page == 1}>
                <PaginationLink onClick={firstPage} first />
            </PaginationItem>
            <PaginationItem disabled={page == 1}>
                <PaginationLink onClick={previousPage} previous />
            </PaginationItem>

            {page >= 3 &&
                <PaginationLink onClick={firstPage}>
                    1
                </PaginationLink>
            }

            {page >= 4 &&
                <PaginationLink>
                    <span>...</span>
                </PaginationLink>
            }

            {page >= 2 &&
                <PaginationItem>
                    <PaginationLink onClick={previousPage}>
                        <span>{ page - 1 }</span>
                    </PaginationLink>
                </PaginationItem>
            }

            <PaginationItem active>
                <PaginationLink>
                    <span>{ page }</span>
                </PaginationLink>
            </PaginationItem>

            {page <= pageCount - 1 &&
                <PaginationLink onClick={nextPage}>
                    { page + 1 }
                </PaginationLink>
            }

            { page <= pageCount - 3 &&
                <PaginationLink>
                    ...
                </PaginationLink>
            }

            { page <= pageCount - 2 &&
                <PaginationLink onClick={lastPage}>
                    { pageCount }
                </PaginationLink>
            }

            <PaginationItem disabled={page >= pageCount}>
                <PaginationLink onClick={nextPage} next />
            </PaginationItem>
            <PaginationItem disabled={page >= pageCount}>
                <PaginationLink onClick={lastPage} last />
            </PaginationItem>
        </Pagination>
    );
};

export default CustomPaginationimport {Pagination, PaginationItem, PaginationLink} from "reactstrap";

const CustomPagination = ({page, pageCount, setPage}) => {

    const firstPage = () => setPage(1)
    const lastPage = () => setPage(pageCount)
    const nextPage = () => setPage(page => page + 1)
    const previousPage = () =>  setPage(page => page - 1)

    return (
        <Pagination className="mt-4">
            <PaginationItem disabled={page == 1}>
                <PaginationLink onClick={firstPage} first />
            </PaginationItem>
            <PaginationItem disabled={page == 1}>
                <PaginationLink onClick={previousPage} previous />
            </PaginationItem>

            {page >= 3 &&
                <PaginationLink onClick={firstPage}>
                    1
                </PaginationLink>
            }

            {page >= 4 &&
                <PaginationLink>
                    <span>...</span>
                </PaginationLink>
            }

            {page >= 2 &&
                <PaginationItem>
                    <PaginationLink onClick={previousPage}>
                        <span>{ page - 1 }</span>
                    </PaginationLink>
                </PaginationItem>
            }

            <PaginationItem active>
                <PaginationLink>
                    <span>{ page }</span>
                </PaginationLink>
            </PaginationItem>

            {page <= pageCount - 1 &&
                <PaginationLink onClick={nextPage}>
                    { page + 1 }
                </PaginationLink>
            }

            { page <= pageCount - 3 &&
                <PaginationLink>
                    ...
                </PaginationLink>
            }

            { page <= pageCount - 2 &&
                <PaginationLink onClick={lastPage}>
                    { pageCount }
                </PaginationLink>
            }

            <PaginationItem disabled={page >= pageCount}>
                <PaginationLink onClick={nextPage} next />
            </PaginationItem>
            <PaginationItem disabled={page >= pageCount}>
                <PaginationLink onClick={lastPage} last />
            </PaginationItem>
        </Pagination>
    );
};

export default CustomPagination
