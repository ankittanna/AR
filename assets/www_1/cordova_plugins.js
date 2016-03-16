cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/com.wikitude.phonegap.WikitudePlugin/www/WikitudePlugin.js",
        "id": "com.wikitude.phonegap.WikitudePlugin.WikitudePlugin",
        "clobbers": [
            "WikitudePlugin"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{}
// BOTTOM OF METADATA
});