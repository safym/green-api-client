export interface ChatItem {
  phoneNumber: string
  chatId: string
}

export interface MessengerContextType {
  chatList: ChatItem[]
  currentChat: ChatItem
  setChatList: Dispatch<SetStateAction<Array<ChatItem>>>
  setCurrentChat: Dispatch<SetStateAction<ChatItem>>
  addChat: (data: ChatItem) => void
}
