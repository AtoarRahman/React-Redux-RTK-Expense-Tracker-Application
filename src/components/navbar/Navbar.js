import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logoImage from "../../assets/images/logo.png";
import { searchRemoved, typeRemoved } from "../../features/filter/filterSlice";
import { resetPagination } from "../../features/pagination/paginationSlice";

export default function Navbar() {
    const dispatch = useDispatch();

    const resetHendler = () =>{
        dispatch(searchRemoved());
        dispatch(typeRemoved());
        dispatch(resetPagination());
      }
    
    return (
        <nav className="bg-gray-100 shadow-md">
            <div className="max-w-6xl mx-auto px-5 lg:px-0 flex justify-between py-3">
                <Link to="/">
                    <img
                        className="h-10"
                        src={logoImage}
                        alt="Expense Tracker"
                        onClick={resetHendler}
                    />
                </Link>
                <div className="h-10 px-5 text-md ring-emerald-200 leading-10">
                    <b>Expense Tracker Application</b>
                </div>
            </div>
        </nav>
    );
}
