import { useState } from "react";
import { FaEye , FaEyeSlash} from "react-icons/fa";
import "./style.css"
function App() {
  const [password , setPassword] = useState("password")
  const [showPassword , setShowPassword] = useState(false)

  function storepassword( event){
  setPassword(event.target.value)
  }

return(
  <>
   <div className="input-container">
    <input type = {showPassword ? "text" : "password"} placeholder="password" onChange={storepassword}/>
    <button onClick={() => {setShowPassword(!showPassword)}}>
      {showPassword ? <FaEye/> : <FaEyeSlash/>}
      </button>
   </div>
  </>
)
}

export default App;
