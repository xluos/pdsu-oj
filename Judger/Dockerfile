FROM node:10.15-slim

WORKDIR /app

COPY package.json .

RUN npm install --production --registry=https://registry.npm.taobao.org

COPY . .

RUN echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian/ stretch main contrib non-free \n\
          deb https://mirrors.tuna.tsinghua.edu.cn/debian/ stretch-updates main contrib non-free \n\
          deb https://mirrors.tuna.tsinghua.edu.cn/debian/ stretch-backports main contrib non-free \n\
          deb https://mirrors.tuna.tsinghua.edu.cn/debian-security stretch/updates main contrib non-free \n\
          deb http://mirrors.ustc.edu.cn/debian/ stretch main contrib non-free \n\
          deb-src http://mirrors.ustc.edu.cn/debian/ stretch main contrib non-free \n\
          deb http://mirrors.ustc.edu.cn/debian/ stretch-updates main contrib non-free \n\
          deb-src http://mirrors.ustc.edu.cn/debian/ stretch-updates main contrib non-free \n\
          deb http://mirrors.ustc.edu.cn/debian/ stretch-backports main contrib non-free \n\
          deb-src http://mirrors.ustc.edu.cn/debian/ stretch-backports main contrib non-free \n\
          deb http://mirrors.ustc.edu.cn/debian-security/ stretch/updates main contrib non-free \n\
          deb-src http://mirrors.ustc.edu.cn/debian-security/ stretch/updates main contrib non-free" \
          > /etc/apt/sources.list && \
    apt-get update && \
    apt-get -y install libcairo2-dev libpango1.0-dev libgif-dev build-essential

RUN cd src/core && \
    rm Judge && \
    make

CMD [ "npm", "run", "start"]

