FROM node:18-alpine as base 

WORKDIR /app

COPY . /app/

COPY package*.json /app/

ARG DB_PORT=3306
ARG DB_HOST='delivery1010-mysql-2.csghjebsa21j.ap-northeast-2.rds.amazonaws.com'
ARG DB_USERNAME='admin'
ARG DB_PASSWORD='delivery1010!#'
ARG DB_DATABASE='delivery1010'

RUN yarn \
    && yarn run build 

COPY ./ ./

EXPOSE 3000

FROM base as prod 
CMD [ "yarn", "run", "start:dev" ]
