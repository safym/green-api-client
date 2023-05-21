import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContextType } from '../../@types/auth'

import { AuthContext } from '../../context/AuthProvider'
import MessengerProvider from '../../context/MessengerProvider'
import NotificationProvider from '../../context/NotificationProvider'

import MessengerContainer from '../../containers/MessengerContainer/MessengerContainer'

import styles from './Messenger.module.scss'

const Messenger: React.FC = () => {
  const { instance } = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()

  // Навигация на / (страницу авторизации), если пользователь не авторизован
  useEffect(() => {
    if (!instance.isAuth) {
      navigate('/')
    }
  }, [instance])

  return (
    <div className={styles.messenger}>
      <MessengerProvider>
        <NotificationProvider>
          <MessengerContainer />
        </NotificationProvider>
      </MessengerProvider>
    </div>
  )
}

export default Messenger
