import React, { useContext, useState, useEffect } from 'react'

import { deleteNotification, receiveNotification } from '../../api/api'
import { AuthContextType } from '../../@types/auth'
import { MessengerContextType } from '../../@types/messenger'
import { NotificationContextType } from '../../@types/notification'

import { AuthContext } from '../../context/AuthProvider'
import { MessengerContext } from '../../context/MessengerProvider'
import { NotificationContext } from '../../context/NotificationProvider'

import AddChatContainer from '../AddChatContainer/AddChatContainer'
import ChatListContainer from '../ChatListContainer/ChatListContainer'
import SendContainer from '../SendContainer/SendContainer'
import ChatContainer from '../ChatContainer/ChatContainer'

import styles from './MessengerContainer.module.scss'

const MessengerContainer: React.FC = () => {
  // Данные контекста авторизации
  const { instance, setInstance } = useContext(AuthContext) as AuthContextType
  // Данные контекста мессенджера
  const { chatList, currentChat, setCurrentChat } = useContext(MessengerContext) as MessengerContextType
  // Данные контекста уведомлений
  const { notifications, addNotification, setNotificationsIsLoaded } = useContext(
    NotificationContext
  ) as NotificationContextType

  // Состояние для управления запросами к api в useEffect
  const [clickedButton, setClickedButton] = useState<boolean>(false)
  // Состояние ошибки при авторизации
  const [error, setError] = useState<boolean>(false)
  // Состояние процесса выполнения запроса
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // Id нового отправленного сообщения
  const [idMessage, setIdMessage] = useState<string>('')

  // Выполнение запроса к api для проверки наличия Whatsapp по номеру и обработка результата
  useEffect(() => {
    const handleNotification = async () => {
      if (isLoading) return

      setIsLoading(true)

      let responseReceive
      while (responseReceive !== null) {
        try {
          responseReceive = await receiveNotification(instance)

          if (!responseReceive) break

          addNotification(responseReceive)

          await deleteNotification(instance, responseReceive.receiptId)
        } catch {
          setError(true)
          break
        }
      }

      setNotificationsIsLoaded(true)
      setIsLoading(false)
    }

    const intervalId = setInterval(handleNotification, 5000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className={styles.messengerContainer}>
      {/* Для отладки */}
      <div className={styles.test}>
        {/* <h2>🍎 Auth context data</h2>
        <p>ID: {instance.idInstance}</p>
        <p>Token: {instance.token}</p>
        <p>IsAuth: {instance.isAuth ? 'true' : 'false'}</p>

        <h2>🥭 Messenger context data</h2>
        <p>ChatList: {JSON.stringify(chatList)}</p>
        <p>CurrentChat: {JSON.stringify(currentChat)}</p>

        <h2>🍆 NOTIFICATIONS:</h2>
        {notifications.map((notification, index) => (
          <p key={index}>
            <small>{JSON.stringify(notification)}</small>
          </p>
        ))} */}
      </div>

      <aside className={styles.sidebar}>
        <AddChatContainer />
        <ChatListContainer />
      </aside>
      <div className={styles.chat}>
        <div className={styles.canvas}>
          <ChatContainer />
        </div>
        <SendContainer />
      </div>
    </div>
  )
}

export default MessengerContainer
