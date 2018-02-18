sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
    "garmin/virb/camerahost/model/models",
    "garmin/virb/camerahost/localService/ICameraHost"
], function (UIComponent, Device, models, ICameraHost) {
	"use strict";

	return UIComponent.extend("garmin.virb.camerahost.Component", {

		metadata: {
			manifest: "json"
        },

        ICameraHost: ICameraHost,

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
            this.setModel(models.createDeviceModel(), "device");

            //this.setModel(ICameraHost.status(), "status");

            // create the views based on the url/hash
            this.getRouter().initialize();

		    /**
             * Number.prototype.format(n, x, s, c)
             * 
             * @param integer n: length of decimal
             * @param integer x: length of whole part
             * @param mixed   s: sections delimiter
             * @param mixed   c: decimal delimiter
             */
            Number.prototype.format = function (n, x, s, c) {
                var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
                    num = this.toFixed(Math.max(0, ~~n));

                return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
            };
		}
	});
});