FROM node:10.15-alpine

WORKDIR /app

COPY package.json .

RUN npm install --registry=https://registry.npm.taobao.org && \
    npm config set unsafe-perm true && \
    npm install -g prisma --registry=https://registry.npm.taobao.org

COPY . .

RUN npm run build

CMD [ "sh", "scripts/start.sh"]