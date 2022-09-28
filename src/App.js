import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import TransactionList from "./pages/TransactionList";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/transactions" element={<TransactionList />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;