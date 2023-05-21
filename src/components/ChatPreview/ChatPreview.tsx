import React from 'react'
import cn from 'classnames'

import { ChatItem } from '../../@types/messenger'
import { formatPhoneNumber } from '../../utils/formatPhoneNumber'

import { RiUserFill } from 'react-icons/ri'

import styles from './ChatPreview.module.scss'

interface Props {
  chatItem: ChatItem
  selected: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const ChatPreview: React.FC<Props> = ({ chatItem, onClick, selected, ...props }) => {
  return (
    <div onClick={onClick} className={cn(styles.chatPreview, { [styles.selected]: selected })}>
      <div className={styles.wrapper}>
        <div className={styles.avatar}>
          <RiUserFill className={styles.icon} />
        </div>
        <span className={styles.phoneNumber}>{formatPhoneNumber(chatItem.phoneNumber)}</span>
      </div>
    </div>
  )
}

export default ChatPreview
