import './NewPosts.css'
import { useState } from 'react'
import { Modal } from '@mui/material'
import { RiCloseCircleLine } from 'react-icons/ri'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function NewPost(){
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleCreatePost = async () => {
    const token = localStorage.getItem('token') 

    if (!token) {
      navigate('/login')
      return
    }
    
    try {
      const response = await api.post('/post/criar', { title, content }, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data)
      setOpen(false)
      window.location.reload()
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
    }
  }

  return (
    <div>
      <input type="button" value={'Qual é a receita de hoje? '} onClick={handleOpen}/>
      <Modal open={open}>
          <div className='newpost-container'>

              <div className="newpost">
                <button className='btn-exit' onClick={handleClose}><RiCloseCircleLine/></button>
                <div className="post">
                    <h2>Criar Post</h2>
                    <input type="text" id='tittle' placeholder='Título' value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <input type="text" id='content' placeholder='Conteúdo' value={content} onChange={(e) => setContent(e.target.value)}/>
                    <div className="btn-post"><input type="button" value={'Postar'} onClick={handleCreatePost} /></div>
                </div>
              </div>
          </div>
      </Modal>
    </div>
  )
}