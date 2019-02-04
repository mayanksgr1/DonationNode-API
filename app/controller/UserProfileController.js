

//#region Modules

var validate = require('express-validation');
var UserProfile = require('../models/UserProfile');
var dateTime = require('node-datetime');
var Response = require('../common/Response.js');
var ResponseCodes = require('../common/ResponseCodes.js');
var Error = require('../common/Errors.js');
var Token = require('../security/Authentication');
const bcrypt = require('bcrypt');

//#endregion 

module.exports = function (app) {

//#region Variables

var reqDateTime;

//#endregion

//#region API's

// POST method to insert records of new user in Database.
app.post('/user/create', function (req, res) {
        reqDateTime = dateTime.create().format('Y-m-d H:M:S');

        if (req.body.MobileNo && req.body.LoginDetails) {
            const MobileNo = req.body.MobileNo;
            const username = req.body.LoginDetails.username;
            checkMobile(MobileNo, UserProfile, function (err, countMobile) {
                if (countMobile > 0) {
                    var response = new Response.CreateResponse(false, 0, "", reqDateTime, dateTime.create().format('Y-m-d H:M:S'),Error.ErrorDetails.ERR008,"",ResponseCodes.ResponseDetails.RES102);
                    res.json({
                        CreateResponse: response
                    });
                }
                else {
                    checkUserName(username, UserProfile, function (err, ResultUser) {
                        if (err) {
                            var response = new Response.CreateResponse(false, 0, "", reqDateTime, dateTime.create().format('Y-m-d H:M:S'),Error.ErrorDetails.ERR014,err,ResponseCodes.ResponseDetails.RES104);
                            res.json({
                                CreateResponse: response
                            });
                        }
                        else if (typeof ResultUser[0] !== 'undefined' && ResultUser[0].hasOwnProperty('LoginDetails')) {
                            var response = new Response.CreateResponse(false, 0, "", reqDateTime, dateTime.create().format('Y-m-d H:M:S'),Error.ErrorDetails.ERR002,"",ResponseCodes.ResponseDetails.RES102);
                            res.json({
                                CreateResponse: response
                            });
                        }
                        else {
                            var BCRYPT_SALT_ROUNDS = 12;pt
                            var password = req.body.password;
                            
                            bcrypt.hash(password,BCRYPT_SALT_ROUNDS,function(hashedPassword){
                                
                                var User = new UserProfile({
                                    Firstname: req.body.Firstname,
                                    Lastname: req.body.Lastname,
                                    MobileNo: req.body.MobileNo,
                                    Gender: req.body.Gender,
                                    Email: req.body.Email,
                                    AddressLine1: req.body.AddressLine1,
                                    AddressLine2: req.body.AddressLine2,
                                    Pincode: req.body.Aadhar,
                                    City: req.body.City,
                                    State: req.body.State,
                                    Aadhar: req.body.Aadhar,
                                    Role: req.body.Role,
                                    CreatedBy: req.body.LoginDetails.username,
                                    LoginDetails: {
                                        username: req.body.LoginDetails.username,
                                        password: hashedPassword
                                    }
                                });
    
                                User.save(function (err,savedObject) {
                                    if (err) {
                                        var response = new Response.CreateResponse(false, "","", reqDateTime, dateTime.create().format('Y-m-d H:M:S'),Error.ErrorDetails.ERR006,err,ResponseCodes.ResponseDetails.RES103);
                                        res.json({
                                            CreateResponse: response
                                        });
                                    }
                                    if(typeof savedObject !== 'undefined' && typeof savedObject._id !== 'undefined') {
                                        var response = new Response.CreateResponse(true, 1, savedObject, reqDateTime, dateTime.create().format('Y-m-d H:M:S'), "", "",ResponseCodes.ResponseDetails.RES105);
                                        res.json({
                                            CreateResponse: response
                                        });
                                    }
                                });
                            });
                        }
                    });
                }
            });
        }
    });



// GET method to fetch all records.
app.get('/user/',function (req, res) {
    reqDateTime=dateTime.create().format('Y-m-d H:M:S');
    Token.ValidateToken(req,res,function(err,IsValidToken){
        if (err){
            var response = new Response.QueryResponse(false,"",reqDateTime,dateTime.create().format('Y-m-d H:M:S'),Error.ErrorDetails.ERR015,"",ResponseCodes.ResponseDetails.RES104);
            res.json({
                QueryResponse:response
            });
        }
        else if(IsValidToken===true) {
            UserProfile.find({},function (err, result) {
                if (err){
                    var response = new Response.QueryResponse(false,"",reqDateTime,dateTime.create().format('Y-m-d H:M:S'),Error.ErrorDetails.ERR005,"",ResponseCodes.ResponseDetails.RES104);
                    res.json({
                        QueryResponse:response
                    });
                }
                else {
                    var response = new Response.QueryResponse(true,result,reqDateTime,dateTime.create().format('Y-m-d H:M:S'),"","",ResponseCodes.ResponseDetails.RES102);
                    res.json({
                        QueryResponse:response
                    });
                }
            });
        }
        else{
            var response = new Response.QueryResponse(false,"",reqDateTime,dateTime.create().format('Y-m-d H:M:S'),Error.ErrorDetails.ERR007,"",ResponseCodes.ResponseDetails.RES103);
            res.json({
                QueryResponse:response
            });
        }
    });

});

//endregion
}

// Function to check, whether the username already exists or not.
function checkUserName(user, UserProfile, UserCallback) {
    var queryUser = { "LoginDetails.username": user }

    UserProfile.find(queryUser,function(err, UserResult) {
        if (err)
            UserCallback(err);
        else {
            UserCallback(err, UserResult);
        }
    });
}

// Function to check, whether the mobile no is already registered with any user in database or not.
function checkMobile(MobileNo, UserProfile, MobileCallback) {
    var queryUser = { "MobileNo": MobileNo }

    UserProfile.find(queryUser).count(function (err, MobileResult) {
        if (err)
            MobileCallback(err);
        else
            MobileCallback(err, MobileResult);
    })

}

