import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Accounts from "./pages/Accounts";
import { AuthProvider } from "./context/AuthContext";
import Markets from "./pages/Markets";
import Symbols from "./pages/Symbols";

function App() {
    return (
        <AuthProvider>
            <Router basename="/my-simple-app">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/markets" element={<Markets />} />
                    <Route path="/symbols" element={<Symbols />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
