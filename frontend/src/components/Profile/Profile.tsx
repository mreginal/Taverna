import './Profile.css'

import useProfile from '../../hooks/useProfile'
import Sidebar from '../Sidebar/Sidebar';

const UserProfile: React.FC = () => {
  const userProfile = useProfile();

  if (!userProfile) {
    return null;
  }

  return (
    <div className='profile'>
        <div className="right-feed">
            <Sidebar/>
        </div>
        <div className="center-feed">
            <div className="profile-ext">
              <div className="photo-profile">
                <img src="pessoa-teste.png" alt="user" />
              </div>
              <div className="user-profile">
                <h1>{userProfile.name}</h1>
                <h3>{userProfile.email}</h3>
              </div>
              <div className='click-profile'>
                <button className='btn-profile'>
                    <div className="info-profile"><span>Informações</span></div>
                </button>
                <button className='btn-profile'>
                  <div className="edit-profile"><span>Editar</span></div>
                </button>
              </div>
            </div>
        </div>
        <div className="left-feed">
          .
        </div>
    </div>
  );
};

export default UserProfile