sap.ui.define([
    "garmin/virb/camerahost/controller/BaseController",
    "garmin/virb/camerahost/localService/ICameraHost",
    "garmin/virb/camerahost/model/formatter",
    "sap/m/MessageToast",
    "sap/ui/model/resource/ResourceModel"
], function (BaseController, ICameraHost, formatter, MessageToast, ResourceModel) {
    "use strict";

    return BaseController.extend("garmin.virb.camerahost.controller.MediaList", {
        ICameraHost: ICameraHost,

        formatter: formatter,

        onInit: function () {
            // set i18n model on view
            var i18nModel = new ResourceModel({
                bundleName: "garmin.virb.camerahost.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");

            // read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();

            var oViewModel = new sap.ui.model.json.JSONModel();
            var oData = {
                "IsFav": false,
                "MediaTypeFilter": "all",
                "media": "",
                "bDescending": true,
                "Property": "date",
                "oBundle": oBundle
            };
            oViewModel.setData(oData);
            this.getView().setModel(oViewModel, "vm");


            var oRouter = this.getRouter();
            oRouter.getRoute("appMediaList").attachMatched(this._onRouteMatched, this);

            this.getMediaList();
        },

        _onRouteMatched : function (oEvent) {
            var oArgs, oView;

            oArgs = oEvent.getParameter("arguments");
            oView = this.getView();
            switch (oArgs.action) {
                case "update":
                    this.getMediaList();
                    break;
                case "delete":
                    var oJson = this.getOwnerComponent().getModel("mediaList").getData();
                    var oModel = this.getOwnerComponent().getModel("media");
                    var sUrl = oModel.getProperty("/url");
                    var index = 0;
                    
                    jQuery.each(oJson.media, function (i, v) {
                        if (v.url == sUrl) {
                            index = i;
                            return;
                        }
                    });
                    var sKey = "media/" + index.toString();
                    oJson.media.splice(index, 1);
                    this.getOwnerComponent().getModel("mediaList").setData(oJson);
                    this._applyFilter();
                    break;
                case "media":
                    var oJson = this.getOwnerComponent().getModel("mediaList").getData();
                    var oModel = this.getOwnerComponent().getModel("media");
                    var sUrl = oModel.getProperty("/url");
                    var index = 0;

                    jQuery.each(oJson.media, function (i, v) {
                        if (v.url == sUrl) {
                            index = i;
                            return;
                        }
                    });
                    var sKey = "media/" + index.toString();
                    this.getOwnerComponent().getModel("mediaList").setProperty(sKey + "/fav", oModel.getProperty("/fav"));
                    this._applyFilter();
                    break;
                default:
                    var oModel = this.getOwnerComponent().getModel("mediaList");
                    if (oModel === undefined) {
                        this.getMediaList(); 
                    } else {
                        this._applyFilter();
                    }

                    break;
            }
        },



        getMediaList: function () {
            var oList = this.getView().byId("idMediaList");
            oList.setBusy(true);

            var oController = this;
            var oMediaListRequest = ICameraHost.mediaListRequest();

            oMediaListRequest.success(function (data) {
                var oMediaListModel = new sap.ui.model.json.JSONModel();
                oMediaListModel.setData(data);
                oController.getOwnerComponent().setModel(oMediaListModel, "mediaList");

                oController._applyFilter();
            });

            oMediaListRequest.fail(function (data) {
                var oMediaListModel = ICameraHost.mediaList();

                oMediaListModel.attachRequestCompleted(function () {
                    oController.getOwnerComponent().setModel(oMediaListModel, "mediaList");
                    oController._applyFilter();
                });

               // oController.getView().setModel(oMediaListModel, "mediaList");
                
           //     oController._applyFilter();
            });

            oMediaListRequest.always(function (data) {
                oList.setBusy(false);
          
            });
        },
        
        onEditMedia: function (oEvent) {

            var oModel = new sap.ui.model.json.JSONModel();
            var oSrc = oEvent.getSource();
            var oBinding = oSrc.getBindingContext("vm");
            if (oBinding !== undefined) {
                oModel.setData(this.getView().getModel("vm").getProperty(oBinding.sPath));
                this.getOwnerComponent().setModel(oModel, "media");

                this.getRouter().navTo("appMedia", {}, true /*no history*/);
            }
        },

        onFilter: function (oEvent) {
            var sMediaFilter = this.getView().getModel("vm").getProperty("/MediaTypeFilter");
            switch (sMediaFilter) {
                case "video":
                    sMediaFilter = "photo";
                    break;
                case "photo":
                    sMediaFilter = "all";
                    break;
                default:
                    sMediaFilter = "video";
            }
            MessageToast.show(this.getText("mediaList.filter" + sMediaFilter));

            this.getView().getModel("vm").setProperty("/MediaTypeFilter", sMediaFilter);

            this._applyFilter();
        },

        onFilterFavorite: function (oEvent) {
            if (this.getView().getModel("vm").getProperty("/IsFav") === true) {
                this.getView().getModel("vm").setProperty("/IsFav", false);
            } else {
                this.getView().getModel("vm").setProperty("/IsFav", true);
            }
            this._applyFilter();
        },

        _applyFilter: function () {
            var sMediaFilter = this.getView().getModel("vm").getProperty("/MediaTypeFilter");
            var bIsFav = this.getView().getModel("vm").getProperty("/IsFav");
            var iFavCount = 0;
            var oJson = this.getOwnerComponent().getModel("mediaList").getData();
            //var oModel = this.getOwnerComponent().getModel("media");
            var index = 0;

            var oMediaList = [];

            var resultFavorie = jQuery.grep(oJson.media, function (oMedia, i) {
                if (oMedia.type === sMediaFilter || sMediaFilter === "all") {
                    switch (true) {
                        case oMedia.fav === "true":
                            iFavCount = iFavCount + 1;
                        case bIsFav === false:
                            oMediaList.push(oMedia);
                            break;
                        case bIsFav === true && oMedia.fav === "true":
                            oMediaList.push(oMedia);
                            break;
                    }
                }
            });
            this.getView().getModel("vm").setProperty("/media", oMediaList);
            this.getView().getModel("vm").setProperty("/mediaCount", oMediaList.length);
            this.getView().getModel("vm").setProperty("/favCount", iFavCount);
            this._sortList();

        },

        _sortList: function(){
            var oView = this.getView();
            var oList = oView.byId("idMediaList");
            var oBinding = oList.getBinding("items");

            var SORTKEY = this.getView().getModel("vm").getProperty("/Property");
            var DESCENDING = this.getView().getModel("vm").getProperty("/bDescending");
            var GROUP = false;
            var aSorter = [];

            aSorter.push(new sap.ui.model.Sorter(SORTKEY, DESCENDING, GROUP));
            oBinding.sort(aSorter);
        },

        onSortDirection: function (oEvent) {
            var bDescending = this.getView().getModel("vm").getProperty("/bDescending");
            if (bDescending === true) {
                this.getView().getModel("vm").setProperty("/bDescending", false);
                MessageToast.show(this.getText("mediaList.ascending"));
            } else {
                this.getView().getModel("vm").setProperty("/bDescending", true);
                MessageToast.show(this.getText("mediaList.descending"));
            }
            this._applyFilter();
        },

        onSortProperty: function (oEvent) {
            var sProperty = this.getView().getModel("vm").getProperty("/Property");
            switch (sProperty) {
                case "date":
                    this.getView().getModel("vm").setProperty("/Property", "duration");
                    MessageToast.show(this.getText("mediaList.sortduration"));

                    break;
                case "duration":
                    this.getView().getModel("vm").setProperty("/Property", "name");
                    MessageToast.show(this.getText("mediaList.sortname"));
                    break;
                case "name":
                    this.getView().getModel("vm").setProperty("/Property", "date");
                    MessageToast.show(this.getText("mediaList.sortdate"));
                    break;
            }
            this._applyFilter();
        }

    });

});