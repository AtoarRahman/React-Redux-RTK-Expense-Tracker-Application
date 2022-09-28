import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction, fetchTransactions } from "../features/transaction/transactionSlice";

export default function Form() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");

    const dispatch = useDispatch();
    const { isLoading, isError } = useSelector((state) => state.transaction);
    const { tType, tSearch } = useSelector((state) => state.filter) || {};

    const reset = () => {
        setName("");
        setType("");
        setAmount("");
    };

    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(
            createTransaction({
                name,
                type,
                amount: Number(amount),
            })
        );
        dispatch(fetchTransactions({ tType, tSearch }));
        reset();
    };

    return (
        <div className="mt-3 ml-0">
            <h3><b>Add new transaction</b></h3>

            <form onSubmit={handleCreate}>
                <div className="form-group">
                    <label>Name</label>
                    <div className="border border-slate-200 flex items-center bg-white h-10 px-5 rounded-lg text-sm ring-emerald-200">
                        <input
                            type="text"
                            name="name"
                            className="w-full outline-none border-none"
                            required
                            placeholder="Enter title"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group radio">
                    <label>Type</label>
                    <div className="radio_group">
                        <input
                            required
                            type="radio"
                            value="income"
                            name="type"
                            checked={type === "income"}
                            onChange={(e) => setType("income")}
                        />
                        <label>Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            placeholder="Expense"
                            checked={type === "expense"}
                            onChange={(e) => setType("expense")}
                        />
                        <label>Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <div className="border border-slate-200 flex items-center bg-white h-10 px-5 rounded-lg text-sm ring-emerald-200">
                        <input
                            type="number"
                            className="w-full outline-none border-none"
                            required
                            placeholder="Enter amount"
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                </div>

                <button disabled={isLoading} className="w-full bg-blue-500 text-white h-10" type="submit">
                    Add Transaction
                </button>

                {!isLoading && isError && (
                    <p className="error">There was an error occured</p>
                )}
            </form>
        </div>
    );
}
