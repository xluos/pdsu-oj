FROM node:10.15

WORKDIR /app

COPY package.json .

RUN npm install --production --registry=https://registry.npm.taobao.org

COPY . .

RUN apt-get update && \
    apt-get -y build-essential
# echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian/ stretch main contrib non-free \n\
#           deb https://mirrors.tuna.tsinghua.edu.cn/debian/ stretch-updates main contrib non-free \n\
#           deb https://mirrors.tuna.tsinghua.edu.cn/debian/ stretch-backports main contrib non-free \n\
#           deb https://mirrors.tuna.tsinghua.edu.cn/debian-security stretch/updates main contrib non-free \n\
#           deb http://mirrors.ustc.edu.cn/debian/ stretch main contrib non-free \n\
#           deb http://mirrors.ustc.edu.cn/debian/ stretch-updates main contrib non-free \n\
#           deb http://mirrors.ustc.edu.cn/debian/ stretch-backports main contrib non-free \n\
#           deb http://mirrors.ustc.edu.cn/debian-security/ stretch/updates main contrib non-free" \
#           > /etc/apt/sources.list && \

RUN cd src/core && \
    rm Judge && \
    make

CMD [ "npm", "run", "start"]

