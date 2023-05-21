interface Props {
  type: 'text' | 'number'
  name: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required: boolean
}

const Input = ({ type, name, value, onChange, required, ...props }: Props) => {
  return <input type={type} name={name} value={value} onChange={onChange} required={required} />
}

export default Input
