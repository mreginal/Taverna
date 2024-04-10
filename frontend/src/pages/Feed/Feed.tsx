
import './Feed.css'
import Post from '../../components/NewPost/Post'
import Navbar from '../../components/Navbar/Navbar'

const Feed = () => {
  return (
    <div className="feed">
        <Navbar/>
        <div className="center-feed">
            <div className="new-post">
                <div className="post-container">
                    <input type="text" placeholder='Qual a receita de hoje?'/>
                </div>
                <div className="itens-post">
                    <div className="item-post">
                        <img src="./icon-img.svg" alt="img" />
                        <p>Imagem</p>
                    </div>
                    <div className="item-post">
                        <img src="./icon-cheers.svg" alt="friends" />
                        <p>Marcar amigos</p>
                    </div>
                    <div className="btn-post"><input type="button" value="Postar"/></div>
                </div>
                <div className="post">
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