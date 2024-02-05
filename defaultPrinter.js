var oShell = new ActiveXObject("WScript.Shell");
sRegVal = 'HKEY_CURRENT_USER\\Software\\Microsoft\\Windows NT\\CurrentVersion\\Windows\\Device';

var sName = oShell.RegRead(sRegVal).split(",");
WScript.Echo(sName[0]);
