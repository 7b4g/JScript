// path where .log file will be create
var logPath = "YOUR PATH";

// connect to local wmi 
var wmi = GetObject("winmgmts:");

// values 
var	NowTime,
	UserLogin,
	FIO,
	Machine,
	TotalRam = 0,
	OS,
	OSbit,
	MemoryBank,
	Processor,
	NetCard,
	LocalDrives,
	Programs,
	Printer;

	//  date
	var d = new Date, mon, day;

	mon = "" + (d.getMonth()+1);
	day = "" + d.getDate();
	if(mon.length == 1) {		
		mon = "0" + mon;
	}
	if(day.length == 1) {
		day = "0" + day;
	}
	NowTime =  d.getHours()+":"+d.getMinutes()+":"+d.getSeconds() + " " + day + "." + mon + "."+d.getFullYear();


	// RAM
	var	query = wmi.ExecQuery("Select * from Win32_PhysicalMemory");		
	var accitem; 

	MemoryBank = "";
	for(var acc = new Enumerator(query); !acc.atEnd(); acc.moveNext()) {
		accitem = acc.item(); 
		TotalRam += accitem.Capacity / 1024 / 1024 / 1024;	
		MemoryBank += accitem.BankLabel + "[" + (accitem.Capacity / 1024/ 1024/ 1024) + "] ";
	}


	// OS, FIO, PC name, user login 
	query = wmi.ExecQuery("SELECT * FROM Win32_OperatingSystem");

	for(var acc = new Enumerator(query); !acc.atEnd(); acc.moveNext()) {
		accitem = acc.item();
	}
	OS = accitem.Caption;
	FIO = accitem.Description;
	Machine = accitem.CSName.split(" ", 2);
	UserLogin = accitem.Username;
	OSbit = accitem.OSArchitecture.split("-")[0];


	// processor
	query = wmi.ExecQuery("SELECT * FROM Win32_Processor"); 	

	for(var acc = new Enumerator(query); !acc.atEnd(); acc.moveNext()) {
		accitem = acc.item();
	}
	Processor = accitem.Name;


	// IP 
	query = wmi.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration WHERE IPEnabled = TRUE"); 	

	NetCard = "";
	for(var acc = new Enumerator(query); !acc.atEnd(); acc.moveNext()) {
		accitem = acc.item();
		NetCard += "[" + accitem.IPAddress(0) + "]";
	}


	// hard drive
	query = wmi.ExecQuery("SELECT * FROM Win32_LogicalDisk WHERE DriveType = 3 and Size != NULL"); 	

	LocalDrives = "";
	for(var acc = new Enumerator(query); !acc.atEnd(); acc.moveNext()) {
		accitem = acc.item();
		LocalDrives += accitem.Caption;
		var temp = "" + accitem.Size/1024/1024/1024;		
		LocalDrives += "[" + temp.substr(0,temp.indexOf(".")+3) + "]"
	}


	// check installed programs
	// change "Program1 name" to your value
	query = wmi.ExecQuery("SELECT * FROM Win32_Product");

	Programs = "";
	for(var acc = new Enumerator(query); !acc.atEnd(); acc.moveNext()) {
		accitem = acc.item();
		if (accitem.Name == "Program1 name") {
			Programs = "Program1";
			break;
		} else if (accitem.Name == "Program2 name") { 
			Programs = "Program2";
			break;
		} else {Programs = "Programs not found"};
	}

	
	// detect monitor model (in progress)
	query = wmi.ExecQuery("SELECT * FROM Win32_")

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





	// printer + port
	query = wmi.ExecQuery("SELECT * FROM Win32_Printer");

	Printer = ""
	for(var acc = new Enumerator(query); !acc.atEnd(); acc.moveNext()) {
		accitem = acc.item();
		Printer = "[ " + accitem.Name + " -- " + accitem.Portname + " ]";
	}


// info output
var	FSO = WScript.CreateObject("Scripting.FileSystemObject");
var openText = FSO.OpenTextFile(logPath + UserLogin + "_" + Machine + ".LOG", 8, true, -1);

	openText.WriteLine("Time: " 		+ NowTime 		+ "\n\n"+
    					"FIO: " 		+ FIO 			+ "\n" +
    					"PC name: "		+ Machine   	+ "\n" +
    					"RAM: " 		+ TotalRam 		+ "\n" +
    					"OS: " 			+ OS 			+ "\n" + 
						"bit: "			+ OSbit			+ "\n" +
    					"Processor: "	+ Processor 	+ "\n" + 
						"IP: "			+ NetCard		+ "\n" +
						"Disks: " 		+ LocalDrives	+ "\n" +
						"Progs: "		+ Programs		+ "\n" +
						"Printer: " 	+ Printer 
			   );

	openText.Close();
