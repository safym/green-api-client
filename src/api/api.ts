
import { Instance } from '../@types/auth'

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
    alert(error)
  }
}

// Получить пользователя по номеру телефона
export const fetchUser = async () => {
  try {
    // TODO: request to api
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error)
    throw error
  }
}

// Отправить сообщение
export const sendMessage = async () => {
  try {
    // TODO: request to api
  } catch (error) {
    console.error('Ошибка при получении отправке сообщения:', error)
    throw error
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
