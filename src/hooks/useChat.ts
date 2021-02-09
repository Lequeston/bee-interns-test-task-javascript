import { useEffect, useState } from "react";

import { BOT_TYPE, Message, USER_TYPE } from "@/types";

const CHAT_SAVE_LOCAL_STORAGE = 'CHAT_SAVE_LOCAL_STORAGE';
const useChat = () => {
  const [ newMessage, setNewMessage ] = useState<Message | undefined>(undefined);
  const [ messages, setMessages ] = useState<Message[]>([]);

  const [ inputText, setInputText ] = useState<string>('');
  const [ isSend, setIsSend ] = useState<boolean>(false);


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
    const botAnswer = (): string => {
      switch (newMessage) {
        default:
          return 'Я не понимаю, введите другую команду!'
      }
    }
    if (newMessage) {
      const botMessage: Message = {
        type: BOT_TYPE,
        body: botAnswer()
      }
      setMessages([
        botMessage,
        newMessage,
        ...messages
      ]);
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
    messages
  }
}

export default useChat;
