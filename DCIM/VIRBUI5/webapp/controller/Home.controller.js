sap.ui.define([
    "garmin/virb/camerahost/controller/BaseController",
    "garmin/virb/camerahost/localService/ICameraHost",
    "garmin/virb/camerahost/model/formatter"
], function (BaseController, ICameraHost, formatter) {
    "use strict";

    return BaseController.extend("garmin.virb.camerahost.controller.Home", {

        ICameraHost: ICameraHost,

        formatter: formatter,

        onInit: function () {
            this.getView().setModel(ICameraHost.deviceInfo(),"deviceinfo");
        },

    });

});