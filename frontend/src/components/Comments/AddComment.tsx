import './Comments.css'
import { useState } from 'react'
import { api } from '../../services/api'
import { Modal } from '@mui/material'
import { RiCloseCircleLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../../hooks/useProfile'

const AddComment: React.FC<{ postId: number }> = ({ postId }) => {
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const userProfile = useProfile()

  const handleOpen = () => {
    if (!userProfile) {
      setError('Faça login para criar suas postagens.')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
      return
    }
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Faça login para criar suas postagens.')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
        return
      }

      const response = await api.post(`post/comentar`, { post_id: postId, content }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        setContent('')
        setOpen(false)
        window.location.reload()
      } else {
        setError('Erro ao adicionar comentário')
      }
    } catch (error) {
      setError('Erro ao adicionar comentário. Por favor, tente novamente.')
    }
  }

  return (
    <div>
        <button className='comment-btn' onClick={handleOpen}>Adicionar comentário</button>
        <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <div className='newpost-container'>
              <div className="newpost">
                <button className='btn-exit' onClick={handleClose}><RiCloseCircleLine/></button>
                <div className="post">
                    <form onSubmit={handleSubmit}>
                        <h2>Adicionar Comentário</h2>
                        <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Escreva seu comentário"
                        required
                        />
                        <button type="submit">Comentar</button>
                    </form>
                </div>
              </div>
          </div>
        </Modal>
    </div> 
  )
}

export default AddComment
