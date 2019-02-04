
//#region Modules

var mongoose = require("mongoose");

var schema = mongoose.Schema;

//#endregion

//#region Model

var SessionLog = new schema({
    Token: {
        type: String,
        required: true
    },
    LoginDateTime: {
        type: Date
    },
    LogOffDateTime: {
        type: Date
    },
    username: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        required: true
    },
    SessionDatas :[
        {
        AccessedLog: String,
        LogUpdatedDateTime: Date
        }
    ],
    IPAddress: {
        type: String,
        required: true
    }
});



//#endregion

//#region Methods

SessionLog.pre('save',function(next){
    var currentDate = new Date();

  if (!this.LoginDateTime)
  {
    this.LoginDateTime = currentDate;
  }  
  next();
})

//#endregion

var SessionLog = mongoose.model("SessionLog",SessionLog);
module.exports = SessionLog;