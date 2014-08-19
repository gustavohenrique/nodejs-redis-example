nodejs-redis-example
====================

## About

This is a simple scalable application using NodeJS and Redis.
The application is divided in 2 parts: *client* (static HTML + Javascript) and *server* (NodeJS + Redis).

## Client

The client module is a HTML + JQuery for consumes the server's API. Easy to cache using a HTTP Servers like Nginx/Apache.

## Server

The server module is a javascript application using NodeJS and Redis for persistence.

## How to run?

### Using Vragrant

Just clone the repository and run *vagrant up*.
After Vagrant download and configure the virtual machine, you'll can access on *http://localhost:8001*. The API is running on *http://localhost:3000*

### Using Docker

Install *boot2docker* if you are using OS X or Windows:

    boot2docker --memory=1024 --vm=node-redis-example --hostip=172.16.123.123 init
    boot2docker --vm=node-redis-example up
    boot2docker --vm=node-redis-example ssh
    git clone <this-repo-url>

Run the Docker inside the Linux vm:

    docker build -t=node-redis-example .
    docker run -d -p 3000:3000 -p 8001:80 node-redis-example

Now you can open the index.html in your browser on http://172.16.123.123:8001

### Without Vagrant or Docker

If you don't run by Vagrant or Docker you can see the Vagrantfile that contains a shell script for automate the configuration.
Basically you just have to install NodeJS and the project dependencies and run node server.js.
Open the client/dist/index.html in your browser and enjoy it.

### API Usage

    # Get scores
    curl -X GET http://localhost:3000/poll/scores

    # Vote to incremment the score
    curl -X POST http://localhost:3000/poll/vote/<dog>


## Technologies

* GulpJS
* Bower
* SemanticUI
* JQuery
* NodeJS
* Mocha and Chai
* Redis

## License

MIT
