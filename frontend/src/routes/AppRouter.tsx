import React from 'react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';

//Pages
import Inicial from '../pages/Inicial/Inicial';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';


const AppRouter: React.FC = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Inicial/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </Router>
  );
};

export default AppRouter
