sap.ui.define([
    "garmin/virb/camerahost/controller/BaseController",
    "garmin/virb/camerahost/localService/ICameraHost",
    "garmin/virb/camerahost/model/formatter",
    "sap/ui/model/resource/ResourceModel",
    "sap/m/MessageToast"
], function (BaseController, ICameraHost, formatter, ResourceModel, MessageToast) {
    "use strict";

    return BaseController.extend("garmin.virb.camerahost.controller.Media", {

        formatter: formatter,

        //ICameraHost: ICameraHost,

        onInit: function () {
            // set i18n model on view
            var i18nModel = new ResourceModel({
                bundleName: "garmin.virb.camerahost.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");

            // read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();


            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setData({
                "imageVisible": true,
                "oBundle": oBundle
               });
            this.getView().setModel(oModel, "vm");
            var oRouter = this.getRouter();

            

            oRouter.getRoute("appMedia").attachMatched(this._onRouteMatched, this);


        },

        /**
 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
 * (NOT before the first rendering! onInit() is used for that one!).
 * @memberOf Garmin.Virb.Camerahost.view.UpdateFeatureDialog
 */
        //	onBeforeRendering: function() {
        //
        //	},

        /**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf garmin.virb.vamerahost.view.Media
		 */
        onAfterRendering: function () {
            this._setVideoSource();
        	},

        /**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Garmin.Virb.Camerahost.view.UpdateFeatureDialog
		 */
        //	onExit: function() {
        //
        //	}

        _setVideoSource: function(){
            var oModel = this.getOwnerComponent().getModel("media");
            var oJVideo = jQuery("#idVideo");
            if (oJVideo.length >= 1) {
                oJVideo.attr("src", oModel.getProperty("/lowResVideoPath"));
            }
        },

        _onRouteMatched: function () {
            var oModel = this.getOwnerComponent().getModel("media");
            if (oModel === undefined) {
                return;
            }
            this.getView().setModel(oModel, "media");
            if (oModel.getProperty("/type") === "video") {
                this.getView().getModel("vm").setProperty("/imageVisible", false);
                this._setVideoSource();
            } else {
                this.getView().getModel("vm").setProperty("/imageVisible", true);
            }
        },

        onOpenFileinNewTab: function (oEvent) {
            var oMedia = this.getView().getModel("media").getData();
            switch (oMedia.type) {
                case "photo":
                    sap.m.URLHelper.redirect(oMedia.url, true);
                    break;
                case "video":
                    sap.m.URLHelper.redirect(oMedia.lowResVideoPath, true);
                    break;
                default:
            }
        },

        onFavoriteMedia: function (oEvent) {

            var sUrl = this.getView().getModel("media").getProperty("/url");
            var oControl = this.getView().byId("idMediaPanel");
            // oControl.setBusy(true);
            var oController = this;
            var sFav = oController.getView().getModel("media").getProperty("/fav");
            var sFavValue;

            if (sFav === "false") {
                sFavValue = "true";
            } else {
                sFavValue = "false";
            }


            var oRequest = ICameraHost.favRequest(sUrl, sFavValue);

            oRequest.success(function (data) {
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData(data);

                var iResult = oModel.getProperty("/result");
                if (iResult === 0 && window.location.host.indexOf("localhost") == -1) {
                    jQuery.sap.log.error(sUrl + " " + true + " not successful");
                } else {
                    //oController.getView().setModel(oModel, "media");
                    //  oControl.setBusy(false);
                    oController.getView().getModel("media").setProperty("/fav", sFavValue);
                }
            });

            oRequest.fail(function (data) {
                var oRequestModel = oController.getView().getModel("media");
                oRequestModel.setProperty("/fav", sFavValue);
            });

            oRequest.always(function (data) {
                // oControl.setBusy(false);

            });

        },

        onDeleteFileGroup: function (oEvent) {
            var sUrl = this.getView().getModel("media").getProperty("/url");
            var oControl = this.getView().byId("idMediaPanel");
           // oControl.setBusy(true);
            var oController = this;
            var oRequest = ICameraHost.deleteFileGroupRequest(sUrl);

            oRequest.success(function (data) {
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData(data);

                var iResult = oModel.getProperty("/result");
                if (iResult === 0 && window.location.host.indexOf("localhost") == -1) {
                    jQuery.sap.log.error("deleting not successful " + sUrl);
                } else {
                    oController.getView().setModel(oModel, "media");
                    MessageToast.show(this.getText("media.delete"));
                  //  oControl.setBusy(false);
                    
                }
                oController.onNavBack(iResult);


            });

            oRequest.fail(function (data) {
                jQuery.sap.log.error("onDeleteFileGroup not successful for " + sUrl);
                var oModel = new sap.ui.model.json.JSONModel();
                oController.getView().setModel(oModel, "media");
                oController.onNavBack(1);
            });

            oRequest.always(function (data) {
               // oControl.setBusy(false);
                
            });
        },

        onNavBack: function (oEvent) {
            switch (oEvent) {
                case 1:
                    this.getRouter().navTo("appMediaList", {action:"delete"}, true /*no history*/);
                    break;
                case 0:
                    this.getRouter().navTo("appMediaList", { action: "current" }, true /*no history*/);
                    break;
                default:
                    this.getRouter().navTo("appMediaList", { action: "media" }, true /*no history*/);
            };
        }
    });

});