// Common functions used by the templates in the Wizard
// Copyright (c) Mercantec 2001

// bitwise values for page format
var PF_CENTER = 1;
var PF_LEFT = 2;
var PF_IMGTOP = 4;
var PF_HEADTOP = 8;

/*
** Applies changed text to the given text element.
** If this element doesn't exist it is created at the given startX and startY with 
** the given width and height.
*/
function ApplyTextElementChange(pageElements, pageName, field, data, posObj, width, height)
{
	var id;
	if (pageElements.ObjArray[pageName][field] == undefined)
	{
		doAction('DATA_ADDCONFIGCOL', 'ObjectName', 'WATWizardPages', 
				'ColName', field);
		id = AddElementType("Merc_Text");
		setGenericCfgField ('WATWizardPages', pageName, field, id.toString());
		if (width)
			doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'width', width.toString());
		if (height)
			doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'height', height.toString());
	}
	else
	{
		id = parseInt(pageElements.ObjArray[pageName][field]);
		if (!id || id == 0 || isNaN(id))
		{
			id = AddElementType("Merc_Text");
			setGenericCfgField ('WATWizardPages', pageName, field, id.toString());
			if (width)
				doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'width', width.toString());
			if (height)
				doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'height', height.toString());
		}
	}
	// "newLayer" must match string in WATedit.js
	doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
	if (data)
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'text', data);
	if (field == 'HeaderText')
	{
		// Set the style property based on the page format for centering
		if (posObj.format & PF_CENTER)
			doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'textalign', 'center');
		else
			doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'textalign', 'left');
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'style', 'text-header');
	}
	if (width)
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'width', width.toString());
	if (height)
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'height', height.toString());
}

/*
** Applies changed text to the given business element.
** If this element doesn't exist it is created at the given startX and startY with 
** the given width and height.
*/
function ApplyBizElementChange(pageElements, pageName, field, data, posObj, width, height)
{
	var id;
	if (pageElements.ObjArray[pageName][field] == undefined)
	{
		doAction('DATA_ADDCONFIGCOL', 'ObjectName', 'WATWizardPages', 
				'ColName', field);
		id = AddElementType("Merc_Biz");
		setGenericCfgField ('WATWizardPages', pageName, field, id.toString());
		if (width)
			doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'width', width.toString());
		if (height)
			doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'height', height.toString());
	}
	else
	{
		id = parseInt(pageElements.ObjArray[pageName][field]);
		if (!id || id == 0 || isNaN(id))
		{
			id = AddElementType("Merc_Biz");
			setGenericCfgField ('WATWizardPages', pageName, field, id.toString());
			if (width)
				doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'width', width.toString());
			if (height)
				doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'height', height.toString());
		}
	}
	// "newLayer" must match string in WATedit.js
	doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
	if (data)
	{
		var properties = doActionBDO ("MPEA_GET_PROPERTIES", 'ElementID', id.toString());
		if (properties)
		{
			var textFields = properties.GetLabels();
			for (var n = 0; n < textFields.length; n++)
			{
				if (data[textFields[n]])
					doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 
							textFields[n], data[textFields[n]]);
			}
		}
	}
	if (field == 'HeaderText')
	{
		// Set the style property based on the page format for centering
		if (posObj.format & PF_CENTER)
			doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'style', 'text-header-center');
		else
			doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'style', 'text-header');
	}
}

/*
** Applies changed image to the given image element.
** If this element doesn't exist it is created at the given startX and startY with 
** the given width and height.
*/
function ApplyImageElementChange(pageElements, pageName, field, data, cfgrow, posObj, width, height, secureUrl)
{
	var id;
	if (pageElements.ObjArray[pageName][field] == undefined)
	{
		doAction('DATA_ADDCONFIGCOL', 'ObjectName', 'WATWizardPages', 
				'ColName', field);
		id = AddElementType("Merc_Image");
		setGenericCfgField ('WATWizardPages', pageName, field, id.toString());
	}
	else
	{
		id = parseInt(pageElements.ObjArray[pageName][field]);
		if ((!id || id == 0 || isNaN(id)) && data && data != '')
		{
			id = AddElementType("Merc_Image");
			setGenericCfgField ('WATWizardPages', pageName, field, id.toString());
		}
		else if (id && id > 0 && (!data || data == ''))
		{
			// Delete element if no source name (data)
			doAction('MPEA_DELETE_ELEMENT', 'ElementID', id.toString());
			setGenericCfgField ('WATWizardPages', pageName, field, '');
			id = 0;
		}
	}
	if (id && id > 0)
	{
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
		if (data)
			doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'source', data);
		if (cfgrow)
			doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'cfgrow', cfgrow);
		if (width)
			doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'width', width.toString());
		if (height)
			doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'height', height.toString());
		if (secureUrl)
			doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'secure_source', secureUrl);
	}
}


// position object
function Position(pageName)
{
	var seObj = generateSEObjects (pageName);
	this.startX = 0;
	this.startY = parseInt(seObj.pageObjArray[pageName].layoutObjArray.top.top + 
			seObj.pageObjArray[pageName].layoutObjArray.top.height);
	this.cellLeft = parseInt(seObj.pageObjArray[pageName].layoutObjArray.left.left +
			seObj.pageObjArray[pageName].layoutObjArray.left.width);
	this.cellWidth = parseInt(seObj.pageObjArray[pageName].layoutObjArray.main.width);
	this.format = getPageFormat();
	this.setStartX = setStartX;
}
function setStartX(width)
{
	if (this.format & PF_CENTER)
	{
		s = (this.cellWidth / 2) - (width / 2);
		this.startX = this.cellLeft + (s < 0 ? 0 : s) + 5;
	}
	else // PF_LEFT
		this.startX = this.cellLeft + 5;
}

// Get the page format - the alignment of elements and if image or header are on top.
function getPageFormat()
{
	var value =  doAction ('DATA_GETCONFIGDATA',  'ObjectName', 'PageEditorCfg',  'RowName', 
							'WizardPageFormat', 'ColName', 'Value');
	var format = 0;

	switch (value)
	{
		case '1':
			format |= PF_LEFT;
			format |= PF_HEADTOP;
			break;
		case '2':
			format |= PF_LEFT;
			format |= PF_IMGTOP;
			break;
		case '3':
			format |= PF_CENTER;
			format |= PF_IMGTOP;
			break;
		case '4':
			format |= PF_CENTER;
			format |= PF_HEADTOP;
			break;
		default:
			format |= PF_LEFT;
			format |= PF_HEADTOP;
			break;
	}
	return format;
}


function getImageHeight(imageURL, imageRow)
{
	imageURL = unescape(imageURL);
	var filename;
	var cfgObj = generateObjectsFromCfg (gIMAGES_CFG);
	var onImg = cfgObj.ObjArray[imageRow].ObjectName;
	var path = cfgObj.ObjArray[imageRow].DiskPath;
	var slash = imageURL.lastIndexOf('/');
	if (slash == -1)
		slash = imageURL.lastIndexOf('\\');
	if (slash == -1)
		filename = imageURL;
	else
		filename = imageURL.substr(slash+1);
	return doAction('MPEA_GET_IMAGEHEIGHT', 'ObjectName', onImg, 'ImagePath', path+filename);
}

function getImageWidth(imageURL, imageRow)
{
	imageURL = unescape(imageURL);
	var filename;
	var cfgObj = generateObjectsFromCfg (gIMAGES_CFG);
	var onImg = cfgObj.ObjArray[imageRow].ObjectName;
	var path = cfgObj.ObjArray[imageRow].DiskPath;
	var slash = imageURL.lastIndexOf('/');
	if (slash == -1)
		slash = imageURL.lastIndexOf('\\');
	if (slash == -1)
		filename = imageURL;
	else
		filename = imageURL.substr(slash+1);
	return doAction('MPEA_GET_IMAGEWIDTH', 'ObjectName', onImg, 'ImagePath', path+filename);
}


/* Generic ApplyTemplateChanges function for newly created pages */
function ApplyTemplateChanges()
{
	var scriptFile = doActionEx('DATA_READFILE', 'common.js', 'FileName', 
				 'common.js','ObjectName', 'JS_SRC', 'FileType', 'txt');
	eval (scriptFile);
	var utilFile = doActionEx('DATA_READFILE', 'SiteUtil.js', 'FileName', 
				 'SiteUtil.js','ObjectName', 'QuartzSitePublic', 'FileType', 'txt');
	eval (utilFile);

	var pageName = doAction('ST_GET_STATEDATA', 'WizNewPageName', 'WizNewPageName');
	if (!pageName || pageName == '')
		return;
	var HeaderText = doAction("REQ_GET_FORMVALUE", "HeaderText", "HeaderText");
	var BodyText = doAction("REQ_GET_FORMVALUE", "BodyText", "BodyText");
	var imageURL = doAction("REQ_GET_FORMVALUE", "imgurl", "imgurl");
	var secureImageURL = doAction("REQ_GET_FORMVALUE", "secureimgurl", "secureimgurl");
	var imageRow = doAction("REQ_GET_FORMVALUE", "imgrow", "imgrow");

	var pageElements = generateObjectsFromCfg ('WATWizardPages');

	var posObj = new Position(pageName);
	var textWidth = 400;

	var width;
	var height;

	for (var ie = 0; ie < 2; ie++)
	{
		// Loop twice and put the correct element at the top
		if (((posObj.format & PF_IMGTOP) && ie == 0 && imageURL && imageURL != '') ||
			((posObj.format & PF_HEADTOP) && ie == 1 && imageURL && imageURL != ''))
		{
			width = getImageWidth(imageURL, imageRow);
			height = getImageHeight(imageURL, imageRow);
			posObj.setStartX(width);
			ApplyImageElementChange(pageElements, pageName, 'Image', imageURL, imageRow, posObj, width, height, secureImageURL);
			posObj.startY += height + 5;
		}
		if (((posObj.format & PF_IMGTOP) && ie == 1 && HeaderText && HeaderText != '') ||
			((posObj.format & PF_HEADTOP) && ie == 0 && HeaderText && HeaderText != ''))
		{
			width = textWidth;
			height = getTextHeight(HeaderText, width);
			posObj.setStartX(width);
			ApplyTextElementChange(pageElements, pageName, 'HeaderText', HeaderText, posObj,  width, height);
			posObj.startY += height + 5;
		}
	}
	if (BodyText && BodyText != '')
	{
		width = textWidth;
		height = getTextHeight(BodyText, width);
		posObj.setStartX(width);
		ApplyTextElementChange(pageElements, pageName, 'BodyText', BodyText, posObj, width, height);
		posObj.startY += height + 5;
	}
	SavePageByName(pageName);
}

