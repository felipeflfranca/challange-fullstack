FROM node:16

WORKDIR /usr/src/server

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3001

CMD ["yarn", "start"]