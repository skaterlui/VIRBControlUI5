sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "garmin/virb/camerahost/localService/ICameraHost",
    "sap/m/MessageToast"
], function (Controller, History, ICameraHost, MessageToast) {
    "use strict";

    return Controller.extend("garmin.virb.camerahost.controller.BaseController", {

        ICameraHost: ICameraHost,

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        onNavBack: function (oEvent) {
            var oHistory, sPreviousHash;

            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo("appHome", {}, true /*no history*/);
            }
        },

        onSnapShot: function (oEvent) {
            // var oFeaturesModel = ICameraHost.snapPicture();
            var oRequest = ICameraHost.snapPictureRequest();
            var self = this;
            oRequest.success(function (data) {
                data.media.date = (new Date().getTime() / 1000);
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData(data.media);

                var iResult = oModel.getProperty("/result");
                if (iResult === 0 && window.location.host.indexOf("localhost") == -1) {
                    jQuery.sap.log.error(sUrl + " " + true + " not successful");
                    MessageToast.show(sUrl + " " + true + " not successful");
                } else {
                    self.getOwnerComponent().setModel(oModel, "media");
                   // self.getOwnerComponent().getModel("medialistupdate").setProperty("/action", "update");
                    var oModel = self.getOwnerComponent().getModel("mediaList");

                    if (oModel !== undefined) {
                        var oData = oModel.getData();

                        oData.media.splice(0, 0, data.media);
                        oModel.setData(oData);
                        self.getOwnerComponent().setModel(oModel, "mediaList");
                    }
                }
            });

            oRequest.fail(function (data) {
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.loadData("localService/json/snapPicture.json", {}, false);
                jQuery.sap.log.error("snapPicture loading local json!");

                var oModelMediaList = self.getOwnerComponent().getModel("mediaList");

                if (oModelMediaList !== undefined) {
                    var oData = oModelMediaList.getData();

                    oData.media.splice(0, 0, oModel.getProperty("/media"));
                    oModelMediaList.setData(oData);
                    self.getOwnerComponent().setModel(oModelMediaList, "mediaList");
                }
            });

            oRequest.always(function (data) {
            });
        },

        onRecord: function (oEvent) {
            var oController = this;
            var sState = this.getOwnerComponent().getModel("status").getProperty("/state");
            if (sState === "recording") {
                var oModel = ICameraHost.stopRecording();
                oController.getOwnerComponent().getModel("medialistupdate").setProperty("/action", "update");
            } else {
                var oModel = ICameraHost.startRecording();
            }

            var request = ICameraHost.statusRequest();

            request.done(function (data) {
                
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData(data);

                var iResult = oModel.getProperty("/result");
                if (iResult === 0 && window.location.host.indexOf("localhost") == -1) {
                    jQuery.sap.log.error(sUrl + " " + true + " not successful");
                } else {
                    oController.onStatus(oEvent);
                }
          
            });
            request.fail(function () {

            });
            request.always(function () {

            });
        },

        onStatus: function (oEvent) {
            this.getOwnerComponent().setModel(ICameraHost.status(), "status");
        },

        onNavigateToFeatures: function (oEvent) {
            this.getRouter().navTo("appFeatures", {}, true /*no history*/);
        },

        onNavigateToCommand: function (oEvent) {
            this.getRouter().navTo("appCommandList", {}, true /*no history*/);
        },

        onNavigateToStatus: function (oEvent) {
            this.getRouter().navTo("appStatus", {}, true /*no history*/);
        },

        onNavigateToMedia: function (oEvent) {
            var sAction = this.getOwnerComponent().getModel("medialistupdate").getProperty("/action");

            if (sAction !== "current") {
                this.getOwnerComponent().getModel("medialistupdate").setProperty("/action","current");
            }

            this.getRouter().navTo("appMediaList", { action: sAction }, true /*no history*/);
        },
    });

});
