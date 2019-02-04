
//#region Declarations

var mongoose = require("mongoose");

var schema = mongoose.Schema;

//#endregion

//#region Model 

var UserProfile = new schema (
    {
        Firstname : 
        { 
            type : String, 
            required : true
        },
        Lastname : 
        { 
            type : String, 
            required : true
        },
        MobileNo : 
        {   
            type : Number, 
            required : true
        },
        Email : 
        {   
            type : String, 
            required : true
        },
        Gender : 
        {   
            type : String, 
            required : true
        },
        AddressLine1 : 
        {   
            type : String
        },
        AddressLine2 : 
        {   
            type : String 
        },
        Pincode : 
        {   
            type : Number 
        },
        City : 
        {   
            type : String 
        },
        State : 
        {   
            type : String 
        },
        AadharNo : 
        {   
            type : String 
        },
        Role :
        {
            type : String
        },
        LoginDetails :  
        {
        username : 
        { 
            type: String, 
            required : true
        },
        password : 
        { 
            type: String, 
            required : true
        }
        },
        
        CreatedDateTime : 
        {
            type : Date
        },
        CreatedBy : 
        {
            type : String,
            required : true
        },
        UpdatedDateTime : 
        {
            type : Date
        },
        UpdatedBy : 
        {
            type : String
        },
    }
)

//#endregion

//#region Methods

UserProfile.pre('save',function(next){
    var currentDate = new Date();

  if (!this.CreatedDateTime)
  {
    this.CreatedDateTime = currentDate;
  }  
  else
  {
    this.UpdatedDateTime = currentDate;
  }

  next();
})

//#endregion

var User = mongoose.model("UserProfile",UserProfile);
module.exports = User;