import { CommandsType, NumberMathTypes } from '@/types';

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

//команда /number
export const commandNumber = (
  isStart: boolean,
  firstNumberString: string,
  secondNumberString: string,
  setBodyMessage: React.Dispatch<React.SetStateAction<string | undefined>>,
  setNumbers: React.Dispatch<React.SetStateAction<NumberMathTypes | undefined>>
) => {
  if (isStart) {
    const first = parseInt(firstNumberString, 10);
    const second = parseInt(secondNumberString, 10);
    setNumbers({
      first,
      second
    });
    setBodyMessage('Введите одну из следующих команд: -, +, *, /');
  } else {
    setBodyMessage(notStartChat);
  }
};

// команды для мат действий
export const commandMathAction = (
  numbers: NumberMathTypes,
  isStart: boolean,
  command: string,
  setBodyMessage: React.Dispatch<React.SetStateAction<string | undefined>>,
  setNumbers: React.Dispatch<React.SetStateAction<NumberMathTypes | undefined>>
) => {
  if (isStart) {
    if (numbers) {
      const actionMath = `${numbers.first} ${command} ${numbers.second}`;
      setBodyMessage(String(eval(actionMath)));

      setNumbers(undefined);
    } else {
      setBodyMessage(notKnowCommandBody);
    }
  } else {
    setBodyMessage(notStartChat);
  }
};
// для не запланированного функционала
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
