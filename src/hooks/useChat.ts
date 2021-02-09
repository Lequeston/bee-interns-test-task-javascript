import { useEffect, useState } from 'react';

import { BOT_TYPE, Message, USER_TYPE } from '@/types';

const CHAT_SAVE_LOCAL_STORAGE = 'CHAT_SAVE_LOCAL_STORAGE';
const useChat = () => {
  const [newMessage, setNewMessage] = useState<Message | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);

  const [inputText, setInputText] = useState<string>('');
  const [isSend, setIsSend] = useState<boolean>(false);
  const [isEntering, setIsEntering] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined);

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
    const botAnswer = (): string => {
      switch (newMessage) {
        default:
          return 'Я не понимаю, введите другую команду!';
      }
    };
    if (newMessage) {
      const botMessage: Message = {
        type: BOT_TYPE,
        body: botAnswer()
      };
      setMessages([botMessage, newMessage, ...messages]);
      setNewMessage(undefined);
    }
  }, [newMessage]);

  useEffect(() => {
    if (isSend) {
      setNewMessage({
        type: USER_TYPE,
        body: inputText
      });

      setIsSend(false);
      setInputText('');
    }
  }, [isSend]);

  return {
    setIsSend,
    inputText,
    setInputText,
    messages,
    isEntering
  };
};

export default useChat;
