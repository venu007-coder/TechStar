


//////////////////////////////////////////////////////////////////
///////////   IMPORTANT    ///////////////////////////////////////
// variables winName, and baseUrl should be set in the file loading this code
///////////////////////////////////////////////////////////////////

/************************************************************************
**	Function:	validatePmntSelection(valForm)
**
**	Purpose:	Validates the selected payment types.
*************************************************************************/
function validatePmntSelection(valForm)
{
	var ccTypesNames = new Array('AMEX', 'Discover', 'MasterCard', 'VISA');
	var ccTypeNamesKey = 'onlineccauth';
	var pmntTypeNames = new Array('onlineccauth', 'offlineccauth', 'offlinechecks', 
									'COD_CREDITCARD', 'COD_CHECK', 'COD_CASH', 
									'COD_MONEYORDER', 'COD_CASHIERSCHECK', 
									'PURCHASEORDER');
	var bPmntType = false, bCCType = false, bCCTypeKey = false;
	
	for (var n = 0; n < ccTypesNames.length && !bCCType; n++)
	{
		if (valForm[ccTypesNames[n]].checked)
			bCCType = true;
	}
	for (var n = 0; n < pmntTypeNames.length && !bPmntType; n++)
	{
		if (valForm[pmntTypeNames[n]].checked)
		{
			if (!bCCTypeKey && pmntTypeNames[n] == ccTypeNamesKey)
				bCCTypeKey = true;
			bPmntType = true;
		}
	}
	if (!bPmntType)
		alert ("You must select at least one payment type!");
	else if (bCCTypeKey && !bCCType)
		alert ("Please select at least one credit card type to accept.");
	return (bPmntType && (!bCCTypeKey  || (bCCTypeKey && bCCType)));
}

/************************************************************************
**	Function:	closeChildWin ()
**
**	Purpose:	Closes any child windows belonging to the current page.
*************************************************************************/
function closeChildWin ()
{
	if (parent.WindowID)
		if (!parent.WindowID.closed)
			if (parent.WindowID.name == winName)
				parent.CloseWin ();
}

/************************************************************************
**	Function:	saveWindow ()
**
**	Purpose:	opens a message window telling the user the page is saving.
*************************************************************************/
function saveWindow ()
{
	parent.createAndWriteToPopUp ("150", "300", winName, baseUrl, 
									parent.gSAVING_PAGE, parent.gWINDOW_WILL_CLOSE);
}

/************************************************************************
**	Function:	submitToWindow (LinkToPage, useStyle, useTheme, pageName, windowPage)
**
**	Purpose:	opens a new window using windowPage, and posts information
**				to it.
*************************************************************************/
function submitToWindow (LinkToPage, useStyle, useTheme, pageName, windowPage,
						height, width)
{
	var WinObj = new parent.createSimpleSubmitWindow (height, width);
	// events is temporary and will soon be removed
	var args = new Array ('LinkToPage', LinkToPage, 'UseStyle', useStyle, 
							'UseTheme', useTheme, 'SetForPageName', pageName,
							'events',
							'onSubmit = "opener.CloseWinSubmitForm (\'SE_SetTheme\', \'\', \'mainFrame\', document.form1); return false;"');
	parent.OpenWinSubmitForm ('', 'L', windowPage, 'newWin', args, WinObj);
}


/************************************************************************
**	Function:	deleteItem (nextPage, useStyle, useTheme, pageName)
**
**	Purpose:	deletes a file.
*************************************************************************/
function deleteItem (nextPage, useStyle, useTheme, useImage, pageName)
{
	if (confirm (parent.gARE_YOU_SURE))
	{
		var args = new Array ('UseStyle', useStyle, 'UseTheme', useTheme, 
								'UseImage', useImage,
								'SetForPageName', pageName);
		if (useStyle.length > 0)
			var action = 'SE_DeleteStyle';
		else if (useImage.length > 0)
			var action = 'SE_DeleteImage';
		else
			var action = 'SE_DeleteTheme';
			
		parent.createAndWriteToPopUp ("150", "300", winName, baseUrl, 
										parent.gDELETING_PAGE, parent.gWINDOW_WILL_CLOSE);
		parent.SubmitForm (action, nextPage, 'mainFrame', args);
	}
}

/************************************************************************
**	Function:	validateName (rawName, rawNameMaxSz, convertedName, fileList, winObjForAlerts)
**
**	Purpose:	validates an entered name.
**					rawName is the true entered name
**					rawNameMaxSz is the maximum size of the entered name (<0 = unlimited)
**					convertedName is the name after adding extensions and such
**						e.g. .css
**					fileList is the list of files to compare against to avoid overwrites
**					winObjForAlerts is the window reference of the window calling
**						this function, so alerts are poped up from there (avoids those
**						windows going out of focus when alerts are popped up from
**						elsewhere).
**					master_js is the master.js object relative to the file including
**						this .js
*************************************************************************/
function validateName (rawName, rawNameMaxSz, convertedName, fileList, winObjForAlerts, master_js)
{
	if (!validateBasics (rawName, rawNameMaxSz, winObjForAlerts, master_js))
		return false;
		
	var bValid = true;
	for (var n = 0; n < fileList.length; n++)
	{
		if (convertedName.toLowerCase() == fileList[n].toLowerCase())
		{
			bValid = winObjForAlerts.confirm (master_js.gOVERWRITE);
			break;
		}
	}
	return (bValid);
}

/************************************************************************
**	Function:	validateDirectory (rawName, rawNameMaxSz, convertedName, fileList, winObjForAlerts)
**
**	Purpose:	validates an entered name.
**					rawName is the true entered name
**					rawNameMaxSz is the maximum size of the entered name (<0 = unlimited)
**					convertedName is the name after adding extensions and such
**						e.g. .css
**					fileList is the list of files to compare against to avoid overwrites
**					winObjForAlerts is the window reference of the window calling
**						this function, so alerts are poped up from there (avoids those
**						windows going out of focus when alerts are popped up from
**						elsewhere).
**					master_js is the master.js object relative to the file including
**						this .js
*************************************************************************/
function validateDirectory (rawName, rawNameMaxSz, convertedName, fileList, winObjForAlerts, master_js)
{
	if (!validateBasics (rawName, rawNameMaxSz, winObjForAlerts, master_js))
		return false;
		
	for (var n = 0; n < fileList.length; n++)
	{
		if (convertedName.toLowerCase() == fileList[n].toLowerCase())
		{
			bValid = winObjForAlerts.alert (master_js.gEXISTING_DIR);
			return false;
		}
	}
	return true;
}

/************************************************************************
**	Function:	validateEdit (rawName, rawNameMaxSz, convertedName, fileList, winObjForAlerts)
**
**	Purpose:	validates an entered name.
**					rawName is the true entered name
**					rawNameMaxSz is the maximum size of the entered name (<0 = unlimited)
**					convertedName is the name after adding extensions and such
**						e.g. .css
**					fileList is the list of files to compare against to avoid overwrites
**					winObjForAlerts is the window reference of the window calling
**						this function, so alerts are poped up from there (avoids those
**						windows going out of focus when alerts are popped up from
**						elsewhere).
**					master_js is the master.js object relative to the file including
**						this .js
**	Returns:		Returns an labeled array of boolean values with information about
**					the passed in name:
**						retValue['basics'] = true if the basics were validated
**						retValue['fileExist'] = true if another file exists with the same name
**						retValue['editFile'] = true if the user selects 'OK' as to whether
**												or not they want to edit the file if a 
**												matching file was found 
*************************************************************************/
function validateEdit (rawName, rawNameMaxSz, convertedName, fileList, winObjForAlerts, master_js)
{
	var retArgs = new Array();
	retArgs['basics'] = false;
	retArgs['fileExist'] = false;
	retArgs['editFile'] = false;
	retArgs['fileExistName'] = "";
	if (!validateBasics (rawName, rawNameMaxSz, winObjForAlerts, master_js))
		return retArgs;
		
	retArgs['basics'] = true;
	for (var n = 0; n < fileList.length; n++)
	{
		if (convertedName.toLowerCase() == fileList[n].toLowerCase())
		{
			retArgs['fileExist'] = true;
			retArgs['fileExistName'] = fileList[n];
			retArgs['editFile'] = winObjForAlerts.confirm (master_js.gEDIT);
			break;
		}
	}
	return retArgs;;
}

/************************************************************************
**	Function:	validateBasics (rawName, rawNameMaxSz, winObjForAlerts, master_js)
**
**	Purpose:	validates an entered name.
**					rawName is the true entered name
**					rawNameMaxSz is the maximum size of the entered name (<0 = unlimited)
**					winObjForAlerts is the window reference of the window calling
**						this function, so alerts are poped up from there (avoids those
**						windows going out of focus when alerts are popped up from
**						elsewhere).
**					master_js is the master.js object relative to the file including
**						this .js
*************************************************************************/
function validateBasics (rawName, rawNameMaxSz, winObjForAlerts, master_js)
{
	if (rawName.length <=0)
	{
		winObjForAlerts.alert (master_js.gENTER_NAME);
		return false;
	}
	
	if (rawNameMaxSz >=0 && rawName.length > rawNameMaxSz)
	{
		winObjForAlerts.alert (master_js.gfLIMIT_CHAR(rawNameMaxSz));
		return false;
	}
					
	if (rawName.search (/[\\\/:\*\?";<>'\|]/g) >= 0)
	{
		winObjForAlerts.alert (master_js.gINVALID_CHAR);
		return false;
	}
	return true;
}


/************************************************************************
**	Function:	validateExtension (fileName, extArry, winObjForAlerts, master_js)
**
**	Purpose:	validates a filename against an extension list.
**					fileName is the name to check agains
**					extArry is an array of valid extensions
**					winObjForAlerts is the window reference of the window calling
**						this function, so alerts are poped up from there (avoids those
**						windows going out of focus when alerts are popped up from
**						elsewhere).
**					master_js is the master.js object relative to the file including
**						this .js
*************************************************************************/
function validateExtension (fileName, extArry, winObjForAlerts, master_js)
{
	if (fileName.length <=0)
	{
		winObjForAlerts.alert (master_js.gENTER_NAME);
		return false;
	}
	
	var bValid = false;
	for (var n = 0; !bValid && n < extArry.length && extArry[n] && fileName.lastIndexOf (".") >= 0; n++)
	{
		if (extArry[n].indexOf (".") != 0)
				extArry[n] = "." + extArry[n];
				
		if (fileName.substr(fileName.lastIndexOf (".")).toLowerCase() == extArry[n].toLowerCase())
			bValid = true;
	}
	if (!bValid)
		winObjForAlerts.alert (master_js.gfFILE_EXT(extArry));
	
	return bValid;
}

/************************************************************************
**	Function:	changeWizImage (imgOnObj, imgOffObj)
**
**	Purpose:	Primarily used in the Wat wizard, this function will change a
**				substring within an image object's image file from '_on' to '_off'  
**				for the imgOffObj object and from '_off' to '_on' for the imgOnObj object
**					imgOnObj =	image object whose source conatins an image name
**								with '_off' in it.
**					imgOffObj =	image object whose source conatins an image name
**								with '_on' in it.
*************************************************************************/
function changeWizImage (imgOnObj, imgOffObj)
{	
	if (imgOnObj)
	{
		for (var n = 0; n < imgOnObj.length; n++)
		{
			if (imgOnObj[n].src)
			{
				if (imgOnObj[n].src.indexOf('off', imgOnObj[n].src.lastIndexOf('_')) >= 0)
				{
					iSrc = imgOnObj[n].src.substr(0, imgOnObj[n].src.lastIndexOf('_')) + imgOnObj[n].src.substr(imgOnObj[n].src.lastIndexOf('_')).replace('off', 'on');
					imgOnObj[n].src = iSrc;
				}
			}
		}
	}
	if (imgOffObj)
	{
		for (var x = 0; x < imgOffObj.length; x++)
		{
			if (imgOffObj[x].src)
			{
				if (imgOffObj[x].src.indexOf('on', imgOffObj[x].src.lastIndexOf('_')) >= 0)
				{
					var iSrc = imgOffObj[x].src.substr(0, imgOffObj[x].src.lastIndexOf('_')) + imgOffObj[x].src.substr(imgOffObj[x].src.lastIndexOf('_')).replace('on', 'off');
					imgOffObj[x].src = iSrc;
				}
			}
		}
	}
}

/************************************************************************
**	Function:	validateTimes(formName, fromKey, toKey, idArray)
**
**	Purpose:	checks a scheduling form to validate that closing times are not
**				set before opening times
**					formName =	name of the form to check.
**					fromKey =	start time key.
**					toKey =		end time key
**					idArray =	if the form is ID based and not day based pass
**								in the id array here
*************************************************************************/
function validateTimes(formName, fromKey, toKey, idArray)
{
	formName = "document." + formName;
	if (idArray && idArray.length > 0)
		var days = idArray;
	else
		var days = new Array("Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat");
	var bValid = true;
	for (var n = 0; n < days.length && bValid; n++)
	{
		if (eval(formName + "." + toKey + "_24_" + days[n]))
			var checked = eval(formName + "." + toKey + "_24_" + days[n] + ".checked");
		else
			var checked = true;
		if (!eval(formName + "." + fromKey + "_ampm_" + days[n]))
			continue;
		var openAmPm = eval(formName + "." + fromKey + "_ampm_" + days[n] + ".options[" + formName + "." + fromKey + "_ampm_" + days[n] + ".selectedIndex].value");
		var closedAmPm = eval(formName + "." + toKey + "_ampm_" + days[n] + ".options[" + formName + "." + toKey + "_ampm_" + days[n] + ".selectedIndex].value");
		var openHours = parseInt(eval(formName + "." + fromKey + "_hours_" + days[n] + ".options[" + formName + "." + fromKey + "_hours_" + days[n] + ".selectedIndex].value"));
		if (!openHours)
			continue;
		var closedHours = parseInt(eval(formName + "." + toKey + "_hours_" + days[n] + ".options[" + formName + "." + toKey + "_hours_" + days[n] + ".selectedIndex].value"));
		if (!closedHours)
			closedHours = 12;
		var openMinutes = parseInt(eval(formName + "." + fromKey + "_minutes_" + days[n] + ".options[" + formName + "." + fromKey + "_minutes_" + days[n] + ".selectedIndex].value"));
		if (!openMinutes)
			openMinutes = 0;
		var closedMinutes = parseInt(eval(formName + "." + toKey + "_minutes_" + days[n] + ".options[" + formName + "." + toKey + "_minutes_" + days[n] + ".selectedIndex].value"));
		if (!closedMinutes)
			closedMinutes = 0;
		if (checked)
		{
			if (openAmPm == "PM" && closedAmPm == "AM")
				bValid = false;
			else if (openAmPm == closedAmPm)
			{
				if (openHours == 12)
					openHours = 0;
				if (closedHours == 12)
					closedHours = 0;
				if (openHours > closedHours)
					bValid = false;
				else if ((openHours == closedHours) && (openMinutes > closedMinutes))
					bValid = false;
				else if ((openHours != closedHours) && (closedHours == 12))
					bValid = false;
			}
		}
	}
	if (!bValid)
	{
		if (idArray.length > 0)
			alert (eval(formName + "." + "text_date_" + days[n-1]+".value") + ":  " + parent.gSCHED_ERR);
		else
			alert (days[n-1] + ":  " + parent.gSCHED_ERR);
	}
	return bValid;
}
