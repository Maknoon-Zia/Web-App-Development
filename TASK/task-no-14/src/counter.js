import { useState } from "react"

function CounterCard(props) {
    const [title] = useState(props.title)
    const [counts, setCounts] = useState(props.counts)
    const [button] = useState(props.button)

    function increase() {
        setCounts(counts + 1)
    }

    return (
        <div className="card">
            <h2 className="card-title">{title}</h2>
            <p className="card-count">Count: {counts}</p>
            <button className="card-btn" onClick={increase}>
                {button}
            </button>
        </div>
    )
}
export default CounterCard
