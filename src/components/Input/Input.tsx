import React from 'react'

import styles from './Input.module.scss'

interface Props {
  type: 'text' | 'number'
  name: string
  value: string
  placeholder: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required: boolean
}

const Input: React.FC<Props>  = ({ type, name, value, onChange, required, placeholder, ...props }) => {
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
