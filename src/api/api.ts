// Авторизация пользователя по idInstance и apiTokenInstance
export const getStateInstance = async () => {
  try {
    const response = await fetch("https://api.green-api.com/waInstance1101821858/getStateInstance/45864918bbed4e2cac97ac92a4e8945e4d26fe1711d444189f", {
      method: "GET"
    });
    return await response.json();
  } catch (error) {
    console.error("Ошибка при авторизации:", error);
    throw error;
  }
};

// Получить пользователя по номеру телефона
export const fetchUser = async () => {
  try {
    // TODO: request to api
  } catch (error) {
    console.error("Ошибка при получении пользователя:", error);
    throw error;
  }
};

// Отправить сообщение
export const sendMessage = async () => {
  try {
    // TODO: request to api
  } catch (error) {
    console.error("Ошибка при получении отправке сообщения:", error);
    throw error;
  }
};

// Получить сообщение/сообщения
export const getMessages = async () => {
  try {
    // TODO: request to api
  } catch (error) {
    console.error("Ошибка при получении получении сообщений:", error);
    throw error;
  }
};

