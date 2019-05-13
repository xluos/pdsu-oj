FROM node:10.15-alpine

WORKDIR /app

COPY package.json .

RUN npm install --production --registry=https://registry.npm.taobao.org

COPY . .

RUN npm install -g prisma --registry=https://registry.npm.taobao.org && \
    cd src/model && \
    prisma deploy

CMD [ "npm", "run", "start"]