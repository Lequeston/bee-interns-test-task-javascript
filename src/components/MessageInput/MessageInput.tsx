import React from 'react';

import { ReactComponent as ButtonSend } from '@/assets/send.svg';

import './MessageInput.scss';

type Props = {
  inputText: string,
  setInputText: React.Dispatch<React.SetStateAction<string>>,
  setIsSend: React.Dispatch<React.SetStateAction<boolean>>
}

export const MessageInput: React.FC<Props> = ({ setInputText, inputText, setIsSend }) => {

  const handleChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setInputText(event.target.value);
  }

  const handleSend = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIsSend(true);
  }

  return (
    <div className='input-box'>
      <textarea
        className='input'
        rows={2}
        onChange={handleChangeInput}
        value={inputText}
      />
      <button
        className='button-send'
        onClick={handleSend}
      >
        <ButtonSend
          className={inputText ? 'active-icon' : 'not-active-icon'}
        />
      </button>
    </div>
  );
};
