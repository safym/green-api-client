import React, { useContext, useState, useEffect } from 'react'

import { AuthContextType } from '../@types/auth'
import { MessengerContextType } from '../@types/messenger'

import { AuthContext } from '../context/AuthProvider'
import { MessengerContext } from '../context/MessengerProvider'

import AddChatContainer from './AddChatContainer'
import ChatListContainer from './ChatListContainer'
import SendContainer from './SendContainer'
import { NotificationContext } from '../context/NotificationProvider'
import { NotificationContextType } from '../@types/notification'
import ChatContainer from './ChatContainer'
import { deleteNotification, receiveNotification } from '../api/api'

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setClickedButton(true)
  }

  // Выполнение запроса к api для проверки наличия Whatsapp по номеру и обработка результата
  useEffect(() => {
    if (!clickedButton) return

    const handleNotification = async () => {
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

    handleNotification()

    setClickedButton(false)

    // const intervalId = setInterval(handleNotification, 5000);
    // return () => clearInterval(intervalId);
  }, [clickedButton])

  return (
    <div>
      <h2>🍎 Auth context data</h2>
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
      ))}
      <button onClick={handleClick}>{isLoading ? 'Lodading...' : 'load new messages'}</button>

      <AddChatContainer />
      <ChatListContainer />
      <ChatContainer />
      <SendContainer />
    </div>
  )
}

export default MessengerContainer
