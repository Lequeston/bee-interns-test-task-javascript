import { useEffect, useState } from "react";

import { Message, USER_TYPE } from "@/types";

const useChat = () => {
  const [ newMessage, setNewMessage ] = useState<Message | undefined>(undefined);
  const [ messages, setMessages ] = useState<Message[]>([]);

  const [ inputText, setInputText ] = useState<string>('');
  const [ isSend, setIsSend ] = useState<boolean>(false);

  useEffect(() => {
    if (newMessage) {
      setMessages([ ...messages, newMessage ]);
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
    setInputText
  }
}

export default useChat;
