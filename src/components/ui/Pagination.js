import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, pageLimitUpdate, pageNumberUpdate, prevPage, resetPagination } from "../../features/pagination/paginationSlice";
import { fetchTransactions } from "../../features/transaction/transactionSlice";

export default function Pagination() {
    const { startPage, pageLimit } = useSelector((state) => state.pagination);
    const { transactions } = useSelector((state) => state.transaction);
    const { tType, tSearch } = useSelector((state) => state.filter) || {};
    const dispatch = useDispatch();
    const [totalTransactions, setTotalTransactions] = useState()

    useEffect(() => {
        setTotalTransactions(transactions.length)
    }, [transactions])
    
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalTransactions / pageLimit); i++) {
        pageNumbers.push(i);
    }

    const paginationHandler = (number) => {
        dispatch(fetchTransactions({ tType, tSearch }));
        dispatch(pageNumberUpdate(number)); 
    }

    const pageLimitHendler = (value) =>{
        // Reset
        dispatch(resetPagination());
        // dispatch
        dispatch(pageLimitUpdate(value));
        dispatch(fetchTransactions({ tType, tSearch }));
    }

    return (
        <div className="max-w-7xl mx-auto px-5 pt-5 pb-3 lg:px-0 flex gap-2 justify-end">
            <div>
                <select className="bg-gray-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-1  dark:border-gray-400 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-300"
                    onChange={(e)=>pageLimitHendler(e.target.value)} value={pageLimit} >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                </select>
            </div>
            <button className="bg-blue-500 text-white px-4 py-1 rounded-full cursor-pointer" disabled ={startPage === 1 && "disabled"} onClick={()=>dispatch(prevPage())} >{"< Prev"} </button>
            {pageNumbers.map(number => (
                <div key={number} className={`${ startPage === number ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'} px-4 py-1 rounded-full cursor-pointer`}
                    onClick={()=>paginationHandler(number)}>
                    {number}
                </div>
            ))}
            <button className="bg-blue-500 text-white px-4 py-1 rounded-full cursor-pointer" disabled ={startPage === pageNumbers.length && "disabled"} onClick={()=>dispatch(nextPage())} >{"Next >"} </button>
        </div>
    );
}
