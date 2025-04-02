
/************************************************************************
**	Function:	includeFile (fileName, objectName)
**
**	Purpose:	Reads in a file from the object specified and returns its
**				contents;
*************************************************************************/
function includeFile (fileName, objectName)
{
	var incFile = doActionEx	('DATA_READFILE',fileName, 'FileName', fileName,'ObjectName',
								objectName, 'FileType', 'txt');
	return incFile;
}


/************************************************************************
**	Function:	getLicenseVal (name)
**
**	Purpose:	Returns the value corresponding to 'name' in the license.cfg file
*************************************************************************/
function getLicenseVal (name)
{
	return (doAction ('DATA_GETLITERAL', 'ObjectName', 'License', 'LiteralID', name));
}

/************************************************************************
**	Function:	getProdInfo ()
**
**	Purpose:	
*************************************************************************/
function getProdInfo ()
{
	var prodTypes = new Array ('POWER_RETAIL_LEVEL', 'POWER_BRICKANDMORTAR_LEVEL',
							'POWER_SERVICE_LEVEL', 'POWER_WEBBUILDER_LEVEL');
	var prodInfo = new Array();
	prodInfo["CabinetObject"] = "";

	for (var n = 0; n < prodTypes.length; n++)
	{
		var temp = getLicenseVal (prodTypes[n]);
		prodInfo[prodTypes[n]] = new Array();
		prodInfo[prodTypes[n]]["Installed"] = false;
		prodInfo[prodTypes[n]]["Level"] = "none";
		if (temp && temp.toLowerCase() != "none")
		{
			prodInfo[prodTypes[n]]["Installed"] = true;
			prodInfo[prodTypes[n]]["Level"] = temp;
		}
	}
	
	if (prodInfo.POWER_RETAIL_LEVEL.Installed && prodInfo.POWER_SERVICE_LEVEL.Installed)
		prodInfo.CabinetObject = "Cabinet_pr_ps";
	else if (prodInfo.POWER_RETAIL_LEVEL.Installed)
		prodInfo.CabinetObject = "Cabinet_pr";
	else if (prodInfo.POWER_SERVICE_LEVEL.Installed)
		prodInfo.CabinetObject = "Cabinet_ps";
	else if (prodInfo.POWER_BRICKANDMORTAR_LEVEL.Installed)
		prodInfo.CabinetObject = "Cabinet_pbm";
	else if (prodInfo.POWER_WEBBUILDER_LEVEL.Installed)
		prodInfo.CabinetObject = "Cabinet_pwb";
	
	return prodInfo;
}

/************************************************************************
**	Function:	encodeNVP (nvpIn, delimiter)
**
**	Purpose:	Takes a name value pair string and converts it to a URL
**				encoded string for posting.  converts nerwlines to & and
**				delimiter to =
*************************************************************************/
function encodeNVP (nvpIn, delimiter)
{
	var nvpOut = escape(nvpIn);
	var reDelim = new RegExp (escape(delimiter), "g");
	nvpOut = nvpOut.replace (reDelim, "=");
	nvpOut = nvpOut.replace (/%0A/g, "&");
	nvpOut = nvpOut.replace (/%0C|%0D/g, "");
	return nvpOut;
}

/************************************************************************
**	Function:	createPost (bIsNewLogin)
**
**	Purpose:	Gets the data to send for registration purposes, and formats
**				it in a form post type format.  bIsNewLogin represents whether
**				this is an install reg or post install reg
*************************************************************************/
function createPost (bIsNewLogin)
{
	var postOut = "";
	var siteCfg = includeFile ('site.cfg', 'CfgDir');
	// there is no filename with a config object, so get 'Result' back
	var sendRegCfg = includeFile('Result', 'SendReg');
	var licenseCfg = includeFile('license.cfg', 'CfgDir')
	
	
	// Get the environment variables
	var envSz = doActionEx("REQ_GET_ENVIRONMENT_SIZE", "Size");
	var envBdo = "", envTmp = "";
	for (var x = 0; x < envSz; x++)
	{
		envBdo = doActionBDO("REQ_GET_ENVIRONMENT_BY_POS", "Pos", x);
		envTmp = envBdo.GetLabels();
		if (envTmp[0] && envBdo[envTmp[0]])
		{
			// All the install params are in cfg files, so make sure we don't send them
			// again (e.g. post-install registration)
			var compStr = (envTmp[0]+"="+envBdo[envTmp[0]]).toLowerCase();
			if ((siteCfg.toLowerCase().indexOf(compStr)) < 0 && 
				(sendRegCfg.toLowerCase().indexOf(compStr)) < 0 &&
				(licenseCfg.toLowerCase().indexOf(compStr)) < 0)
				postOut += "&" + escape(envTmp[0]) + "=" + escape(envBdo[envTmp[0]]);
		} 
	}
	
	// Convert the files we want to send
	postOut += "&" + encodeNVP(siteCfg, "=");
	// there is no filename with a config object, so get 'Result' back
	postOut += "&" + encodeNVP(sendRegCfg, "\t");
	postOut += "&" + encodeNVP(licenseCfg, "=");
	
	
	// Set the registration type
	if (bIsNewLogin)
	{
		var regVal = getLicenseVal ("LastRegType");
		if (regVal)
			postOut += "&Registration=" + regVal;
		else
			postOut += "&Registration=NewLogin";
	}
	else
		postOut += "&Registration=Install";
		
	// See if we already have a key
	if (doAction('DATA_FILEEXISTS', 'ObjectName', 'CfgDir', 'FileName', 'sendreg.key'))
		postOut += "&RegKeyReceived=Yes";
	else
		postOut += "&RegKeyReceived=No";
		
	// Get the drawers installed
	var prodObj = getProdInfo ();
	var cab = doAction ('DATA_GETHEADERS',  'GetRow', true, 'ObjectName', prodObj.CabinetObject);
	if (cab)
	{
		// figure out the products installed
		var installedComp = cab.split('\t');
		var powerWebBuilder="No", powerRetail="No", powerService="No";
		for (var n = 0; n < installedComp.length; n++)
		{
			if (installedComp[n].toLowerCase() == "drw_site.gif")
				powerWebBuilder="Yes";
			else if (installedComp[n].toLowerCase() == "drw_orders.gif")
				powerRetail="Yes";
			else if (installedComp[n].toLowerCase() == "drw_sched.gif")
				powerService="Yes";
		}
				
		postOut += "&Drawers="+(escape(cab));
		postOut += "&PowerWebBuilder="+powerWebBuilder;
		postOut += "&PowerRetail="+powerRetail;
		postOut += "&PowerService="+powerService;
	}
		
	// get the components installed
	var comp = doAction ('DATA_GETHEADERS',  'GetRow', true, 'ObjectName', 'BrokerCfg');
	if (comp)
	{
		var temp = comp.split("\t");
		
		// all we want is the filename, not the path
		for (var n = 0; n < temp.length; n++)
		{		
			temp[n] = temp[n].replace(/\\/g, "/");
			var pos = temp[n].lastIndexOf ("/");
			if (pos >=0)
				temp[n] = temp[n].substr(pos+1);
		}
		postOut += "&Components="+(escape(temp.join("\t")));
	}
	
	// Send the current date time
	var timeSent = new Date();
	postOut += "&Time(GMT)="+escape(timeSent.toGMTString());
	
	// Add the username and password if available
	var getUser = doAction('REQ_GET_FORMVALUE', "Username", "Username");
	var getPasswd = doAction('ST_GET_STATEDATA', 'Password', 'Password');
	if (getUser)
		postOut += "&User="+escape(getUser);
	if (getPasswd)
		postOut += "&SoftCart_E_Password="+escape(getPasswd);	
	
	while (postOut.indexOf("&&") >= 0)
		postOut = postOut.replace (/&&/g, "&");
	
	if (postOut.length > 0)
	{
		// get rid of any trailing and leading '&'
		if (postOut.charAt(postOut.length-1)== "&")
			postOut = postOut.substr (0, postOut.length-1);
		if (postOut.charAt(0)== "&")
			postOut = postOut.substr (1);
		
		return (postOut);
	}
	return "";
}

/************************************************************************
**	Function:	sendPost (requestBody)
**
**	Purpose:	Send 'requestBody' via a form post;
*************************************************************************/
function sendPost (requestBody)
{
	var ssl = getLicenseVal ('SEND_REG_SSL');
	var host = getLicenseVal ('SEND_REG_HOST');
	var port = getLicenseVal ('SEND_REG_PORT');
	var path = getLicenseVal ('SEND_REG_PATH');
	var outBdo = "";
	var requestContent = "application/x-www-form-urlencoded";
	
	if (ssl && host && port && path)
	{
		ssl = (ssl.toLowerCase() == "true" ? true : false);
		port = parseInt(port);
		outBdo = doActionBDO ("INU_EZ_POST", "USESSL", ssl, "HOST", host, "PORT", 
								port, "PATH", path, "REQUESTCONTENTTYPE", requestContent, 
								"REQUESTBODY", requestBody);
	}
	return outBdo;
}


/************************************************************************
**	Function:	selectAction (action)
**
**	Purpose:	Generic action call;
*************************************************************************/
function selectAction (action)
{

		
	switch (action)
	{
	case "L":
		var file = doAction('REQ_GET_FORMVALUE', "NextPage", "NextPage");
		var whichFile = doActionEx	('DATA_READFILE',file, 'FileName', file,'ObjectName','QuartzSite', 
									'FileType', 'txt');
		var output = doActionEx('PAR_PARSE_BUFFER','Result', 'document', whichFile);
		write (output);
		break;

	case "SendReg":
			var postInstall = doAction('ST_GET_STATEDATA', 'PostInstall', 'PostInstall');
			
			// check the current number of atempts
			// if it doesn't exists create it, otherwise increment it
			var attempts = doAction ('DATA_GETCONFIGDATA','ObjectName','SendReg',
									'ColName','Value','RowName','SEND_REG_ATTEMPTS');
			if (attempts)
				attempts = parseInt(attempts);
			else
			{
				attempts = 0;
				doAction ('DATA_DELETECONFIGROW', 'ObjectName', 'SendReg', 'RowName', 
						'SEND_REG_ATTEMPTS');
				doAction ('DATA_ADDCONFIGROW', 'ObjectName', 'SendReg', 'RowName', 
						'SEND_REG_ATTEMPTS');
			}
			doAction ('DATA_SETCONFIGDATA', 'ObjectName', 'SendReg', 'RowName', 
						'SEND_REG_ATTEMPTS', 'ColName', 'Value', 'NewValue', 
						(attempts+1).toString());
						
			var bNewLogin = false;
			if (postInstall && postInstall.toLowerCase() == "yes")
				bNewLogin = true;
			var postBody = createPost (bNewLogin);
			var response = "";
			var beginKeyBlock = "<!--BeginPublicKey-->";
			var endKeyBlock = "<!--EndPublicKey-->";
			var beginRegKeyID = "<!--BeginRegKeyID-->";
			var endRegKeyID = "<!--EndRegKeyID-->";
			if (postBody.length > 0)
				response = sendPost(postBody);
			
			var resHeader = new Array("");
			if (response && response.HEADERS)
				resHeader = response.HEADERS.split("\n");
			if (resHeader[0].indexOf("200") >= 0 && response.MESSAGEBODY && 
				response.MESSAGEBODY.indexOf("MERC_STATUS=success") >= 0)
			{
				// update the config file and state if this is not an install reg
				if (postInstall && postInstall.toLowerCase() == "yes")
				{
					doAction ('DATA_SETCONFIGDATA', 'ObjectName', 'SendReg',
							  'RowName', 'RegSent', 'ColName', 'Value', 'NewValue', 'Yes');
				}
				
				// reset the current attempts counter
				doAction ('DATA_SETCONFIGDATA', 'ObjectName', 'SendReg', 'RowName', 
						'SEND_REG_ATTEMPTS', 'ColName', 'Value', 'NewValue', '0');
				
				// get the public key if any
				var beginPos = response.MESSAGEBODY.indexOf(beginKeyBlock);
				var endPos = response.MESSAGEBODY.indexOf(endKeyBlock);
				if (beginPos >= 0 && endPos >=0)
				{
					beginPos = beginPos + beginKeyBlock.length
					if (beginPos < endPos)
					{
						var key = response.MESSAGEBODY.substring(beginPos, endPos);
						if (key && key.length > 0)
							doAction ('DATA_WRITEFILE', 'FileName', 'sendreg.key','Data', 
										key, 'Size', key.length, 'ObjectName', 'CfgDir', 'Permissions', 384 );
					}
				}
				// get the key ID if any
				var beginID = response.MESSAGEBODY.indexOf(beginRegKeyID);
				var endID = response.MESSAGEBODY.indexOf(endRegKeyID);
				if (beginID >= 0 && endID >=0)
				{
					beginID = beginID + beginRegKeyID.length
					if (beginID < endID)
					{
						var keyID = response.MESSAGEBODY.substring(beginID, endID);
						if (keyID && keyID.length > 0)
						{
							doAction ('DATA_DELETECONFIGROW',  'ObjectName', 'SendReg', 'RowName', 
									'RegKeyID');
							doAction ('DATA_ADDCONFIGROW', 'ObjectName', 'SendReg', 'RowName', 
									'RegKeyID', 'RowData', keyID);
						}
					}
				}
			}
			else
			{
				var which_email = doAction("REQ_GET_FORMVALUE", "failEmailTo", "failEmailTo");
				var regType = getLicenseVal ('LastRegType');
				if (which_email && (regType && regType.toLowerCase() == "remove"))
				{
					var mailHost = doAction('DATA_GETLITERAL', 'ObjectName', 'storecfg', 'LiteralID', 'SITEMGR_SMTP_MAIL_SERVER');
					if (mailHost)
					{
						var mailDomain = fixQuadMailHost(mailHost);
						var reReplace = /&/g;
						var emailArray = which_email.split(";");
						var defEmailText = "Mercantec Power Commerce - Removal Registration failed \n\n" + 
								  "Please contact Mercantec at (630) 848-2118 to report this removal.  \n" + 
								  "When calling, please have the following information available.\n\n" + 
								  "ISPName\nSiteURL\nUser\nDate of Cancellation\n\n\n\n" +
								  "**** Removal Registration failed for the following site: ****\n\n";
						for (var n = 0; n < emailArray.length; n++)
						{
							//writeln("Sending email");
							if (emailArray[n].length > 0)
							{
								doAction("INU_BASIC_EMAIL", "TO", emailArray[n], "FROM", "PowerStoreMgrReg@mercantec.com",
									"SUBJECT", "Mercantec Power Commerce - Removal Registration Failure", "MESSAGE", 
									defEmailText + unescape(postBody.replace(reReplace, "\n")),
									"MAILHOST", mailHost, "DOMAIN", mailDomain);
							}
						}
					}
				}
			}
			// Try Only once per login
			doAction('ST_SET_STATEDATA', 'RegSent', 'Yes');
		break;
	default:
		writeln ("There was an error...no corresponding action found");
		break;
	}	
}

/************************************************************************
**	Function:	fixQuadMailHost(possibleDottedQuad)
**
**	Purpose:	wrap anything that looks kinda like a dotted quad in brackets: 
**				xx.xx.xx.xx --> [xx.xx.xx.xx]
*************************************************************************/
function fixQuadMailHost(possibleDottedQuad)
{
	var numericChars = '0123456789';
	var str = possibleDottedQuad.toString();
	var dots = 0;

	for (var i = 0; i < str.length; i++)
	{
		if (str.charAt(i) == '.') dots++;
		else if (numericChars.indexOf(str.charAt(i)) == -1) return str;
	}

	if (dots != 3) return str;
	return '[' + str + ']';
}
