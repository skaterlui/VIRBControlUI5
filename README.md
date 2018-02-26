# Remote Control Garmin VIRB UI5
This is a website for Garmin VIRB action cameras. Using the VIRB Network services API enables a full control over your Garmin VIRB action camera. All you need is a wireless connection to your cam. OPENUI5 is used to achieve this. Loading the app takes a little time, overall size including framework items is about 5 MB.

Try the **[TestApp!](http://www.blogtofakie.de/VIRBUI5/webapp/index.html)**

![VIRBControlUI5](http://www.blogtofakie.de/BTF4.0/wp-content/uploads/2018/02/VIRBControlUI5.jpg)

## Get your VIRB ready!

### App installation
1. Connect Garmin VIRB cam to USB port
2. Download and unzip [VIRBControlUI5](https://github.com/skaterlui/VIRBControlUI5) to Garmin VIRB root folder.

**Run the app while internet enabled...**

3. Connect Garmin VIRB to WiFi network
4. Browse to http://yourcamera/DCIM/index.html

You can try connecting your cam directly with ip address or over well known router. My Garmin VIRB Ultra 30 is called "garmin-wifi".
* http://garmin-wifi.fritz.box/DCIM/index.html 
* http://192.168.178.153/DCIM/index.html

<!--**or connect directly to your VIRBs wireless network**-->

3. Create folder DCIM/VIRBUI5/resources
4. Download and unzip [open ui5 mobile](http://openui5.org/download.html) to DCIM/VIRBUI5/resources folder
5. Edit DCIM/VIRBUI5/webapp/index.html and set the source to src="../resources/sap-ui-core.js"
6. Join Garmin VIRBs network
7. Browse to http://192.168.0.1/DCIM/index.html

# Links
* [Camera Network Services API](https://developer.garmin.com/virb/overview/)
* [openui5](https://openui5.hana.ondemand.com)
* [openui5.org](https://openui5.org)
