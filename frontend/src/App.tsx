
//Pages
import Inicial from "./pages/Inicial/Inicial"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"

const App = () => {
  return (
    <div className="app">
      <Inicial/>
      <Login/>
      <Register/>
    </div>
  )
}

export default App