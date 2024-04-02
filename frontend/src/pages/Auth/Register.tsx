import React, { useState } from 'react'
import './Auth.css'

interface User{
  name: string
  bithdate: string
  email: string
  password: string
  gender: string
}

const Register: React.FC = () => {

  const [name, setName] = useState<string>("")
  const [bithdate, setBirthdate] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [gender, setGender] = useState<string>("")

  const handleSelectGender = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    setGender(e.target.value)
  }

  const handleBirthdate = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setBirthdate(e.target.value)
  }

  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true)

  const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setConfirmPassword(e.target.value)
    setPasswordsMatch(e.target.value === password)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    const user: User ={
      name, 
      bithdate,
      email,
      password,
      gender,
    }

    console.log(user)

    if (password === confirmPassword) {
      console.log('Senha:', password);
    } else {
      console.log('As senhas não correspondem:', password, confirmPassword);
    }
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
                  <input type="date" name='birthdate' onChange={handleBirthdate} value={bithdate}/>
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
                  <input type="password" name='password' placeholder='*********' id='confirmPassword' onChange={handlePasswordChange} value={confirmPassword}/>
                  {!passwordsMatch && <p style={{ color:'purple'}}>As senhas não correspondem.</p>}
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