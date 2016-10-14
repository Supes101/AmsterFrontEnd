"use strict";
var Amster = (function () {
    function Amster() {
        this.server_location = "http://CERIW01:7975/AmsterServer-2.0";
        this.upload_servlet = this.server_location + "/uploadlog";
        this.log_location = "http://CERIW01:7975/uploaded_logs/";
    }
    return Amster;
}());
exports.Amster = Amster;
//# sourceMappingURL=amster.properties.js.map