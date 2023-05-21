import React from 'react'
import styles from './Textarea.module.scss'

interface Props {
  name: string
  value: string
  placeholder: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  required: boolean
}

const Textarea: React.FC<Props> = ({ name, value, onChange, placeholder, required, ...props }) => {
  return (
    <textarea
      className={styles.textarea}
      name="message"
      value={value}
      onChange={onChange}
      rows={2}
      placeholder={placeholder}
      required
    />
  )
}

export default Textarea
