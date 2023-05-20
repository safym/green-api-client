import { Instance } from '../@types/auth'
import { Message } from '../@types/chat'

// Авторизация пользователя по idInstance и apiTokenInstance
export const getStateInstance = async ({ idInstance, token }: Instance) => {
  try {
    console.log(idInstance, token)

    const response = await fetch(
      `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${token}`,
      {
        method: 'GET',
      }
    )

    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

// Проверить пользователя Whatsapp по номеру телефона
export const checkWhatsapp = async (
  { idInstance, token }: Instance,
  phoneNumber: string
) => {
  try {
    console.log(idInstance, token, phoneNumber)

    const data = {
      phoneNumber,
    }

    const response = await fetch(
      `https://api.green-api.com/waInstance${idInstance}/CheckWhatsapp/${token}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    )

    return await response.json()
  } catch (error) {
    console.error('Ошибка при проверке Whatsapp пользователя:', error)
  }
}

// Отправить сообщение
export const sendMessage = async (
  { idInstance, token }: Instance,
  data: Message
) => {
  try {
    console.log(idInstance, token, data)

    const response = await fetch(
      `https://api.green-api.com/waInstance${idInstance}/SendMessage/${token}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    )

    return await response.json()
  } catch (error) {
    console.error('Ошибка при получении отправке сообщения:', error)
  }
}

// Получить сообщение/сообщения
export const getMessages = async () => {
  try {
    // TODO: request to api
  } catch (error) {
    console.error('Ошибка при получении получении сообщений:', error)
    throw error
  }
}
