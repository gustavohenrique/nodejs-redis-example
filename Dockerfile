FROM ubuntu:14.04
MAINTAINER Gustavo Henrique <gustavo@gustavohenrique.net>

ADD . /data

RUN \
    sed -i "s/archive.ubuntu.com/mirror.globo.com\/ubuntu\/archive/" /etc/apt/sources.list && \
    apt-get update && \
    apt-get install build-essential git libncurses-dev tcl8.5-dev python python-dev wget nginx -y

RUN \
    cd /tmp && \
    echo "Installing redis-2.8.13..." && \
    wget http://download.redis.io/releases/redis-2.8.13.tar.gz  && \
    tar zxf redis-2.8.13.tar.gz && \
    cd redis-2.8.13 && \
    make && \
    make install && \
    sed -i "/read -p/d" utils/install_server.sh && \
    sed -i "/read  -p/d" utils/install_server.sh && \
    utils/install_server.sh

RUN \
    cd /tmp && \
    echo "Installing node-v0.10.30..." && \
    wget http://nodejs.org/dist/v0.10.30/node-v0.10.30-linux-x64.tar.gz && \
    tar zxf node-v0.10.30-linux-x64.tar.gz && \
    mv node-v0.10.30-linux-x64 /opt/ && \
    ln -s /opt/node-v0.10.30-linux-x64 /opt/node && \
    cd /usr/local/bin && \
    ln -s /opt/node/bin/* .

ENV NODE_ENV "production"

RUN \
    echo "Configuring the project..." && \
    cp -rf /data/client/dist/* /usr/share/nginx/html/ && \
    cd /data/server && \
    npm install

RUN rm -rf /tmp/*

WORKDIR /data

CMD service redis_6379 start && service nginx start && node /data/server/server.js

EXPOSE 80
EXPOSE 3000
