import './Profile.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal'
import { useProfile } from '../../hooks/useProfile'
import { RiMailFill, RiSwordFill, RiVerifiedBadgeFill, RiVipCrownFill,  } from 'react-icons/ri'
import UserPosts from './UserPosts'
import { useProfilePicture } from '../../hooks/useProfilePicture'
import { useState } from 'react'
import EditPictureModal from './EditPictureModal'

const Profile = () => {
  const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);
  const { profilePicture } = useProfilePicture();
  const userProfile = useProfile()
  if(!userProfile){
    return
  }

  const handleImageClick = () => {
    setIsPictureModalOpen(true);
  };

  const handleClosePictureModal = () => {
    setIsPictureModalOpen(false);
  };

  return (
    <div className="profile">
        <div className="right-profile">
            <Sidebar/>
        </div>
        <div className="center-profile">
            <div className="info-user">
              <div className="user-profile">
                <div className="user-profile-image" onClick={handleImageClick}>
                  <img src={profilePicture || 'pessoa-teste.png'} alt="Foto de perfil"/>
                </div>
                <h1>{userProfile.name} <RiVerifiedBadgeFill color='var(--cor05)'/></h1>
              </div>
              <div className="itens-profile">
                <div className="item-profile">
                  <p> <RiMailFill color='var(--cor05)'/> {userProfile.email}</p>
                </div>
                <div className="item-profile">
                  <p><RiVipCrownFill color='var(--cor05)'/> Nível do usuário</p>
                </div>
                <div className="item-profile">
                  <p><RiSwordFill color='var(--cor05)'/> Guilda do usuário</p>
                </div>
                <div className='edit-profile'>
                  <EditProfileModal/>
                </div>
              </div>
            </div>
            <div className="posts-user">
                <UserPosts/>
            </div>
        </div>
        <div className="left-profile"></div>

        <EditPictureModal open={isPictureModalOpen} onClose={handleClosePictureModal} currentProfilePicture={userProfile.profile_picture} />
    </div>
  )
}

export default Profile