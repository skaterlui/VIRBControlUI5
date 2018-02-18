sap.ui.define(["sap/m/MessageToast"], function (MessageToast) {
    "use strict";
    return {
        
        deviceInfo: function() {
            return this.commandToModel("command", "deviceInfo");
        },

        snapPictureRequest: function () {
            return this.commandRequest("command", "snapPicture");
        },

        snapPicture: function () {
            return this.commandToModel("command", "snapPicture");
        },

        status: function () {
            return this.commandToModel("command", "status");
        },

        features: function () {
            return this.commandToModel("command", "features");
        },

        featuresRequest: function () {
            return this.commandRequest("command", "features");
        },

        statusRequest: function () {
            return this.commandRequest("command", "status");
        },

        stopRecording: function () {
            return this.commandToModel("command", "stopRecording");
        },

        startRecording: function () {
            return this.commandToModel("command", "startRecording");
        },

        mediaList: function () {
            return this.commandToModel("command", "mediaList");
        },

        mediaListRequest: function () {
            return this.commandRequest("command", "mediaList");
        },

        commandList: function () {
            return this.commandToModel("command", "commandList");
        },


        commandToModel: function (sKey, sValue) {
            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setSizeLimit(10000);
                var sData = "{\"" + sKey + "\":\"" + sValue + "\"}";
                var sUrl = "ht" + "tp://" + window.location.host + "/virb";
                var request = jQuery.ajax({
                    url: sUrl + "?Random=" + Math.random().toString(),
                    type: "POST",
                    data: sData,
                    contentType: "application/json",
                    success: function (data) {
                        oModel.setData(data);
                        var iResult = oModel.getProperty("/result");
                        if (iResult === 0 && window.location.host.indexOf("localhost") == -1) {
                            var msg = sKey + " " + sValue + " not successful";
                            jQuery.sap.log.error(msg);
                            MessageToast.show(msg);
                        } else {
                            
                            jQuery.sap.log.info(data);
                        }
                    },
                    error: function (e) {
                        var sUrl = document.URL;
                        oModel.loadData("localService/json/" + sValue + ".json", {}, false);
                        jQuery.sap.log.error(sKey + " " + sValue + " loading local json!");

                        
                    }
                });

                return oModel;
        },

        commandRequest: function (sKey, sValue) {
            var sData = "{\"" + sKey + "\":\"" + sValue + "\"}";
            var sUrl = "ht" + "tp://" + window.location.host + "/virb";
            var request = jQuery.ajax({
                url: sUrl + "?Random=" + Math.random().toString(),
                type: "POST",
                data: sData,
                contentType: "application/json",
            });

            return request;
        },

        updateFeatureRequest: function (sFeature, sValue) {
            var sData = "{\"command\":\"updateFeature\",\"feature\": \"" + sFeature + "\" ,\"value\": \"" + sValue + "\" }";
            var sUrl = "ht" + "tp://" + window.location.host + "/virb";
            var request = jQuery.ajax({
                url: sUrl + "?Random=" + Math.random().toString(),
                type: "POST",
                data: sData,
                contentType: "application/json",
            });

            return request;

        },

        deleteFileGroupRequest: function (sUrl) {
            var sData = "{\"command\":\"deleteFileGroup\",\"files\": [\"" + sUrl + "\"]}";
            var sUrl = "ht" + "tp://" + window.location.host + "/virb";
            var request = jQuery.ajax({
                url: sUrl + "?Random=" + Math.random().toString(),
                type: "POST",
                data: sData,
                contentType: "application/json",
            });

            return request;

        },

        favRequest: function (sUrl, bFavorie) {
            //{"command":"setFavorite","file":"http://192.168.0.1/DCIM/117_VIRB/VIRB0203.MP4", "favorite":"true"}
            var sData = "{\"command\":\"setFavorite\",\"file\": \"" + sUrl + "\",\"favorite\":\"" + bFavorie + "\"}";
            var sUrl = "ht" + "tp://" + window.location.host + "/virb";
            var request = jQuery.ajax({
                url: sUrl + "?Random=" + Math.random().toString(),
                type: "POST",
                data: sData,
                contentType: "application/json",
            });

            return request;

        },
        
        
    };
});