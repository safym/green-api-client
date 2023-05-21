import styles from './Button.module.scss'

interface Props {
  type: 'submit' | 'reset'
  children?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ type, children, onClick, ...props }: Props) => {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
