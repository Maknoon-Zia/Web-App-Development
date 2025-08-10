import { Link } from "react-router-dom"
function Navbar() {
    return (
        <div className="navbar">
            <ul>
                <li><Link to='/home'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </div>

    )
}
export default Navbar