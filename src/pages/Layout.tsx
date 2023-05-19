import { Outlet, NavLink } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <nav>
        <NavLink to={''}>Auth</NavLink>
        <br />
        <NavLink to={'/chat'}>Chats</NavLink>
      </nav>
      <h1>is layout with</h1>
      <Outlet />
    </div>
  )
}

export default Layout
