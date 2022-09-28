import Balance from "../components/Balance";
import Form from "../components/Form";
import Transactions from "../components/Transactions/Transactions";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-5 lg:px-0 flex justify-between py-3">
        <div className="justify-start w-full items-center bg-gray-100 p-4 m-2">
            <Balance />
            <Form />
        </div>
        <div className="justify-start w-full items-center bg-gray-100 p-4 m-2">
            <Transactions />
        </div>
    </div>
  )
}
