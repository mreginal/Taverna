import './Profile.css'

//imports
import Sidebar from '../../components/Sidebar/Sidebar'
import EditProfileModal from '../../components/EditProfileModal/EditProfileModal'
import { useProfile } from '../../hooks/useProfile'
import { RiMailFill, RiSwordFill, RiVerifiedBadgeFill, RiVipCrownFill,  } from 'react-icons/ri'
import {  ImageList, ImageListItem } from '@mui/material'

const Profile = () => {
  const userProfile = useProfile()
  if(!userProfile){
    return
  }

  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      img: './teste.jpg',
      title: 'Teste',
    },
        {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      img: './teste.jpg',
      title: 'Teste',
    },
  ]

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
                  <p><RiVipCrownFill color='var(--cor05)'/> Mago dos Sabores</p>
                </div>
                <div className="item-profile">
                  <p><RiSwordFill color='var(--cor05)'/> Mestres do Fogão</p>
                </div>
                <div className='edit-profile'>
                  <EditProfileModal/>
                </div>
              </div>
            </div>
            <div className="posts-user">
                <ImageList sx={{ width: 550, height:330}} cols={4} rowHeight={164}>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      alt={item.title}
                    />
                  </ImageListItem>
                ))}
                </ImageList>
          </div>
        </div>
        <div className="left-profile">

        </div>
    </div>
  )
}

export default Profile