FROM node:18-alpine as base 

WORKDIR /app

COPY . /app/

COPY package*.json /app/

RUN yarn \
    && yarn run build 

COPY ./ ./

EXPOSE 3000

FROM base as prod 
CMD [ "yarn", "run", "start:dev" ]
