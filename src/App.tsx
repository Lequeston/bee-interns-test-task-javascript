import React from 'react';

import Wrapper from '@/components/Wrapper';
import MessageInput from '@/components/MessageInput';
import BoxMessages from '@/components/BoxMessages';

import useChat from '@/hooks/useChat';

import './App.scss';

const App: React.FC = () => {

  const {
    setIsSend,
    inputText,
    setInputText
  } = useChat();

  return (
    <Wrapper>
      <BoxMessages />
      <MessageInput
        setIsSend={setIsSend}
        inputText={inputText}
        setInputText={setInputText}
      />
    </Wrapper>
  );
};

export default App;
