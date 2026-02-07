import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import OAuthHandler from "./OAuthHandler";
import Navbar from "./components/Navbar";

function App() {
    return (
        <Router basename="/my-simple-app">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/oauth" element={<OAuthHandler />} />
            </Routes>
        </Router>
    );
}

export default App;
