import { useState, Fragment } from "react";
import useSWR from "swr";
import Loader from "../../../components/Loader";
import SearchBar from "../../../components/SearchBar";
import { paginationRecordCount, PAGINATION_COUNT } from "../../../helper/paginationRecordCount";
import {Pagination} from '@mui/material';
import dayjs from "dayjs";
import Link from "next/link";


export default function Evaluation(){
    const [pageIndex, setPageIndex] = useState(1);
    const [searchText, setSearchText] = useState('')
    const { data: employees } = useSWR(`users/employees/?lastname=${searchText}&page=${pageIndex}`, {
        revalidateOnFocus: false,
    });

    const onKeyUpSearch = (e) => {
        if(e.code === 'Enter')
            setSearchText(e.target.value)
    }

    const onChangeSearch = (e) => {
        if(e.target.value === ''){
            setSearchText('')
        }
    }
    return (
        <div>
            <div className="flex flex-col px-2 max-w-[900px] m-auto md:mt-[50px] mt-[20px]">
                <div className="overflow-x-auto">
                    <Link href="/e" className="text-blue-500 mb-2 px-2"> 
                        Back
                    </Link>
                    <SearchBar
                        onChange={onChangeSearch}
                        onKeyUp={onKeyUpSearch}
                        text={searchText}
                        setText={setSearchText}
                        hasQuery={false}
                        placeholder="Search employee lastname"
                        className="px-2 mt-4"
                    />
                    <div className="p-1.5 w-full inline-block align-middle">
                        <div className="overflow-hidden border rounded-lg">
                            <table className="min-w-full divide-y block divide-gray-200 overflow-x-auto">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase min-w-[100px]"
                                        >
                                            EMP ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase min-w-[200px]"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase min-w-[200px]"
                                        >
                                            Position
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase min-w-[200px]"
                                        >
                                            Date Hired
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase min-w-[170px]"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {!employees ? (
                                        <tr>
                                            <td 
                                                colSpan="6"
                                                className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                                                    <Loader/>
                                            </td>
                                        </tr>
                                    ):(
                                        !employees?.results?.length && (
                                            <tr>
                                                <td 
                                                    colSpan="7"
                                                    className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                                                        No record Found
                                                </td>
                                            </tr>
                                        )
                                    )}
                                    {employees?.results?.map((d) => (
                                        <Fragment key={d.id}>
                                            <tr>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                    {d.user_employee.emp_id}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    {d.user_employee?.firstname}&nbsp;
                                                    {d.user_employee?.mi}.&nbsp;
                                                    {d.user_employee?.lastname}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    {d.user_employee?.type == 'TECHNICIAN' ? 'Technician' : 'Sales Executive' }
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    {dayjs(d.user_employee?.date_hired).format('MMMM DD, YYYY')}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                    <div className="flex gap-5">
                                                        <Link href={`/e/evaluation/v/${d.id}`} className="text-indigo-500 hover:text-indigo-700">
                                                            View Evaluations
                                                        </Link>
                                                        <Link href="" className="text-indigo-500 hover:text-indigo-700">
                                                            Evalutate
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            
                                        </Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-end items-end flex-col md:items-center md:justify-between md:flex-row gap-3 mt-4">
                            <div>
                                {paginationRecordCount(pageIndex, employees?.count)}
                            </div>
                            <Pagination 
                                    count={employees?.count ? Math.ceil(employees?.count/PAGINATION_COUNT) : 0}
                                    page={pageIndex}
                                    color="primary"
                                    onChange={(_e, n) => setPageIndex(n)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}