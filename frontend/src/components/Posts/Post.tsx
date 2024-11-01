import './Post.css'
import { useState, useEffect } from 'react'
import { PostType, User } from '../../types/types'
import { api } from '../../services/api'
import { RiBookmarkFill, RiBookmarkLine, RiHeartFill, RiHeartLine } from 'react-icons/ri'
import { Alert, Snackbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../../hooks/useProfile'
import EditPost from './EditPost'
import CommentsList from '../Comments/CommentsList'
import { useProfilePicture } from '../../hooks/useProfilePicture'

const Post: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState('')
  const [reacting, setReacting] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const navigate = useNavigate()
  const profilePicture = useProfilePicture();
  const userProfile = useProfile()

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true)
    }
  }, [error])

  useEffect(() => {
    fetchPosts()
    fetchUsers()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await api.get('/post/')
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
  
  const getUserProfilePicture = (userId: number): string => {
    const user = users.find(user => user._id === userId)
    return user?.profile_picture || 'pessoa-teste.png'
  }

  const handleReact = async (postId: number, liked: boolean, postUserId: number, postTitle: string) => {
    try {
      if (reacting) return;
      setReacting(true);
  
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Faça login para reagir às postagens.');
        setReacting(false);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        return;
      }
  
      const endpoint = liked ? '/post/dislike' : '/post/like';
      await api.post(
        endpoint,
        { post_id: postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (!liked) {
        await api.post(
          '/notification/criar',
          {
            user_id: postUserId,
            type: 'like',
            title: postTitle,
            message: `curtiu seu post`,
            post_id: postId,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      }
  
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? { ...post, liked: !liked, likes: liked ? post.likes - 1 : post.likes + 1 } : post
        )
      );
  
      setReacting(false);
    } catch (error) {
      console.error('Erro ao reagir à postagem:', error);
      setReacting(false);
    }
  }
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
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
      
      if (!favorited) {
        const postUserId = posts.find(post=> post._id === postId)?.user_id
        const postTitle = posts.find(post=> post._id === postId)?.title

        await api.post(
          '/notification/criar',
          {
            user_id: postUserId,
            type: 'favorite',
            title: postTitle,
            message: `favoritou seu post`,
            post_id: postId,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      }

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? { ...post, favorited: !favorited} : post
        )
      )
      console.log(posts)
    } catch (error) {
      console.error('Erro ao favoritar/desfavoritar a postagem:', error)
    }
  }
  
  return (
    <div>
      <div>
        {posts.map(post => (
          <div key={post._id} className='card-post'>
              <div className="user-post">
              <img src={getUserProfilePicture(post.user_id)} alt="Foto de perfil" />
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
                  <button disabled={reacting} onClick={() => handleReact(post._id, post.liked, post.user_id, post.title)}>
                    {post.liked ? <RiHeartFill color='var(--cor05)'/> : <RiHeartLine/> }
                    <p>{post.likes}</p>
                  </button>
                </div>
                <CommentsList postId={post._id} postUserId={post.user_id} postTitle={post.title}/>
              </div>
              <div className="save">
              <button onClick={() => handleFavorite(post._id, post.favorited)}>
                  {post.favorited ? <RiBookmarkFill color='var(--cor05)' /> : <RiBookmarkLine />}
                </button>
              </div>
            </div>
          </div>
        ))}

          <div>{error && 
              <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{vertical:'top', horizontal:'right'}} >
                  <Alert onClose={handleCloseSnackbar} variant='filled' severity="error">
                    {error}
                  </Alert>
              </Snackbar>}
          </div>

      </div>
    </div>
  )
}

export default Post