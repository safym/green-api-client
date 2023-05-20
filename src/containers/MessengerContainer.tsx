import React, { useContext, useState, useEffect } from 'react'

import { AuthContextType } from '../@types/auth'
import { AuthContext } from '../context/AuthProvider'

import { MessengerContextType } from '../@types/messenger'
import { MessengerContext } from '../context/MessengerProvider'

import AddChatContainer from './AddChatContainer'
import ChatListContainer from './ChatListContainer'
import ChatContainer from './ChatContainer'

const MessengerContainer: React.FC = () => {
  // Данные instance контекста авторизации
  const { instance, setInstance } = useContext(AuthContext) as AuthContextType
  // Данные контекста мессенджера
  const { chatList, currentChat, setChatList, setCurrentChat } = useContext(
    MessengerContext
  ) as MessengerContextType

  return (
    <div>
      <h2>Auth context data</h2>
      <p>ID: {instance.idInstance}</p>
      <p>Token: {instance.token}</p>
      <p>IsAuth: {instance.isAuth ? 'true' : 'false'}</p>

      <h2>Messenger context data</h2>
      <p>ChatList: {JSON.stringify(chatList)}</p>
      <p>CurrentChat: {JSON.stringify(currentChat)}</p>

      <AddChatContainer />
      <ChatListContainer />
      <ChatContainer />

    </div>
  )
}

export default MessengerContainer
