import { CommandsType, NumberMathTypes, PositionType } from '@/types';

import { notKnowCommandBody, notMathCommand, notStartChat } from '@/constants';

// парсинг команды
export const commandParser = (fullCommand: string): CommandsType => {
  const words = fullCommand.split(' ');
  return {
    command: words[0],
    args: words.slice(1)
  };
};

// оберточная функция ошибок
export const errorsMessageWrap = (
  isStart: boolean,
  numbers: NumberMathTypes,
  setBodyMessage: React.Dispatch<React.SetStateAction<string | undefined>>,
  setNumbers: React.Dispatch<React.SetStateAction<NumberMathTypes | undefined>>
) => {
  return (commandFunction: () => void) => {
    if (isStart && !numbers) {
      commandFunction();
    } else if (numbers) {
      setBodyMessage(notMathCommand);
      setNumbers(undefined);
    } else {
      setBodyMessage(notStartChat);
    }
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
  setIsStart: React.Dispatch<React.SetStateAction<boolean>>,
  setBodyMessage: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  setIsStart(false);
  setBodyMessage('Всего доброго, если хочешь поговорить пиши /start');
};

// команда /name
export const commandName = (
  name: string,
  setBodyMessage: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  const message =
    'Привет ' + name + ', приятно познакомится. Я умею считать, введи числа которые надо посчитать';
  setBodyMessage(message);
};

//команда /number
export const commandNumber = (
  firstNumberString: string,
  secondNumberString: string,
  setBodyMessage: React.Dispatch<React.SetStateAction<string | undefined>>,
  setNumbers: React.Dispatch<React.SetStateAction<NumberMathTypes | undefined>>
) => {
  const first = parseInt(firstNumberString, 10);
  const second = parseInt(secondNumberString, 10);
  setNumbers({
    first,
    second
  });
  setBodyMessage('Введите одну из следующих команд: -, +, *, /');
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
  } else if (!numbers) {
    setBodyMessage(notStartChat);
  }
};

export const commandWeather = async (
  setBodyMessage: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  const getPosition = async (): Promise<PositionType | undefined> => {
    let positionRes: PositionType | undefined = undefined;

    const getPositionPromise = (options?: PositionOptions): Promise<GeolocationPosition> => {
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
      );
    };

    if (navigator.geolocation) {
      try {
        const position = await getPositionPromise();
        positionRes = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      } catch (err) {
        setBodyMessage('При определении геопозиции произошла ошибка');
      }
    } else {
      setBodyMessage('Включите пожалуйста геолокацию');
    }

    return positionRes;
  };

  const getWeather = async (latitude: number, longitude: number) => {
    try {
      const req = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=ru&appid=1168febae541d36c0213f5b48ce1e406`
      );
      const body = await req.json();
      setBodyMessage(body['weather'][0]['description']);
    } catch (err) {
      setBodyMessage('Произошла ошибка с получением данных');
    }
  };
  const position = await getPosition();
  if (position) {
    getWeather(position.latitude, position.longitude);
  }
};

// для не запланированного функционала
export const notStart = (
  setBodyMessage: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  setBodyMessage(notKnowCommandBody);
};
