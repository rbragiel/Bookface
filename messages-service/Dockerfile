FROM node:14.17

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

EXPOSE 4000

CMD yarn run start:dev