import React, { useContext, useState, useEffect } from 'react'

import { AuthContextType } from '../../@types/auth'
import { ChatItem, MessengerContextType } from '../../@types/messenger'

import { checkWhatsapp } from '../../api/api'

import { AuthContext } from '../../context/AuthProvider'
import { MessengerContext } from '../../context/MessengerProvider'

import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'

import { cleanDigits } from '../../utils/cleanDigits'
import { getChatId } from '../../utils/getChatId'
import { setLocalStorageItem } from '../../utils/setLocalStorageItem'
import { getLocalStorageItem } from '../../utils/getLocalStorageItem'

import styles from './AddChatContainer.module.scss'

const AddChatContainer: React.FC = () => {
  const chatInitialState = {
    phoneNumber: '',
    chatId: '',
  }

  const { instance, setInstance } = useContext(AuthContext) as AuthContextType
  const { chatList, currentChat, addChat, setChatList, setCurrentChat } = useContext(
    MessengerContext
  ) as MessengerContextType

  const [formData, setFormData] = useState<ChatItem>({ ...chatInitialState })

  const [newChat, setNewChat] = useState<ChatItem>({ ...chatInitialState })

  const [formIsSubmit, setformIsSubmit] = useState<boolean>(false)
  const [existsWhatsapp, setExistsWhatsapp] = useState<boolean | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Обработчик ввода для input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const clearValue = cleanDigits(value)
    const chatId = getChatId(clearValue)

    setExistsWhatsapp(null)
    setFormData((prevCount) => ({
      ...prevCount,
      [name]: clearValue,
      chatId: chatId,
    }))
  }

  // Обработчик submit для form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setformIsSubmit(true)
    setNewChat({ ...formData })
    setFormData({ ...chatInitialState })
  }

  // Выполнение запроса к api для проверки наличия Whatsapp по номеру и обработка результата
  useEffect(() => {
    if (!formIsSubmit) return

    const fetchApi = async () => {
      setIsLoading(true)

      if (!newChat.phoneNumber) return

      const response = await checkWhatsapp(instance, newChat.phoneNumber)

      console.log(response)
      if (!response) {
        setError(true)
        return
      }

      setExistsWhatsapp(response.existsWhatsapp)

      setformIsSubmit(false)
      setIsLoading(false)
    }

    fetchApi()
  }, [newChat])

  // Добавление нового чата в список чатов
  useEffect(() => {
    if (!existsWhatsapp) return

    addChat(newChat)
    setCurrentChat(newChat)

    setExistsWhatsapp(null)
  }, [existsWhatsapp])

  // Сохранение списка чатов в LocalStorage
  useEffect(() => {
    if (!chatList.length) return

    setLocalStorageItem('chatList', chatList)
  }, [chatList])

  // Загрузка добавленных чатов, если они есть в LocalStorage
  useEffect(() => {
    const chatListDataString = getLocalStorageItem('chatList')

    if (chatListDataString) {
      const chatListData = JSON.parse(chatListDataString)

      setChatList([...chatListData])
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className={styles.addChat}>
      {/* Для отладки */}
      {/* <p>formData: {JSON.stringify(formData)}</p>
      <p>newChat: {JSON.stringify(newChat)}</p> */}

      <div className={styles.container}>
        <div className={styles.inputWrapper}>
          <Input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder={'New chat'}
          />
        </div>

        <div className={styles.buttonWrapper}>
          <Button type={'submit'} isLoading={isLoading}>
            Add
          </Button>
        </div>
      </div>

      {existsWhatsapp === false && <p className={styles.error}>WhatsApp chat not found</p>}
      {error && <p className={styles.error}>An error has occurred</p>}
    </form>
  )
}

export default AddChatContainer
