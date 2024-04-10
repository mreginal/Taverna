import React from 'react';
import './Post.css'

const Post: React.FC = () => {
  return (
    <div className="post">
        <div className="user-post">
            <img src="./logo-black.png" alt="post"/>
            <p>Fulano de Tal</p>
        </div>
        <div className="img-post">
            <img src="./teste.jpg" alt="post"/>
        </div>
        <div className="coment-post">
            
        </div>
    </div>
  );
};

export default Post;
