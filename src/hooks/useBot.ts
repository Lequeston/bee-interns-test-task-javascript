import { useEffect, useState } from 'react';

import {
  commandMathAction,
  commandName,
  commandNumber,
  commandParser,
  commandStart,
  commandStop,
  notStart
} from '@/model/commands';
import {
  MATH_WORDS_COMMANDS,
  NAME_WORD_COMMAND,
  NUMBER_WORD_COMMAND,
  START_WORD_COMMAND,
  STOP_WORD_COMMAND
} from '@/constants';
import { NumberMathTypes } from '@/types';

const useBot = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [command, setCommand] = useState<string | undefined>(undefined);
  const [bodyMessage, setBodyMessage] = useState<string | undefined>(undefined);

  const [numbers, setNumbers] = useState<NumberMathTypes | undefined>(undefined);

  useEffect(() => {
    if (command) {
      const parseCommand = commandParser(command);
      const { args } = parseCommand;
      switch (parseCommand.command) {
        case START_WORD_COMMAND:
          commandStart(isStart, setIsStart, setBodyMessage);
          break;
        case STOP_WORD_COMMAND:
          commandStop(isStart, setIsStart, setBodyMessage);
          break;
        case NAME_WORD_COMMAND:
          commandName(isStart, args[0], setBodyMessage);
          break;
        case NUMBER_WORD_COMMAND:
          commandNumber(isStart, args[0], args[1], setBodyMessage, setNumbers);
          break;
        case MATH_WORDS_COMMANDS[0]:
        case MATH_WORDS_COMMANDS[1]:
        case MATH_WORDS_COMMANDS[2]:
        case MATH_WORDS_COMMANDS[3]:
          commandMathAction(numbers, isStart, parseCommand.command, setBodyMessage, setNumbers);
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
