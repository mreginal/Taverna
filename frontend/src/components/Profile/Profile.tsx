import './Profile.css'

//imports
import Sidebar from '../../components/Sidebar/Sidebar'
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal'
import { useProfile } from '../../hooks/useProfile'
import { RiMailFill, RiSwordFill, RiVerifiedBadgeFill, RiVipCrownFill,  } from 'react-icons/ri'

const Profile = () => {
  const userProfile = useProfile()
  if(!userProfile){
    return
  }

  return (
    <div className="profile">
        <div className="right-profile">
            <Sidebar/>
        </div>
        <div className="center-profile">
            <div className="info-user">
              <div className="user-profile">
                <img src="pessoa-teste.png" alt="logo"/>
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

            </div>
        </div>
        <div className="left-profile">

        </div>
    </div>
  )
}

export default Profile