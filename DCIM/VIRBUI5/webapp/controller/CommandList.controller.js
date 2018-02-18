sap.ui.define([
    "garmin/virb/camerahost/controller/BaseController",
    "garmin/virb/camerahost/localService/ICameraHost",
    "garmin/virb/camerahost/model/formatter"
], function (BaseController, ICameraHost, formatter) {
    "use strict";

    return BaseController.extend("garmin.virb.camerahost.controller.CommandList", {
        ICameraHost: ICameraHost,

        formatter:formatter,

        onInit: function () {
            var oCommandListModel = ICameraHost.commandList();
            this.getView().setModel(oCommandListModel, "commandList");
        },

        handlePress: function (oEvent) {
            var sValue = oEvent.getSource().getText();
            var sCommand = oEvent.getSource().getBinding("text").sPath;
            var oModel = ICameraHost.commandToModel(sCommand, sValue);
            this.getView().setModel(oModel);
        }
      
    });

});