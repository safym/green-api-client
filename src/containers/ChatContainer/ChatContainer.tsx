import React, { useContext, useEffect, useState } from 'react'

import { formatPhoneNumber } from '../../utils/formatPhoneNumber'

import { ChatItem, MessengerContextType } from '../../@types/messenger'
import { MessageItem } from '../../@types/chat'
import { Notification, NotificationContextType, GroupedNotifications } from '../../@types/notification'
import { AuthContextType } from '../../@types/auth'

import { AuthContext } from '../../context/AuthProvider'
import { MessengerContext } from '../../context/MessengerProvider'
import { NotificationContext } from '../../context/NotificationProvider'

import Message from '../../components/Message/Message'

import { FaRegSmileWink } from 'react-icons/fa'

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
   // Отфильтрованные уведомления для текущего чата
  const [chatNotifications, setChatNotifications] = useState<GroupedNotifications[]>([])

  // Фильтровать список уведомлений по текущему chatId
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
      <div className={styles.messagesWrapper}>
        <div className={styles.messages}>
          {chatNotifications?.map((notification, index) => (
            <Message key={index} value={notification} />
          ))}
        </div>
      </div>
      {!currentChat.chatId && (
        <div className={styles.placeholder}>
          <FaRegSmileWink className={styles.icon} />
          <h1>WhatsApp Web client with Green API</h1>
          <ol>
            <li>☎️ Add new chat by a phone number</li>
            <li>📨 Send a message</li>
            <li>⏱️ Wait for 5 seconds.... (api interval 🥱)</li>
            <li>✨ Watch magic happen</li>
          </ol>
        </div>
      )}
    </div>
  )
}

export default ChatContainer
