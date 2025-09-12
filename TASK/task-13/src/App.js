import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Contact from "./pages/contact";
import About from "./pages/about";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar";
function App() {
    return (
        <>
            <BrowserRouter>
            <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </>


    )
}
export default App