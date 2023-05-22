import React from 'react'
import cn from 'classnames'

import styles from './Loader.module.scss'

interface Props {
  type?: 'spinning' | 'linear'
}

const Loader: React.FC<Props> = ({ type = 'spinning' }, ...props) => {
  return <span className={cn({ [styles.spinning]: type === 'spinning', [styles.linear]: type === 'linear' })}></span>
}

export default Loader
