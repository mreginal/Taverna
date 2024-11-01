import React from 'react';
import './Sidebar.css';
import { RiHome2Fill, RiSwordFill, RiMessage2Fill, RiLogoutBoxFill, RiLoginBoxFill, RiNotification3Fill, RiBookmarkFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';
import { useProfilePicture } from '../../hooks/useProfilePicture';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const userProfile = useProfile();
  const { profilePicture } = useProfilePicture();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

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
        <div className="sidebar-item">
          <li><RiSwordFill /></li>
          <span>Guilda</span>
        </div>
        <div className="sidebar-item">
          <li><RiMessage2Fill /></li>
          <span>Chat</span>
        </div>
        {userProfile && (
          <>
            <div className="sidebar-item" onClick={() => handleNavigate('/notification')}>
              <li><RiNotification3Fill /></li>
              <span>Notificações</span>
            </div>
            <div className="sidebar-item" onClick={() => handleNavigate('/favorites')}>
              <li><RiBookmarkFill /></li>
              <span>Favoritos</span>
            </div>
          </>
        )}
      </ul>
      <div className="user" onClick={() => handleNavigate(userProfile ? '/profile' : '/login')}>
        <img src={profilePicture ?? 'pessoa-teste.png'} alt="Foto de perfil" />
        {userProfile ? (
          <div>
            <h2>{userProfile.name}</h2>
            <p>{userProfile.email}</p>
          </div>
        ) : (
          <div className="user-login">
            <button>
              Login <RiLoginBoxFill />
            </button>
          </div>
        )}
      </div>
      {userProfile && (
        <div className="logout" onClick={handleLogout}>
          <button>
            <RiLogoutBoxFill />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
