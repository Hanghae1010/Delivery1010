export const env = () => ({
  NODE_ENV: process.env.NODE_ENV === 'production' ? 'production' : 'dev',

  DATABASE_URL: process.env.DB_HOST,

  AWS_CLOUDWATCH_LOG_GROUP_NAME: process.env.CLOUDWATCH_GROUP_NAME,
  AWS_CLOUDWATCH_LOG_STREAM_NAME: process.env.AWS_CLOUDWATCH_LOG_STREAM_NAME,
  AWS_ACCESS_KEY_ID: process.env.CLOUDWATCH_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.CLOUDWATCH_REGION,
});
