import "./NavBar.css"

// Components
import { NavLink,Link } from "react-router-dom"
import {BsSearch,BsHouseDoorFill,BsFillPerson,BsFillCameraFill} from 'react-icons/bs'

const NavBar = () => {
  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>
      <form  id="search-form">
        <BsSearch></BsSearch>
        <input type="text" name="search" id="search" />
      </form>
      <ul id="nav-links">
        <NavLink to="/"><BsHouseDoorFill></BsHouseDoorFill></NavLink>
        <NavLink to="/login">Entrar</NavLink>
        <NavLink to="/register">Cadastrar</NavLink>       
      </ul>
    </nav>
  )
}

export default NavBar