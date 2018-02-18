sap.ui.define(["sap/ui/core/format/DateFormat"
], function (DateFormat) {
	"use strict";
	return {
	    DateFormat:DateFormat,

        availableSpacePercentString: function (nAvailableBytes, nTotalbBytes) {
            return (nAvailableBytes / nTotalbBytes * 100).format(0);
        },

        availableSpacePercent: function (nAvailableBytes, nTotalbBytes) {
            return (nAvailableBytes / nTotalbBytes * 100);
        },

        bytesToMB: function (nBytesCount) {
            return (nBytesCount / 1024 / 1024).format(2, 3, '.', ',');
        },

        unixToDate: function (sTimestamp) {
            var oDateTimeFormat = DateFormat.getDateTimeInstance();
            return oDateTimeFormat.format(new Date(sTimestamp * 1000));
        },

        sMediaTypeToIcon: function (sMediaType) {
            switch (sMediaType) {
                case "photo":
                    return "sap-icon://picture";
                    break;
                case "video":
                    return "sap-icon://attachment-video";
                    break;
               
                default:
                    return "";
            }
        },

        sStateToIcon: function (sMediaType) {
            switch (sMediaType) {
                case "idle":
                    return "sap-icon://record";
                    break;
                case "recording":
                    return "sap-icon://stop";
                    break;

                default:
                    return "";
            }
        },

        sStateToColor: function (sMediaType) {
            switch (sMediaType) {
                case "idle":
                    return "red";
                    break;
                case "recording":
                    return "green";
                    break;

                default:
                    return "yellow";
            }
        },



        sMediaThumbUrl: function (oMedia) {
            if (oMedia === undefined || oMedia === null) {
                return;
            };
            switch (oMedia.type) {
                case "photo":
                    return oMedia.thumbUrl;
                    break;
                case "video":
                    if (oMedia.name.indexOf("-") > -1 && oMedia.fitURL !== "") {
                        var sUrl = oMedia.thumbUrl;
                        sUrl = sUrl.replace(".THM","")
                        var iIndexMinus = sUrl.lastIndexOf("-");
                        sUrl = sUrl.slice(0, iIndexMinus) + ".THM";

                        return sUrl
                    }
                    return oMedia.thumbUrl;
                    break;
                default:
                    return "yellow";
            }
        },

        sMediaPreviewLink: function (oMedia) {
            if (oMedia === undefined || oMedia === null) {
                return;
            };

            switch (oMedia.type) {
                case "photo":
                    return oMedia.url;
                    break;
                case "video":
                    return oMedia.lowResVideoPath;
                    break;
            }


    //        "media": [
    //{
    //    "type": "photo",
    //    "url": "http://192.168.0.188/DCIM/104_VIRB/VIRB0952.JPG",
    //    "thumbUrl": "http://192.168.0.188/thumb/DCIM/104_VIRB/VIRB0952.BMP",
    //    "fav": "false",
    //    "name": "VIRB0952.JPG",
    //    "fileSize": 3189939,
    //    "date": 1516662557,
    //    "lensMode": "unknownLensMode"
    //},{
    //    "type": "video",
    //    "url": "http://192.168.0.188/DCIM/104_VIRB/VIRB0954.MP4",
    //    "thumbUrl": "http://192.168.0.188/DCIM/104_VIRB/VIRB0954.THM",
    //    "fav": "false",
    //    "lowResVideoPath": "http://192.168.0.188/DCIM/104_VIRB/VIRB0954.GLV",
    //    "fitURL": "http://192.168.0.188/GMetrix/2018-01-23-01-02-23.fit",
    //    "name": "VIRB0954.MP4",
    //    "fileSize": 71621010,
    //    "date": 1516665784,
    //    "duration": 9,
    //    "lensMode": "unknownLensMode"
    //}
        },

        iFeatureTypeToIcon: function (iFeatureType) {
            switch (iFeatureType) {
                case 0:
                    return "sap-icon://screen-split-one";
                    break;
                case 1:
                    return "sap-icon://screen-split-three";
                    break;

                default:
                    return "sap-icon://screen-split-two";
            }
        },

        oFeatureToDescription: function (oFeature) {

            if (oFeature === undefined || oFeature === null) {
                return;
            };
            switch (oFeature.type) {
                case 1:
                    return oFeature.value;
                    break;

                default:
                    if (oFeature.value === "1") {
                        return "on";
                    }
                    return "off";
            }
        },

        sNumberToBoolean: function (sNumber) {
            if (sNumber === "1") {
                return true;
            };
            return false;
        },

        bIsOptionSelected: function (sSelectedOption, sOption) {
            if (sSelectedOption === sOption) {
                return true;
            }
            return false;
        },

        sFavToIcon: function (sFav) {
            if (sFav === "true") {
                return "sap-icon://favorite";
            }
            return "sap-icon://unfavorite";
        },

        bFavToIcon: function (bFav) {
            switch (bFav) {
                case null:
                    break;
                case true:
                    return "sap-icon://favorite";
                    break;
                default:
                    return "sap-icon://unfavorite";
            }
        },

        sMediaTypeFilterToIcon: function (sMediaTypeFilter) {
            switch (sMediaTypeFilter) {
                case null:
                    return;
                    break;
                case "photo":
                    return "sap-icon://camera";
                    break;
                case "video":
                    return "sap-icon://video";
                    break;
                default:
                    return "sap-icon://picture";
            }
        },

        bDescendingToIcon: function (bDescending) {
            if (bDescending === true) {
                return "sap-icon://sort-descending";
            }
            return "sap-icon://sort-ascending";
        },

        iconFromProperty: function (sProperty) {
            switch (sProperty) {
                case undefined:
                    break;
                case null:
                    break;
                case "date":
                    return "sap-icon://date-time";
                    break;
                case "duration":
                    return "sap-icon://lateness";
                    break;
                case "name":
                    return "sap-icon://display";
                    break;
                default:
            }
        }

	};
});