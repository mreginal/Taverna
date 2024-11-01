import { useEffect, useState } from 'react';
import { api } from '../services/api';

export const useProfilePicture = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfilePicture = async () => {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');

      if (!token) {
        setError('Token não encontrado');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/user/perfil', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        setProfilePicture(response.data.profile_picture || null);
      } catch (err) {
        console.error('Erro ao buscar imagem de perfil:', err);
        setError('Erro ao carregar a imagem de perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfilePicture();
  }, []);

  return { profilePicture, loading, error };
};
