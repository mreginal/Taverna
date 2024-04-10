import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar:React.FC = () => {
  
  return (
    <nav className='nav'>
      <ul>
        <li>
          <Link to="/login"><img src="./logo-white.png" alt="logo"/></Link>
        </li>
        <li>
          <Link to="/feed"><img src="./icon-chopp.svg" alt="logo"/></Link>
        </li>
        <li>
          <Link to="/login"><img src="./icon-task.svg" alt="logo"/></Link>
        </li>
        <li>
          <img src="./icon-chat.svg" alt="logo"/>
        </li>
      </ul>
      <ul>
        <li>
          <img src="./logo-white.png" alt="logo"/>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar