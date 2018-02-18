sap.ui.define([
	"garmin/virb/camerahost/controller/BaseController",
    "garmin/virb/camerahost/model/formatter",
    "garmin/virb/camerahost/localService/ICameraHost"
], function (BaseController, formatter, ICameraHost) {
	"use strict";

    return BaseController.extend("garmin.virb.camerahost.controller.Features", {

        formatter: formatter,
        ICameraHost: ICameraHost,

        onInit: function () {
            var oRouter = this.getRouter();

            oRouter.getRoute("appFeatures").attachMatched(this._onRouteMatched, this);
        },

        onExit: function () {
            if (this._oDialog) {
                this._oDialog.destroy();
            }
        },

        _onRouteMatched: function () {
            this._onFeaturesRequest();
        },

        _onFeaturesRequest: function(){
            var oList = this.getView().byId("idFeaturesList");
            if (oList !== undefined) {
                oList.setBusy(true);
            }


            var oController = this;
            var oRequest = ICameraHost.featuresRequest();

            oRequest.success(function (data) {
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData(data);
                oController.getView().setModel(oModel, "features");
                if (oList !== undefined) {
                    oList.setBusy(true);
                }
            });

            oRequest.fail(function (data) {
                var oModel = ICameraHost.features();
                oController.getView().setModel(oModel, "features");
                if (oList !== undefined) {
                    oList.setBusy(true);
                }
            });

            oRequest.always(function (data) {
                if (oList !== undefined) {
                    oList.setBusy(true);
                }
            });
        },

        onListItemPress: function (oEvent) {
            var oSource = oEvent.getSource();
            var oBinding = oEvent.getSource().getBindingContext("features");
            if (oBinding === undefined) {
                return;
            }
            var oFeatureModel = new sap.ui.model.json.JSONModel();
            var oFeature = this.getView().getModel("features").getProperty(oBinding.sPath);
            oFeatureModel.setData(oFeature);
            this.getView().setModel(oFeatureModel, "feature");
            var iType = oFeatureModel.getProperty("/type");
            switch (iType) {
                case 0:
                    return;
                    break;
                case 1:

                    break;
                case 2:
                    oFeatureModel.setProperty("/options", ["0", "1"])
                    break;
            }

            this.onOpenDialog(oEvent);
        },

        onOptionSelect: function(oEvent){
            var oRadioButton = oEvent.getSource();

            if (oRadioButton.getSelected() === true) {
                var sOption = oRadioButton.getText();
                var oModel = this.getView().getModel("feature");
                oModel.setProperty("/newvalue", sOption);
                var oModel = this.getView().getModel("feature");
                oModel.setProperty("/newvalue", sOption);
                if (sOption !== oModel.getProperty("/value")) {
                    oModel.setProperty("/isUpdated", true);
                } else {
                    oModel.setProperty("/isUpdated", false);
                }
            }
        },

        _getDialog: function () {
            if (!this._oDialog) {
                this._oDialog = sap.ui.xmlfragment("idUpdateFeatureDialog", "garmin.virb.camerahost.view.UpdateFeatureDialog", this);
                this.getView().addDependent(this._oDialog);
            }
            return this._oDialog;
        },

        onOpenDialog: function (oEventArgs) {
            var odlg = this._getDialog();
            var oModel = this.getView().getModel("feature");
            oModel.setProperty("/isUpdated", false);
            odlg.setModel(oModel)
            odlg.open();
        },

        onConfirmDialog: function (oEventArgs) {
            this._oDialog.setBusy(true);
            var oController = this;
            var oModel = this.getView().getModel("feature");
            var sFeature = oModel.getProperty("/feature");
            var sValue = oModel.getProperty("/newvalue");
            var request = ICameraHost.updateFeatureRequest(sFeature, sValue);

            request.success(function (data) {
                oController._getDialog().close();
                var oModel = oController.getView().getModel("features");
                oModel.setData(data);
            });
            request.fail(function (e) {
                oController._getDialog().close();
            });
            request.always(function (e) {
                oController._getDialog().close();
                oController._oDialog.setBusy(false);
            });
        },

        onCancelDialog: function (oEventArgs) {
            this._getDialog().close();
        },

        onCommandLocatePress: function(oEvent) {
            var oModel = ICameraHost.commandToModel("command", "locate");
        },
        onCommandFoundPress: function(oEvent) {
            var oModel = ICameraHost.commandToModel("command", "found");
        },
        onCommandStopStillRecordingPress: function(oEvent) {
            var oModel = ICameraHost.commandToModel("command", "StopStillRecording");
        },
        onCommandStandByPress: function (oEvent) {
            var oModel = ICameraHost.commandToModel("command", "standby");
        },
        onCommandLogErrorPress: function (oEvent) {
            var request = ICameraHost.updateFeatureRequest("command","getErrorLogURL");

            request.success(function (data) {
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData(data);
                sap.m.URLHelper.redirect(data.url, true);
            });
            request.fail(function (e) {
                
            });
            request.always(function (e) {
               
            });
        },
	});
});