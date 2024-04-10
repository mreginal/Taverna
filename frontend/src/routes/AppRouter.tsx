import React from 'react';
import { Route , Routes} from 'react-router-dom';

//Pages
import Inicial from '../pages/Inicial/Inicial';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Feed from '../pages/Feed/Feed';
import Navbar from '../components/Navbar/Navbar';
import Profile from '../components/Profile/Profile';

const AppRouter: React.FC = () => {
  return (
      <div>
        <Routes>
              <Route path='/navbar' element={<Navbar/>}/>
              <Route path="/" element={<Inicial/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/feed" element={<Feed/>}/>
              <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </div>
  );
};

export default AppRouter
