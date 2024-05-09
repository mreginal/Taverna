import './Post.css'
import { useState, useEffect } from 'react'
import { PostType, User } from '../../types/types'
import { api } from '../../services/api'
import { RiBookmarkLine, RiChat3Line, RiHeartFill, RiHeartLine } from 'react-icons/ri'

const Post: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchPosts()
    fetchUsers()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await api.get('/post/');
      setPosts(response.data)
    } catch (error) {
      console.error('Erro ao buscar postagens:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await api.get('/user/')
      setUsers(response.data)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    }
  }

  const getUsername = (userId: number): string => {
    const user = users.find(user => user._id === userId)
    return user ? user.name : 'Usuário Desconhecido'
  }

  const handleLike = async (postId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado');
        return;
      }
  
      await api.post(`/post/like`, { post_id: postId }, { headers: { Authorization: `Bearer ${token}` } });
  
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? { ...post, liked: !post.liked } : post
        )
      );
  
      console.log('Estado atualizado das postagens:', posts); // Verifique se o estado das postagens foi atualizado corretamente
  
    } catch (error) {
      console.error('Erro ao curtir postagem:', error);
    }
  };
  

  return (
    <div>
      <div>
        {posts.map(post => (
          <div key={post._id} className='card-post'>
            <div className="user-post">
              <img src="pessoa-teste.png" alt="logo" />
              <h2>{getUsername(post.user_id)}</h2>
            </div>

            <div className="content-post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>

            <div className="react-post">
              <div className="react">
                <button onClick={()=>handleLike(post._id)}>
                  {post.liked ? <RiHeartFill color='var(--cor05)'/> : <RiHeartLine/> }
                </button>
                <button><RiChat3Line /></button>
              </div>
              <div className="save">
                <button><RiBookmarkLine /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
