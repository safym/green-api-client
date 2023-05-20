import { useContext } from 'react'

import { ChatItem, MessengerContextType } from '../@types/messenger'

import { MessengerContext } from '../context/MessengerProvider'

const ChatContainer = () => {
  // Данные контекста мессенджера
  const { chatList, currentChat, setCurrentChat } = useContext(
    MessengerContext
  ) as MessengerContextType

  return (
    <div>
      <h1>CHAT</h1>
      <h2>with {currentChat.phoneNumber}</h2>
    </div>
  )
}

export default ChatContainer
