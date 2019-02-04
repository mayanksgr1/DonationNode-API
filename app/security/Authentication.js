//#region Modules

var jwt    = require('jsonwebtoken');
var config = require('../config/config');

//#endregion

//#region Function

exports.ValidateToken= function(req,res,TokenCallback) {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            var secretkey = config.Secret;
            jwt.verify(token,secretkey, function (err, decoded) {
                if (err) {
                    TokenCallback(err);
                } else {
                    req.decoded = decoded;
                    TokenCallback(err,true);
                }
            });
        } else {
            TokenCallback("Token Not Found ",false);
        }
    };


//#endregion

