FROM node:10.15-alpine

WORKDIR /app

COPY package.json .

RUN npm install --production --registry=https://registry.npm.taobao.org

COPY . .

CMD [ "npm", "run", "start"]