import React from 'react';

import MessageInput from '@/components/MessageInput';

import './Wrapper.scss';

export const Wrapper: React.FC = ({ children }) => {
  return (
    <section className='body'>
      <header className='header'>
        <h1 className='title'>Чат-бот</h1>
      </header>
      <section className='container'>
        {children}
        <MessageInput />
      </section>
    </section>
  );
};
