'use strict';

var create = function (client, config) {
    
    client.select(config.db);

    var complete = function (response, result) {
        response.send(200, {}, result);
    };

    var getScores = function (request, response) {
        client.hgetall('poll', function (err, obj) {
            var data = obj || { 'dog1': 0, 'dog2': 0 },
                total = Math.abs(data.dog1 || 0) + Math.abs(data.dog2 || 0),
                result = {
                    'dog1':  parseFloat((data.dog1 / total || 0) * 100).toFixed(2),
                    'dog2': parseFloat((data.dog2 / total || 0) * 100).toFixed(2)
                };
            complete(response, result);
        });
    };

    var vote = function (request, response) {
        var dog = request.url.pathname.substr(11);
        client.hincrby('poll', dog, 1);
        complete(response, {});
    };

    return {
        getScores: getScores,
        vote: vote
    };

};

exports.create = create;