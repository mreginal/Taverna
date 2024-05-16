//CSS
import './Auth.css'

//Imports
import { useNavigate } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Alert, Snackbar } from '@mui/material'

export default function Login(){ 

  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value)
  }

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogin = () =>{
    navigate('/feed')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await api.post('/auth/user', {
        email,
        password,
      });

      const token = response.data

      localStorage.setItem('token',token)
      handleLogin()

    } catch (error) {
      setError('Ocorreu um erro ao fazer login, por favor, tente novamente.');
    }
  };

    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
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
                  <span>Email ou nome de usuário:</span>
                  <input type="email" name='email' placeholder='exemplo@gmail.com' onChange={handleEmailChange} value={email}/>
                </label>
                <label>
                  <span>Senha:</span>
                  <input type="password" name='password' placeholder='*********' onChange={handlePasswordChange} value={password}/>
                  <a href="#">Esqueceu a senha?</a>
                </label>

                <div className="btn">
                  <input type="button" id='button' value="Não tenho conta" onClick={() => handleNavigate('/register')}/>
                  <input type="submit" id='login' value="entrar" onClick={()=>handleSubmit}/>
                </div>
              </form>
            </div>
          </div>
          <div>{error && 
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{vertical:'top', horizontal:'right'}} >
                <Alert onClose={handleCloseSnackbar} variant='filled' severity="error">
                  {error}
                </Alert>
            </Snackbar>}
        </div>
      </div>
    </div>
  )
}
