import './EditPictureModal.css';
import { useState, useEffect } from 'react';
import { Modal } from '@mui/material';
import { RiCloseCircleLine, RiBallPenFill } from 'react-icons/ri';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { EditProfilePictureModalProps } from '../../types/types';

const EditPictureModal: React.FC<EditProfilePictureModalProps> = ({ open, onClose, currentProfilePicture}) => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    if (open) {
      setProfilePicture(currentProfilePicture || null);
    }

    return () => {
      if (profilePicture) {
        URL.revokeObjectURL(profilePicture);
      }
    };
  }, [open, currentProfilePicture]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Por favor, selecione uma imagem.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const token = localStorage.getItem('token');
      
      await api.post('/user/upload-profile-picture', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/profile');
      window.location.reload();
    } catch (error: any) {
      console.error('Erro ao enviar a imagem:', error);
      if (error.response && error.response.data) {
        console.error('Detalhes do erro:', error.response.data);
        alert(`Erro: ${error.response.data.message || 'Falha ao enviar a imagem.'}`);
      } else {
        alert('Ocorreu um erro ao atualizar a foto de perfil.');
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <div className="edit-profile-picture">
        <form onSubmit={handleSubmit} className="edit-picture-container">
          <div className="edit-user">
            <div className="edit-picture-card">
              <div className="edit-picture-header">
                <h2>Editar Foto de Perfil</h2>
                <p>
                  <RiCloseCircleLine onClick={onClose} />
                </p>
              </div>
              <div className="edit-photo-content">
                {profilePicture ? (
                  <img src={profilePicture} alt="Foto de perfil" />
                ) : (
                  <img src="pessoa-teste.png" alt="Foto padrão" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="file-input"
                />
                <label htmlFor="file-input">
                  <RiBallPenFill />
                </label>
              </div>
              <button type="submit" className="submit-button">
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditPictureModal;
