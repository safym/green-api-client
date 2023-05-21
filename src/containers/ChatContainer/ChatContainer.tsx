import React, { useContext, useEffect, useState } from 'react'

import { formatPhoneNumber } from '../../utils/formatPhoneNumber'

import { ChatItem, MessengerContextType } from '../../@types/messenger'
import { Message } from '../../@types/chat'
import { Notification, NotificationContextType, GroupedNotifications } from '../../@types/notification'
import { AuthContextType } from '../../@types/auth'

import { AuthContext } from '../../context/AuthProvider'
import { MessengerContext } from '../../context/MessengerProvider'
import { NotificationContext } from '../../context/NotificationProvider'

import styles from './ChatContainer.module.scss'

const ChatContainer: React.FC = () => {
  // Данные контекста авторизации
  const { instance, setInstance } = useContext(AuthContext) as AuthContextType
  // Данные контекста мессенджера
  const { chatList, currentChat, setCurrentChat } = useContext(MessengerContext) as MessengerContextType
  // Данные контекста уведомлений
  const { notifications, addNotification, groupedNotifications } = useContext(
    NotificationContext
  ) as NotificationContextType

  const [chatNotifications, setChatNotifications] = useState<GroupedNotifications[]>([])

  const filterNotificationsByChatId = (groupedNotifications: GroupedNotifications[], chatId: string) => {
    if (!groupedNotifications.length) return

    return groupedNotifications.filter((notification) => notification.body.senderData.chatId === chatId)
  }

  // Обработка всех уведомлений (фильтр только входящих и исходящих сообщений)
  useEffect(() => {
    const chatNotifications = filterNotificationsByChatId(
      groupedNotifications,
      currentChat.chatId
    ) as GroupedNotifications[]

    setChatNotifications(chatNotifications)
  }, [groupedNotifications, currentChat])

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <span className={styles.phoneNumber}>{formatPhoneNumber(currentChat.phoneNumber)}</span>
      </div>

      {/* Для отладки */}
      <p>filtered notifications here</p>
      <h4>FILTERED:</h4>
      <p>{JSON.stringify(chatNotifications)}</p>
      <h4>ALL:</h4>
      {groupedNotifications.map((notification, index) => (
        <p key={index}>
          <small>{JSON.stringify(notification)}</small>
        </p>
      ))}


    </div>
  )
}

export default ChatContainer
