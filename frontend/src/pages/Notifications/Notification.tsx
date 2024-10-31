import './Notification.css'
import React, { useState, useEffect } from 'react'
import { api } from '../../services/api'
import { Notification, User } from '../../types/types'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useProfile } from '../../hooks/useProfile'
import { RiDeleteBinFill } from 'react-icons/ri'

const NotificationsList: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [users, setUsers] = useState<User[]>([])

  const userProfile = useProfile()

  
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get(`/notification/usuario`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setNotifications(response.data)
      } catch (error) {
        console.error(error)
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await api.get('/user/');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
    fetchNotifications();
  }, [userProfile]);
  

  const handleRemoveAll = async () => {
    try {
      const response = await api.delete('/notification/limpar', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data)
      setNotifications([])
    } catch (error) {
      console.error(error)
    }
  }

  const handleRemove = async (notificationId: number) => {
    console.log(notificationId)
    try {
      const response = await api.delete(`/notification/remover/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('Notificação removida:', response.data);
      setNotifications(notifications.filter((n) => n._id !== notificationId))
    } catch (error) {
      console.error('Erro ao remover notificação:', error)
    }
  }
  
  const getUsernameById = (userId: number): string => {
    const user = users.find(user => user._id === userId);
    return user ? user.name : 'Usuário Desconhecido';
  };
  
  return (
    <div className="feed">
      <div className="right-feed">
        <Sidebar />
      </div>
      <div className="center-feed">
        <div className="notification-container">
          <div className="header-title">
            <h1>Notificações</h1>
          </div>
          <button className='btn-notification' onClick={handleRemoveAll}>Limpar tudo</button>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>
                <div className="notification">
                  <div className='content-not'>
                    <span>{getUsernameById(notification.sender_id)}</span> {notification.message}: {notification.title}
                  </div>
                  <div className="delete-not">
                      <button onClick={()=>handleRemove(notification._id)}><RiDeleteBinFill/></button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="left-feed"></div>
    </div>
  );
};

export default NotificationsList;
