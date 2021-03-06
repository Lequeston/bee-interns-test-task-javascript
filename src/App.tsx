import React from 'react';

import Wrapper from '@/components/Wrapper';
import MessageInput from '@/components/MessageInput';
import BoxMessages from '@/components/BoxMessages';

import useChat from '@/hooks/useChat';

import './App.scss';

const App: React.FC = () => {
  const { setIsSend, inputText, setInputText, messages, isEntering } = useChat();

  return (
    <Wrapper>
      <BoxMessages messages={messages} isEntering={isEntering} />
      <MessageInput setIsSend={setIsSend} inputText={inputText} setInputText={setInputText} />
    </Wrapper>
  );
};

export default App;
