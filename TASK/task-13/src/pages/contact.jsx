function Contact() {
    return (
        <>
            <div className="contact">
                <div className="contact-text">
                    <h1>Contact Us</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, laboriosam natus? Maiores praesentium accusamus dolorum odio illum odit aliquam natus? Aliquid tenetur earum sapiente vel doloremque nulla sint facilis distinctio.</p>
                </div>
                <form className="contact-form">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <textarea placeholder="Your message"></textarea>
                    <button>Submit</button>
                </form>
            </div>

        </>
    )
}
export default Contact