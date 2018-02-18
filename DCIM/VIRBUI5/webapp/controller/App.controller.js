sap.ui.define([
    "garmin/virb/camerahost/controller/BaseController",
    "garmin/virb/camerahost/localService/ICameraHost"
], function (BaseController, ICameraHost) {
	"use strict";

    return BaseController.extend("garmin.virb.camerahost.controller.App", {

        ICameraHost: ICameraHost,

        onInit: function () {
            var oModel = new sap.ui.model.json.JSONModel();
            var oData = { "action": "current" };
            oModel.setData(oData);
            this.getOwnerComponent().setModel(oModel, "medialistupdate");

            this._readStatus();
            this.modelServices();
        },

        _readStatus: function() {
            this.getOwnerComponent().setModel(ICameraHost.status(),"status");
        },

        modelServices: function() {
              var self = this;
              //this.intervalHandle = setInterval(function() { 
              //    self._readStatus();
              //}, 60000);
              this.intervalHandle = setInterval(function () {
                  self.checkFocus(self);
              }, 20000);

        },

        checkFocus: function (self) {
            
                if (document.hasFocus ()) {
                    self._readStatus();
                }
            }



        //setCameraStatus: function () {
        //    sap.ui.getCore().setModel(ICameraHost.status(), "status");
        //}

	});
});