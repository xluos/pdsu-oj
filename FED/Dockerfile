FROM node:10.15 as build

WORKDIR /app

COPY package.json .npmrc ./

RUN npm install

COPY . .

ENV NODE_ENV=production

RUN npm run build

FROM nginx:alpine

EXPOSE 80

COPY --from=build /app/build /usr/share/nginx/html
