import React, { useContext, useEffect, useState } from 'react'

import { MessengerContextType } from '../../@types/messenger'
import { MessageItem } from '../../@types/chat'
import { AuthContextType } from '../../@types/auth'

import { sendMessage } from '../../api/api'

import { AuthContext } from '../../context/AuthProvider'
import { MessengerContext } from '../../context/MessengerProvider'

import { AiOutlineSend } from 'react-icons/ai'

import styles from './SendContainer.module.scss'
import Textarea from '../../components/Textarea/Textarea'
import Loader from '../../components/Loader/Loader'

const SendContainer: React.FC = () => {
  const messageInitialState = {
    chatId: '',
    message: '',
  }

  // Данные контекста авторизации
  const { instance, setInstance } = useContext(AuthContext) as AuthContextType
  // Данные контекста мессенджера
  const { chatList, currentChat, setCurrentChat } = useContext(MessengerContext) as MessengerContextType

  const [formData, setFormData] = useState<MessageItem>({ ...messageInitialState })
  const [newMessage, setNewMessage] = useState<MessageItem>({
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
    <>
      {currentChat.chatId && (
        <form onSubmit={handleSubmit} className={styles.sendForm}>
          <Textarea
            name={'message'}
            value={formData.message}
            onChange={handleChange}
            required
            placeholder={'Enter a message...'}
          />
          <button type="submit" className={styles.sendButton} disabled={isLoading}>
            {isLoading ? <Loader /> : <AiOutlineSend className={styles.sendIcon} />}
          </button>
        </form>
      )}
    </>
  )
}

export default SendContainer
