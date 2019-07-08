class CommonResponse {

    constructor(responseCode, responMessage, data){
        this.responsecode = responseCode ? responseCode : "01"; //if constructor params null, set with 00
        this.responsemessage = responMessage ? responMessage: "Success";
        this.data = data;
    }
}

module.exports = CommonResponse;
