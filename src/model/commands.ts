import { CommandsType } from '@/types';

import { notKnowCommandBody, notStartChat } from '@/constants';

// парсинг команды
export const commandParser = (fullCommand: string): CommandsType => {
  const words = fullCommand.split(' ');
  return {
    command: words[0],
    args: words.slice(1)
  };
};

// команда /start
export const commandStart = (
  isStart: boolean,
  setIsStart: React.Dispatch<React.SetStateAction<boolean>>,
  setBodyMessage: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  if (!isStart) {
    setIsStart(true);
    setBodyMessage('Привет, меня зовут Чат-бот, а как зовут тебя?');
  } else {
    setBodyMessage('Вы уже начали чат');
  }
};

// команда /stop
export const commandStop = (
  isStart: boolean,
  setIsStart: React.Dispatch<React.SetStateAction<boolean>>,
  setBodyMessage: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  if (isStart) {
    setIsStart(false);
    setBodyMessage('Всего доброго, если хочешь поговорить пиши /start');
  } else {
    setBodyMessage(notStartChat);
  }
};

// команда /name
export const commandName = (
  isStart: boolean,
  name: string,
  setBodyMessage: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  if (isStart) {
    const message =
      'Привет ' +
      name +
      ', приятно познакомится. Я умею считать, введи числа которые надо посчитать';
    setBodyMessage(message);
  } else {
    setBodyMessage(notStartChat);
  }
};

export const notStart = (
  isStart: boolean,
  setBodyMessage: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  if (isStart) {
    setBodyMessage(notKnowCommandBody);
  } else {
    setBodyMessage(notStartChat);
  }
};
