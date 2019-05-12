FROM node:10.15-slim

WORKDIR /app

COPY package.json .

RUN npm install --production --registry=https://registry.npm.taobao.org

COPY . .

RUN apt-get update && \
    apt-get -y install libcairo2-dev libpango1.0-dev libgif-dev build-essential

RUN cd src/core && \
    rm Judge && \
    make

CMD [ "npm", "run", "start"]

