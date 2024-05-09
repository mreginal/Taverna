import './Feed.css'

//imports
import NewPost from '../../components/Posts/NewPost'
import Sidebar from '../../components/Sidebar/Sidebar'
import { RiImage2Fill, RiUserAddFill } from 'react-icons/ri'
import Post from '../../components/Posts/Post'

const Feed = () => {

  return (
    <div className="feed">
        <div className="right-feed">
            <Sidebar/>
        </div>
        <div className="center-feed">
            <div className="new-post">
                <div className="post-container">
                    <NewPost/>
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
                </div>
                <div className="post">
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