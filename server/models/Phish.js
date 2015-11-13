var request = require('request-promise');

var Phish = {};

Phish.Phishin = function (settings) {
    if (!(this instanceof Phish.Phishin)) {
        return new Phish.Phishin(settings);
    }

    var baseUrl = 'http://phish.in/api/v1/';

    ['Eras', 'Years', 'Songs', 'Tours', 'Shows', 'Tracks','Venues'].forEach(function (value) {
        this['get' + value] = function (id, params) {
            return this._get(value.toLowerCase(), id, params);
        };
    }.bind(this));

    this._get = function (type, id, params) {

        var url = baseUrl + type + (id ? '/' + id + '/' : '/');
        if(params){
            url += '?';
            params.forEach( (x, i) => {
                url += x;
                if(params.length < i) url += '&';
            })
        }
        return request(url);
    };
    return this;
};

module.exports = Phish;