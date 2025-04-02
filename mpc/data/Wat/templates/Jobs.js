/*
** This template file's JS must contain the function ApplyTemplateChanges()
** ApplyTemplateChanges gets called by sitemgr.js's WIZ_ApplyTemplateChanges function
** The template's htm file contains a hidden input tag that defines 'TemplateScript' 
** which points to this file.
** That function can include 'template.js' if necessary
*/

function ApplyTemplateChanges()
{
	var scriptFile = doActionEx('DATA_READFILE', 'common.js', 'FileName', 
				 'common.js','ObjectName', 'JS_SRC', 'FileType', 'txt');
	eval (scriptFile);
	var tmpltJsFile = doActionEx('DATA_READFILE', 'template.js', 'FileName', 
				 'template.js','ObjectName', 'WATTemplates', 'FileType', 'txt');
	eval (tmpltJsFile);
	var utilFile = doActionEx('DATA_READFILE', 'SiteUtil.js', 'FileName', 
				 'SiteUtil.js','ObjectName', 'QuartzSitePublic', 'FileType', 'txt');
	eval (utilFile);

	var description = doAction("REQ_GET_FORMVALUE", "DescriptionText", "DescriptionText");
	var article1 = doAction("REQ_GET_FORMVALUE", "Article1Text", "Article1Text");
	var article2 = doAction("REQ_GET_FORMVALUE", "Article2Text", "Article2Text");

	var imageURL = doAction("REQ_GET_FORMVALUE", "imgurl", "imgurl");
	var secureImageURL = doAction("REQ_GET_FORMVALUE", "secureimgurl", "secureimgurl");
	var imageRow = doAction("REQ_GET_FORMVALUE", "imgrow", "imgrow");

	var HeaderText = "Jobs"; // not changable by user???

	var pageElements = generateObjectsFromCfg ('WATWizardPages');
	var pageName = doAction('ST_GET_STATEDATA', 'WizNewPageName', 'WizNewPageName');

	var posObj = new Position(pageName);
	var textWidth = 400;

	var width;
	var height;

	for (var ie = 0; ie < 2; ie++)
	{
		// Loop twice and put the correct element at the top
		if (((posObj.format & PF_IMGTOP) && ie == 0) || ((posObj.format & PF_HEADTOP) && ie == 1))
		{
			if (imageURL && imageURL != '')
			{
				width = getImageWidth(imageURL, imageRow);
				height = getImageHeight(imageURL, imageRow);
			}
			else
			{
				width = 0;
				height = 0;
			}
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
	if (description && description != '')
	{
		width = textWidth;
		height = getTextHeight(description, width);
		posObj.setStartX(width);
		ApplyTextElementChange(pageElements, pageName, 'DescriptionText', description, posObj, width, height);
		posObj.startY += height + 5;
	}
	if (article1 && article1 != '')
	{
		width = textWidth;
		height = getTextHeight(article1, width);
		posObj.setStartX(width);
		ApplyTextElementChange(pageElements, pageName, 'Article1Text', article1, posObj, width, height);
		posObj.startY += height + 5;
	}
	if (article2 && article2 != '')
	{
		width = textWidth;
		height = getTextHeight(article2, width);
		posObj.setStartX(width);
		ApplyTextElementChange(pageElements, pageName, 'Article2Text', article2, posObj, width, height);
		posObj.startY += height + 5;
	}
	SavePageByName(pageName);
}
