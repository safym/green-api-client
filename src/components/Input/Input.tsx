import styles from './Input.module.scss'
import cn from 'classnames'

interface Props {
  type: 'text' | 'number'
  name: string
  value: string
  placeholder: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required: boolean
}

const Input = ({ type, name, value, onChange, required, placeholder, ...props }: Props) => {
  return (
    <input
      className={styles.input}
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  )
}

export default Input
