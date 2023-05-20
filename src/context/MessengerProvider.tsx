import React, { createContext, useState } from 'react'

import { ChatItem, MessengerContextType } from '../@types/messenger'

export const MessengerContext = createContext<MessengerContextType | undefined>(
  undefined
)

const AuthProvider: React.FC<any> = ({ children }) => {
  const [chatList, setChatList] = useState<ChatItem[]>([])
  const [currentChat, setCurrentChat] = useState<ChatItem>({
    phoneNumber: '',
    chatId: '',
  })

  const addChat = (newChat: ChatItem) => {
    let isChatExists = chatList.some((arr) => arr.chatId === newChat.chatId);

    if (isChatExists) return

    // setChatList([...chatList, newChat])
    setChatList((prevChatList) => ([
      ...prevChatList,
      newChat,
    ]))
  }

  const contextValue: MessengerContextType = {
    chatList,
    currentChat,
    setChatList,
    setCurrentChat,
    addChat,
  }

  return (
    <MessengerContext.Provider value={contextValue}>
      {children}
    </MessengerContext.Provider>
  )
}

export default AuthProvider
