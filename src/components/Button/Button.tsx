import React from 'react'
import Loader from '../Loader/Loader'
import styles from './Button.module.scss'
import cn from "classnames"

interface Props {
  type: 'submit' | 'reset'
  children?: string
  isLoading: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<Props> = ({ type, children, onClick, isLoading, ...props }) => {
  return (
    <button className={cn(styles.button, { [styles.disabled]: isLoading })} disabled={isLoading} type={type} onClick={onClick}>
      
      {isLoading ? 'Loading...' : children}
      {isLoading && <Loader />}
    </button>
  )
}

export default Button
