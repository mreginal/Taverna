import './Post.css'
import { useState, useEffect } from 'react'
import { PostType, User, PostProps } from '../../types/types'
import { api } from '../../services/api'
import { RiBookmarkLine, RiChat3Line, RiHeartFill, RiHeartLine } from 'react-icons/ri'
import { Alert, Snackbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'


const Post: React.FC<PostProps> = () => {
  const [posts, setPosts] = useState<PostType[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState('')
  const [reacting, setReacting] = useState(false)
  const navigate = useNavigate()
  const [snackbarOpen, setSnackbarOpen] = useState(false)

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
          post._id === postId ? { ...post, liked: !liked, likes: liked? post.likes -1 : post.likes +1 } : post
        )
      )

      setReacting(false)
    } catch (error) {
      console.error('Erro ao reagir à postagem:', error)
      setReacting(false)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

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
                <div className="like-post">
                  <button disabled={reacting} onClick={() => handleReact(post._id, post.liked)}>
                    {post.liked ? <RiHeartFill color='var(--cor05)'/> : <RiHeartLine/> }
                    <p>{post.likes}</p>
                  </button>
                </div>
                <button><RiChat3Line /></button>
              </div>
              <div className="save">
                <button><RiBookmarkLine /></button>
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