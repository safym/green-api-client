import { useContext } from 'react'

import { ChatItem, MessengerContextType } from '../@types/messenger'

import { MessengerContext } from '../context/MessengerProvider'

import ChatPreview from '../components/ChatPreview'

const ChatListContainer = () => {
  // Данные контекста мессенджера
  const { chatList, setCurrentChat } = useContext(
    MessengerContext
  ) as MessengerContextType

  return (
    <div>
      {chatList.map((chatItem, index) => (
        <ChatPreview
          key={index}
          chatItem={chatItem}
          onClick={() => setCurrentChat(chatItem)}
        />
      ))}
    </div>
  )
}

export default ChatListContainer
