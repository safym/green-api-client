import React from 'react'
import cn from 'classnames'

import { formatTimestamp } from '../../utils/formatTimestamp'

import { GroupedNotifications } from '../../@types/notification'

import styles from './Message.module.scss'

interface Props {
  value: GroupedNotifications
}

const Message: React.FC<Props> = ({ value, ...props }) => {
  const typeNotification = value.body.typeWebhook === 'incomingMessageReceived' ? 'incoming' : 'outgoing'
  const typeMessage = value.body.messageData.typeMessage

  const date = formatTimestamp(value.body.timestamp)

  const messageText =
    typeMessage === 'extendedTextMessage'
      ? value.body.messageData.extendedTextMessageData?.text
      : value.body.messageData.textMessageData?.textMessage

  return (
    <div
      className={cn(styles.message, {
        [styles.incoming]: typeNotification === 'incoming',
        [styles.outgoing]: typeNotification === 'outgoing',
      })}
    >
      <pre className={styles.text}>{messageText}</pre>
      <p className={styles.date}>{date}</p>
    </div>
  )
}

export default Message
