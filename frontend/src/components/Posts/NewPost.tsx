import './Post.css'
import { useEffect, useState } from 'react'
import { Alert, Modal, Snackbar } from '@mui/material'
import { RiCloseCircleLine } from 'react-icons/ri'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function NewPost(){
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const token = localStorage.getItem('token') 
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true)
    }
  }, [error])

  const handleOpen = () => {
    if (!token) {
      setError('Faça login para criar suas postagens.')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
      return
    }
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleCreatePost = async () => {
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
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
                    <textarea id='content' placeholder='Conteúdo' value={content} onChange={(e) => setContent(e.target.value)}/>
                    <div className="btn-post"><input type="button" value={'Postar'} onClick={handleCreatePost} /></div>
                </div>
              </div>
          </div>
      </Modal>
      <div>{error && 
                <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{vertical:'top', horizontal:'right'}} >
                    <Alert onClose={handleCloseSnackbar} variant='filled' severity="error">
                      {error}
                    </Alert>
                </Snackbar>}
            </div>
    </div>
  )
}