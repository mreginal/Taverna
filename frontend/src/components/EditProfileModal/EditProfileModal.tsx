import './EditProfileModal.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Modal } from '@mui/material';
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

  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    birthdate: userProfile?.birthdate || '',
    gender: userProfile?.gender || '',
  });

  const [profilePicture, setProfilePicture] = useState<string | null>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    setError('');
  
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('Token não encontrado');
      return;
    }
  
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
  
    try {
      await api.post('/user/atualizar', formData, config);
  
      if (profilePicture) {
        const uploadData = new FormData();
        const imageBlob = await fetch(profilePicture).then((res) => res.blob());
        uploadData.append('file', imageBlob, 'profile-picture.png');
  
        await api.post('/user/upload-profile-picture', uploadData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
  
      navigate('/profile');
      window.location.reload();
    } catch (error) {
      console.error(error);
      setError('Erro ao editar o perfil do usuário. Por favor, preencha todos os campos corretamente.');
    }
  
    handleClose();
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
                            {profilePicture ? (
                              <img src={profilePicture} alt="Foto de perfil" />
                            ) : (
                              <img src="pessoa-teste.png" alt="logo" />
                            )}
                            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="file-input" />
                            <label htmlFor="file-input"><RiBallPenFill /></label>
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
                    </div>
                  </div>
                </div>
          </>
      </Modal>
    </div>
  )
}

export default EditProfile;
