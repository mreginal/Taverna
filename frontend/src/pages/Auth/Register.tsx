//CSS
import './Auth.css'

//imports
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { User } from '../../types/types'
import { Alert, Snackbar } from '@mui/material'

const Register: React.FC = () => {
  const navigate = useNavigate()

  const [name, setName] = useState<string>("")
  const [birthdate, setBirthdate] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [gender, setGender] = useState<string>("")
  const [minError, setMinError] = useState<string>("")
  const [error, setError] = useState("")
  const [successSnackbar, setSuccessSnackbar] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true)
    }
  }, [error])

  const handleSelectGender = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    setGender(e.target.value)
  }
  const handleBirthdate = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setBirthdate(e.target.value)
  }

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    setError("")

    const user: User ={
      name, 
      birthdate,
      email,
      password,
      gender,
    }

    if (password !== confirmPassword) {
      setMinError("❗As senhas não correspondem❗")
      return
    }

    try{
      await api.post("/user/cadastrar", {name, birthdate, email, password, gender})
      console.log('Ok')
      setSuccessSnackbar(true);
      setTimeout(()=> navigate('/login'), 2000)
    }catch(error){
      console.log(error)
      setError('Erro ao cadastrar usuário, preencha todos os campos corretamente.')
    }

    console.log(user)
    setName(''), setEmail(''), setBirthdate(''), setPassword(''), setConfirmPassword(''), setGender('')
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseSuccessSnackbar = () => {
    setSuccessSnackbar(false);
  };

  return (
    <div className="register">
      <div className="left-side">
          <img src="./logo-white.png" alt="logo"/>
          <h1>Taverna</h1>
      </div>
      <div className="right-side">
          <div className="container-register">
            <div className="header-register">
              <h1>Cadastre-se</h1>
              <p>Realize o cadastro para acessar o site.</p>
            </div>
            <div className="form-register">
              <form onSubmit={handleSubmit}>
                <label>
                  <span>Nome completo:</span>
                  <input type="name" name='name' placeholder='Nome Sobrenome' onChange={(e)=>setName(e.target.value)} value={name}/>
                </label>
                <label>
                  <span>Data de Nascimento:</span>
                  <input type="date" name='birthdate' onChange={handleBirthdate} value={birthdate}/>
                </label>
                <label>
                  <span>Email:</span>
                  <input type="email" name='email' placeholder='exemplo@gmail.com' id='email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
                </label>
                <label>
                  <span>Senha:</span>
                  <input type="password" name='password' placeholder='*********' id='password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
                </label>
                <label>
                  <span>Confirmação de senha:</span>
                  <input type="password" name='password' placeholder='*********' id='confirmPassword' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}/>
                  {minError && <p className='error'>{minError}</p>}

                </label>
                <label>
                  <span>Gênero:</span>
                  <select name="gender" value={gender} onChange={handleSelectGender}>
                    <option value="">Selecione uma opção</option>
                    <option value="nid">Não identificar</option>
                    <option value="masc">Masculino</option>
                    <option value="fem">Feminino</option>
                </select>
                </label>

                <div className='btn' id='btn-register'>
                  <input type="button" id='button' value="Acesso sem login" onClick={() => handleNavigate('/feed')}/>
                  <input type="submit" id='button' value="Cadastrar-se"/>
                </div>
              </form>

              <div>
                <Snackbar
                    open={successSnackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseSuccessSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <Alert onClose={handleCloseSuccessSnackbar} variant="filled" severity="success">
                      Cadastro realizado com sucesso!
                    </Alert>
                </Snackbar>
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
      </div>
    </div>
  )
}

export default Register