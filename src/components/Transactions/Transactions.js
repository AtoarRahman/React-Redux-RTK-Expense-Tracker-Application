import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

export default function Transactions() {
    const dispatch = useDispatch();

    const { transactions, isLoading, isError } = useSelector((state) => state.transaction);
    const { tType, tSearch } = useSelector((state) => state.filter);

    useEffect(() => {
        dispatch(fetchTransactions({ tType, tSearch }));
    }, [dispatch,tType, tSearch]);

    // decide what to render
    let content = null;
    if (isLoading) content = <p>Loading...</p>;

    if (!isLoading && isError)
        content = <p className="error">There was an error occured</p>;

    if (!isLoading && !isError && transactions?.length > 0) {
        content = transactions.slice(0, 5).map((transaction) => (
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

            <div className="justify-center w-full items-center mt-3 leading-10 flex">
                <Link className="border rounded px-5 bg-green-600 text-white" to="/transactions">VIEW ALL</Link>
            </div>
        </>
    );
}
