//CSS
import './Auth.css'

//Imports
import { useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'

const Login: React.FC= () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value)
  }

  const handleRegister = () =>{
    navigate('/register')
  }

  const handleClick = () =>{
    navigate('/feed')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('enviando forms')
    console.log(email, password)

    //Limpar forms

    setEmail('')
    setPassword('')
  };

  return (
    <div className="login">
      <div className="left-side">
          <img src="./logo-white.png" alt="logo"/>
          <h1>Taverna</h1>
      </div>
      <div className="right-side">
          <div className="container-login">
            <div className="header-login">
              <h1>Login</h1>
              <p>Faça login ou cadastre-se para acessar o site.</p>
            </div>
            <div className="form-login">

              <form onSubmit={handleSubmit}>
                <label>
                  <span>Email:</span>
                  <input type="email" name='email' placeholder='exemplo@gmail.com' onChange={handleEmailChange} value={email}/>
                </label>
                <label>
                  <span>Senha:</span>
                  <input type="password" name='password' placeholder='*********' onChange={handlePasswordChange} value={password}/>
                  <a href="#">Esqueceu a senha?</a>
                </label>

                <div className="btn">
                  <input type="submit" id='button' value="Não tenho conta" onClick={handleRegister}/>
                  <input type="submit" id='button' value="entrar" onClick={handleClick}/>
                  </div>

              </form>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Login