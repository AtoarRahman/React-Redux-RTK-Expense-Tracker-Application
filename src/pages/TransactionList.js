import AllTransactions from "../components/Transactions/AllTransactions";
import Search from "../components/ui/Search";

export default function TransactionList() {
  return (

      <div className="max-w-6xl mx-auto px-5 lg:px-0 flex justify-between py-3">
        <div className="justify-start w-full items-center bg-gray-100 p-4 m-2">
          <Search />
        </div>
        <div className="justify-start w-full items-center bg-gray-100 p-4 m-2">
          <AllTransactions />
        </div>
    </div>
    
  )
}
