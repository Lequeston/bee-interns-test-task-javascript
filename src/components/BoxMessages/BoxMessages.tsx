import React from 'react';

import { Message as MessageType } from '@/types';

import './BoxMessages.scss';

import Message from '@/components/Message';

type Props = {
  messages: MessageType[]
}
export const BoxMessages: React.FC<Props> = ({ messages }) => {
  return (
    <div className="box-messages">
      {
        messages.map(({ type, body }, index) => (
          <Message
            type={type}
            body={body}
            key={index}
          />
        ))
      }
    </div>
  )
}
