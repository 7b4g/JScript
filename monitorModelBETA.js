//gwmi WmiMonitorID -Namespace root\wmi | ForEach-Object {($_.ManufacturerName -ne 0 | foreach {[char]$_}) -join ""; ($_.UserFriendlyName -ne 0 | foreach {[char]$_}) -join ""}


// Get-WmiObject WmiMonitorID -Namespace root\wmi |
//     ForEach-Object {
//         $Manufacturer   = [System.Text.Encoding]::ASCII.GetString($_.ManufacturerName).Trim(0x00)
//        $Name           = [System.Text.Encoding]::ASCII.GetString($_.UserFriendlyName).Trim(0x00)
//         $Serial         = [System.Text.Encoding]::ASCII.GetString($_.SerialNumberID).Trim(0x00)
//         "{0}, {1}, {2}" -f $Manufacturer,$Name,$Serial
//     }

//var arr = {
 //           "sam": 'Samsung', 
  //          "fru": 'FRuit'
   //     };

//if (arr["fru"]) {
//    WScript.Echo("Success");

var Mmodels = {
    "AAC" : "AcerView",
    "ACR" : "Acer",
    "AOC" : "AOC",
    "AIC" : "AG Neovo",
    "APP" : "Apple Computer",
    "AST" : "AST Research",
    "AUO" : "Asus",
    "BNQ" : "BenQ",
    "CMO" : "Acer",
    "CPL" : "Compal",
    "CPQ" : "Compaq",
    "CPT" : "Chunghwa Pciture Tubes, Ltd.",
    "CTX" : "CTX",
    "DEC" : "DEC",
    "DEL" : "Dell",
    "DPC" : "Delta",
    "DWE" : "Daewoo",
    "EIZ" : "EIZO",
    "ELS" : "ELSA",
    "ENC" : "EIZO",
    "EPI" : "Envision",
    "FCM" : "Funai",
    "FUJ" : "Fujitsu",
    "FUS" : "Fujitsu-Siemens",
    "GSM" : "LG Electronics",
    "GWY" : "Gateway 2000",
    "HEI" : "Hyundai",
    "HIT" : "Hyundai",
    "HSL" : "Hansol",
    "HTC" : "Hitachi/Nissei",
    "HWP" : "HP",
    "IBM" : "IBM",
    "ICL" : "Fujitsu ICL",
    "IVM" : "Iiyama",
    "KDS" : "Korea Data Systems",
    "LEN" : "Lenovo",
    "LGD" : "Asus",
    "LPL" : "Fujitsu",
    "MAX" : "Belinea",
    "MEI" : "Panasonic",
    "MEL" : "Mitsubishi Electronics",
    "MS_" : "Panasonic",
    "NAN" : "Nanao",
    "NEC" : "NEC",
    "NOK" : "Nokia Data",
    "NVD" : "Fujitsu",
    "OPT" : "Optoma",
    "PHL" : "Philips",
    "REL" : "Relisys",
    "SAN" : "Samsung",
    "SAM" : "Samsung",
    "SBI" : "Smarttech",
    "SGI" : "SGI",
    "SNY" : "Sony",
    "SRC" : "Shamrock",
    "SUN" : "Sun Microsystems",
    "SEC" : "Hewlett-Packard",
    "TAT" : "Tatung",
    "TOS" : "Toshiba",
    "TSB" : "Toshiba",
    "VSC" : "ViewSonic",
    "ZCM" : "Zenith",
    "UNK" : "Unknown",
    "_YV" : "Fujitsu"
};

var wmi = GetObject("winmgmts:");
var accitem;
var Monitor;
//var query = wmi.ExecQuery("SELECT * FROM win32_computersystem");
//for(var acc = new Enumerator(query); !acc.atEnd(); acc.moveNext()) {
//		accitem = acc.item();
//	}
//PCname = accitem.DNSHostName;


query = wmi.ExecQuery("SELECT * FROM WMIMonitorID");

//	for(var acc = new Enumerator(query); !acc.atEnd(); acc.moveNext()) {
	//	var item = acc.item();
  //      if (item.UserFriendlyName !== 0) {
   //         item.UserFriendlyName.toString().split('').join('');
    //    }
	//}

    //.forEach(function(item) {
    //if (item.UserFriendlyName !== 0) {
     //   item.UserFriendlyName.toString().split('').join('');
   // }
    //if (item.SerialNumberID !== 0) {
     //   item.SerialNumberID.toString().split('').join('');
   // }
//});


function Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
    c = array[i++];
    switch(c >> 4)
    { 
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
                       ((char2 & 0x3F) << 6) |
                       ((char3 & 0x3F) << 0));
        break;
    }
    }

    return out;
}


