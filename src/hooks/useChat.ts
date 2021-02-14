import { useEffect, useState } from 'react';

import { BOT_TYPE, Message, USER_TYPE } from '@/types';

import useBot from './useBot';

const CHAT_SAVE_LOCAL_STORAGE = 'CHAT_SAVE_LOCAL_STORAGE';

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [inputText, setInputText] = useState<string>('');
  const [isSend, setIsSend] = useState<boolean>(false);
  const [isEntering, setIsEntering] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined);

  const { bodyMessage, setCommand, setBodyMessage } = useBot();

  useEffect(() => {
    const json = localStorage.getItem(CHAT_SAVE_LOCAL_STORAGE);
    console.log(json);
    if (json) {
      setMessages(JSON.parse(json));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CHAT_SAVE_LOCAL_STORAGE, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (inputText) {
      if (timerId) {
        clearTimeout(timerId);
        setTimerId(undefined);
      }
      setIsEntering(true);
      const id = setTimeout(() => {
        setIsEntering(false);
        setTimerId(undefined);
      }, 2000);
      setTimerId(id);
    }
  }, [inputText]);

  useEffect(() => {
    if (isSend) {
      const newMessage: Message = {
        type: USER_TYPE,
        body: inputText
      };

      setIsSend(false);
      setInputText('');

      setMessages([newMessage, ...messages]);

      setCommand(inputText);
    }
  }, [isSend]);

  useEffect(() => {
    if (bodyMessage) {
      const newBotMessage: Message = {
        type: BOT_TYPE,
        body: bodyMessage
      };
      setMessages([newBotMessage, ...messages]);

      setCommand(undefined);
      setBodyMessage(undefined);
    }
  }, [bodyMessage]);

  return {
    setIsSend,
    inputText,
    setInputText,
    messages,
    isEntering
  };
};

export default useChat;
