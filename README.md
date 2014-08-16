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

The easiest way is running in Vagrant. Just clone the repository and run *vagrant up*.
After Vagrant download and configure the virtual machine, you'll can access on *http://localhost:8001*. The API is running on *http://localhost:3000*

You can open the index.html in your browser that works too.

### API Usage

    # Get scores
    curl -X GET http://localhost:3000/poll/scores

    # Vote to incremment the score
    curl -X POST http://localhost:3000/poll/vote/<dog>

## Running without Vagrant

If you don't run by Vagrant you can see the Vagrantfile that contains a shell script for automate the configuration.
Basically you just have to install NodeJS and the project dependencies and run node server.js.
Open the client/dist/index.html in your browser and enjoy it.

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
