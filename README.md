# VIRBControlUI5
OPENUI5 web application for Garmin VIRB action cameras. With this app you can control your Garmin VIRB cam over a wireless network.

![VIRBControlUI5](http://www.blogtofakie.de/BTF4.0/wp-content/uploads/2018/02/VIRBControlUI5.jpg)

## Get your VIRB ready!

### App Istallation
* Connect Garmin VIRB cam with USB port
* Download and unzip [VIRBControlUI5](https://github.com/skaterlui/VIRBControlUI5) to Garmin VIRB
#### (Optional) Standalone installation
*If there is no internet available install openui5 sources along with the app*
1. Create the folder DCIM/VIRBUI5/resources
2. Download and unzip [open ui5 mobile](http://openui5.org/download.html) to DCIM/VIRBUI5/resources folder
3. Edit DCIM/VIRBUI5/webapp/index.html and set the source to src="../resources/sap-ui-core.js"

**Then choose how you want to connect to your camera.**

#### Camera connected to a local network
([openui5 source](https://openui5.hana.ondemand.com/resources/sap-ui-core.js) will be loaded via cdn)
* Navigate to http://yourcamera/DCIM/index.html and run **VIRBControlUI5**
This one worked for me http://garmin-wifi.fritz.box/DCIM/index.html

#### Connect directly to your VIRB (with Optional)
* Navigate to http://192.168.0.1/DCIM/index.html

# Links
* [Camera Network Services API](https://developer.garmin.com/virb/overview/)
* [openui5](https://openui5.hana.ondemand.com)
* [openui5.org](https://openui5.org)