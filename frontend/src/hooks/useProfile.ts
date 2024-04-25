import { useState, useEffect } from 'react';
import { User } from '../types/types';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const useProfile = () => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          console.error('Token não encontrado')
          return
        }

        const response = await api.get('/user/perfil', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        })

        setUserProfile(response.data);
      } catch (error) {
        console.error('Erro ao buscar perfil do usuário:', error)
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return userProfile;
};

