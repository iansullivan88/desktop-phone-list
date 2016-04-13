angular.module('phoneListApp.services').factory('Persistence', [function () {
    var fs = require('fs'),
        path = require('path'),
        homeDirectory = process.env.USERPROFILE || process.env.HOME || process.env.HOMEPATH;
    
    function getJsonFilePath(key) {
        return path.join(homeDirectory, key) + ".json";
    }

    return {
        set: function(key, string) {
            fs.writeFileSync(getJsonFilePath(key), string, "utf8"); 
        },
        get: function(key) {
            var fileName = getJsonFilePath(key);
            if (fs.existsSync(fileName)) {
                return fs.readFileSync(getJsonFilePath(key), "utf8");
            }
            return null;
        }
    };
        
}]);