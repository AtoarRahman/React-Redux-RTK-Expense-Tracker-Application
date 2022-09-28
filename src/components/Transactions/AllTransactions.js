import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Pagination from "../ui/Pagination";
import Transaction from "./Transaction";

export default function AllTransactions() {
    const dispatch = useDispatch();

    const { transactions, isLoading, isError } = useSelector((state) => state.transaction);
    const { tType, tSearch } = useSelector((state) => state.filter);
    const { startPage, pageLimit } = useSelector((state) => state.pagination);

    useEffect(() => {
        dispatch(fetchTransactions({ tType, tSearch }));
    }, [dispatch, tType, tSearch]);

    
    // Get current Transactions
    const indexOfLasTransaction = startPage * pageLimit;
    const indexOfFirsTransaction = indexOfLasTransaction - pageLimit;
    const currenTransactions = transactions.slice(indexOfFirsTransaction, indexOfLasTransaction);

    // decide what to render
    let content = null;
    if (isLoading) content = <p>Loading...</p>;

    if (!isLoading && isError)
        content = <p className="error">There was an error occured</p>;

    if (!isLoading && !isError && transactions?.length > 0) {
        content = currenTransactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
        ));
    }

    if (!isLoading && !isError && transactions?.length === 0) {
        content = <p className="text-red-500">No transactions found!</p>;
    }

    return (
        <>
            <div className="w-full text-center border-b mb-3 leading-10"><h5><b>Your Transaction List</b></h5></div>

            <div> {content} </div>

            <Pagination/>
        </>
    );
}

