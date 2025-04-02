/* Master javascript file for Merchant Connection */

//use to identify file
var gSCRIPT_FILE_NAME = "master.js";

// set the protocol here when the js is first loaded since it is not accessible 
// in all browsers under all situations
var gPROTOCOL = location.protocol;

//	Global Vars
var WindowID, gHELP_WINDOW_ID;
var maxIndex = 0;
var gFORM_ACTION = "http://altechstar.com:80/cgi-local/mpc/PowerCommerce.cgi";
var gNON_SEC_PROTOCOL = "http:"
var gSEC_PROTOCOL = "http:"
var gSECURE_FORM_ACTION = "http://altechstar.com:80/cgi-local/mpc/PowerCommerce.cgi";

// Global Strings
var gSAVING_PAGE = "<center>Saving...<br>Please Wait</center>";
var gSAVPUB_PAGE = "<center>Saving & Publishing...<br>Please Wait</center>";
var gRENAMING_PAGE = "<center>Renaming...<br>Please Wait</center>";
var gMOVING_PAGE = "<center>Moving...<br>Please Wait</center>";
var gDELETING_PAGE = "<center>Deleting...<br>Please Wait</center>";
var gUPLOADING = "<center>Uploading...<br>Please Wait</center>";
var gCREATING = "<center>Creating...<br>Please Wait</center>";
var gRELOADING = "<center>Reloading...</center>";
var gLOADING = "<center>Loading...</center>";
var gWINDOW_WILL_CLOSE = "<center>Window will close automatically when finished</center>";
var gARE_YOU_SURE = "Are You Sure?";
var gINVALID_CHAR = "Please do not use the following characters in the name\n"+
					"\\/:;*?\"<>'|";
var gENTER_NAME = "Please Enter A Name";
var gFILE_EXISTS = "File already exists";
var gOVERWRITE = gFILE_EXISTS + ", do you wish to overwrite?";
var gEDIT = gFILE_EXISTS + ", do you wish to edit?";
var gCLICK_OK_TO = "Click 'Ok' to";
var gCLICK_CANCEL_TO = "Click 'Cancel' to";
var gCLICK_OK_OVERWRITE = gCLICK_OK_TO + " overwrite"
var gCLICK_CANCEL_NO_OVERWRITE = gCLICK_CANCEL_TO + " continue without overwriting file"
var gCONFIRM_SAVE_PAGE = "Do you wish to save this page prior to continuing?";
var gEXISTING_DIR = "Directory Already Exists";
var gINVALID_SELECTION = "Invalid Selection";
var gNO_UPLOAD_DIR = "Cannot Upload To This Directory";
var gCANNOT_DELETE_DIR = "This Directory Cannot Be Deleted!";
var gCANNOT_DELETE = "This Item Cannot Be Deleted!";
var gALL_FILE_DELETE = "All Files In The Directory Will Be Deleted!";
var gNO_RENAME_HOME = "Home Page Cannot Be Renamed!"
var gSELECT_LAYER = "Please select a Layer";
var gCONFIRM_BUTTON_ORDER = "You have made changes to the button order without saving, do you wish to continue and lose these changes?";
var gSCHED_ERR = "Ending time cannot be before beginning time";
function gfLIMIT_CHAR(size) {return ("Please Limit The Name To "+size+" Characters");}
function gfFILE_EXT(extTypes) {return ("Uploads Are Limited To The Following Extension(s):   "+extTypes.join(", "));}


/************************************************************************
These things are needed so the Pending Orders and Order Reject Email
pages can talk to each other..
*************************************************************************/

g_RejectReason = '---';
g_RejectReady = false;

function GetRejectReason()
{
	return g_RejectReason;
	g_RejectReason = '---';
}

function SetRejectReason(val)
{
	g_RejectReason = val;
}

function ContinueRejecting()
{
	g_RejectReady = true;
}

function CanContinueRejecting()
{
	if (g_RejectReady)
	{
		g_RejectReady = false;
		return true;
	}
	else return false;
}

/************************************************************************
This function acts as a bridge between the Item Editor and its pop-ups
*************************************************************************/

function notify_item_editor()
{
	window.frames['mainFrame'].notify();
}

/************************************************************************
**	Function:submitFormObject (formAction, formMethod, action, nextPage, 
**								target, argsArray, form_in)
**
**	Purpose: Allows the creation of an object to represent a submitted form.
*************************************************************************/
function submitFormObject (action, nextPage, target, args)
{
	this.action = action;
	this.nextPage = nextPage;
	this.target = target;
	this.form_in = (args.elements ? args : '');
	this.argsArray = (args.elements ? '' : args);
	this.formAction = gFORM_ACTION;
	if (gPROTOCOL.toLowerCase() == gSEC_PROTOCOL.toLowerCase())
		this.formAction = gSECURE_FORM_ACTION;
	this.formMethod = "POST";
	this.encoding = 'application/x-www-form-urlencoded';
}

/************************************************************************
**	Function:submitWindow ()
**
**	Purpose: Creates a window object.
*************************************************************************/
function submitWindow ()
{
	names =new Array ("alwaysLowered","alwaysRaised","dependent","directories",
							"height","hotkeys","innerHeight","innerWidth","left","location",
							"menubar","outerHeight","resizable","screenX","screenY",
							"scrollbars","status","titlebar","toolbar","top","width","z-lock");
	this.values = names;
	
	// Set the default values
	this.values["toolbar"]="no";
	this.values["location"]="no";
	this.values["menubar"]="no";
	this.values["scrollbars"]="yes";
	this.values["resizable"]="yes";
	this.values["width"]="600";
	this.values["height"]="450";
	this.values["alwaysRaised"]="yes";
	this.values["top"]="25";
	this.values["left"]="25";
	this.values["screenX"]="25";
	this.values["screenY"]="25";
	
	this.offsetX = 25;  //offset values are for position new popup
	this.offsetY = 25;  //relative to the opener window

	this.createOutput = new Function ("", "var ret = '';"+
						"for (var n = 0; n < names.length; n++){"+
						"if (this.values [names[n]])ret += "+
						"names[n]+'='+this.values [names[n]]+','}"+
						"if (ret)ret=ret.substring (0, ret.length-1);"+
						"return (ret);");
}


/************************************************************************
**	Function:createSimpleSubmitWindow (height, width)
**
**	Purpose: Shortcut for creating a new window object with the two most
**			 commonly set params.
*************************************************************************/
function createSimpleSubmitWindow (height, width)
{
	var WinObj = new parent.submitWindow ();
	if (height)
		WinObj.values.height=height;
	if (width)
		WinObj.values.width=width;
	return (WinObj);
}


/************************************************************************
**	Function:createSimpleSubmitWindowWithOffset (height, width, offX, offY)
**
**	Purpose: Shortcut for creating a new window object with the two most
**			 commonly set params and allows user defined offset from upper
**			 left corner of opener window
*************************************************************************/
function createSimpleSubmitWindowWithOffset (height, width, offsetX, offsetY)
{
	var WinObj = new parent.submitWindow ();
	if (height)
		WinObj.values.height=height;
	if (width)
		WinObj.values.width=width;
	if (offsetX)
		WinObj.offsetX=offsetX;
	if (offsetY)
		WinObj.offsetY=offsetY;
	return (WinObj);
}



/************************************************************************
**	Function:createAndWriteToPopUp (height, width, winName, baseUrl, bodyText)
**
**	Purpose: Shortcut creates a new window, and writes a string to it.
*************************************************************************/
function createAndWriteToPopUp (height, width, winName, baseUrl, bodyText, noteText)
{
	if (!bodyText)
		bodyText = "";
	if (!noteText)
		noteText = "";
	var Win = OpenWin ('', winName, (createSimpleSubmitWindow (height, width)));
	Win.document.writeln ("<HTML><HEAD><TITLE>Dialog</TITLE><BASE href='"+baseUrl+"'>"+
						"<link rel='stylesheet' type='text/css' href='/cgi-docs/Mercantec/PC_F_6.6.1/styles/master_layer.css'>"+
						"</HEAD><BODY CLASS='pop-up-bkgrd'><FONT CLASS='dialog-title'>" + bodyText+
						"</FONT><BR><FONT CLASS='instr-note'>"+noteText+"</FONT></BODY></HTML>");
	Win.document.close ();
	return (Win);
}

/************************************************************************
**	Function:Init (formAction, formMethod, action, nextPage, target)
**
**	Purpose: Cleans previous values from the form, and sets default values.
*************************************************************************/
function Init (submitFormObj) 
{
	if (!submitFormObj)
		return false;
		
	maxIndex = parent.document.sc_form1.length - 1;
	var nextIndex = 5;
	parent.document.sc_form1.reset();
	// need to do this because Netscape won't reset its form values
	for (var n = nextIndex; n < parent.document.sc_form1.length; n++)
	{
		parent.document.sc_form1.elements[n].name = '';
		parent.document.sc_form1.elements[n].value = '';
	}
	
	parent.document.sc_form1.target = submitFormObj.target;
	parent.document.sc_form1.method = submitFormObj.formMethod;
	parent.document.sc_form1.action = submitFormObj.formAction;
	parent.document.sc_form1.encoding = submitFormObj.encoding;
	
	parent.document.sc_form1.elements[nextIndex].name = "sm_action";
	parent.document.sc_form1.elements[nextIndex].value = submitFormObj.action;
	nextIndex++;
	
	parent.document.sc_form1.elements[nextIndex].name = "NextPage";
	parent.document.sc_form1.elements[nextIndex].value = submitFormObj.nextPage;
	nextIndex++;

	parent.document.sc_form1.elements[nextIndex].name = "AppID";
	parent.document.sc_form1.elements[nextIndex].value = "merchant";
	nextIndex++;
	
	nextIndex = SetFormValues (submitFormObj.argsArray, nextIndex);
	SetFormValues (submitFormObj.form_in, nextIndex);
	
	return (nextIndex);
}

/************************************************************************
**	Function:focusChild()
**
**	Purpose: Sets focus to the created child window.
*************************************************************************/
function focusChild()
{
	if (WindowID)
		if (!WindowID.closed)
			WindowID.focus();
}

/************************************************************************
**	Function:OpenWin (URL, target, winObject)
**
**	Purpose: Opens a window, winObject is a window object defined above.
*************************************************************************/
function OpenWin (URL, target, winObject)
{
	// currently only allow one window at a time to be opened
	CloseWin ();
	if (!winObject)
		winObject = new submitWindow ();
	WindowID = window.open (URL, target, winObject.createOutput());
	
	// the following lines result in permission denied errors on some systems
	//var openerX = document.all?WindowID.opener.screenLeft:WindowID.opener.screenX;
	//var openerY = document.all?WindowID.opener.screenTop:WindowID.opener.screenY;	
	//if (winObject.offsetX && winObject.offsetY)
		//WindowID.moveTo(parseInt(openerX + winObject.offsetX), parseInt(openerY + winObject.offsetY));
	return WindowID;
}

/************************************************************************
**	Function:OpenWinSubmitForm	(URL, action, nextPage, target, args, winObject)
**
**	Purpose: Opens a window, and submits the form, args can be either a 
**			 form object or an array of name value pairs.
*************************************************************************/
function OpenWinSubmitForm	(URL, action, nextPage, target, args, winObject) 
{
	myWinID = OpenWin (URL, target, winObject);
	SubmitForm (action, nextPage, target, args);
	return myWinID;	
}

/************************************************************************
**	Function:CloseWin ()
**
**	Purpose: Closes the currently opened window
*************************************************************************/
function CloseWin () 
{
	if (WindowID)
		if (!WindowID.closed)
			WindowID.close ();
	WindowID = '';
}

/************************************************************************
**	Function:CloseWinSubmitForm	(action, nextPage, target, args)
**
**	Purpose: Closes the window, and submits the form, args can be either a 
**			 form object or an array of name value pairs.
*************************************************************************/
function CloseWinSubmitForm	(action, nextPage, target, args) 
{
	SubmitForm (action, nextPage, target, args);
	CloseWin ();	
}

/************************************************************************
**	Function:CloseWinOpenWinSubmitForm	(URL, action, nextPage, target, args, winObject))
**
**	Purpose: Opens a new window, submits a form to it, then closes the old window.
**			This prevents the handle to the old window being closed prior to form
**			submission thus orphaning the form
*************************************************************************/
function CloseWinOpenWinSubmitForm	(URL, action, nextPage, target, args, winObject) 
{
	if (!winObject)
		winObject = new submitWindow ();
	var tempWindowID = window.open (URL, target, winObject.createOutput());
	SubmitForm (action, nextPage, target, args);

	CloseWin ();
	WindowID = 	tempWindowID;
	return (WindowID);
}

/************************************************************************
**	Function:SubmitForm(action, nextPage, target, args)
**
**	Purpose: submits form, args can be either a form object or an array of
**			 name value pairs.
*************************************************************************/
function SubmitForm(action, nextPage, target, args)
{
	Init (new submitFormObject (action, nextPage, target, args));
	parent.document.sc_form1.submit();
}

/************************************************************************
**	Function:SubmitSubmitFormObject (submitFormObj)
**
**	Purpose: submits a submitForm object
*************************************************************************/
function SubmitSubmitFormObject (submitFormObj)
{
	Init (submitFormObj);
	parent.document.sc_form1.submit();
}

/************************************************************************
**	Function:SetFormValues (args, newIndex)
**
**	Purpose: Sets from values beginning at newIndex for either an array
**			 or a form object
*************************************************************************/
function SetFormValues (args, newIndex)
{
	if (args)
	{
		if (args.elements)
		{
			for (var n = 0; n < args.elements.length && newIndex <= maxIndex; n++)
			{
				switch (args.elements[n].type.toLowerCase())
				{
				case ("textarea"):
				case ("text"):
				case ("hidden"):
				case ("password"):
					parent.document.sc_form1.elements[newIndex].name = args.elements[n].name;
					parent.document.sc_form1.elements[newIndex].value = args.elements[n].value;
					newIndex++;
					break;
				case ("radio"):
				case ("checkbox"):
					if (args.elements[n].checked)
					{
						parent.document.sc_form1.elements[newIndex].name = args.elements[n].name;
						parent.document.sc_form1.elements[newIndex].value = args.elements[n].value;
						newIndex++
					}
					break;
				case ("select-one"):
					if (args.elements[n].length == 0)
						break;
					for (var i=0; i < args.elements[n].length; i++)
					{
						if (args.elements[n][i].selected == true)
						{
							//only assign value is something was selected
							var sel=args.elements[n][i].value;
							parent.document.sc_form1.elements[newIndex].name = args.elements[n].name;
							parent.document.sc_form1.elements[newIndex].value = sel;
							newIndex++;
							break;
						}
					}
					break;
				// Not implemented Yet
				case ("file"):
				case ("select-multiple"):
				default:
					break;
				}
			}
		}
		else
		{
			for (var n = 1; n < args.length && newIndex <= maxIndex; n+=2, newIndex++)
			{
				parent.document.sc_form1.elements[newIndex].name = args[n-1];
				parent.document.sc_form1.elements[newIndex].value = args[n];
			}
		}
	}
	return newIndex;
}

/************************************************************************
**	Function:checkForPopUp ()
**
**	Purpose: Checks for existence of a functional pop up and gives the 
**			user the option to close and continue or cancel the action
*************************************************************************/
function checkForPopUp()
{
	if (WindowID)
	{
		if (!WindowID.closed) 
		{
			WindowID.focus();
			if(WindowID.confirm('ALERT: You have another window open.\nDo you want to close this and continue?'))
			{
				WindowID.close();
				return false
			} 
			else
			{
				return true
			}
		} 
	}
	else return false;
}

/************************************************************************
**	Function:openHelpWindow (url, target)
**
**	Purpose: To create and position a help window for the merchant app
**
*************************************************************************/
function openHelpWindow(url, target)
{
	var winObj = createSimpleSubmitWindowWithOffset ('300', '400',250,25 );
	winObj.values.toolbar = "yes";
	// currently only allow one help window at a time to be opened
	if (gHELP_WINDOW_ID)
		if (!gHELP_WINDOW_ID.closed)
			gHELP_WINDOW_ID.close ();
	gHELP_WINDOW_ID = '';
	gHELP_WINDOW_ID = window.open (url, target, winObj.createOutput());
	
	return (gHELP_WINDOW_ID);
}

