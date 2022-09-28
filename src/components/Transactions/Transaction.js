import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import {
    removeTransaction,
    updateTransaction
} from "../../features/transaction/transactionSlice";
import numberWithCommas from "../../utils/numberWithCommas";

export default function Transaction({ transaction }) {
    const { name: tName, amount: tAmount, type: tType, id } = transaction || {};
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");
    const [showModal, setShowModal] = useState(false);

    // listen for edit mode active
    useEffect(() => {
        setName(tName);
        setType(tType);
        setAmount(tAmount);
    }, [tName, tType, tAmount]);

    const handleEdit = () => {
        setShowModal(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(
            updateTransaction({
                id,
                data: {
                    name: name,
                    amount: amount,
                    type: type,
                },
            })
        );
    };

    const handleDelete = () => {
        dispatch(removeTransaction(id));
    };

    return (
        <div className={`transaction ${tType} w-full`}>
            <p>{tName}</p>
            <div className="right">
                <p>৳ {numberWithCommas(tAmount)}</p>
                <button className="link" onClick={handleEdit}>
                    <img alt="Edit" className="icon" src={editImage} />
                </button>
                <button className="link" onClick={handleDelete}>
                    <img alt="Delete" className="icon" src={deleteImage} />
                </button>
            </div>
            <>
            {showModal ? (
            <>
                <div className="justify-center items-center text-black flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-2/5 my-6 mx-auto max-w-5xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                            <div className="flex items-start justify-between p-5 pb-3 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-sm font-semibold">
                                    Update your transaction
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-blackfloat-right text-sm leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span> X </span>
                                </button>
                            </div>
            
                            <div className="relative p-6 flex-auto">
                                <form onSubmit={handleUpdate}>
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

                                    <div className="flex items-center justify-center pt-5 mt-5 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                        className="w-2/4 bg-red-500 text-white active:bg-emerald-600 font-bold text-sm py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        >
                                        Close
                                        </button>
                                        <button
                                        className="w-2/4 bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        >
                                        Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
            </>
            ) : null}
            </>
        </div>
    );
}
