import React from 'react';
import './Sidebar.css';
import { RiHome2Fill, RiSwordFill, RiBeerFill, RiMessage2Fill, RiLogoutBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-img">
          <img src="./logo-white.png" alt="logo" />
        </div>
        <div className="logo-name">
          <h1>Taverna</h1>
        </div>
      </div>
      <ul>
        <div className="sidebar-item" onClick={() => handleNavigate('/feed')}>
          <li><RiHome2Fill /></li>
          <span>Taverna</span>
        </div>
        <div className="sidebar-item" onClick={() => handleNavigate('/login')}>
          <li><RiBeerFill /></li>
          <span>Chefe Gepeto</span>
        </div>
        <div className="sidebar-item" onClick={() => handleNavigate('/register')}>
          <li><RiSwordFill /></li>
          <span>Tarefas</span>
        </div>
        <div className="sidebar-item">
          <li><RiMessage2Fill /></li>
          <span>Chat</span>
        </div>
      </ul>
      <div className="user">
        <img src="./pessoa-teste.jpg" alt="user-img" />
        <div>
          <h2>Username</h2>
          <p>email@email</p>
        </div>
      </div>
      <ul>
        <div className="logout">
          <div className="sidebar-item" onClick={() => handleNavigate('/logout')}>
            <button>
              <RiLogoutBoxFill />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
