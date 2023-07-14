FROM node:18-alpine as base 

WORKDIR /app

COPY . /app/

COPY package*.json /app/

ENV DB_PORT=3306
ENV DB_HOST='delivery1010-mysql-2.csghjebsa21j.ap-northeast-2.rds.amazonaws.com'
ENV DB_USERNAME='admin'
ENV DB_PASSWORD='delivery1010!#'
ENV DB_DATABASE='delivery1010'
ENV CLOUDWATCH_GROUP_NAME=delivery1010-logs
ENV CLOUDWATCH_ACCESS_KEY=AKIAXFS4YO6MQS2LQY52
ENV CLOUDWATCH_SECRET_ACCESS_KEY=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
ENV CLOUDWATCH_REGION=ap-northeast-2

RUN yarn \
    && yarn run build 

COPY ./ ./

EXPOSE 3000

FROM base as prod 
CMD [ "yarn", "run", "start:dev" ]