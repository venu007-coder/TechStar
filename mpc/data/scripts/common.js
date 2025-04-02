
/********************************************************************************/
/************************************** Common **********************************/
/********************************************************************************/


/*	Global variables *//* ObjectNames */
var gPRIVATE_SITE = 'QuartzSite', gPUBLIC_SITE = 'QuartzSitePublic';
var gSITE_ED_FILE = 'SiteEditorCfg', gTHEME_OBJ = 'Themes', gSTYLE_OBJ = 'Styles';
var gSTORE_CFG = 'storecfg', gLICENSE_CFG = 'License';
var gIMAGES_CFG = 'ImagesCfg', gPUBLIC = 'Public';
var gWAT_WIZ_PG = 'WATWizardPages', gPRIV_PG_OBJ = 'PrivatePageObject';

/* pages */
var gBASE_PAGE = '*BasePage*', gCURRENT_PAGE = '*CurrentWorkingPage*', gHOME_PAGE = 'Home';
var gNONE = '*None*', gEMPTY = '*Empty*';
var gDEFAULT_WEB_PAGE = 'index.html';

/* Directories */
var gIMAGES_DIR = 'images/', gTHEMES_DIR = 'themes/', gSTYLES_DIR = 'styles/';
var gWEB_ALIAS_IMAGES = 'images', gWEB_ALIAS_THEMES = 'themes', gWEB_ALIAS_STYLES = 'styles';
var gWEB_ROOT = doAction ('DATA_GETLITERAL', 'ObjectName', gSTORE_CFG, 'LiteralID', 'SITEMGR_HTTP_PRIVATE_HTDOCS_ALIAS');
if (gWEB_ROOT)
{
	if (gWEB_ROOT.length > 0)
	{
		if (gWEB_ROOT[0] != '/' && gWEB_ROOT[0] != '\\')
			gWEB_ROOT = '/' + gWEB_ROOT;
		if (gWEB_ROOT[gWEB_ROOT.length-1] != '/' && gWEB_ROOT[gWEB_ROOT.length-1] != '\\')
			gWEB_ROOT =  gWEB_ROOT + '/';
	}
}
else
	gWEB_ROOT = "";
var gCOMMON_URL = doAction ('DATA_GETLITERAL', 'ObjectName', gSTORE_CFG, 'LiteralID', 'SITEMGR_HTTP_SHARED_HTDOCS_ALIAS');
if (gCOMMON_URL)
{
	if (gCOMMON_URL.length > 0)
	{
		if (gCOMMON_URL[0] != '/' && gCOMMON_URL[0] != '\\')
			gCOMMON_URL = '/' + gCOMMON_URL;
		if (gCOMMON_URL[gCOMMON_URL.length-1] != '/' && gCOMMON_URL[gCOMMON_URL.length-1] != '\\')
			gCOMMON_URL =  gCOMMON_URL + '/';
	}
}
else
	gCOMMON_URL = "";

/* site editor columns */
var gTHEME = 'Theme', gSTYLE = 'Style', gLAYOUT = 'Layout', gBUTTON_ORDER = 'ButtonOrder';
var gKEY_WORDS = 'KeyWords', gTITLE = 'Title', gDESCRIPTION = 'Description';
var gBUTTON_ALIGNMENT = 'ButtonAlignment';
var gPAGE_TYPE = 'PageType', gFILE_EXT = 'FileExt';
var gSECURE_BASE_HREF = 'SecureBaseHref', gLICENSE_FOR = 'LicensedFor';

/* store cfg entries */
gCOMMERCE_ENABLED = 'CommerceEnabled';

/* pop-up pages */
var gSTYLE_SELECT_PAGE = 'ed_styleselect.htm', gSTYLE_EDIT_PAGE = 'ed_style_frameset.htm';
var gTHEME_EDIT_PAGE = 'ed_theme_frameset.htm', gTHEME_SELECT_PAGE = 'ed_themeselect.htm';

/* Misc. */
var gSEPERATOR = '\t';
var gSTYLE_CLASS = new Array (new styleSelectObject ("Body text", "", "text-body", "Body", false),
						new styleSelectObject ("Header text", "", "text-header", "Header", false),
						new styleSelectObject ("Item Name", "", "text-prodprice", "ProdName", true),
						new styleSelectObject ("Item Description", "", "text-proddesc", "ProdDesc", true),
						new styleSelectObject ("Item Price", "", "text-prodprice", "ProdPrice", true));
						
var gTHEME_TXT_CLASS = new Array (new styleSelectObject ("Body text color", "", "text-body", "Body", false),
						new styleSelectObject ("Header text color", "", "text-header", "Header", false),
						new styleSelectObject ("Text link color", "", "A:LINK", "ALink", false),
						new styleSelectObject ("Visited link color", "", "A:VISITED", "AVisited", false),
						new styleSelectObject ("Item name color", "", "text-prodname", "ProdName", true),
						new styleSelectObject ("Item description color", "", "text-proddesc", "ProdDesc", true),
						new styleSelectObject ("Item price color", "", "text-prodprice", "ProdPrice", true));

/* Special */
/*   this var should contain the directory lisiting for the central thumbs directory, and should
**   only be instantiated once per context */
var gCENTRAL_THUMB_DIR_LIST = "";
/*	this var contains the product level info, it is instantiated as needed and should only be
**	instantiated once per context	*/
var gPRODUCT_LEVEL_OBJECT = "";

/************************************************************************
**	Function:	styleSelectObject (header, note, className, formNameKey)
**
**	Purpose:	Creates an object used for style custmization
*************************************************************************/						
function styleSelectObject (header, note, className, formNameKey, commerceSpecific)
{
	this.header = header;
	this.note = note;
	this.className = className;
	this.formNameKey = formNameKey;
	this.commerceSpecific = commerceSpecific;
}
	

/************************************************************************
**	Function:	checkReturnPage ()
**
**	Purpose:	Checks to see if a 'NextPage' was specified.  If it was it
**				will call a function to read and parse it, otherwise it will 
**				call the edit page function to re-open the current page
*************************************************************************/
function checkReturnPage ()
{
	var file = doAction('REQ_GET_FORMVALUE', "NextPage", "NextPage");
	if (file)
			return (readAndParseFile (file));
	else
		return (EditPage ());
}

/************************************************************************
**	Function:	readAndParseFile (file)
**
**	Purpose:	Reads file in, sends it to parse buffer, and returns the output
*************************************************************************/
function readAndParseFile (file)
{
	var whichFile = doActionEx	('DATA_READFILE',file, 'FileName', file,'ObjectName',gPRIVATE_SITE, 
								'FileType', 'txt');
	return (doActionEx('PAR_PARSE_BUFFER','Result', 'document', whichFile));
}


/********************************************************************************/
/************************************** Site Editor *****************************/
/********************************************************************************/

/************************************************************************
**	Function:	saveCustomStyle (fileName)
**
**	Purpose:	
*************************************************************************/						
function saveCustomStyle (fileName)
{
	var fileOut = "\n";
			
	for (var n = 0; n < gSTYLE_CLASS.length; n++)
	{
		var bold = doAction('REQ_GET_FORMVALUE', gSTYLE_CLASS[n].formNameKey+"Bold", gSTYLE_CLASS[n].formNameKey+"Bold");
		var italic = doAction('REQ_GET_FORMVALUE', gSTYLE_CLASS[n].formNameKey+"Italic", gSTYLE_CLASS[n].formNameKey+"Italic");
		var fontSize = doAction('REQ_GET_FORMVALUE', gSTYLE_CLASS[n].formNameKey+"FontSize", gSTYLE_CLASS[n].formNameKey+"FontSize");
		var fontFamily = doAction('REQ_GET_FORMVALUE', gSTYLE_CLASS[n].formNameKey+"FontFamily", gSTYLE_CLASS[n].formNameKey+"FontFamily");

		fileOut += "." + gSTYLE_CLASS[n].className + " {\n"+
					"font-family:"+
					fontFamily+";\n"+
					"font-weight:"+
					(bold ? bold : "normal")+";\n"+
					"font-style:"+
					(italic ? italic : "normal")+";\n"+
					"font-size:"+
					fontSize+";\n"+
					"}\n\n";
	}
	
	var written = doAction ('DATA_WRITEFILE', 'FileName', gSTYLES_DIR+fileName,'Data', fileOut, 'Size', 
										fileOut.length, 'ObjectName', gPUBLIC,'Permissions',0644);
}


/************************************************************************
**	Function:	saveCustomTheme (fileName)
**
**	Purpose:	
*************************************************************************/						
function saveCustomTheme (fileName)
{
	var fileOut = "\n";
	var themeClass = new Array ();
	var classesUsed = doAction('REQ_GET_FORMVALUE', 'ClassesUsed', 'ClassesUsed');
	themeClass = classesUsed.split (gSEPERATOR);		
	

	for (var n = 0; n < themeClass.length; n++)
	{
		var style = doAction('REQ_GET_FORMVALUE', themeClass[n], themeClass[n]);
		// put a semi-colon on the end to terminate the style entry
		if (style.length > 0)
			if (style.charAt(style.length - 1) != ';')
				style += ";";
		if (themeClass[n].indexOf(":") < 0)
			fileOut += ".";
		fileOut += themeClass[n] + " {\n"+
					style +
					"\n}\n\n";
	}
	
	var written = doAction ('DATA_WRITEFILE', 'FileName', gTHEMES_DIR+fileName,'Data', fileOut, 'Size', 
										fileOut.length, 'ObjectName', gPUBLIC,'Permissions',0644);
}

/************************************************************************
**	Function:	generateBaseThemeHeaderHTML (themeSrc, retPage)
**
**	Purpose:	generates HTML output with a sample header, the name
**				of the theme in italics, and two buttons.
*************************************************************************/
function generateBaseThemeHeaderHTML (themeSrc, retPage)
{
	// this code would normally go directly into the style pages since its page
	// specific, but it's used on 2 seperate pages relating to styles, and I didn't
	// want to maintain this in 2 areas
	var myTheme = themeSrc;
	if ((myTheme.indexOf("TC_") == 0) || (myTheme.indexOf("TS_") == 0))
		myTheme = myTheme.slice (3);
	
	var out =generateThemeThumb (themeSrc, '');
	out +=  "</p><p><a href='javascr";
	out +=  "ipt:void(0)' onClick = 'if (submitToWindow){submitToWindow(\""+retPage+"\", \"\", \"";
	out +=	themeSrc+"\", \""+gBASE_PAGE+"\", \""+gTHEME_EDIT_PAGE+"\", \"500\", \"600\");}'>";
	out +=  "<img src='/cgi-docs/Mercantec/PC_F_6.6.1/images/Edit_Nbtn_base2.gif' border='0' width='86' height='30' align='middle' alt='Edit your base theme'></a>";
	out +=  "<a href='javascr";
	out +=  "ipt:void(0)' onClick = 'if (submitToWindow){submitToWindow(\""+retPage+"\", \"\", \"";
	out +=	themeSrc+"\", \""+gBASE_PAGE+"\", \""+gTHEME_SELECT_PAGE+"\", \"570\", \"670\");}'>";
	out +=  "<img src='/cgi-docs/Mercantec/PC_F_6.6.1/images/Replace_Nbtn_base2.gif' border='0' width='86' height='30' align='middle' alt='Replace your base theme'></a>";
	out +=  "<a href='javascr";
	out +=  "ipt:if (saveWindow){saveWindow();}";
	out +=	"parent.SubmitForm (\"SE_SetAllToBaseTheme\", \""+retPage+"\", \"mainFrame\", \"\");'>";
	out +=  "<img border='0' src='/cgi-docs/Mercantec/PC_F_6.6.1/images/Replace_All_With_Base_Nbtn_base_slg.gif' width='150' height='30' align='middle' alt='Replace all page themes with current base theme'></a><br>";
	return (out);
	
}

/************************************************************************
**	Function:	generateThemeTableHTML (themeSrc, pageObj, ratio)
**
**	Purpose:	generates HTML output with a sample table showing the
**				theme specified in 'themeSrc'.
**
**	Warning:	The wizard design page (pwizwat_3.htm) is only passing in
**			a pageObj with the layoutObjArray - all other fields of that
**			object are uninitialized.
*************************************************************************/
function generateThemeTableHTML (themeSrc, pageObj, ratio)
{
	var thumb_ratio = 0.0625;
	var publish = 0;
	if (ratio < 0)
	{
		publish = 1;
		ratio = Math.abs(ratio);
	}

	// regular expression objects used for parsing info out of style sheets
	// do this so multiple tables can appear on a page, each with its own set of
	// style attributes
	reTop = /\.bkgrd-top\s*\{([^}]*)/
	reLeft = /\.bkgrd-left\s*\{([^}]*)/
	reContent = /\.bkgrd-content\s*\{([^}]*)/;
	
	var mode = doAction('ST_GET_STATEDATA', 'PE_OutputMode', 'PE_OutputMode');
	if (mode && mode!="PE_EditMode" && pageObj.SecureBaseHref.toLowerCase() == "yes")
	{
		reTop = /\.secure-bkgrd-top\s*\{([^}]*)/
		reLeft = /\.secure-bkgrd-left\s*\{([^}]*)/
		reContent = /\.secure-bkgrd-content\s*\{([^}]*)/;
	}
	
	
	if (themeSrc.indexOf("TS_") == 0)
		var theme = doActionEx	('DATA_READFILE',themeSrc, 'FileName', themeSrc,'ObjectName',
								gTHEME_OBJ, 'FileType', 'txt');
	else
		var theme = doActionEx	('DATA_READFILE',gTHEMES_DIR+themeSrc, 'FileName', 
								gTHEMES_DIR+themeSrc,'ObjectName', gPUBLIC, 'FileType', 'txt');
							
	if (!pageObj)
	{
		var basePage = generateSEObjects (gBASE_PAGE);
		pageObj = basePage.pageObjArray[gBASE_PAGE];
	}

	ratio = (ratio ? ratio : thumb_ratio);
	var topHeight = (isNaN (pageObj.layoutObjArray.top.height) ? 5 : parseInt (pageObj.layoutObjArray.top.height * ratio));
	var topWidth = (isNaN (pageObj.layoutObjArray.top.width) ? 50 : parseInt (pageObj.layoutObjArray.top.width * ratio));
	var mainHeight = (isNaN (pageObj.layoutObjArray.main.height) ? 33 : parseInt (pageObj.layoutObjArray.main.height * ratio));
	var mainWidth = (isNaN (pageObj.layoutObjArray.main.width) ? 38 : parseInt (pageObj.layoutObjArray.main.width * ratio));
	var leftHeight = (isNaN (pageObj.layoutObjArray.left.height) ? 33 : parseInt (pageObj.layoutObjArray.left.height * ratio));
	var leftWidth = (isNaN (pageObj.layoutObjArray.left.width) ? 12 : parseInt (pageObj.layoutObjArray.left.width * ratio));

	//var topHeight = 5, topWidth = 50, leftHeight = 33, leftWidth = 12, mainHeight = 33, mainWidth = 38; 						
	
	(leftWidth ? topColSpan = "colspan=2" : topColSpan = "");

	if (publish)
	{
		var pageHeight = doAction('MPEA_GET_PAGEHEIGHT', 'Minimum', mainHeight.toString());
		if (!isNaN(pageHeight))
			mainHeight = pageHeight;
		var rc = "<table width="+topWidth+" height="+(topHeight+mainHeight)+" border=0 cellpadding=0 cellspacing=0>";
		rc += ((topHeight && topWidth) ? "<tr><td "+topColSpan+" width="+topWidth+" height="+topHeight+" style = 'font-size: 2px;"+reTop(theme)[1]+"'><!--Begin_Top_Content--><img src=\"/cgi-docs/Mercantec/PC_F_6.6.1/images/pxtransparent.gif\" width="+topWidth+" height="+topHeight+"><!--End_Top_Content--></td></tr>" : "");
		rc += "<tr>";
		rc += ((leftHeight && leftWidth) ? "<td width="+leftWidth+" height=\"100%\" style = '"+reLeft(theme)[1]+"'><!--Begin_Left_Content--><img src=\"/cgi-docs/Mercantec/PC_F_6.6.1/images/pxtransparent.gif\" width="+leftWidth+" height="+leftHeight+"><!--End_Left_Content--></td>" : "");
		rc += ((mainHeight && mainWidth) ? "<td width="+mainWidth+" height=\"100%\" style = '"+reContent(theme)[1]+"'><!--Begin_Main_Content--><img src=\"/cgi-docs/Mercantec/PC_F_6.6.1/images/pxtransparent.gif\" width="+mainWidth+" height="+mainHeight+"><!--End_Main_Content--></td>" : "");
		rc += "</tr>";
		rc += "</table>";
	}
	else
	{
		if (ratio != thumb_ratio)
		{
			// Displaying a thumbnail, don't get page height
			var pageHeight = doAction('MPEA_GET_PAGEHEIGHT', 'Minimum', mainHeight.toString());
			if (!isNaN(pageHeight))
				mainHeight = pageHeight;
		}
		var rc = "<table width="+topWidth+" height="+(topHeight+mainHeight)+" border=0 cellpadding=0 cellspacing=0>";
		rc += ((topHeight && topWidth) ? "<tr><td "+topColSpan+" width="+topWidth+" height="+topHeight+" style = 'font-size: 2px;"+reTop(theme)[1]+"'><!--Begin_Top_Content--><img src=\"/cgi-docs/Mercantec/PC_F_6.6.1/images/pxtransparent.gif\" width="+topWidth+" height=1><!--End_Top_Content--></td></tr>" : "");
		rc += "<tr>";
		rc += ((leftHeight && leftWidth) ? "<td width="+leftWidth+" height="+leftHeight+" style = '"+reLeft(theme)[1]+"'><!--Begin_Left_Content--><img src=\"/cgi-docs/Mercantec/PC_F_6.6.1/images/pxtransparent.gif\" width="+leftWidth+" height=1><!--End_Left_Content--></td>" : "");
		rc += ((mainHeight && mainWidth) ? "<td width="+mainWidth+" height="+mainHeight+" style = '"+reContent(theme)[1]+"'><!--Begin_Main_Content--><img src=\"/cgi-docs/Mercantec/PC_F_6.6.1/images/pxtransparent.gif\" width="+mainWidth+" height=1><!--End_Main_Content--></td>" : "");
		rc += "</tr>";
		rc += "</table>";
	}
	return (rc);
}



/************************************************************************
**	Function:	generateThemeThumb (themeSrc, pageObj)
**
**	Purpose:	Returns a thumbnail image for the theme if it exists,
**				otherwise returns a miniature of the table.  Images need to exist
**				in the central images/thumbs directory and be either .gif
**				or .jpg
*************************************************************************/
function generateThemeThumb (themeSrc, pageObj)
{
	/* don't do a directory list if one already exists */
	if (!gCENTRAL_THUMB_DIR_LIST)
		gCENTRAL_THUMB_DIR_LIST = doActionBDO ("DATA_DIRECTORYLIST", "ObjectName", "Central",
											 "SubDirectoryPath", gIMAGES_DIR + "thumbs/*.*");
												
	var labels = gCENTRAL_THUMB_DIR_LIST.GetLabels();
	
	if (!pageObj)
	{
		var basePage = generateSEObjects (gBASE_PAGE);
		pageObj = basePage.pageObjArray[gBASE_PAGE];
	}
	
	var leftWidth = (isNaN (pageObj.layoutObjArray.left.width) ? 0 : parseInt (pageObj.layoutObjArray.left.width));
	var topHeight = (isNaN (pageObj.layoutObjArray.top.height) ? 0 : parseInt (pageObj.layoutObjArray.top.height));
	var themeID = "t_";
	if (leftWidth <= 0 && topHeight <= 0)
		themeID = "tf_";
	else if (leftWidth <= 0 && topHeight > 0)
		themeID = "tt_";
	else if (leftWidth > 0 && topHeight <= 0)
		themeID = "tl_";
	
	var bFound = false;
	var curTheme = themeID + themeSrc.substring (3, themeSrc.lastIndexOf (".")) + ".gif";
	var curThemeJpg = themeID + themeSrc.substring (3, themeSrc.lastIndexOf (".")) + ".jpg";
	for (var n = 0; n < labels.length && !bFound; n++)
	{
		if (gCENTRAL_THUMB_DIR_LIST[labels[n]] == curTheme)
			bFound = true;
		else if (gCENTRAL_THUMB_DIR_LIST[labels[n]] == curThemeJpg)
		{
			bFound = true;
			curTheme = curThemeJpg;
		}
	}
	if (bFound)
		return ("<img src='"+gCOMMON_URL + gWEB_ALIAS_IMAGES + "/thumbs/"+curTheme+"'>");
	else
		return (generateThemeTableHTML (themeSrc, pageObj, ''));
}


/************************************************************************
**	Function:	getTheme (pageName)
**
**	Purpose:	Returns the theme for pageName
*************************************************************************/
function getTheme (pageName)
{
	var theme =  doAction ('DATA_GETCONFIGDATA',  'ObjectName', gSITE_ED_FILE,  'RowName', 
									pageName, 'ColName', gTHEME);
	return (theme);
}

/************************************************************************
**	Function:	setTheme (theme, pageName)
**
**	Purpose:	Sets the the theme for the page 'pageName' to 'theme'
**				pageName can be an individual file or a series of files
**				delimited by a '<br>' tag.
*************************************************************************/	
function setTheme (theme, pageName)
{
	// check to see if base page is in page list
	if (pageName.indexOf(gBASE_PAGE) >= 0)
		var base = theme;
	else
		var base = getTheme (gBASE_PAGE);
		
	pageName = pageName.split ("<br>");
	for (var n = 0; n < pageName.length; n++)
		setSiteEditorCfgField (pageName[n], gTHEME, theme, base)			
}


/************************************************************************
**	Function:	generateBaseStyleHeaderHTML (styleSrc, retPage)
**
**	Purpose:	generates HTML output with a sample header, the name
**				of the style in italics, and two buttons.
*************************************************************************/
function generateBaseStyleHeaderHTML (styleSrc, retPage)
{
	// this code would normally go directly into the theme pages since its page
	// specific, but it's used on 2 seperate pages relating to themes, and I didn't
	// want to maintain this in 2 areas
	var out =	generateStyleHTML (styleSrc);
	
	var myStyle = styleSrc;
	if ((myStyle.indexOf("SC_") == 0) || (myStyle.indexOf("SS_") == 0))
		myStyle = myStyle.slice (3);
				
	out +=  "</p><p><a href='javascr";
	out +=  "ipt:void(0)' onClick = 'if (submitToWindow){submitToWindow(\""+retPage+"\", \""+styleSrc;
	out +=	"\", \"\", \""+gBASE_PAGE+"\", \""+gSTYLE_EDIT_PAGE+"\", \"495\", \"700\");}'>";
	out +=  "<img src='/cgi-docs/Mercantec/PC_F_6.6.1/images/Edit_Nbtn_base2.gif' border='0' width='86' height='30' align='middle' alt='Edit your base style'></a>";
	out +=  "<a href='javascr";
	out +=  "ipt:void(0)' onClick = 'if (submitToWindow){submitToWindow(\""+retPage+"\", \""+styleSrc;
	out +=	"\", \"\", \""+gBASE_PAGE+"\", \""+gSTYLE_SELECT_PAGE+"\", \"570\", \"670\");}'>";
	out +=  "<img src='/cgi-docs/Mercantec/PC_F_6.6.1/images/Replace_Nbtn_base2.gif' border='0' width='86' height='30' align='middle' alt='Replace your base style'></a>";
	out +=  "<a href='javascr";
	out +=  "ipt:if (saveWindow){saveWindow();}";
	out +=	"parent.SubmitForm (\"SE_SetAllToBaseStyle\", \""+retPage+"\", \"mainFrame\", \"\");'>";
	out +=  "<img border='0' src='/cgi-docs/Mercantec/PC_F_6.6.1/images/Replace_All_With_Base_Nbtn_base_slg.gif' width='150' height='30' align='middle' alt='Replace all page styles with current base style'></a><br>";
	return (out);
}

/************************************************************************
**	Function:	generateStyleHTML (styleSrc)
**
**	Purpose:	generates HTML output with a sample showing the
**				style specified in 'styleSrc'.
*************************************************************************/
function generateStyleHTML (styleSrc)
{
	reHeader = /\.text-header\s*\{([^}]*)/
	reBody = /\.text-body\s*\{([^}]*)/
		
	if (styleSrc.indexOf("SS_") == 0)
		var style = doActionEx	('DATA_READFILE',styleSrc, 'FileName', styleSrc,'ObjectName',
								gSTYLE_OBJ, 'FileType', 'txt');
	else		
		var style = doActionEx	('DATA_READFILE',gSTYLES_DIR+styleSrc, 'FileName', gSTYLES_DIR+styleSrc,
								'ObjectName', gPUBLIC, 'FileType', 'txt');

	var rc = "<table width = '100%' border='1' bgcolor='#FFFFFF'><tr><td>";
        rc += "<div align='center'><b><i>";
        rc += "<font size='5' color='#000000'  style = '"+reHeader(style)[1]+";TEXT-ALIGN: center;'>";
        rc += "Sample Header<br></font></i></b>";
        rc += "<font size='4' color='#000000'  style = '"+reBody(style)[1]+";TEXT-ALIGN: center;'>";
        rc += "Sample Body</font></div></td></tr></table>";
	return (rc);
}

/************************************************************************
**	Function:	getStyle (pageName)
**
**	Purpose:	Returns the style for pageName
*************************************************************************/
function getStyle (pageName)
{
	var style =  doAction ('DATA_GETCONFIGDATA',  'ObjectName', gSITE_ED_FILE,  'RowName', 
									pageName, 'ColName', gSTYLE);
	return (style);
}

/************************************************************************
**	Function:	setStyle (style, pageName)
**
**	Purpose:	Sets the the style for the page 'pageName' to 'style'
**				pageName can be an individual file or a series of files
**				delimited by a '<br>' tag.
*************************************************************************/	
function setStyle (style, pageName)
{
	// check to see if base page is in page list
	if (pageName.indexOf(gBASE_PAGE) >= 0)
		var base = style;
	else
		var base = getStyle (gBASE_PAGE);
	pageName = pageName.split ("<br>");
	for (var n = 0; n < pageName.length; n++)
		setSiteEditorCfgField (pageName[n], gSTYLE, style, base)			
}


/************************************************************************
**	Function:	getThemeStyleList (bCustomOnly, bThemes, bStyles)
**
**	Purpose:	Returns an array of style sheet names for available
**				styles and/or themes, if bCustomOnly is set to true, only custom 
**				styles will be returned.  bThemes and bStyles should be set to
**				true or false to receive one or both list.  lists are returned
**				in a multi-dimensional array divided by theme | style, then by
**				custom | suppplied, so if you assigned the return value to 'rc', you would
**				access a custom style as rc.styles.customStyles[0] etc.
*************************************************************************/	
function getThemeStyleList (bCustomOnly, bThemes, bStyles)
{
	var styles = new Array(), themes = new Array();
	var supStyles = new Array(), supThemes = new Array();
	var custStyles = new Array(), custThemes = new Array();
	var out = new Array();
	if(bStyles)
	{
		var dirList = doActionBDO ("DATA_DIRECTORYLIST", "ObjectName", gPUBLIC,
									"SubDirectoryPath", gSTYLES_DIR+"*.css");
		var labels = dirList.GetLabels();
		for (var n = 0; n < labels.length; n++)
		{
			if (dirList[labels[n]].indexOf ("SC_") == 0)
				custStyles.push (dirList[labels[n]]);
		}
		if (!bCustomOnly)
		{
			var globalDirList = doActionBDO ("DATA_DIRECTORYLIST", "ObjectName", gSTYLE_OBJ);
			var globalLabels = globalDirList.GetLabels();
			for (var n = 0; n < globalLabels.length; n++)
				if (globalDirList[globalLabels[n]].indexOf ("SS_") == 0)
					supStyles.push (globalDirList[globalLabels[n]]);
		}
	}
	if (bThemes)
	{
		var dirList = doActionBDO ("DATA_DIRECTORYLIST", "ObjectName", gPUBLIC,
									"SubDirectoryPath", gTHEMES_DIR+"*.css");
		var labels = dirList.GetLabels();
		for (var n = 0; n < labels.length; n++)
		{
			if (dirList[labels[n]].indexOf ("TC_") == 0)
				custThemes.push (dirList[labels[n]]);
		}
		if (!bCustomOnly)
		{
			var themeLevel = doActionEx("DATA_GETLITERAL","Result","ObjectName",gLICENSE_CFG,"LiteralID","THEME_CHOICE");
			if (themeLevel)
			{
				themeLevel += ".txt";
				var themeList = doActionEx	('DATA_READFILE',themeLevel, 'FileName', themeLevel,
											'ObjectName',gTHEME_OBJ, 'FileType', 'txt');
				if (themeList)
				{
					themeList = themeList.replace (/\r|\f/g, "");
					var themeArray = themeList.split ("\n");
					for (var n = 0; n < themeArray.length; n++)
					{
						if (themeArray[n].length > 0)
							supThemes.push (themeArray[n]);
					}
				}
			}
		}
	}
	styles ["customStyles"] = custStyles;
	styles ["suppliedStyles"] = supStyles;
	out["styles"] = styles;
	themes ["customThemes"] = custThemes;
	themes ["suppliedThemes"] = supThemes;
	out["themes"] = themes;
	return (out);
}

/************************************************************************
**	Function:	generateNavButtonsHTML (aTop, aLeft, aWidth, aHeight, bTop, bLeft, bWidth, bHeight, 
**						createlinks, mode)
**				top left corners and widths of the cells
**				widths and heights are in for wrapping
**	Purpose:	generates a button for each HTML page.
*************************************************************************/
function generateNavButtonsHTML (aTop, aLeft, aWidth, aHeight, bTop, bLeft, bWidth, bHeight, createLinks, mode)
{
	var pageObjs = generateSEObjects ('');
	// Begin New For Service
/*	if (mode && mode != "PE_EditMode" && IsServiceEnabled())
	{
		var tempList = sortByButtonOrder (pageObjs);
		var baseSvcName = "Schedule";
		var svcName = baseSvcName;
		var tmpNum = 2;
		while (pageObjs.pageObjArray[svcName])
			svcName = baseSvcName + (tmpNum++);
		pageObjs.pageObjArray[svcName] = new SE_Obj ();
		pageObjs.pageObjArray[svcName][gBUTTON_ORDER] = (tempList.length + 1);
		pageObjs.pageObjArray[svcName][gPAGE_TYPE] = "ServiceHome";
		pageObjs.pageList[pageObjs.pageList.length] = svcName;
	}
*/
	// End New New For Service
	var btnWidth = 100;
	var btnHeight = 25;
	var rc = new Array();
	var align = pageObjs.pageObjArray[gBASE_PAGE].ButtonAlignment;
	var maxBtnsPerRow_a = parseInt(aWidth / btnWidth);
//	var maxRowsPerArea_a = parseInt(aHeight / btnHeight);
	var btnRowCount = Math.min(maxBtnsPerRow_a, pageObjs.pageList.length-1); // don't count *BasePage*
	var rowsNeeded = parseInt((pageObjs.pageList.length-1) / maxBtnsPerRow_a) +1;
	var webAddr = "";
	if (mode && mode == "PE_PublishMode")
		webAddr = doAction ('DATA_GETCONFIGDATA',  'ObjectName', 'PageEditorCfg',  'RowName', 
							'PublishLinkHref', 'ColName', 'Value');
	else if (mode && mode == "PE_PreviewMode")
		webAddr = doAction ('DATA_GETCONFIGDATA',  'ObjectName', 'PageEditorCfg',  'RowName', 
							'PreviewLinkHref', 'ColName', 'Value');
	var startTleft = aLeft + ((aWidth / 2) - ((btnRowCount * btnWidth) / 2));
	var startLleft = bLeft + ((bWidth / 2) - (btnWidth / 2));
	var startTtop = aTop + aHeight - (rowsNeeded * btnHeight);
	if (startTtop < 0)
		startTtop = btnHeight * 3;
	if (startLleft < 0)
		startLleft = aLeft;

	for (var n = 0, zIndex = 10000; n < pageObjs.pageList.length; n++)
	{
		var pos = parseInt (pageObjs.pageObjArray[pageObjs.pageList[n]][gBUTTON_ORDER]);
		if (pageObjs.pageList[n] == gBASE_PAGE || pos < 0)
			continue;

		// Netscape doesn't like spaces in the id, so create a unique ID with no spaces
		var divId = pageObjs.pageList[n].replace (/ /g, "") + pos;
		var pxTopPos;
		if (align == "LeftVertical")
		{
			pxTopPos = bTop + (btnHeight * (pos - 1));
			pxLeftPos = startLleft;
		}
		else
		{
			var col = (pos-1) % maxBtnsPerRow_a;
			var row = parseInt((pos-1) / maxBtnsPerRow_a);
			pxLeftPos = startTleft + (col * btnWidth);
			pxTopPos = startTtop + (row * btnHeight);
		}
		rc [pos] = generatePageButtonsHTML (pageObjs, pageObjs.pageList[n], 
						(createLinks ? webAddr + pageObjs.pageList[n] : ''), 
						(pxLeftPos.toString()+'px'), (pxTopPos.toString()+'px'),
						(btnWidth.toString()+'px'), (btnHeight.toString()+'px'),
						'btn-background', 'btn-text', zIndex++, divId, mode);
	}
	return (rc.slice(1));
}

function IsCommerceEnabled()
{
	// see if its already instantiated and if not then instantiate it
	if (!gPRODUCT_LEVEL_OBJECT)
	{
		var sndRegJs = doActionEx ('DATA_READFILE','sendreg.js', 'FileName', 'sendreg.js',
										'ObjectName','JS_SRC', 'FileType', 'txt');
		eval (sndRegJs);
		gPRODUCT_LEVEL_OBJECT = getProdInfo();
	}
	if (gPRODUCT_LEVEL_OBJECT && gPRODUCT_LEVEL_OBJECT.POWER_RETAIL_LEVEL.Installed)
		return true;
	else
		return false;
}

function IsCommerceWizComplete()
{
	var bWizComplete = false;
	var max_wizstate = doAction('DATA_GETCONFIGDATA', 'ObjectName', 'CommerceWizCfg', 'RowName', 
								'WizardNumPages', 'ColName', 'Value');
								
	var wizstate = doAction('DATA_GETCONFIGDATA', 'ObjectName', 'CommerceWizCfg', 'RowName', 
								'WizardState', 'ColName', 'Value');
	if (max_wizstate && wizstate)
		bWizComplete = (parseInt(wizstate) > parseInt(max_wizstate));
	return bWizComplete;
}

function IsServiceEnabled()
{
	// see if its already instantiated and if not then instantiate it
	if (!gPRODUCT_LEVEL_OBJECT)
	{
		var sndRegJs = doActionEx ('DATA_READFILE','sendreg.js', 'FileName', 'sendreg.js',
										'ObjectName','JS_SRC', 'FileType', 'txt');
		eval (sndRegJs);
		gPRODUCT_LEVEL_OBJECT = getProdInfo();
	}
	if (gPRODUCT_LEVEL_OBJECT && gPRODUCT_LEVEL_OBJECT.POWER_SERVICE_LEVEL.Installed)
		return true;
	else
		return false;
}

function IsServiceWizComplete()
{
	var bWizComplete = false;
	var max_wizstate = doAction('DATA_GETCONFIGDATA', 'ObjectName', 'ServicesCfg', 'RowName', 
								'WizardNumPages', 'ColName', 'Value');
								
	var wizstate = doAction('DATA_GETCONFIGDATA', 'ObjectName', 'ServicesCfg', 'RowName', 
								'WizardState', 'ColName', 'Value');
	if (max_wizstate && wizstate)
		bWizComplete = (parseInt(wizstate) > parseInt(max_wizstate));
	return bWizComplete;
}

/************************************************************************
**	Function:	generatePageButtonsHTML ()
**
**	Purpose:	generates a button for each HTML page.
*************************************************************************/
function generatePageButtonsHTML (pageObjs, pageName, linkHref, left, top, buttonWidth, buttonHeight, 
				buttonClass, buttonTextClass, lowZIndex, divId, mode)
{
	if (!pageObjs)
		pageObjs = generateSEObjects ('');
	var bCommerce = (IsCommerceEnabled() && IsCommerceWizComplete());
	var bService = (IsServiceEnabled() && IsServiceWizComplete());
	var FileExt = pageObjs.pageObjArray[pageName].FileExt;
	if (mode && mode == "WIZ_Preview")
		FileExt = "";
	var beginTable = "<table width='"+buttonWidth+"' height='"+buttonHeight+"' border='0' cellspacing='0' cellpadding='0'><tr><td valign='middle'>";
	var endTable = "</td></tr></table>";
	var style = "position:absolute; left:"+left+"; top:"+top+"; width:"+buttonWidth+"; height:"+buttonHeight+"";
	var link;
	if (mode && mode == "PE_EditMode")
	{
		if (pageObjs.pageObjArray[pageName][gPAGE_TYPE] == "ServiceHome")
			linkHref = "ScheduleSvcs";
		link = "<a "+ (linkHref ? "href=\"javascript:editPage('"+linkHref+"');\"" : "") + ">";
	}
	else if (mode && mode == "WIZ_Preview")
		link = "<a "+ (linkHref ? "href='"+linkHref+"'" : "") + ">";
	else
	{
		var path = linkHref+FileExt;

		/* need to escape spaces out of filename, but we don't want to
		** escape the whole thing, i.e. colons, etc. so we parse after the domain */
		var findPos = path.indexOf ("//");
		var findPos2 = 0;
		if (findPos >= 0)
			findPos2 = path.indexOf ("/", findPos+2);
		if (findPos2 < 0)
			findPos2 = 0;	
			
		path = path.substring (0, findPos2+1) + escape (path.substr(findPos2+1));

		var preview = "";
		var linkPageName = pageName + FileExt;
		linkPageName = escape(linkPageName);
		if (mode && mode == "PE_PreviewMode")
			preview = "&Preview=1";
		var currentPageName = doAction("ST_GET_STATEDATA", "CurrentPageName", "CurrentPageName");
		if (pageObjs.pageObjArray[currentPageName][gPAGE_TYPE] == "HomePage" && (bCommerce || bService) && linkHref)
		{
			/* if the current page being generated is the HomePage and commerce is enabled
			** put in a full URL including the cgi app
			*/
			var urlpath = doActionEx("DATA_GETLITERAL","Result","ObjectName","storecfg","LiteralID","SiteUrl");
			var siteid = doActionEx("REQ_GET_FORMVALUE","Result","SiteID","SiteID");
			var appid = "shop";
			var action = "link";
			// Begin Old For Service
			//	if (pageObjs.pageObjArray[pageName][gPAGE_TYPE] == "ShopHome")
			//		action = "entry"; /* shophome page should enter at top of category list */
			//	link = "<a href=\""+ urlpath + "?sh_action="+action+"&SiteID=" + siteid + "&AppID=" + appid + "&PageName="+linkPageName+preview +"\">";
			// End Old For Service
			// Begin New For Service
			var target = "";
			if (pageObjs.pageObjArray[pageName][gPAGE_TYPE] == "ShopHome")
			{
				action = "entry"; /* shophome page should enter at top of category list */
				if (bCommerce && bService)
					target = " target='_blank'";
			}
			else if (pageObjs.pageObjArray[pageName][gPAGE_TYPE] == "ServiceHome")
			{
				action = "entry"; /* shophome page should enter at top of category list */
				linkPageName = "ScheduleSvcs" + pageObjs.pageObjArray[pageName].FileExt;
				if (bCommerce && bService)
					target = " target='_blank'";
			}
			link = "<a href=\""+ urlpath + "?sh_action="+action+"&SiteID=" + siteid + "&AppID=" + appid + "&PageName="+linkPageName+preview + "\"" + target +">";
			// End New For Service
		}
		// Begin Old For Service
		// else if (bCommerce)
		// End Old For Service
		// Begin New For Service
		else if (bCommerce || bService)
		// End New For Service
		{
			var action = "link";
			/* if we are linking back to the home page, don't parse as the home page
			** has full URLs already
			*/
			// Begin Old
			//	if (pageObjs.pageObjArray[pageName][gPAGE_TYPE] == "ShopHome")
			//		action = "entry"; /* shophome page should enter at top of category list */
			//	link = "<a "+ (linkHref ? "href=\"&sh_action="+action+"&AppID=shop&PageName="+linkPageName+preview+"\"" : "") + ">";
			// End Old
			// Begin New
			var target = "";
			if (pageObjs.pageObjArray[pageName][gPAGE_TYPE] == "ShopHome")
			{
				action = "entry"; /* shophome page should enter at top of category list */
				if (bCommerce && bService)
					target = " target='_blank'";
			}
			else if (pageObjs.pageObjArray[pageName][gPAGE_TYPE] == "ServiceHome")
			{
				action = "entry"; /* shophome page should enter at top of category list */
				linkPageName = "ScheduleSvcs" + pageObjs.pageObjArray[pageName].FileExt;
				if (bCommerce && bService)
					target = " target='_blank'";
			}
	
			link = "<a "+ (linkHref ? "href=\"&sh_action="+action+"&AppID=shop&PageName="+linkPageName+preview+"\"" : "") + target +">";
			// End New
		}
		else
			link = "<a "+ (linkHref ? "href=\""+path+"\"" : "") + ">";
	}
	
	var div = "<div id='"+divId+"' name='"+divId+"' class='"+buttonClass+"' style='"+style+"; z-index: "+lowZIndex+"'>";
	var divImg = "<div id='"+divId+"Image' name='"+divId+"Image' style='"+style+"; z-index: "+(lowZIndex + 1)+"'>";;
	var rc = divImg + beginTable + link;
	rc += "<img src='/cgi-docs/Mercantec/PC_F_6.6.1/images/pxtransparent.gif' width='"+buttonWidth+"' height='"+buttonHeight+"' border='0' alt='"+pageName+"'></a>";
	rc += endTable + "</div>";
	rc += div + beginTable + "<center>" + link;
	rc += "<span class='"+buttonTextClass+"'>"+pageName+"</span></a></center>";
	rc += endTable + "</div>";

	return (rc);
}



/************************************************************************
**	Function:	sortByButtonOrder (pageObjs)
**
**	Purpose:	sorts the pageList array in seObject by button order.
*************************************************************************/
function sortByButtonOrder (pageObjs)
{
	var sortedList = new Array ();
	for (var n = 0; n < pageObjs.pageList.length; n++)
	{
		var pos = parseInt (pageObjs.pageObjArray[pageObjs.pageList[n]][gBUTTON_ORDER]);
		if (pos >= 0)
			sortedList [pos] = pageObjs.pageList[n];
	}
	// get rid of [0] since 0 is not a valid position, we get rid of it here instead of
	// above so that the array integrity is maintained (i.e. [0, 1, 2, ...])
	return (sortedList.slice(1));
}

/************************************************************************
**	Function:	deleteSiteEditorConfigEntry (pageName)
**
**	Purpose:	removes pageName from the site editor config file, collapsing
**				any fields appropriately	
*************************************************************************/
function deleteSiteEditorConfigEntry (pageName)
{
	if (!pageName)
		return false;
	if (pageName == gBASE_PAGE)
		return false;

	var seObj = generateSEObjects ('');
	
	if (seObj.pageObjArray[pageName])
	{
		var buttonOrd = parseInt (seObj.pageObjArray[pageName][gBUTTON_ORDER]);
		doAction('DATA_DELETECONFIGROW', 'ObjectName', gSITE_ED_FILE, 'RowName', delPage);
		for (var n = 0; n < seObj.pageList.length; n++)
		{
			if (seObj.pageList[n] != pageName && seObj.pageList[n] != gBASE_PAGE)
			{
				var newButton = parseInt (seObj.pageObjArray[seObj.pageList[n]][gBUTTON_ORDER]);
				if (newButton > buttonOrd)
					setSiteEditorCfgField (seObj.pageList[n], gBUTTON_ORDER, 
											(newButton-1).toString(), 
											seObj.pageObjArray[gBASE_PAGE][gBUTTON_ORDER])
			}
		}
	}
}

/************************************************************************
**	Function:	generatePageList ()
**
**	Purpose:	generates an array of pages from the site editor cfg file
**				minus the current working page, and base page entries.  Also 
**				filters the list based on licese
*************************************************************************/
function generatePageList ()
{
	var result = doAction ('DATA_GETHEADERS',  'GetRow', true, 'ObjectName', gSITE_ED_FILE);
	result = result.split('\t');
	var out = new Array ();
	var validPageObjArray = new Array();
	var inValidPageObjArray = new Array();
	var bCommerce = (IsCommerceEnabled() && IsCommerceWizComplete());
	var bService = (IsServiceEnabled() && IsServiceWizComplete());
	
	for (var n = 0; n < result.length; n++)
	{
		if (result[n].length > 0 && result[n] != gBASE_PAGE && result[n] != gCURRENT_PAGE)
		{
			var tmpObj = generateSEObjects (result[n]);
			var licenseFor = tmpObj.pageObjArray[result[n]][gLICENSE_FOR];
			var bValid = false;
			// filter the list for licensed pages
			if (licenseFor)
			{
				if (licenseFor.toLowerCase() == "all" ||
					(licenseFor.toLowerCase() == "powercommerce" && bCommerce) ||
					(licenseFor.toLowerCase() == "powerservice" && bService))
					bValid = true;
			}
			if (bValid)
			{
				out.push (result[n]);
				validPageObjArray.push(tmpObj);
			}
			else
				inValidPageObjArray.push(tmpObj);
		}
	}
	var nOrder = resetButtonOrders (validPageObjArray, 1);
	resetButtonOrders (inValidPageObjArray, nOrder);
			
	return (out);
}

/************************************************************************
**	Function:	resetButtonOrders (pgObjArray, nStartNum)
**
**	Purpose:	takes an array of single page SEObjects, calls sort on them,
**				and then collapses the button order in SiteEditor.cfg starting
**				number 'nStartNum'
*************************************************************************/
function resetButtonOrders (pgObjArray, nStartNum)
{
	pgObjArray.sort(sortPageObjArrayByButtonOrder);
	for (var n = 0; n < pgObjArray.length; n++)
	{
		var wkPageName = pgObjArray[n].pageList[1];
		var wkgBOrder = pgObjArray[n].pageObjArray[wkPageName][gBUTTON_ORDER];
		if (wkgBOrder > 0)
		{
			if (wkgBOrder != nStartNum)
				setSiteEditorCfgField (wkPageName, gBUTTON_ORDER, nStartNum.toString(), "0");
			nStartNum++;
		}
	}
	return nStartNum;
}

/************************************************************************
**	Function:	sortPageObjArrayByButtonOrder (a, b)
**
**	Purpose:	Array sort function. 'a' and 'b' are assumed to be single page
**				SEObjects, sorts by button order with -1 buttons being at the
**				back.
*************************************************************************/
function sortPageObjArrayByButtonOrder (a, b)
{
	var agBOrder = a.pageObjArray[a.pageList[1]][gBUTTON_ORDER];
	var bgBOrder = b.pageObjArray[b.pageList[1]][gBUTTON_ORDER];
	if (agBOrder == bgBOrder)
		return 0;
	else if (bgBOrder < 0)
		return -1;
	else if (agBOrder < 0)
		return 1;
	
	return (agBOrder - bgBOrder);
}

/************************************************************************
**	Function:	generateLayoutObject ()
**
**	Purpose:	generates an array of objects referencing the page layout
*************************************************************************/
function generateLayoutObject (layoutObjName)
{
	var tempObj = new SE_Obj ();
	var layout = doAction ('DATA_GETHEADERS',  'GetRow', true, 'ObjectName', layoutObjName).split('\t');
	var layoutObj = new Array();
	for (var z = 0; z < layout.length; z++)
	{
		if (layout[z])
		{
			var test = doActionBDO ("MPEA_BDO_DESERIALIZE", "SerializedBdo", layout[z]);
			layoutObj [test.name] = test;
		}
	}
	return layoutObj;
}

/************************************************************************
**	Function:	SE_Obj ()
**
**	Purpose:	Empty SiteEditor Object prototype.
*************************************************************************/
function SE_Obj (){}

/************************************************************************
**	Function:	retObj ()
**
**	Purpose:	Return Object prototype.
*************************************************************************/
function retObj (pageObjArray, pageList, colNames)
{
	this.pageObjArray = pageObjArray;
	this.pageList = pageList;
	this.colNames = colNames;
}
/************************************************************************
**	Function:	retCfgObj ()
**
**	Purpose:	Return Object prototype.
*************************************************************************/
function retCfgObj (ObjArray, rowNames, colNames)
{
	this.ObjArray = ObjArray;
	this.rowNames = rowNames;
	this.colNames = colNames;
}

/************************************************************************
**	Function:	generateSEObjects (pageName)
**
**	Purpose:	Generates an array of site editor objects from the SiteEditor 
**				cfg file.  If pageName is empty all site editor objects are built.  
**				The return object contains:  
**					'pageList'				which is an array of page names
**											of the pages converted
**					'colNames'				array of column headers for which page values are
**											stored
**					'pageObjArray'			array of page objects referenced by the page name,
**											for example if the value of this function is
**											returned to a variable 'rc' then the 'Theme' value 
**											of 'pagone' can be referenced by 
**												rc.pageObjArray['pageone'].Theme
**													-or-
**												rc.pageObjArray.pageone.Theme
**						'layoutObjArray'	Stored within the 'pageObjArray' this is an
**											array of objects referencing the layout of the page.
**											Given the above example you can access the 'height'
**											attribute of the 'top' cell like so
**												rc.pageObjArray.pageone.layoutObjArray.top.height
*************************************************************************/
function generateSEObjects (pageName)
{
	var pageObjArray = new Array();
	if (pageName.length > 0)
	{
		if (pageName == gBASE_PAGE)
			var pageList = new Array ();
		else
			var pageList = new Array (pageName);
	}
	else
		var pageList = generatePageList ();
	var colNames = doAction ('DATA_GETHEADERS',  'GetCol', true, 'ObjectName', gSITE_ED_FILE).split ('\t');				
	var basePage = doActionBDO ('DATA_GETCONFIGROW', 'ObjectName', gSITE_ED_FILE,  'RowName', gBASE_PAGE);
			
	for (var n = 0; n < colNames.length; n++)
		eval ("SE_Obj.prototype."+colNames[n]+" = '"+eval ('basePage.'+colNames[n])+"';");
		
	var tempObj = new SE_Obj ();
	SE_Obj.prototype.layoutObjArray = generateLayoutObject(eval("tempObj."+gLAYOUT));

	for (var n = 0; n < pageList.length; n++)
	{
		var res = doActionBDO ('DATA_GETCONFIGROW',  'ObjectName', gSITE_ED_FILE, 'RowName', pageList[n]);
		pageObjArray [pageList[n]] = new SE_Obj ();
		for (var z = 0; z < colNames.length; z++)
		{
			if (eval ("res."+colNames[z]))
				eval ("pageObjArray [pageList[n]]."+colNames[z]+" = '"+eval ("res."+colNames[z])+"';");
		}
	}
	pageObjArray[gBASE_PAGE] = new SE_Obj ();
	pageList.unshift (gBASE_PAGE);
	return (new retObj (pageObjArray, pageList, colNames));
}

/************************************************************************
**	Function:	generateObjectsFromCfg (cfgName)
**
**	Purpose:	Generates an array of objects from the given cfg file object name
**			The return object contains:  
**					'rowNames'			which is an array of row headers (col 0)
**					'colNames'			array of column headers (row 0)
**					'ObjArray'			array of page objects referenced by the page name,
**									for example if the value of this function is
**									returned to a variable 'rc' then the 'Theme' value 
**									of 'pagone' can be referenced by 
**										rc.ObjArray['pageone'].Theme
**											-or-
**										rc.ObjArray.pageone.Theme
*************************************************************************/
function generateObjectsFromCfg (cfgName)
{
	var ObjArray = new Array();
	if (cfgName.length > 0)
		var pageList = new Array ();
	else
		return null;

	var colNames = doAction ('DATA_GETHEADERS',  'GetCol', true, 'ObjectName', cfgName).split ('\t');				
	var rowNames = doAction ('DATA_GETHEADERS', 'ObjectName', cfgName,  'GetRow', true).split ('\t');

	for (var n = 0; n < colNames.length; n++)
		eval ("SE_Obj.prototype."+colNames[n]+" = '"+eval ('rowNames.'+colNames[n])+"';");
		
	for (var n = 0; n < rowNames.length; n++)
	{
//		var res = doActionBDO ('DATA_GETCONFIGROW',  'ObjectName', cfgName, 'RowNumber', n+1);
		var res = doActionBDO ('DATA_GETCONFIGROW',  'ObjectName', cfgName, 'RowName', rowNames[n]);
		ObjArray [rowNames[n]] = new SE_Obj ();
//		ObjArray [n] = new SE_Obj ();
		for (var z = 0; z < colNames.length; z++)
		{
			eval ("ObjArray [rowNames[n]]."+colNames[z]+" = '';");
			if (eval ("res."+colNames[z]))
//				eval ("ObjArray [n]."+colNames[z]+" = '"+eval ("res."+colNames[z])+"';");
				eval ("ObjArray [rowNames[n]]."+colNames[z]+" = '"+eval ("res."+colNames[z])+"';");
		}
	}

	return (new retCfgObj (ObjArray, rowNames, colNames));
}

/************************************************************************
**	Function:	setCurrentWorkingPage (pgName)
**
**	Purpose:	Copies the settings for 'pgName' to the current working page
**				column of the site editor cfg file
*************************************************************************/
function setCurrentWorkingPage (pgName)
{
	var seObj = generateSEObjects (pgName);
	var pgValue = new Array();
	
	for (var n = 0; n < seObj.colNames.length; n++)
		pgValue.push(eval ("seObj.pageObjArray[pgName]."+seObj.colNames[n]));
	
	doAction ('DATA_DELETECONFIGROW',  'ObjectName', gSITE_ED_FILE, 'RowName', gCURRENT_PAGE);
	doAction ('DATA_ADDCONFIGROW',  'ObjectName', gSITE_ED_FILE, 'RowName', gCURRENT_PAGE,
				'RowData', pgValue.join("\t"));
}

/************************************************************************
**	Function:	addUpdateSiteEditorCfg (rowName, pageObj, baseObj, colNames)
**
**	Purpose:	updates a row with new values contained in 'pageObj'.  It effectively
**				deletes the old row, and adds a new one, so if the row does
**				not exists it will be created
*************************************************************************/
function addUpdateSiteEditorCfg (rowName, pageObj, baseObj, colNames)
{
	doAction ('DATA_DELETECONFIGROW',  'ObjectName', gSITE_ED_FILE, 'RowName', rowName);
	doAction ('DATA_ADDCONFIGROW',  'ObjectName', gSITE_ED_FILE, 'RowName', rowName);
	
	for (var n = 0; n < colNames.length; n++)
		setSiteEditorCfgField (rowName, colNames[n], eval ("pageObj."+colNames[n]), 
								eval ("baseObj."+colNames[n]));
}
function addUpdateGenericCfg (cfg, rowName)
{
	doAction ('DATA_DELETECONFIGROW',  'ObjectName', cfg, 'RowName', rowName);
	doAction ('DATA_ADDCONFIGROW',  'ObjectName', cfg, 'RowName', rowName);
}

/************************************************************************
**	Function:	setSiteEditorCfgField (rowName, colName, newVal, baseVal)
**
**	Purpose:	sets the value of rowName X colName to newVal.  If newVal is 
**				the same as the baseVal, newVal will only be written out if the 
**				page is the current working page or the base page
*************************************************************************/
function setSiteEditorCfgField (rowName, colName, newVal, baseVal)
{
	(baseVal == newVal ? bBase = true : bBase = false);
	if (rowName == gBASE_PAGE || rowName == gCURRENT_PAGE || !bBase)
		doAction ('DATA_SETCONFIGDATA',  'ObjectName', gSITE_ED_FILE,  'RowName', 
					rowName, 'ColName', colName, 'NewValue', newVal);
	else
		doAction ('DATA_SETCONFIGDATA',  'ObjectName', gSITE_ED_FILE,  'RowName', 
					rowName, 'ColName', colName, 'NewValue', '');
}
function setGenericCfgField (cfg, rowName, colName, value)
{
	doAction ('DATA_SETCONFIGDATA',  'ObjectName', cfg,  'RowName', 
					rowName, 'ColName', colName, 'NewValue', value);
}

/************************************************************************
**	Function:	generateCSSObject (styleSrc)
**
**	Purpose:	
*************************************************************************/
function generateCSSObject (styleSrc)
{
	reBody = /\{([^}]*)/g
	reStyle = /([a-zA-Z0-9_-]*)\s*:([^;]*)/g
	reClass = /\s*\.*(\S+)\s*\{/g
	var cssClassNames = new Array();
	
	if (styleSrc.indexOf("SS_") == 0)
		var style = doActionEx	('DATA_READFILE',styleSrc, 'FileName', styleSrc,'ObjectName',
								gSTYLE_OBJ, 'FileType', 'txt');
	else if (styleSrc.indexOf("TS_") == 0)
		var style = doActionEx	('DATA_READFILE',styleSrc, 'FileName', styleSrc,'ObjectName',
								gTHEME_OBJ, 'FileType', 'txt');
	else if (styleSrc.indexOf("SC_") == 0)
		var style = doActionEx	('DATA_READFILE',gSTYLES_DIR+styleSrc, 'FileName', 
								gSTYLES_DIR+styleSrc,'ObjectName',
								gPUBLIC, 'FileType', 'txt');
	else
		var style = doActionEx	('DATA_READFILE',gTHEMES_DIR+styleSrc, 'FileName', 
								gTHEMES_DIR+styleSrc,'ObjectName',
								gPUBLIC, 'FileType', 'txt');
	
	for (var cssObject = new Array(); reBody.exec(style);)
	{
		var last = RegExp.lastParen;
		var cssStyleNames = new Array();
		
		// find the class name, put a '{' on the end to stop the first search
		// and set the starting index correctly
		reClass.exec(RegExp.leftContext + '{');
		var className = RegExp.$1;
		
		classDefHolder = new Array();
		for (; reStyle.exec(last);)
		{
			var name = RegExp.$1;
			var val = RegExp.$2.split(',');
			//reQt = /("(.*)")|('(.*)')/g
			//reWs = / /g
			// get rid of the whitespace & quotes
			for (var n = 0; n < val.length; n++)
			{
				while (val[n].charAt(0) == ' ' || val[n].charAt(0) == '\'' ||
				       val[n].charAt(0) == '"')
					val[n] = val[n].substr(1);
				while (val[n].charAt(val[n].length-1) == ' ' || 
				       val[n].charAt(val[n].length-1) == '\'' ||
				       val[n].charAt(val[n].length-1) == '"')
					val[n] = val[n].substr(0, val[n].length-1);
			}
				

			classDefHolder[name] = val;
			cssStyleNames.push(name);
		}	
		classDefHolder["#styleName"] = cssStyleNames;
		cssObject[className] = classDefHolder;
		cssClassNames.push (className);
	}
	cssObject["#className"] = cssClassNames;
	return (cssObject);
}

/********************************************************************************/
/************************************** Page Editor *****************************/
/********************************************************************************/
/* Returns the first page name of a given type */
function PageNameByType(pageObjs, type)
{
	if (!pageObjs)
		pageObjs = generateSEObjects ('');
	for (var n = 0; n < pageObjs.pageList.length; n++)
	{
		if (pageObjs.pageList[n] == gBASE_PAGE || pageObjs.pageList[n] == gCURRENT_PAGE)
			continue;
		if (pageObjs.pageObjArray[pageObjs.pageList[n]][gPAGE_TYPE] == type)
		{
			return pageObjs.pageList[n];
		}
	}
	return "";
}

/************************************************************************
**	Function:	SavePage ()
**
**	Purpose:	Saves the current page
*************************************************************************/
function SavePage ()
{
	var PageName = doAction('REQ_GET_FORMVALUE', "PageName", "PageName");
	if (!PageName)
	{
		PageName = doAction('ST_GET_STATEDATA', 'CurrentPageName', 'CurrentPageName');
		if (!PageName || PageName == '')
			PageName = gHOME_PAGE;
	}
	var seObj = generateSEObjects (gCURRENT_PAGE);
	addUpdateSiteEditorCfg (PageName, seObj.pageObjArray[gCURRENT_PAGE], 
							seObj.pageObjArray[gBASE_PAGE], seObj.colNames);
	return (SavePageByName (PageName));
}

/************************************************************************
**	Function:	SavePageByName (pageName)
**
**	Purpose:	Saves 'pageName'
*************************************************************************/
function SavePageByName (PageName)
{
	doActionEx('MPEA_SAVE_PAGE', 'Result', 'PageName', PageName);
	return (PageName);
}
	
/************************************************************************
**	Function:	EditPage ()
**
**	Purpose:	If a page name is specified calls edit page by name, otherwise
**				edits the current working page
*************************************************************************/			
function EditPage ()
{
	var PageName = doAction('REQ_GET_FORMVALUE', "PageName", "PageName");
	if (PageName)
		return (EditPageByName (PageName));
	else
	{
		if (isPageValid (gCURRENT_PAGE))
			return (doActionEx('MPEA_EDIT_PAGE', 'Result'));
		else
			return (EditPageByName (gHOME_PAGE));
	}
				
}

/************************************************************************
**	Function:	EditPageByName (PageName)
**
**	Purpose:	Edits the page specified in 'PageName'
*************************************************************************/
function EditPageByName (PageName)
{
	if (!isPageValid (PageName))
		PageName = gHOME_PAGE;
		
	var getRet = setCurrentWorkingPage (PageName);
	return (doActionEx('MPEA_EDIT_PAGE', 'Result', 'PageName', PageName));	
}

/************************************************************************
**	Function:	isPageValid (PageName)
**
**	Purpose:	Checks to see if a page is valid in the current licensing
**				scheme
*************************************************************************/
function isPageValid (PageName)
{
	var cWkgPgObj = generateSEObjects (PageName);
	return (isPageObjValid (cWkgPgObj.pageObjArray[PageName]));
}

/************************************************************************
**	Function:	isPageObjValid (PageObj)
**
**	Purpose:	Checks to see if a page object is valid in the current licensing
**				scheme
*************************************************************************/
function isPageObjValid (PageObj)
{
	var bCommerce = IsCommerceEnabled();
	var bService = IsServiceEnabled();
	var licenseFor = PageObj[gLICENSE_FOR];
	bValid = false;
	if (licenseFor.toLowerCase() == "all" ||
		(licenseFor.toLowerCase() == "powercommerce" && bCommerce) ||
		(licenseFor.toLowerCase() == "powerservice" && bService))
		bValid = true;
		
	return (bValid);
}

/************************************************************************
**	Function:	LoadPageByName (PageName)
**
**	Purpose:	Loads the page specified in 'PageName'
*************************************************************************/
function LoadPageByName (PageName)
{
	if (!isPageValid (PageName))
		PageName = gHOME_PAGE;
	var getRet = setCurrentWorkingPage (PageName);
	return (doActionEx('MPEA_LOAD_PAGE', 'Result', 'PageName', PageName));	
}


/************************************************************************
**	Function:	AddElement ()
**
**	Purpose:	Adds an element to the current page
*************************************************************************/
function AddElement ()
{
	var ElementType = doAction('REQ_GET_FORMVALUE', "ElementType", "ElementType");
	return (AddElementType (ElementType));
}
	
/************************************************************************
**	Function:	AddElementType (type)
**
**	Purpose:	Adds an element of type 'type' to the current page
*************************************************************************/		
function AddElementType (type)
{
	return (doActionEx('MPEA_ADD_ELEMENT', 'ElementID', 'ElementType', type));
}

/************************************************************************
**	Function:	CreatePage ()
**
**	Purpose:	Creates a new page
*************************************************************************/		
function CreatePage ()
{
	var PageName = doAction('REQ_GET_FORMVALUE', "PageName", "PageName");
	if (!PageName)
		var PageName = gHOME_PAGE;
	
	return CreatePageByName (PageName);
}

/************************************************************************
**	Function:	CreatePageByName ()
**
**	Purpose:	Creates a new page with the specified name
*************************************************************************/		
function CreatePageByName (PageName)
{
	if (!PageName || PageName == '')
		var PageName = gHOME_PAGE;
	var seObj = generateSEObjects ('');
	var newPage = new SE_Obj ();
	
	if (seObj.pageObjArray[PageName])
	{
		newPage[gBUTTON_ORDER] = seObj.pageObjArray[PageName][gBUTTON_ORDER];
		newPage[gTITLE] = seObj.pageObjArray[PageName][gTITLE];
	}
	else
	{
		// negative button order numbers are not in the nave buttons, so count the
		// pages with non-negative button orders
		var numButtons = new Array();
		for (var n = 0; n < seObj.pageList.length; n++)
		{
			var pos = parseInt (seObj.pageObjArray[seObj.pageList[n]][gBUTTON_ORDER]);
			if (seObj.pageList[n] != gBASE_PAGE && pos > 0)
				numButtons.push(seObj.pageList[n]);
		}
		newPage[gBUTTON_ORDER] = (numButtons.length+1).toString();
		newPage[gTITLE] = PageName;
	}
	
	var getRet = addUpdateSiteEditorCfg (PageName, newPage, seObj.pageObjArray[gBASE_PAGE], 
										seObj.colNames);
	doActionEx('MPEA_CREATE_PAGE', 'Result', 'PageName', PageName);
	return PageName;
}


function buildNewImageUrl (oldUrl, imageRow, bSecure)
{
	oldUrl = oldUrl.replace(/\\/g, "/");
	var pos = oldUrl.lastIndexOf ("/");
	if (pos < 0)
		pos = 0;
	else
		pos++;
		
	oldUrl = oldUrl.substr (pos);
	
	var key = "RelURLPath";
	if (bSecure)
		key = "SecureRelURLPath";
	
	var path = doAction ('DATA_GETCONFIGDATA',  'ObjectName', gIMAGES_CFG,  'RowName', 
						imageRow, 'ColName', key);
						
	return (path + oldUrl);
}


/********************************************************************************/
/************************************** Wizard *****************************/
/********************************************************************************/
function WIZ_ApplyTemplateChanges()
{
	var pagename = doAction("REQ_GET_FORMVALUE", "PageName", "PageName");
	if (!pagename)
		return false;
	if (pagename.length <= 0)
		return false;
	var pageList = generatePageList();
	var found = 0;
	for (var i=0; i < pageList.length; i++)
	{
		if (pageList[i] == pagename)
		{
			found = 1;
			break;
		}
	}
	if (found == 0)
	{
		// page not in list yet, add it
		WIZ_CreateNewPage(pagename);
	}
	templateScript = doAction('REQ_GET_FORMVALUE', 'TemplateScript', 'TemplateScript');
	if (templateScript)
	{
		var scriptFile = doActionEx('DATA_READFILE', templateScript, 'FileName', 
			 templateScript,'ObjectName', 'WATTemplates', 'FileType', 'txt');
		eval (scriptFile);
		/* call ApplyTemplateChanges in the loaded templateScript */
		ApplyTemplateChanges();
	}
}

function SelectThemeLayout()
{
	var ThemeLayout = doAction("REQ_GET_FORMVALUE", "ThemeLayout", "ThemeLayout");
	// selected from the "more" page - a hidden tag
	var selectedThemeLayout = doAction("REQ_GET_FORMVALUE", "selectedThemeLayout", "selectedThemeLayout");
	var tl = '';
	var theme = '';
	var layout = '';
	if (ThemeLayout && ThemeLayout != '')
	{
		tl = ThemeLayout.split(':');
		theme = tl[0];
		layout = tl[1];
	}
	else if (selectedThemeLayout && selectedThemeLayout != '')
	{
		tl = selectedThemeLayout.split(':');
		theme = tl[0];
		layout = tl[1];
	}
	if (theme != '')
	{
		setSiteEditorCfgField(gBASE_PAGE, gTHEME, theme, theme);
		setSiteEditorCfgField(gBASE_PAGE, gLAYOUT, layout, layout);
	}
}
function SetPageFormat()
{
	var format = doAction("REQ_GET_FORMVALUE", "WizardPageFormat", "WizardPageFormat");
	doAction('DATA_SETCONFIGDATA', 'ObjectName', 'PageEditorCfg', 'RowName',
			'WizardPageFormat', 'ColName', 'Value', 'NewValue', format);

}
function WIZ_CreateNewPage(pagename)
{
	// Page not found, create it
	CreatePageByName(pagename);
	setSiteEditorCfgField (pagename, gTITLE, pagename, '');
	setCurrentWorkingPage (pagename);
	addUpdateGenericCfg ('WATWizardPages', pagename);
	SavePageByName(pagename);
	LoadPageByName (pagename);
	doAction('ST_SET_STATEDATA', 'WizNewPageName', pagename);
}
function SelectNewPage(pagename)
{
	LoadPageByName (pagename);
	doAction('ST_SET_STATEDATA', 'WizNewPageName', pagename);
}



/********************************************************************************/
/************************************** Publisher *****************************/
/********************************************************************************/
function PreviewSite()
{
	doAction('MPUB_PREVIEW_SITE');
	// find the index page to put into the new window
	var pageObjs = generateSEObjects ('');
	var filename = 'index.html';
	for (var i=0; i < pageObjs.pageList.length; i++)
	{
		if (pageObjs.pageObjArray[pageObjs.pageList[i]].PageType == 'HomePage')
			filename = pageObjs.pageList[i] + pageObjs.pageObjArray[pageObjs.pageList[i]].FileExt;
	}
	var whichFile = getWebPage(filename, 'WATPreviewDir', '1');
	return(doActionEx('PAR_PARSE_BUFFER','Result', 'document', whichFile));
}

function getWebPage(pageName, pageObj, preview)
{
	var whichFile = "", lookup = pageName;
	var bSecSpf = false, bSpf = false, bSec = false, bPrev = false;
	
	if (pageName.lastIndexOf(".") > 0)
		lookup = pageName.substr(0, pageName.lastIndexOf("."));
	
	if (!preview)
		preview = doAction('REQ_GET_FORMVALUE', 'Preview', 'Preview');
	if (preview && preview == '1')
		bPrev = true;
	
	var useSecure = doAction('DATA_GETCONFIGDATA', 'ObjectName', gSITE_ED_FILE, 'RowName', lookup, 'ColName', 'SecureBaseHref');
	if (!useSecure)
		useSecure = doAction('DATA_GETCONFIGDATA', 'ObjectName', gSITE_ED_FILE, 'RowName', '*BasePage*', 'ColName', 'SecureBaseHref');
	
	if (useSecure && useSecure.toLowerCase() == "yes")
	{
		bSec = true;
		var secSrvrParseFirst = doAction ('DATA_GETLITERAL', 'ObjectName', gSTORE_CFG, 'LiteralID', 'SITE_HTTPS_SERVER_PARSE_FIRST');
		if (secSrvrParseFirst && secSrvrParseFirst.toLowerCase() == 'y')
			bSecSpf = true;
	}
	else
	{
		var srvrParseFirst = doAction ('DATA_GETLITERAL', 'ObjectName', gSTORE_CFG, 'LiteralID', 'SITE_HTTP_SERVER_PARSE_FIRST');
		if (srvrParseFirst && srvrParseFirst.toLowerCase() == 'y')
			bSpf = true;
	}
	
	if ((bSec && bSecSpf) || (!bSec && bSpf))
	{
		var urlPath = "";
		var urlLookup = (bPrev ? "PreviewLinkHref" : "PublishLinkHref");

		if (useSecure && useSecure.toLowerCase() == "yes")
			urlPath = doAction('DATA_GETCONFIGDATA', 'ObjectName', 'PageEditorCfg', 'RowName', 'Secure' + urlLookup, 'ColName', 'Value');
		else
			urlPath = doAction('DATA_GETCONFIGDATA', 'ObjectName', 'PageEditorCfg', 'RowName', urlLookup, 'ColName', 'Value');
		
		urlPath += pageName;
		var reUrl = /(\w+):\/\/([^\/]+)\/(.*)/;
		var resHeader = new Array("");
		var ret = urlPath.match(reUrl);
		//writebr("common:  getting page from server (" + ret[1] + ") (" + ret[2] + ") (" + ret[3] + ")");

		if (ret.length > 2)
		{
			var outBdo = doActionBDO ("INU_EZ_GET_WEB_PAGE", "USESSL", 
									(ret[1].toLowerCase() == "https" ? true : false), 
									"HOST", ret[2], 
									"PATH", (ret.length > 3 ? escape(ret[3]) : "/"));
									
			whichFile = outBdo.MESSAGEBODY;
		}
	}
	else
	{
		//writebr("common:  getting page from disk");
		whichFile = doActionEx('DATA_READFILE', pageName, 'FileName', pageName,'ObjectName', pageObj,'FileType','txt');
	}
	return whichFile;
}
