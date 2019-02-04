
//region Functions

exports.LoginResponse=function(success,token,data,RequestDateTime,ResponseDateTime,Error,ErrorData,Response){
    this.success=success,
    this.token=token,
    this.Data=data,
    this.RequestDateTime=RequestDateTime,
    this.ResponseDateTime=ResponseDateTime,
    this.Error=Error,
    this.ErrorData=ErrorData,
    this.Response=Response
};

exports.LogOffResponse=function(success,RequestDateTime,ResponseDateTime,Error,ErrorData,Response){
    this.success=success,
    this.RequestDateTime=RequestDateTime,
    this.ResponseDateTime=ResponseDateTime,
    this.Error=Error,
    this.ErrorData=ErrorData,
    this.Response=Response
};

exports.CreateResponse=function(isCreateSuccessful,RecordsInserted,data,RequestDateTime,ResponseDateTime,Error,ErrorData,Response){
    this.isCreateSuccessful=isCreateSuccessful,
    this.RecordsInserted=RecordsInserted,
    this.Data=data,
    this.RequestDateTime=RequestDateTime,
    this.ResponseDateTime=ResponseDateTime,
    this.Error=Error,
    this.ErrorData=ErrorData,
    this.Response=Response
};

exports.RetrieveResponse=function(isRetrieveSuccessful,data,RequestDateTime,ResponseDateTime,Error,ErrorData,Response){
    this.isRetrieveSuccessful=isRetrieveSuccessful,
    this.Data=data,
    this.RequestDateTime=RequestDateTime,
    this.ResponseDateTime=ResponseDateTime,
    this.Error=Error,
    this.ErrorData=ErrorData,
    this.Response=Response
};

exports.QueryResponse=function(isQuerySuccessful,data,RequestDateTime,ResponseDateTime,Error,ErrorData,Response){
    this.isQuerySuccessful=isQuerySuccessful,
    this.Data=data,
    this.RequestDateTime=RequestDateTime,
    this.ResponseDateTime=ResponseDateTime,
    this.Error=Error,
    this.ErrorData=ErrorData,
    this.Response=Response
};

exports.UpdateResponse=function(isUpdateSuccessful,RowsAffected,RequestDateTime,ResponseDateTime,Error,ErrorData,Response){
    this.isUpdateSuccessful=isUpdateSuccessful,
    this.RowsAffected=RowsAffected,
    this.RequestDateTime=RequestDateTime,
    this.ResponseDateTime=ResponseDateTime,
    this.Error=Error,
    this.ErrorData=ErrorData,
    this.Response=Response
};

//endregion

