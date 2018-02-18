sap.ui.define([], function () {
	"use strict";
	return {
        isValidEmail: function (email) {
            return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        },

        isValidIPaddress:function (ipaddress) {  
            return /^(?!0)(?!.*\.$)((1 ?\d ?\d | 25[0 - 5] | 2[0 - 4]\d)(\.|$)){4 } $ /.test(ipaddress);
        },  

        isNumeric: function (sNumber) {
            return /^-?\d+\.?\d*$/.test(sNumber);
        }
        
	};
});