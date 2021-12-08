FROM node:14.17

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

EXPOSE 5000

CMD yarn run start:dev