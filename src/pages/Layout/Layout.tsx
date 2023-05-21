import { Outlet, NavLink } from 'react-router-dom'

import styles from './Layout.module.scss'

const Layout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        {/* <nav>
          <NavLink to={'/'}>Auth</NavLink>
          <NavLink to={'/messenger'}>Messenger</NavLink>
        </nav> */}
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
