FROM node:10.15 as build

WORKDIR /app

COPY package.json .npmrc ./

RUN npm install

COPY . .

RUN npm build

FROM nginx:alpine

EXPOSE 80

COPY --from=build /app/dist /usr/share/nginx/html
