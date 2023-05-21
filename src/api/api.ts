import { Instance } from '../@types/auth'
import { MessageItem } from '../@types/chat'

// Авторизация пользователя по idInstance и apiTokenInstance
export const getStateInstance = async ({ idInstance, token }: Instance) => {
  try {
    const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/getStateInstance/${token}`, {
      method: 'GET',
    })

    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

// Проверить пользователя Whatsapp по номеру телефона
export const checkWhatsapp = async ({ idInstance, token }: Instance, phoneNumber: string) => {
  try {
    const data = {
      phoneNumber,
    }

    const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/CheckWhatsapp/${token}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    return await response.json()
  } catch (error) {
    console.error('Ошибка при проверке Whatsapp пользователя:', error)
  }
}

// Отправить сообщение
export const sendMessage = async ({ idInstance, token }: Instance, data: MessageItem) => {
  try {
    const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/SendMessage/${token}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    return await response.json()
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error)
  }
}

// Получить входящее уведомление с текстом сообщения
export const receiveNotification = async ({ idInstance, token }: Instance) => {
  try {
    const response = await fetch(`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${token}`, {
      method: 'GET',
    })

    return await response.json()
  } catch (error) {
    console.error('Ошибка при получении уведомления:', error)
  }
}

// Удалить входящее уведомление
export const deleteNotification = async ({ idInstance, token }: Instance, receiptId: number) => {
  try {
    const response = await fetch(
      `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${token}/${receiptId}`,
      {
        method: 'DELETE',
      }
    )

    return await response.json()
  } catch (error) {
    console.error('Ошибка при удалении уведомления:', error)
  }
}
