import {
  CloudWatchLogsClient,
  PutLogEventsCommand,
} from '@aws-sdk/client-cloudwatch-logs';
import { EnvService } from 'src/config/env/env.service';
import * as winston from 'winston';

const { createLogger, transports } = winston;
const { combine, timestamp, colorize, printf, simple } = winston.format;

const logFormat = printf(
  (info) => `${info.timestamp} ${info.level}: ${info.message}`,
);

export default class Logger {
  private logger: winston.Logger;
  private cloudWatchClient: CloudWatchLogsClient;
  logGroupName: string;
  logStreamName: string;

  constructor(private readonly env: EnvService) {
    this.logGroupName = process.env.CLOUDWATCH_GROUP_NAME;
    this.logStreamName = process.env.CLOUDWATCH_LOG_STREAM_NAME;
    const awsAccessKeyId = process.env.CLOUDWATCH_ACCESS_KEY;
    const awsSecretKey = process.env.CLOUDWATCH_SECRET_ACCESS_KEY;
    const awsRegion = process.env.CLOUDWATCH_REGION;

    this.logger = createLogger({
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
      ),
      silent: process.env.NODE_ENV === 'production',
    });

    this.cloudWatchClient = new CloudWatchLogsClient({
      credentials: {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretKey,
      },
      region: awsRegion,
    });

    this.logger.add(
      new transports.Console({
        format: combine(colorize(), simple()),
      }),
    );
  }

  public info(msg: RequestApiLog | ResponseApiLog | CustomApiLog) {
    const maskedMsg = this.makeLogMessage(msg);
    this.logger.info(maskedMsg);
    this.sendLogToCloudWatch('INFO', maskedMsg);
  }

  public error(errmsg: ErrorApiLog) {
    const stringifiedMsg = JSON.stringify(errmsg);
    this.logger.error(stringifiedMsg);
    this.sendLogToCloudWatch('ERROR', stringifiedMsg);
  }

  public debug(msg: CustomApiLog) {
    this.logger.debug(msg);
  }

  private sendLogToCloudWatch(level: string, msg: string) {
    const logEvents = [
      {
        timestamp: new Date().getTime(),
        message: `[${level}] : ${msg}`,
      },
    ];
    const command = new PutLogEventsCommand({
      logGroupName: this.logGroupName,
      logStreamName: this.logStreamName,
      logEvents,
    });

    this.cloudWatchClient.send(command);
  }

  private makeLogMessage(
    msgs: RequestApiLog | ResponseApiLog | CustomApiLog,
  ): string {
    const modifiedMsgs = { ...msgs }; // Create a copy of the msgs object

    if ('Headers' in modifiedMsgs) {
      modifiedMsgs.Headers = this.filterSensitiveHeaders(modifiedMsgs.Headers);
    }

    if ('Body' in modifiedMsgs) {
      modifiedMsgs.Body = this.filterSensitiveBody(modifiedMsgs.Body);
    }

    if ('Request' in modifiedMsgs) {
      modifiedMsgs.Request = this.filterSensitiveBody(modifiedMsgs.Request);
    }

    return JSON.stringify(modifiedMsgs);
  }

  private filterSensitiveHeaders(headers: string[]): string[] {
    const sensitiveHeaders = ['authorization', 'cookie', 'host'];
    const regex = new RegExp(sensitiveHeaders.join('|'), 'gi');

    return headers.map((header) => {
      if (regex.test(header)) {
        return '*** Sensitive Data ***';
      }
      return header;
    });
  }

  private filterSensitiveBody(body: string): string {
    const sensitiveWords = ['password', 'email', 'card'];
    const regex = new RegExp(sensitiveWords.join('|'), 'gi');

    if (regex.test(body)) {
      return '*** Sensitive Data ***';
    }
    return body;
  }
}
