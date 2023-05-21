import React, { useContext } from 'react'

import { MessengerContextType } from '../../@types/messenger'

import { MessengerContext } from '../../context/MessengerProvider'

import ChatPreview from '../../components/ChatPreview/ChatPreview'

import styles from './ChatListContainer.module.scss'

const ChatListContainer: React.FC = () => {
  // Данные контекста мессенджера
  const { chatList, setCurrentChat, currentChat } = useContext(MessengerContext) as MessengerContextType

  return (
    <div className={styles.chatList}>
      {chatList.map((chatItem, index) => (
        <ChatPreview
          key={index}
          chatItem={chatItem}
          selected={currentChat.chatId === chatItem.chatId}
          onClick={() => setCurrentChat(chatItem)}
        />
      ))}
    </div>
  )
}

export default ChatListContainer
