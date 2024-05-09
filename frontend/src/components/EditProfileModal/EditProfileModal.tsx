import './EditProfileModal.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Alert, Snackbar, Modal } from '@mui/material';
import { RiCloseCircleLine, RiBallPenFill } from 'react-icons/ri';
import { useProfile } from '../../hooks/useProfile';
import { AxiosRequestConfig } from 'axios';

const EditProfile: React.FC = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const userProfile = useProfile()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  
  const [error, setError] = useState('')
  const [successSnackbar, setSuccessSnackbar] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    birthdate: userProfile?.birthdate || '',
    gender: userProfile?.gender || '',
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        birthdate: userProfile.birthdate || '',
        gender: userProfile.gender || '',
      });
    }
  }, [userProfile])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError('')

    setFormData({
      name: '',
      birthdate: '',
      gender:'',
    })

    const token = localStorage.getItem('token') 

    if (!token) {
      console.error('Token não encontrado')
      return
    }

    const config: AxiosRequestConfig = {
      headers:{
        Authorization: `Bearer ${token}`
      }
    } 

    try {
      await api.post('/user/atualizar', formData, config)
      setSuccessSnackbar(true)
      setTimeout(() => navigate('/profile'), 3000)
      window.location.reload()
    } catch (error) {
      console.log(error);
      setError('Erro ao editar o perfil do usuário. Por favor, preencha todos os campos corretamente.')
    }

    handleClose()
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  };

  const handleCloseSuccessSnackbar = () => {
    setSuccessSnackbar(false)
  };

  return (
    <div>
      <button className='edit-btn' onClick={handleOpen}>Editar Perfil</button>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <>
              <div className="edit-container">
                <div></div>
                <div className="edit-user">
                    <div className="edit-card">
                      <form className='edit-form' onSubmit={handleSubmit}>
                          <div className="edit-header">
                            <h2>Edite seus dados: </h2>
                            <p>
                              <RiCloseCircleLine onClick={handleClose}/>
                            </p>
                          </div>
                          <div className="edit-photo">
                            <img src="pessoa-teste.png" alt="logo"/>
                            <RiBallPenFill/>
                          </div>
                          <label>
                            <span>Nome completo:</span>
                            <input type="name" name='name' placeholder='Nome Sobrenome' value={formData.name} onChange={handleChange}/>
                          </label>
                          <label>
                            <span>Data de Nascimento:</span>
                            <input type="date" name='birthdate' value={formData.birthdate} onChange={handleChange}/>
                          </label>
                          <label>
                            <span>Gênero:</span>
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                              <option value="">Selecione uma opção</option>
                              <option value="nid">Não identificar</option>
                              <option value="masc">Masculino</option>
                              <option value="fem">Feminino</option>
                            </select>
                          </label>
                          <div className="btn-edit"><input type="submit" id='button-edit' value="salvar"/></div>
                      </form>
                      <div>
                          <Snackbar
                            open={successSnackbar}
                            autoHideDuration={2000}
                            onClose={handleCloseSuccessSnackbar}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                          >
                            <Alert onClose={handleCloseSuccessSnackbar} variant="filled" severity="success">
                              Perfil atualizado com sucesso!
                            </Alert>
                          </Snackbar>
                        </div>

                        <div>
                          {error && (
                            <Snackbar
                              open={snackbarOpen}
                              autoHideDuration={2000}
                              onClose={handleCloseSnackbar}
                              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                              <Alert onClose={handleCloseSnackbar} variant="filled" severity="error">
                                {error}
                              </Alert>
                            </Snackbar>
                          )}
                        </div>
                    </div>
                  </div>
                </div>
          </>
      </Modal>
    </div>
  )
}

export default EditProfile;
