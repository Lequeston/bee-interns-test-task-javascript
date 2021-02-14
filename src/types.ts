export const USER_TYPE = 'USER_TYPE';
export const BOT_TYPE = 'BOT_TYPE';

export type TypeMessage = typeof USER_TYPE | typeof BOT_TYPE;

export type Message = {
  body: string;
  type: TypeMessage;
};

export type CommandsType = {
  command: string;
  args: string[];
};
