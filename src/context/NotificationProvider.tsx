import React, { createContext, useEffect, useState } from 'react'

import { Notification, NotificationContextType, GroupedNotifications } from '../@types/notification'

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

const NotificationProvider: React.FC<any> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [groupedNotifications, setGroupedNotifications] = useState<GroupedNotifications[]>([])
  const [notificationsIsLoaded, setNotificationsIsLoaded] = useState<boolean>(false)

  const addNotification = (newNotification: Notification) => {
    setNotifications((prevList) => [...prevList, newNotification])
  }

  const groupNotifications = () => {
    const filteredNotifications = notifications.filter((notification) => {
      return notification.body.typeWebhook !== 'outgoingMessageStatus'
    }) as GroupedNotifications[]

    setGroupedNotifications(() => [...filteredNotifications])
  }

  // Обработка всех уведомлений (фильтр только входящих и исходящих сообщений)
  useEffect(() => {
    if (!notificationsIsLoaded) return

    groupNotifications()

    setNotificationsIsLoaded(false)
  }, [notificationsIsLoaded])

  const contextValue: NotificationContextType = {
    notifications,
    setNotifications,
    addNotification,
    groupedNotifications,
    groupNotifications,
    notificationsIsLoaded,
    setNotificationsIsLoaded,
  }

  return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
}

export default NotificationProvider
