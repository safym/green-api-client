import { useContext, useEffect, useState } from 'react'

import { ChatItem, MessengerContextType } from '../@types/messenger'
import { Message } from '../@types/chat'
import { AuthContextType } from '../@types/auth'

import { sendMessage } from '../api/api'

import { AuthContext } from '../context/AuthProvider'
import { MessengerContext } from '../context/MessengerProvider'
import Button from '../components/Button'

const ChatContainer = () => {
  const messageInitialState = {
    chatId: '',
    message: '',
  }

  // Данные контекста авторизации
  const { instance, setInstance } = useContext(AuthContext) as AuthContextType
  // Данные контекста мессенджера
  const { chatList, currentChat, setCurrentChat } = useContext(
    MessengerContext
  ) as MessengerContextType

  const [formData, setFormData] = useState<Message>({ ...messageInitialState })
  const [newMessage, setNewMessage] = useState<Message>({
    ...messageInitialState,
  })

  // Состояние для управления запросами к api в useEffect
  const [formIsSubmit, setformIsSubmit] = useState<boolean>(false)
  // Состояние ошибки при авторизации
  const [error, setError] = useState<boolean>(false)
  // Состояние процесса выполнения запроса
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // Id нового отправленного сообщения
  const [idMessage, setIdMessage] = useState<string>('')

  // Обработчик ввода для textarea
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Обработчик submit для form
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    setformIsSubmit(true)
    setNewMessage({ ...formData })
    setFormData((prevData) => ({
      ...prevData,
      message: '',
    }))
  }

  // Выполнение запроса к api для проверки наличия Whatsapp по номеру и обработка результата
  useEffect(() => {
    if (!formIsSubmit) return

    const fetchApi = async () => {
      setIsLoading(true)

      if (!newMessage.message) return

      const response = await sendMessage(instance, newMessage)

      if (!response) {
        setError(true)
        return
      }

      setIdMessage(response.idMessage)

      setIsLoading(false)
    }

    fetchApi()

    setformIsSubmit(false)
  }, [newMessage])

  // Сброс formData.message и обновление formData.chatId при изменении currentChat
  // Cброс newMessage и idMessage
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      message: '',
      chatId: currentChat.chatId,
    }))
    setNewMessage({ ...messageInitialState })
    setIdMessage('')
  }, [currentChat])

  return (
    <div>
      <h1>CHAT: {currentChat.phoneNumber}</h1>

      <p>formData: {JSON.stringify(formData)}</p>
      <p>newMessage: {JSON.stringify(newMessage)}</p>
      <p>error: {error && 'Ошибка отправки сообщения'}</p>
      <p>idMessage: {idMessage}</p>

      {currentChat.chatId && (
        <form onSubmit={handleSubmit}>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button type="submit">{isLoading ? 'Sending...' : 'Send'}</Button>
        </form>
      )}
    </div>
  )
}

export default ChatContainer
