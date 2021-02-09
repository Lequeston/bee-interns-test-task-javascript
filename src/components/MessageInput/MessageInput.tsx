import React from 'react';

import _, { ReactComponent as ButtonSend } from '@/assets/send.svg';

import './MessageInput.scss';

export const MessageInput: React.FC = () => {
  return (
    <div className='input-box'>
      <textarea className='input' rows={2} />
      <button className='button-send'>
        <ButtonSend id='icon' />
      </button>
    </div>
  );
};
