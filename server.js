
//#region Modules 

var express = require('express');
var mongoose = require('mongoose');
var config = require('./app/config/config');
var bodyParser = require('body-parser');
var ratelimit = require('express-rate-limit');
var routes = require('./app/route/Route');
//#endregion

//#region Declarations

var app = express();
const port = 8000;

var limiter = new ratelimit({
    windowMs : 15*60*1000,
    max : 10,
    delayMs : 0
})

//#endregion

//#region Methods

app.use(limiter);
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

mongoose.connect(config.DBURL,function(err,database){
    if(err) return console.log(err);

    app.listen(port, function(){
      console.log('We are live on ' + port);
    });

    routes(app);
}); 
    
//#endregion    