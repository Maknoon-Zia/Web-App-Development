import CounterCard from "./propsCounter"
import DoubleCounter from "./double";
import Counter from "./counter";
import "./style.css"

function App() {
  return (
    <>
      <div className="app-div">
        <CounterCard title="Likes" counts={0} button="like" />
        <CounterCard title="Unlikes" counts={0} button="unlike" />
      </div>
      <div className="app-double-div">
        <DoubleCounter title="Likes/Unlikes" counts={0} button1="like" button2="unlike" />
      </div>
<Counter/>
    </>
  );
}

export default App;
