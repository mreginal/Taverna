//CSS
import "./Inicial.css"

//Imports
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Inicial = () => {

  const navigate = useNavigate()

  useEffect(()=>{
    const redirectTimeout = 
    setTimeout(()=>{
      navigate('/login')
    },2000)

    return () => clearTimeout(redirectTimeout)
  }, [navigate])

  return (
      <div className="inicial">
          <div className="logo-in"><img src="./logo-white.png" alt="logo"/></div>
          <div className="app-in"><h1>Taverna</h1></div>
      </div>
  )
}

export default Inicial