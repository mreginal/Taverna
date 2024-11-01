import './Notification.css'
import React, { useState, useEffect } from 'react'
import { api } from '../../services/api'
import {Modal } from '@mui/material'
import { Notification, PostType, User } from '../../types/types'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useProfile } from '../../hooks/useProfile'
import { RiBookmarkLine, RiChat3Line, RiCloseCircleLine, RiDeleteBinFill, RiHeartFill, RiHeartLine } from 'react-icons/ri'
import { useProfilePicture } from '../../hooks/useProfilePicture'
import EditPost from '../../components/Posts/EditPost'
import { useNavigate } from 'react-router-dom'

const NotificationsList: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null)
  const userProfile = useProfile()
  const {profilePicture} = useProfilePicture()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [reacting, setReacting] = useState(false)

  const handleOpen = async (postId: number) => {
    try {
      const response = await api.get(`/post/${postId}`)
      setSelectedPost(response.data)
      setOpen(true)
    } catch (error) {
      console.error('Erro ao buscar o post:', error)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedPost(null)
  }

  useEffect(() => {
    if (!token) return;

    const fetchNotifications = async () => {
      try {
        const response = await api.get(`/notification/usuario`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setNotifications(response.data)
      } catch (error) {
        console.error('Erro ao buscar notificações:', error)
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

    fetchUsers()
    fetchNotifications()
  }, [userProfile, token])

  const handleReact = async (postId: number, liked: boolean) => {
    try {
      if (reacting) return
      setReacting(true)

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

      if (selectedPost && selectedPost._id === postId) {
        setSelectedPost({
          ...selectedPost,
          liked: !liked,
          likes: liked ? selectedPost.likes - 1 : selectedPost.likes + 1,
        })
      }

      setReacting(false)
    } catch (error) {
      console.error('Erro ao reagir à postagem:', error)
      setReacting(false)
    }
  }

  const handleRemoveAll = async () => {
    try {
      await api.delete('/notification/limpar', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setNotifications([])
    } catch (error) {
      console.error('Erro ao limpar notificações:', error)
    }
  }

  const handleRemove = async (notificationId: number) => {
    try {
      await api.delete(`/notification/remover/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setNotifications(notifications.filter((n) => n._id !== notificationId))
    } catch (error) {
      console.error('Erro ao remover notificação:', error)
    }
  }

  const getUsernameById = (userId: number): string => {
    const user = users.find(user => user._id === userId)
    return user ? user.name : 'Usuário Desconhecido'
  }

  return (
    <div className="feed">
      <div className="right-feed">
        <Sidebar />
      </div>
      <div className="center-feed">
        <div className="notification-container">
          <div className="header-title">
            <h1>Notificações</h1>
          </div>
          <button className="btn-notification" onClick={handleRemoveAll}>Limpar tudo</button>
          <ul>
            {notifications.map((notification) => (
              <li key={notification._id}>
                <div className="notification" onClick={() => handleOpen(notification.post_id as number)}>
                  <div className="content-not">
                    <span>{getUsernameById(notification.sender_id)}</span> {notification.message}: {notification.title}
                  </div>
                  <div className="delete-not">
                    <button onClick={(e) => { e.stopPropagation(); handleRemove(notification._id) }}>
                      <RiDeleteBinFill />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="left-feed"></div>


      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <div className="newpost-container">
          <div className="newpost">
            <button className="btn-exit" onClick={handleClose}><RiCloseCircleLine /></button>
            {selectedPost ? (
              <div className="post">
                  <h4 style={{color:'gray'}}>Detalhe da Postagem:</h4>
                <div className='card-post'>
                  <div className="user-post">
                    <img src={profilePicture || 'pessoa-teste.png'} alt="Foto de perfil"/>
                    <h2>{userProfile?.name}</h2>
                    <EditPost postId={selectedPost._id} />
                  </div>
                  <div className="content-post">
                    <h3>{selectedPost.title}</h3>
                    <p>{selectedPost.content}</p>
                  </div>
                  <div className="react-post">
                    <div className="react">
                      <div className="like-post">
                        <button disabled={reacting} onClick={() => handleReact(selectedPost._id, selectedPost.liked)}>
                          {selectedPost.liked ? <RiHeartFill color='var(--cor05)' /> : <RiHeartLine />}
                          <p>{selectedPost.likes}</p>
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
            ) : (
              <p>Post não encontrado.</p>
            )}
          </div>
        </div>
      </Modal>

      
    </div>
  )
}

export default NotificationsList