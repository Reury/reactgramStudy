import "./Auth.css";

// components
import {Link} from 'react-router-dom';

// hooks
import { useState,useEffect } from 'react';

const Register = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    const user = {
      name,
      email,
      password,
      confirmPassword
    }

    console.log(user)
  }

  return (
    <div id='register'>
      <h2>ReactGram</h2>
        <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" name="name" id="name" placeholder='Nome' 
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type="email" name="email" id="email" placeholder='e-mail'
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" name="password" id="password" placeholder='senha'
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input 
            type="password" name="confirmPassword" id="confirmPassword" 
            placeholder='confirme a senha'
            value={confirmPassword || ""}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input type="submit" value="Cadastrar" />

        </form>
      <p>
        Já tem conta ? <Link to="/Login">Clique Aqui</Link>
      </p>
    </div>
  )
}

export default Register