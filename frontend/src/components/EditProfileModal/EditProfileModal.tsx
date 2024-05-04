import Modal from '@mui/material/Modal'
import './EditProfileModal.css'
import { RiBallPenFill, RiCloseCircleLine } from 'react-icons/ri'
import { useState } from 'react'
import { useProfile } from '../../hooks/useProfile'

export default function EditProfileModal() {
  const [open, setOpen] = useState(false)
  const userProfile = useProfile()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <button className='edit-btn' onClick={handleOpen}>Editar Perfil</button>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <>
              <div className="edit-container">
                <div></div>
                <div className="edit-user">
                    <div className="edit-card">
                      <form className='edit-form'>
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
                            <input type="name" name='name' placeholder='Nome Sobrenome' value={userProfile?.name}/>
                          </label>
                          <label>
                            <span>Data de Nascimento:</span>
                            <input type="date" name='birthdate' value={userProfile?.birthdate}/>
                          </label>
                          <label>
                            <span>Email:</span>
                            <input type="email" name='email' placeholder='exemplo@gmail.com' id='email' value={userProfile?.email}/>
                          </label>
                          <label>
                            <span>Gênero:</span>
                            <select name="gender" value={userProfile?.gender}>
                              <option value="">Selecione uma opção</option>
                              <option value="nid">Não identificar</option>
                              <option value="masc">Masculino</option>
                              <option value="fem">Feminino</option>
                            </select>
                          </label>
                      </form>
                      <div className="btn-edit"><input type="submit" id='button-edit' value="salvar"/></div>
                    </div>
                  </div>
                </div>
          </>
      </Modal>
    </div>
  )
}
