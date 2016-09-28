"use strict";
var LogFile = (function () {
    function LogFile() {
    }
    LogFile.prototype.LogFile = function () {
        this.id = "";
        this.shortName = "";
        this.realFileName = "";
        this.outputFileName = "";
        this.description = "New";
        this.createDate = new Date();
    };
    return LogFile;
}());
exports.LogFile = LogFile;
//# sourceMappingURL=log-file.data.js.map