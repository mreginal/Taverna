//CSS
import './Auth.css'

//Imports
import { useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { api } from '../../services/api'

export default function Login(){ 

  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value)
  }

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await api.post('/auth/user', {
        email,
        password,
      });

      const token = response.data.token;

      localStorage.setItem('token', token);
  
      console.log("Token recebido:", token);
    } catch (error) {
      console.error(error);
    }
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
                  <input type="button" id='button' value="Não tenho conta" onClick={() => handleNavigate('/register')}/>
                  <input type="submit" id='login' value="entrar"/>
                  </div>

              </form>
            </div>
          </div>
      </div>
    </div>
  )
}
