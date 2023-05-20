import { ChatItem } from "../@types/messenger"

interface Props {
  chatItem: ChatItem,
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

const ChatPreview = ({chatItem, onClick, ...props}: Props) => {
  return (
    <a onClick={onClick}>{chatItem.phoneNumber}</a>
  )
}

export default ChatPreview
