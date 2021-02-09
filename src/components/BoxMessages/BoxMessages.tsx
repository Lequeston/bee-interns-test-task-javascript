import React from 'react';

import { Message as MessageType } from '@/types';

import './BoxMessages.scss';

import Message from '@/components/Message';
import Entering from '@/components/Entering';

type Props = {
  messages: MessageType[];
  isEntering: boolean;
};
export const BoxMessages: React.FC<Props> = ({ messages, isEntering }) => {
  return (
    <div className='box-messages'>
      {messages.map(({ type, body }, index) => (
        <Message type={type} body={body} key={index} />
      ))}
      <Entering isEntering={isEntering} />
    </div>
  );
};
