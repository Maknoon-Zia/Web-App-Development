function Register() {
    return (
        <>
            <div className="register">
                <h1>Register Now</h1>
                <form className="reg-form">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <button>Register</button>
                </form>
            </div>
        </>
    )
}

export default Register;
