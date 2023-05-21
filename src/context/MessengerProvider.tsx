import React, { createContext, useState } from 'react'

import { ChatItem, MessengerContextType } from '../@types/messenger'

export const MessengerContext = createContext<MessengerContextType | undefined>(undefined)

const MessengerProvider: React.FC<any> = ({ children }) => {
  // Cписок чатов
  const [chatList, setChatList] = useState<ChatItem[]>([])
  // Текущий выбранный чат
  const [currentChat, setCurrentChat] = useState<ChatItem>({
    phoneNumber: '',
    chatId: '',
  })

  // Добавить новый чат в список чатов
  const addChat = (newChat: ChatItem) => {
    let isChatExists = chatList.some((arr) => arr.chatId === newChat.chatId)

    if (isChatExists) return

    setChatList((prevList) => [...prevList, newChat])
  }

  const contextValue: MessengerContextType = {
    chatList,
    currentChat,
    setChatList,
    setCurrentChat,
    addChat,
  }

  return <MessengerContext.Provider value={contextValue}>{children}</MessengerContext.Provider>
}

export default MessengerProvider
