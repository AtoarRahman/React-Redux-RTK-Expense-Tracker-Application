/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import searchImage from "../../assets/images/search.svg";
import { searched, searchRemoved, typeRemoved, typeSelected } from "../../features/filter/filterSlice";
import { resetPagination } from "../../features/pagination/paginationSlice";

export default function Search() {
    const dispatch = useDispatch();
    const [type, setType] = useState("");
    const inputRef = useRef(null)

    // debounce handler
  const debounce = (fn) => {
    let timer;
    return function (...args) {
        const context = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            fn.apply(context, args);
        }, 800);
    };
  };

  const handleChange = (value) => {
    dispatch(resetPagination());
    dispatch(searched(value));
  };

  const inputHandler = useCallback(debounce(handleChange), []);

  
  const typeHandler = (value) => {
    dispatch(resetPagination());
    dispatch(typeSelected(value));
    setType(value)
  };

  const resetHendler = () =>{
    inputRef.current.value = "";
    setType("");
    dispatch(searchRemoved());
    dispatch(typeRemoved());
    dispatch(resetPagination());
  }

    return (
        <>
            <div className="w-full text-sm mt-3">
                <b>Filter by Transaction Name</b>
                <div className="border border-slate-200 flex items-center mt-2 bg-white h-10 px-5 rounded-lg text-sm ring-emerald-200">
                    <input
                        ref={inputRef}
                        className="w-full outline-none border-none mr-2"
                        type="search"
                        name="search"
                        placeholder="Search"
                        onChange={(e) => inputHandler(e.target.value)}
                    />
                    <img
                        className="inline h-4 cursor-pointer"
                        src={searchImage}
                        alt="Search"
                    />
                </div>
            </div>
            <div className="w-full text-sm mt-4">
                <b>Filter by Transaction Type</b>
                <div className="radio_group mt-2">
                    <input
                        required
                        type="radio"
                        value="income"
                        name="type"
                        checked={type === "income"}
                        onChange={(e) => typeHandler("income")}
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
                        onChange={(e) => typeHandler("expense")}
                    />
                    <label>Expense</label>
                </div>
            </div>
            <div className="w-full text-sm mt-4">
                <b>Reset Transaction Filter</b> <br />
                <button className="border rounded px-5 bg-red-600 text-white h-10 mt-3" to="/transactions" onClick={()=>resetHendler()}>Reset</button>
            </div>
        </>
    );
}
