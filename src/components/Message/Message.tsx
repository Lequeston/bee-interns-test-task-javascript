import React from 'react';

import { ReactComponent as UserIcon } from '@/assets/user-icon.svg';
import { ReactComponent as BotIcon } from '@/assets/bot-icon.svg';

import { Message as MessageType, USER_TYPE } from '@/types';

import './Message.scss';

export const Message: React.FC<MessageType> = ({ type, body }) => {
  const isUser = type === USER_TYPE;
  return (
    <span className='message'>
      <i className='icon'>{isUser ? <UserIcon /> : <BotIcon />}</i>
      <p className={isUser ? 'body-user' : 'body-bot'}>{body}</p>
    </span>
  );
};
