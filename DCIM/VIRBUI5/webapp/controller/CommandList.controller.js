sap.ui.define([
    "garmin/virb/camerahost/controller/BaseController",
    "garmin/virb/camerahost/localService/ICameraHost",
    "garmin/virb/camerahost/model/formatter",
   "sap/ui/model/resource/ResourceModel"
], function (BaseController, ICameraHost, formatter, ResourceModel) {
    "use strict";

    return BaseController.extend("garmin.virb.camerahost.controller.CommandList", {
        ICameraHost: ICameraHost,

        formatter:formatter,

        onInit: function () {


            // set i18n model on view
            var i18nModel = new ResourceModel({
                bundleName: "garmin.virb.camerahost.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");

            // read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();

            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setData({ "oBundle": oBundle });
            this.getView().setModel(oModel, "vm");

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