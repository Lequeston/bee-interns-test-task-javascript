import { useEffect, useState } from 'react';

import { commandName, commandParser, commandStart, commandStop, notStart } from '@/model/commands';
import { NAME_WORD_COMMAND, START_WORD_COMMAND, STOP_WORD_COMMAND } from '@/constants';

const useBot = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [command, setCommand] = useState<string | undefined>(undefined);
  const [bodyMessage, setBodyMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (command) {
      const parseCommand = commandParser(command);
      switch (parseCommand.command) {
        case START_WORD_COMMAND:
          commandStart(isStart, setIsStart, setBodyMessage);
          break;
        case STOP_WORD_COMMAND:
          commandStop(isStart, setIsStart, setBodyMessage);
          break;
        case NAME_WORD_COMMAND:
          commandName(isStart, parseCommand.args[0], setBodyMessage);
          break;
        default:
          notStart(isStart, setBodyMessage);
          break;
      }
    }
  }, [command]);

  return {
    bodyMessage,
    setCommand,
    setBodyMessage
  };
};

export default useBot;
