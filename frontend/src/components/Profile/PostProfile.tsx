import '../Posts/Post.css'

import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import Content from '../Posts/Content'
import { PostType, User } from '../../types/types'
import { RiBookmarkLine, RiChat3Line, RiHeartFill, RiHeartLine } from 'react-icons/ri'
import { useProfile } from '../../hooks/useProfile'
import EditPostModal from '../EditPostModal/EditPostModal'

const ProfilePosts: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [reacting, setReacting] = useState(false)

  const userProfile = useProfile()

  useEffect(() => {
    const fetchPostProfile = async () => {
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          console.error('Token não encontrado')
          return
        }

        const response = await api.get('/post/perfil', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        })

        setPosts(existingPosts => existingPosts.concat(response.data))
      } catch (error) {
        console.error('Erro ao buscar postagens do usuário:', error)
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
    fetchPostProfile()
    fetchUsers()
  }, [])

  const getUsername = (userId: number): string => {
    const user = users.find(user => user._id === userId)
    return user ? user?.name : 'Usuário Desconhecido'
  }

  const handleReact = async (postId: number, liked: boolean) => {
    try {
      if (reacting) return
      setReacting(true)

      const token = localStorage.getItem('token')

      const endpoint = liked ? '/post/dislike' : '/post/like'
      await api.post(
        endpoint,
        { post_id: postId },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.post_id === postId ? { ...post, liked: !liked, likes: liked? post.likes -1 : post.likes +1 } : post
        )
      )

      setReacting(false)
    } catch (error) {
      console.error('Erro ao reagir à postagem:', error)
      setReacting(false)
    }
  }

  return (
    <div className='post-cont'>
      <div className='post-wrapper'>
        {posts.length > 0 ? (
          posts.map(post => (
                <div>
                  <div key={post.post_id} className='card-post'>
                  <div className="user-post">
                  <div className='user-info-post'>
                    <div><img src="pessoa-teste.png" alt="logo" /></div>
                    <div>
                      <h2>{getUsername(post.user_id)}</h2>
                    </div>
                  </div>
                  <div>
                    {userProfile && userProfile._id === post.user_id &&(
                      <div>
                          <EditPostModal/>
                      </div>
                    )}
                  </div>
                </div>
                <div className="content-post">
                  <h3>{post.title}</h3>
                  <Content content={post.content} limit={350}/>
                </div>
                <div className="react-post">
              <div className="react">
                <div className="like-post">
                  <button disabled={reacting} onClick={() => handleReact(post.post_id, post.liked)}>
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
        </div>   
          ))
        ) : (
          <div className="not-post">
            <p> Nenhuma postagem encontrada</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePosts
