<h1 align="center">🍀 WhatsApp/Green API Web client</h1>

<h3 align="center">Тестовое задание на должность "Фронтенд разработчик React"</h3>
<p align="center"> Пользовательский интерфейс для
отправки и получений сообщений WhatsApp</p>

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=sass,typescript,react,redux,vite" />
  </a>
</p>

<p>Go to section:</p>
<ul>
    <li><a href="#gh-pages">🔗 Github Pages</a></li>
    <li><a href="#screenshots">📸 Screenshots</a></li>
    <li><a href="#commands">🛠 Commands</a></li>
    <li><a href="#requirements">📑 Requirements</a></li>
    <li><a href="#implementation">⚙️ Implementation</a></li>
    <li><a href="#api-limit">🔒 API limit</a></li>
</ul>

<h2 id="gh-pages">🔗 Github Pages</h2>

[Live link deploy](https://safym.github.io/green-api-client/)

<h2 id="screenshots">📸 Screenshots</h2>

### 🖥️ Desktop
<p align="center">
    <img height="230px" src="https://user-images.githubusercontent.com/99616798/231590186-6d09b904-4132-471b-b4b6-37bfb1414d71.png" />
    <img height="230px" src="https://user-images.githubusercontent.com/99616798/231590186-6d09b904-4132-471b-b4b6-37bfb1414d71.png" />
</p>
<p align="center">
    <img height="230px" src="https://user-images.githubusercontent.com/99616798/231590186-6d09b904-4132-471b-b4b6-37bfb1414d71.png" />
    <img height="230px" src="https://user-images.githubusercontent.com/99616798/231590186-6d09b904-4132-471b-b4b6-37bfb1414d71.png" />
</p>

<h2 id="commands">🛠 Commands</h2>

Install packages:
```bash
npm install
```

Run the dev project:
```bash
npm run dev
```

Build for production.

```bash
npm run build
```

Deploy to Github Pages.

```bash
npm run deploy
```


<h2 id="requirements">📑 Requirements:</h2>

1. Требуется разработать пользовательский интерфейс для отправки и получений
сообщений WhatsApp
2. Требуется использовать сервис GREEN-API https://green-api.com/
3. Требуется реализовать отправку и получение только текстовых сообщений
4. Требуется за прототип интерфейса взять внешний вид чата https://web.whatsapp.com/
5. Требуется реализовать интерфейс максимально простым с минимальным набором функций
6. Требуется отправку сообщений реализовать методом https://green-api.com/docs/api/sending/SendMessage/
7. Требуется получение сообщений реализовать методом https://green-api.com/docs/api/receiving/technology-http-api/
8. Требуется использовать технологию React

<h2 id="implementation">✨ Implementation:</h2>

1. Реализовано приложение со страницами авторизации и месенджера
2. Реализована возможность добавления нового чата (проверка номера пользователя методом [CheckWhatsapp](https://green-api.com/docs/api/service/CheckWhatsapp/#checkwhatsapp)
3. Хранение глобальных состояний приложения организовано с помощью react хука useContext
4. Запросы к северу на получение новых уведомлений выполняется с интевалом 5 секунд (для экономии запросов к API)

<h2 id="api-limit">🔒 API </h2>

[API documentation](https://green-api.com/docs/index.html)
