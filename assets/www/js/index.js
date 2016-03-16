/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    // represents the device capability of launching ARchitect Worlds with specific features
    isDeviceSupported: false,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    onDeviceReady: function() {
        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
        app.receivedEvent('deviceready');
    },
    // --- Wikitude Plugin ---
    // Use this method to load a specific ARchitect World from either the local file system or a remote server
    loadARchitectWorld: function(example) {
        // check if the current device is able to launch ARchitect Worlds
        app.wikitudePlugin.isDeviceSupported(function() {
            app.wikitudePlugin.setOnUrlInvokeCallback(app.onUrlInvoke);
            // inject poi data using phonegap's GeoLocation API and inject data using World.loadPoisFromJsonData
            if ( example.requiredExtension === "ObtainPoiDataFromApplicationModel" ) {
                navigator.geolocation.getCurrentPosition(onLocationUpdated, onLocationError);
            }

            app.wikitudePlugin.loadARchitectWorld(function successFn(loadedURL) {
                /* Respond to successful world loading if you need to */
            }, function errorFn(error) {
                alert('Loading AR web view failed: ' + error);
            },
            example.path, example.requiredFeatures, example.startupConfiguration
            );
        }, function(errorMessage) {
            alert(errorMessage);
        },
        example.requiredFeatures
        );
    },
    loadCustomARchitectWorldFromURL: function(url) {
        var world = {
            "path": url,
            "requiredFeatures": [
                "2d_tracking",
                "geo"
            ],
            "startupConfiguration": {
                "camera_position": "back"
            }
        };
        app.loadARchitectWorld(world);
    },
    // This function gets called if you call "document.location = architectsdk://" in your ARchitect World
    onUrlInvoke: function (url) {
        if (url.indexOf('captureScreen') > -1) {
            app.wikitudePlugin.captureScreen(
                function(absoluteFilePath) {
                    alert("snapshot stored at:\n" + absoluteFilePath);
                },
                function (errorMessage) {
                    alert(errorMessage);
                },
                true, null
            );
        } else {
            alert(url + "not handled");
        }
    },
    // --- End Wikitude Plugin ---
    
     receivedEvent: function(id) {
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');
 
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
 
            console.log('Received Event: ' + id);
 
            app.example();
        },
 
        example : function () {
          var cardIOResponseFields = [
            "card_type",
            "redacted_card_number",
            "card_number",
            "expiry_month",
            "expiry_year",
            "cvv",
            "zip"
          ];
 
          var onCardIOComplete = function(response) {
            console.log("card.io scan complete");
            for (var i = 0, len = cardIOResponseFields.length; i < len; i++) {
              var field = cardIOResponseFields[i];
              console.log(field + ": " + response[field]);
            }
          };
 
          var onCardIOCancel = function() {
            console.log("card.io scan cancelled");
          };
 
          var onCardIOCheck = function (canScan) {
            console.log("card.io canScan? " + canScan);
            var scanBtn = document.getElementById("scanBtn");
            if (!canScan) {
              scanBtn.innerHTML = "Manual entry";
            }
            scanBtn.onclick = function (e) {
              CardIO.scan({
                    "expiry": true,
                    "cvv": true,
                    "zip": true,
                    "suppressManual": false,
                    "suppressConfirm": false,
                    "hideLogo": true
                },
                onCardIOComplete,
                onCardIOCancel
              );
            }
          };
 
          CardIO.canScan(onCardIOCheck);
        }
};

app.initialize();