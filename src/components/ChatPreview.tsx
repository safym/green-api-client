import React from 'react'
import { ChatItem } from '../@types/messenger'

interface Props {
  chatItem: ChatItem
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

const ChatPreview: React.FC<Props>  = ({ chatItem, onClick, ...props }) => {
  return <a onClick={onClick}>{chatItem.phoneNumber}</a>
}

export default ChatPreview
