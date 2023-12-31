FROM node:18-alpine as base 

WORKDIR /app

COPY . /app/

COPY package*.json /app/

ENV DB_PORT=3306
ENV DB_HOST=delivery1010.mysql.database.azure.com
ENV DB_USERNAME=admin_
ENV DB_PASSWORD=delivery1010!#
ENV DB_DATABASE=delivery1010!#
ENV CLOUDWATCH_GROUP_NAME=delivery1010-logs
ENV CLOUDWATCH_ACCESS_KEY=AKIA5FNPRALGRFIE7QZJ
ENV CLOUDWATCH_SECRET_ACCESS_KEY=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
ENV CLOUDWATCH_REGION=ap-northeast-2
ENV CLOUDWATCH_LOG_STREAM_NAME=delivery1010-log-stream

RUN yarn \
    && yarn run build 

COPY ./ ./

EXPOSE 3000

FROM base as prod 
CMD [ "yarn", "run", "start:dev" ]