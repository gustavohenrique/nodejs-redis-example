'use strict';

var http = require('http'),
    journey = require('journey'),
    router = new(journey.Router),
    redis = require('redis'),
    client = redis.createClient(),
    config = require('./config'),
    pollService = require('./pollservice').create(client, config.prod),
    port = process.argv[2] || 3000;


router.get('/poll/scores').bind(pollService.getScores);
router.post('/poll/vote/dog1').bind(pollService.vote);
router.post('/poll/vote/dog2').bind(pollService.vote);


http.createServer(function (request, response) {
    var body = '';
    request.addListener('data', function (chunk) {
        body += chunk;
    });
    request.addListener('end', function () {
        router.handle(request, body, function (result) {
            // enable CORS
            var headers = result.headers;
            headers['Access-Control-Allow-Origin'] = '*';
            headers['Access-Control-Max-Age'] = '86400'; 
            headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT';
            headers['Access-Control-Allow-Headers'] = 'X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type';
            response.writeHead(result.status, headers);
            response.end(result.body);
        });
    });
}).listen(port);