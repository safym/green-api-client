import TodoProvider from './context/AuthContext'
import AuthContainer from './containers/AuthContainer'

import AuthForm from './components/AuthForm'

export default function App() {
  return (
    <TodoProvider>
      <main className="App">
        <h1>Auth test</h1>
        <AuthForm />
        <AuthContainer />
      </main>
    </TodoProvider>
  )
}
