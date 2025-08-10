import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Contact from "./components/contact"
import Navbar from "./components/navbar";
function App() {
    return (
        <>
            <BrowserRouter>
            <Navbar />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path='/contact' element={<Contact />} />

                </Routes>
            </BrowserRouter>
        </>


    )
}
export default App