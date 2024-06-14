import './Comments.css'
import React, { useState, useEffect } from 'react'
import { api } from '../../services/api'
import { Modal } from '@mui/material'
import { RiChat3Line, RiCloseCircleLine } from 'react-icons/ri'
import AddComment from './AddComment'
import { User } from '../../types/types'
import { useProfile } from '../../hooks/useProfile'
import EditComment from './EditComment'

interface Comment {
  id: number
  content: string
  user_id: number
}

const CommentsList: React.FC<{ postId: number }> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [error] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const userProfile = useProfile()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/post/comentarios/${postId}`)
        setComments(response.data)
      } catch (error) {
        console.error('Erro ao carregar comentários:', error)
      }
    }

    fetchComments()
  }, [postId])

  useEffect(()=> {
    const fetchUsers = async () => {
        try {
          const response = await api.get('/user/')
          setUsers(response.data)
        } catch (error) {
          console.error('Erro ao buscar usuários:', error)
        }
      }
      fetchUsers()
  }, []) 
  
  const getUsername = (userId: number): string => {
    const user = users.find(user => user._id === userId) //
    return user ? user.name : 'Usuário Desconhecido'
  }

  return (
    <div>
      <div className='comments-count'>
        <button className='comment-btn' onClick={handleOpen}><RiChat3Line /></button>
        {comments.length >= 0 && (
            <span className="comment-count">{comments.length}</span>
        )}
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <div className='newpost-container'>
          <div className="newpost">
            <button className='btn-exit' onClick={handleClose}><RiCloseCircleLine /></button>
            <div className="post">
              <h2>Comentários</h2>
              {error ? (
                <div>{error}</div>
              ) : (
                <>
                  {comments.length === 0 ? (
                    <div>Nenhum comentário encontrado.</div>
                  ) : (
                        <ul className='comments'>
                          {comments.map((comment, index) => (
                            <li key={index}>
                                <div className="comment">
                                    <div className="photo-user-comment">
                                        <img src="../../pessoa-teste.png" alt="photo" />
                                    </div>
                                    <div>
                                        <div className="user-comment">{getUsername(comment.user_id)}</div>
                                        <div className="content-comment">{comment.content}</div>
                                    </div>
                                    {userProfile?._id === comment.user_id && 
                                    <>
                                        <div className='edit-comment'>
                                          
                                        </div>
                                    </>
                                    }
                                </div>
                            </li>
                          ))}
                        </ul>
                  )}
                </>
              )}
                <div className='commenting-btn'>
                    <AddComment postId={postId} />
                </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CommentsList;
