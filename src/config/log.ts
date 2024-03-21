export const logConfig = {
  dev: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "SYS:dd/mm/yy HH:MM:ss p",
        ignore: "pid,hostname",
        colorize: true,
      },
    },
  },
  production: true,
  test: false,
};
