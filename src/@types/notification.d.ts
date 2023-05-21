export interface Notification {
  receiptId: number
  body: {
    typeWebhook: 'incomingMessageReceived' | 'outgoingAPIMessageReceived' | 'outgoingMessageStatus'
    instanceData: {
      idInstance: number
      wid: string
      typeInstance: 'whatsapp'
    }
    timestamp: number
    idMessage: string
    senderData?: {
      chatId: string
      chatName: string
      sender: string
      senderName: string
    }
    messageData?: {
      typeMessage: 'textMessage'
      textMessageData: {
        textMessage: string
      }
    }
    chatId?: string
    status?: string
    sendByApi?: boolean
  }
}

export interface GroupedNotifications {
  receiptId: number
  body: {
    typeWebhook: 'incomingMessageReceived' | 'outgoingAPIMessageReceived'
    instanceData: {
      idInstance: number
      wid: string
      typeInstance: 'whatsapp'
    }
    timestamp: number
    idMessage: string
    senderData: {
      chatId: string
      chatName: string
      sender: string
      senderName: string
    }
    messageData: {
      typeMessage: 'textMessage' | 'extendedTextMessage'
      textMessageData?: {
        textMessage: string
      }
      extendedTextMessageData?: {
        text: string
      }
    }
    status?: string
  }
}

export interface NotificationContextType {
  notifications: Notification[]
  setNotifications: Dispatch<SetStateAction<Array<Notification>>>
  addNotification: (data: Notification) => void
  groupedNotifications: groupedNotifications[]
  groupNotifications: () => void
  notificationsIsLoaded: boolean
  setNotificationsIsLoaded: Dispatch<SetStateAction<boolean>>
}
