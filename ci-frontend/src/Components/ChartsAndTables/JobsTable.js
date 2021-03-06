import { useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTable, usePagination } from 'react-table';
import { Columns } from './Columns';

import { useState, useEffect, useContext } from 'react';
import { Context } from '../../Store/appContext';

const JobsTable = ({allJobs}) => {
    const { store, actions } = useContext(Context);
    const history = useHistory();

    const columns = useMemo(() => Columns, []);
    const data = useMemo(() => allJobs, [allJobs]);

    // const getJobInfo = (e) => {
    //     store.setStore({jobName: e.target.value})
    // };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        prepareRow
    } = useTable({
        columns,
        data
        },
        usePagination
    );

    const { pageIndex, pageSize } = state;

    var startPage, endPage;

    if (pageCount <= 5) {
        startPage = pageCount - pageCount;
        endPage = pageCount - 1;
    } else {
        if(pageIndex <= 2) {
            startPage = pageCount - pageCount;
            endPage = (pageCount + 4) - pageCount;
        } else if (pageIndex + 2 >= pageCount) {
            startPage = pageCount - 4;
            endPage = pageCount - 1;
        } else {
            startPage = pageIndex - 2;
            endPage = pageIndex + 2;
        }
    }

    var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

    
    return (
        <>
            <table {...getTableProps()} className = "table table-striped table-hover">
                <thead className = "table-light">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                            
                        </tr>
                    ))}
                    
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map( (cell) => {
                                    return (cell.column.Header === "Job Id" ? 
                                    <td {...cell.getCellProps()}>
                                        <button onClick = {
                                            () => actions.getJobStats(row.values.id)
                                            .then(
                                                () => history.push({pathname: `/jobs/${row.values.id}`, state: {jobName: row.values.id}})
                                            )
                                        }>
                                            {cell.render('Cell')}
                                        </button>
                                    </td> 
                                    : 
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
            {data.length <= 10 ? <></> :
                <nav aria-label = "Page navigation pagination">
                    <ul className="pagination justify-content-center">
                        <li className = {(!canPreviousPage) ? "page-item disabled" : "page-item"}>
                            <button className = "page-link" onClick = {() => gotoPage(0)}><span aria-hidden="true">&laquo;</span></button>
                        </li>
                        <li className = {(!canPreviousPage) ? "page-item disabled" : "page-item"}>
                            <button className = "page-link" onClick = {() => previousPage()}>Previous</button>
                        </li>
                        {pages.map((page) =>
                            <li className = {pageIndex === (page) ? "page-item active" : "page-item"}>
                                <button className = "page-link" onClick={() => {gotoPage(page); }}>{page + 1}</button>
                            </li>
                        )}
                        <li className = {(!canNextPage) ? "page-item disabled" : "page-item"}>
                            <button className = "page-link" onClick = {() => nextPage()}>Next</button>
                        </li>
                        <li className = {(!canNextPage) ? "page-item disabled" : "page-item"}>
                            <button className = "page-link" onClick = {() => gotoPage(pageCount - 1)}><span aria-hidden="true">&raquo;</span></button>
                        </li>
                    </ul>
                    <span>{' '}<strong>Pages: {pageOptions.length}</strong>{' '}</span>
                    <div>
                        <span><strong>Results per Page:{' '}</strong>
                            <select 
                                value = {pageSize}
                                onChange = {(e) => setPageSize(Number(e.target.value))}>
                                {
                                    [10, 25, 50, 100].map(pageSize => (
                                        <option key = {pageSize} value = {pageSize}>
                                            {pageSize}
                                        </option>
                                    ))
                                }
                            </select>
                        </span>
                    </div>
                </nav>
            }
        </>
    )
}

export default JobsTable