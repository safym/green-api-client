import React from 'react'
import { Outlet } from 'react-router-dom'

import styles from './Layout.module.scss'

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
