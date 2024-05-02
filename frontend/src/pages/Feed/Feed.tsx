import './Feed.css'

//imports
import Post from '../../components/NewPost/Post'
import Sidebar from '../../components/Sidebar/Sidebar'
import { RiImage2Fill, RiUserAddFill } from 'react-icons/ri'

const Feed = () => {

  return (
    <div className="feed">
        <div className="right-feed">
            <Sidebar/>
        </div>
        <div className="center-feed">
            <div className="new-post">
                <div className="post-container">
                    <input type="text" placeholder='Qual a receita de hoje?'/>
                </div>
                <div className="itens-post">
                    <div className="item-post">
                        <p><RiImage2Fill/></p>
                        <p>Imagem</p>
                    </div>
                    <div className="item-post">
                        <p><RiUserAddFill/></p>
                        <p>Marcar amigos</p>
                    </div>
                    <div className="btn-post"><input type="button" value="Postar"/></div>
                </div>
                <div className="post">
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
            </div>
        </div>

        <div className="left-feed">
            
        </div>
    </div>
  )
}

export default Feed