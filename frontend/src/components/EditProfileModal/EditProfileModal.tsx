import Modal from '@mui/material/Modal'
import './EditProfileModal.css'
import { RiCloseCircleLine } from 'react-icons/ri'
import { useProfile } from '../../hooks/useProfile'
import { useState } from 'react'

export default function EditProfileModal() {
  const [open, setOpen] = useState(false)

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
                  <div className="exit-edit">
                    <RiCloseCircleLine onClick={handleClose}/>
                  </div>
                    <form>
                      <div className="form-user">
                        <h2>Oi</h2>
                        <label>
                          <span>Nome completo:</span>
                          <input type="name" name='name' placeholder='Nome Sobrenome'/>
                        </label>
                        <label>
                          <span>Data de Nascimento:</span>
                          <input type="date" name='birthdate'/>
                        </label>
                        <label>
                          <span>Email:</span>
                          <input type="email" name='email' placeholder='exemplo@gmail.com' id='email'/>
                        </label>
                        <label>
                          <span>Gênero:</span>
                          <select name="gender">
                            <option value="">Selecione uma opção</option>
                            <option value="nid">Não identificar</option>
                            <option value="masc">Masculino</option>
                            <option value="fem">Feminino</option>
                        </select>
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
          </>
      </Modal>
    </div>
  )
}
