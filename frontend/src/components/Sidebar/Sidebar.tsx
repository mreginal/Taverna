import React from 'react';
import './Sidebar.css';
import { RiHome2Fill, RiSwordFill, RiMessage2Fill, RiLogoutBoxFill, RiLoginBoxFill, RiNotification3Fill, RiBookmarkFill, RiNotificationBadgeFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import {useProfile} from '../../hooks/useProfile';

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const userProfile = useProfile();


  const handleNavigate = (path: string) => {
    navigate(path)
  }

  if (!userProfile) {}

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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
        <div className="sidebar-item" onClick={() => handleNavigate('/register')}>
          <li><RiSwordFill /></li>
          <span>Guilda</span>
        </div>
        <div className="sidebar-item">
          <li><RiMessage2Fill /></li>
          <span>Chat</span>
        </div>
        { userProfile? (
          <div>
            <div className="sidebar-item" onClick={() => handleNavigate('/notification')}>
            <li><RiNotification3Fill/></li>
            <span>Notificações</span>
          </div>
            <div className="sidebar-item" onClick={() => handleNavigate('/favorites')}>
              <li><RiBookmarkFill /> </li>
              <span>Favoritos</span>
            </div>
          </div>
          ) : ('')
        }
      </ul>
      {userProfile? (
        <>
          <div className="user" onClick={()=> handleNavigate('/profile')}>
            <img src="./pessoa-teste.png" alt="user-img" />
            <div>
              <h2>{userProfile.name}</h2>
              <p>{userProfile.email}</p>
            </div>
          </div>
        </>
      ) : (
        <div className="user" onClick={()=> handleNavigate('/login')}>
          <img src="./pessoa-teste.png" alt="user-img" />
          <div className='user-login' onClick={()=> handleNavigate('/login')}>
            <button>
              Login <RiLoginBoxFill/>
              </button>
          </div>
        </div>
      )}
      {userProfile && (
        <ul>
          <div className="logout" onClick={handleLogout}>
            <div className="logout">
              <button>
                <RiLogoutBoxFill />
              </button>
            </div>
          </div>
        </ul>
      )}
    </div>
  )
}

export default Sidebar