import './Favorites.css'
import { useState, useEffect } from 'react'
import { api } from '../../services/api';
import { PostType, User } from '../../types/types';
import Sidebar from '../../components/Sidebar/Sidebar';
import EditPost from '../../components/Posts/EditPost';
import CommentsList from '../../components/Comments/CommentsList';
import { RiBookmarkFill, RiBookmarkLine, RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { useProfile } from '../../hooks/useProfile';
import { useNavigate } from 'react-router-dom';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([])
  const [favoritePosts, setFavoritePosts] = useState<PostType[]>([])
  const [posts, setPosts] = useState<PostType[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState('')
  const [reacting, setReacting] = useState(false)

  const navigate = useNavigate()
  const userProfile = useProfile()

  useEffect(()=>{
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setError('Faça login para ver suas postagens favoritas.')
          return
        }

        const response = await api.get('/user/favoritos', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setFavorites(response.data)
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error)
        setError('Erro ao buscar favoritos.')
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

    fetchFavorites()
    fetchUsers()
  }, [])

  useEffect(()=>{
    const fetchPosts = async () => {
      try {
        const response = await api.get('/post/')
        const favoritePosts = response.data.filter((post: PostType) => favorites.includes(post._id))
        setFavoritePosts(favoritePosts)
      } catch (error) {
        console.error('Erro ao buscar postagens:', error)
        setError('Erro ao buscar postagens.')
      }
    }

    if (favorites.length > 0) {
      fetchPosts()
    }
  },[favorites])

  const getUsername = (userId: number): string => {
    const user = users.find(user => user._id === userId)
    return user ? user.name : 'Usuário Desconhecido'
  }

  const getUserProfilePicture = (userId: number): string => {
    const user = users.find(user => user._id === userId)
    return user ? user.profile_picture : 'pessoa-teste.png'
  }

  const handleReact = async (postId: number, liked: boolean) => {
    try {
      if (reacting) return
      setReacting(true)

      const token = localStorage.getItem('token')
      if (!token) {
        setError('Faça login para reagir as postagens.')
        setReacting(false)
        setTimeout(() => {
          navigate('/login')
        }, 2000)
        return
      }

      const endpoint = liked ? '/post/dislike' : '/post/like'
      await api.post(
        endpoint,
        { post_id: postId },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? { ...post, liked: !liked, likes: liked ? post.likes - 1 : post.likes + 1 } : post
        )
      )

      setReacting(false)
    } catch (error) {
      console.error('Erro ao reagir à postagem:', error)
      setReacting(false)
    }
  }

  const handleFavorite = async (postId: number, favorited: boolean) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Faça login para favoritar postagens.')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
        return
      }
  
      const endpoint = favorited ? '/user/desfavoritar' : '/user/favoritar'
      await api.post(
        endpoint,
        { post_id: postId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
  
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? { ...post, favorited: !favorited } : post
        )
      )
      console.log(posts)
    } catch (error) {
      console.error('Erro ao favoritar/desfavoritar a postagem:', error)
    }
  }

  return (
    <div className="feed">
            <div className="right-feed">
                <Sidebar/>
            </div>
            <div className="center-feed">

                <div className="favorites">
                  <div className="header-title">
                    <h1>Favoritos</h1>
                    {error && <p style={{color:'var(--cor05)'}}>{error}</p>}
                  </div>
                  <div className="post-favorites">
                    <ul>
                      {favoritePosts.map(post=>(
                        <li key={post._id}>
                          <div className='card-post-favorites'>
                              <div className="user-post">
                                <img src={getUserProfilePicture(post.user_id)} alt="logo" />
                                <h2>{getUsername(post.user_id)}</h2>
                                {userProfile?._id === post.user_id && 
                                  <EditPost postId={post._id}/>
                                }
                              </div>

                            <div className="content-post">
                              <h3>{post.title}</h3>
                              <p>{post.content}</p>
                            </div>
                            <div className="react-post">
                            <div className="react">
                              <div className="like-post">
                                <button disabled={reacting} onClick={() => handleReact(post._id, post.liked)}>
                                  {post.liked ? <RiHeartFill color='var(--cor05)'/> : <RiHeartLine/> }
                                  <p>{post.likes}</p>
                                </button>
                              </div>
                              <CommentsList postId={post._id}/>
                            </div>
                            <div className="save">
                            <button onClick={() => handleFavorite(post._id, post.favorited)}>
                                {post.favorited ? <RiBookmarkFill color='var(--cor05)' /> : <RiBookmarkLine />}
                              </button>
                            </div>
                          </div>
                        </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
            </div>

            <div className="left-feed">
                
            </div>
      </div>
  )
}

          

export default Favorites
