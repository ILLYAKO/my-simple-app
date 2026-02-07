import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import { AccountsProvider } from "./context/AccountsContext";

function App() {
    return (
        <AccountsProvider>
            <Router basename="/my-simple-app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Router>
        </AccountsProvider>
    );
}

export default App;
