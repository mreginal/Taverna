import '../Posts/Post.css'
import { useState, useEffect } from 'react'
import { PostType } from '../../types/types'
import { api } from '../../services/api'
import { RiBookmarkLine, RiChat3Line, RiHeartFill, RiHeartLine } from 'react-icons/ri'
import { Alert, Snackbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../../hooks/useProfile'
import EditPost from '../Posts/EditPost'
import { useProfilePicture } from '../../hooks/useProfilePicture'

const UserPosts: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([])
  const [error, setError] = useState('')
  const [reacting, setReacting] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const navigate = useNavigate()
  const { profilePicture } = useProfilePicture();
  const userProfile = useProfile()

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true)
    }
  }, [error])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await api.get('/post/')
      setPosts(response.data)
    } catch (error) {
      console.error('Erro ao buscar postagens:', error)
      setError('Erro ao buscar postagens.')
    }
  }

  const handleReact = async (postId: number, liked: boolean) => {
    try {
      if (reacting) return
      setReacting(true)

      const token = localStorage.getItem('token')
      if (!token) {
        setError('Faça login para reagir às postagens.')
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
        <div>
            <div className="user-post-container">
                {posts.map(post => (
                  userProfile?._id === post.user_id && (
                    <div key={post._id} className='card-post-profile'>
                      <div className="user-post">
                        <img src={profilePicture || 'pessoa-teste.png'} alt="Foto de perfil"/>
                        <h2>{userProfile.name}</h2>
                        <EditPost postId={post._id} />
                      </div>
                      <div className="content-post">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                      </div>
                      <div className="react-post">
                        <div className="react">
                          <div className="like-post">
                            <button disabled={reacting} onClick={() => handleReact(post._id, post.liked)}>
                              {post.liked ? <RiHeartFill color='var(--cor05)' /> : <RiHeartLine />}
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
                  )
                ))}
            </div>
            <div>
              {error && (
                <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                  <Alert onClose={handleCloseSnackbar} variant='filled' severity="error">
                    {error}
                  </Alert>
                </Snackbar>
              )}
            </div>
        </div>
  )
}

export default UserPosts
