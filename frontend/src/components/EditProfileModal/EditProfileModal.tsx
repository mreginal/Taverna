import './EditProfileModal.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Modal } from '@mui/material';
import { RiCloseCircleLine } from 'react-icons/ri';
import { useProfile } from '../../hooks/useProfile';
import { AxiosRequestConfig } from 'axios';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const userProfile = useProfile();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [error, setError] = useState('');

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
  }, [userProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      console.log('Dados enviados: ', formData);

      await api.post('/user/atualizar', formData, config);

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
                      <p><RiCloseCircleLine onClick={handleClose} /></p>
                  </div>
                  <label>
                    <span>Nome completo:</span>
                    <input
                      type="text"
                      name='name'
                      placeholder='Nome Sobrenome'
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <span>Data de Nascimento:</span>
                    <input
                      type="date"
                      name='birthdate'
                      value={formData.birthdate}
                      onChange={handleChange}
                    />
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
                  <div className="btn-edit">
                    <input type="submit" id='button-edit' value="Salvar" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default EditProfile;
