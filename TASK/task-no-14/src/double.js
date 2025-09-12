import { useState } from "react"

function DoubleCounter(props) {
    const [title] = useState(props.title)
    const [counts, setCounts] = useState(props.counts)
    const [button1] = useState(props.button1)
    const [button2] = useState(props.button2)

    function increase() {
        setCounts(counts + 1)
    }
    function decrease() {
        setCounts(counts - 1)
    }

    return (
        <div className="card">
            <h2 className="card-title">{title}</h2>
            <p className="card-count">Count: {counts}</p>
            <div className="double-button">
                <button className="card-btn" onClick={increase}>
                    {button1}
                </button>
                <button className="card-btn" onClick={decrease}>
                    {button2}
                </button>
            </div>

        </div>
    )
}
export default DoubleCounter
