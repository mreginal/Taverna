import React from 'react'
import { Route , Routes} from 'react-router-dom'

//Pages
import Inicial from '../pages/Inicial/Inicial'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Feed from '../pages/Feed/Feed'
import Sidebar from '../components/Sidebar/Sidebar'
import Profile from '../components/Profile/Profile'
import Favorites from '../pages/Favorites/Favorites'
import NotificationsList from '../pages/Notifications/Notification'

const AppRouter: React.FC = () => {
  return (
      <div>
        <Routes>
              <Route path='/sidebar' element={<Sidebar/>}/>
              <Route path="/" element={<Inicial/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/feed" element={<Feed/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/favorites' element={<Favorites/>}/>
              <Route path='/notification' element={<NotificationsList/>}/>
        </Routes>
      </div>
  )
}

export default AppRouter
