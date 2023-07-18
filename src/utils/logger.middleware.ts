import winston from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import WinstonCloudwatch from 'winston-cloudwatch';

const { createLogger, format, transports } = winston;

const logFormat = winston.format.printf((info) => {
  return `${info.timestamp} [${info.level}] : ${info.message}`;
});

export default class LoggerMiddleware {
  private logger: winston.Logger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
      ),
    });

    // 프로덕션인 경우
    if (process.env.NODE_ENV === 'production') {
      // timestamp 는 클라우드워치에 도달할 때 찍히므로 별도 설정 필요 x
      const cloudwatchConfig = {
        logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
        logStreamName: `${process.env.CLOUDWATCH_GROUP_NAME}-${process.env.NODE_ENV}`,
        awsAccessKeyId: process.env.CLOUDWATCH_ACCESS_KEY,
        awsSecretKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
        awsRegion: process.env.CLOUDWATCH_REGION,
        messageFormatter: ({ level, message, additionalInfo }) =>
          `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(
            additionalInfo,
          )}}`,
      };
      const cloudWatchHelper = new WinstonCloudwatch(cloudwatchConfig);
      const transports = new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`,
          ),
        ),
      });
      this.logger.add(transports);
    } else if (process.env.NODE_ENV === 'debug') {
      // 프로덕션이 아닌 경우 콘솔에 출력
      this.logger.add(
        new transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      );
    }
  }

  public info(msg: string) {
    this.logger.info(msg);
  }
  public error(errMsg: string) {
    this.logger.error(errMsg);
  }

  public getRequestLogger() {
    return WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('SampleApp', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    });
  }
}
