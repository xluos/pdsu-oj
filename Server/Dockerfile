FROM node:10.15-alpine

WORKDIR /app

COPY package.json .

RUN npm install --production --registry=https://registry.npm.taobao.org && \
    npm install -g prisma && \
    cd src/model && \
    prisma deploy

COPY . .

CMD [ "npm", "run", "start"]