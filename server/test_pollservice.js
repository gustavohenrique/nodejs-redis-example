var chai = require('chai'),
    redis = require('redis'),
    client = redis.createClient(),
    config = require('./config').test,
    pollService = require('./pollservice').create(client, config);


describe('PollService', function () {

    var expect = chai.expect;

    beforeEach(function (done) {
        client.select(config.db, function (err, res) {
            client.flushdb();
            done();
        });
    });

    it ('#vote should increment the score', function (done) {
        
        expect(client.selected_db).to.equal(config.db);

        var request = {
            url: {
                pathname: '/poll/vote/dog1'
            }
        };
        var response = {
            send: function (status, headers, data) {
                expect(status).to.equal(200);
                done();
            }
        };

        pollService.vote(request, response);
        
        client.hgetall('poll', function (err, obj) {
            expect(obj.dog1).to.equal('1');
        });
    });

    it ('#getScores should return all scores', function (done) {
        
        expect(client.selected_db).to.equal(config.db);
        client.hincrby('poll', 'dog1', 6);
        client.hincrby('poll', 'dog2', 4);

        var response = {
            send: function (status, headers, data) {
                expect(status).to.equal(200);
                expect(data.dog1).to.equal('60.00');
                expect(data.dog2).to.equal('40.00');
                done();
            }
        };

        pollService.getScores({}, response);
    
    });
});