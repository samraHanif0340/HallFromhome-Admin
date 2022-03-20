import React from 'react'
import { useTable, useSortBy, useFilters, usePagination} from 'react-table'
import { Filter, DefaultColumnFilter } from './Filter';
import { Table, Row, Col, Button, Input } from "reactstrap"

export const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
}


const TableContainer = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
    prepareRow,
        // For Pagination
        canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
    } = useTable({
        columns,
        data,
        defaultColumn: { Filter: DefaultColumnFilter },
        initialState: { pageIndex: 0, pageSize: 5 }
    },
        useFilters,
        useSortBy,
        usePagination
    );

    const onChangeInSelect = event => {
        setPageSize(Number(event.target.value))
      }
      
      const onChangeInInput = event => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0
        gotoPage(page)
      }

    return (
        // If you're curious what props we get as a result of calling our getter functions (getTableProps(), getRowProps())
        // Feel free to use console.log()  This will help you better understand how react table works underhood.
        <>
        <Table  bordered hover {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th key={column.id}  {...column.getHeaderProps()}>
                                <div {...column.getSortByToggleProps()}>
                                    {column.render("Header")}
                                    {generateSortingIndicator(column)}
                                </div>
                                <Filter column={column} />
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody {...getTableBodyProps()}>
                {page.map(row => {
                    prepareRow(row)
                    return (
                        <tr key={row.id} {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td key={cell.id} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
         <Row style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
         <Col md={3}>
           <Button
             color="secondary"
             onClick={() => gotoPage(0)}
             disabled={!canPreviousPage}
           >
             {"<<"}
           </Button>
           <Button
             color="secondary"
             onClick={previousPage}
             disabled={!canPreviousPage}
           >
             {"<"}
           </Button>
         </Col>
         <Col md={2} style={{ marginTop: 7 }}>
           Page{" "}
           <strong>
             {pageIndex + 1} of {pageOptions.length}
           </strong>
         </Col>
         <Col md={2}>
           <Input
             type="number"
             min={1}
             style={{ width: 70 }}
             max={pageOptions.length}
             defaultValue={pageIndex + 1}
             onChange={onChangeInInput}
           />
         </Col>
         <Col md={2}>
           <Input type="select" value={pageSize} onChange={onChangeInSelect}>
             
             {[5, 10, 50, 100, 500].map(pageSize => (
               <option key={pageSize} value={pageSize}>
                  {pageSize}
               </option>
             ))}
           </Input>
         </Col>
         <Col md={3}>
           <Button color="secondary" onClick={nextPage} disabled={!canNextPage}>
             {">"}
           </Button>
           <Button
             color="secondary"
             onClick={() => gotoPage(pageCount - 1)}
             disabled={!canNextPage}
           >
             {">>"}
           </Button>
         </Col>
       </Row>
     </>
    )
}

export default TableContainer