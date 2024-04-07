import React, { useState } from 'react'
import './Auth.css'
import axios from 'axios'

//Cria uma interface User
interface User{
  name: string
  birthdate: string
  email: string
  password: string
  gender: string
}

const Register: React.FC = () => {

  //Registra os inputs digitados
  const [name, setName] = useState<string>("")
  const [birthdate, setBirthdate] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [gender, setGender] = useState<string>("")
  const [error, setError] = useState("")

  //Funções para coletar os dados do Select de genêro e a Data de nascimento
  const handleSelectGender = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    setGender(e.target.value)
  }

  const handleBirthdate = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setBirthdate(e.target.value)
  }

  //Enviar as respostas
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

    //Confirmar a senha
    if (password !== confirmPassword) {
      setError("❗As senhas não correspondem❗")
      return
    }

    //Tentativa de conexão com a API de cadastro
    try{
      await axios.post("https://taverna.onrender.com/user/cadastrar", {name, birthdate, email, password, gender})
      console.log('Ok')
      alert('Cadastro realizado com sucesso!')
    }catch(error){
      console.log(error)
      alert('Erro ao cadastrar usuário')
    }

    console.log(user)

    //Limpar os inputs ao submeter (EXTREMAMENTE PROVISÓRIO)
    setName(''), setEmail(''), setBirthdate(''), setPassword(''), setConfirmPassword(''), setGender('')
  }

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
                  {error && <p className='error'>{error}</p>}

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

                <div className='btn' id='btn-register'><input type="submit" id='button' value="Cadastrar-se"/></div>

              </form>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Register