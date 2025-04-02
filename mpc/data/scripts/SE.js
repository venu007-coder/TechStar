

function includeFile (fileName, objectName)
{
	var incFile = doActionEx	('DATA_READFILE',fileName, 'FileName', fileName,'ObjectName',
								objectName, 'FileType', 'txt');
	return incFile;
}

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
	case "SE_DeleteFile":
			var ST_delete = doAction('REQ_GET_FORMVALUE', 'FileName', 'FileName').split('\t');
			var objectName = doAction('REQ_GET_FORMVALUE', 'ObjectName', 'ObjectName');
			for (var n = 0; n < ST_delete.length; n++)
				var result = doActionBDO('DATA_DELETEFILE', 'ObjectName', objectName, 'FileName', ST_delete[n]);
			selectAction ("L");
		break;
	case "SE_RenameFile":
		var oldFileName = doAction('REQ_GET_FORMVALUE', 'OldFileName', 'OldFileName');
		var newFileName = doAction('REQ_GET_FORMVALUE', 'NewFileName', 'NewFileName');
		var objectName = doAction('REQ_GET_FORMVALUE', 'ObjectName', 'ObjectName');
		var sitePage = doAction('REQ_GET_FORMVALUE', 'SitePage', 'SitePage');
		
		if (sitePage && sitePage.toLowerCase() == "yes")
		{
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var oldOrig = oldFileName, newOrig = newFileName;
			oldFileName = oldFileName + ".blb";
			newFileName = newFileName + ".blb";
			/* make the old page our current page */
			doAction('MPEA_LOAD_PAGE', 'PageName', oldOrig);
		}
		
		/* if they got here, they have agreed to overwrite the existing file, so blow
		** it away since it won't get overwrittewn by default */
		var result = doActionBDO('DATA_DELETEFILE', 'ObjectName', objectName, 'FileName', 
								newFileName);
		var outBDO = doActionBDO ('DATA_RENAMEFILE','FileName', oldFileName,'ObjectName',objectName, 
								'NewName', newFileName);
		
		/* if we succeeded in changing the name, then set the config entries */
		if (sitePage && sitePage.toLowerCase() == "yes" && outBDO.Success)
		{
			setSiteEditorCfgField (oldOrig, 'PageName', newOrig, gBASE_PAGE);
			setSiteEditorCfgField (oldOrig, gTITLE, newOrig, '');
			setGenericCfgField ('WATWizardPages', oldOrig, 'PageName', newOrig)
			doAction('MPEA_SET_PAGENAME', 'PageName', newOrig);
			doAction('MPEA_SAVE_PAGE', 'PageName', newOrig);
		}

		selectAction ("L");
		break;
	case "SE_MoveFile":
		var oldFileName = doAction('REQ_GET_FORMVALUE', 'OldFileName', 'OldFileName').split('\t');
		var newFileName = doAction('REQ_GET_FORMVALUE', 'NewFileName', 'NewFileName').split('\t');
		var objectName = doAction('REQ_GET_FORMVALUE', 'ObjectName', 'ObjectName');
		
		// the filenames better be equal
		if (newFileName.length == oldFileName.length)
		{
			/* if they got here, they have agreed to overwrite the existing file, so blow
			** it away since it won't get overwrittewn by default */
			for (var n = 0; n < newFileName.length; n++)
			{
				var result = doActionBDO('DATA_DELETEFILE', 'ObjectName', objectName, 'FileName', 
										newFileName[n]);
				doActionBDO	('DATA_RENAMEFILE','FileName', oldFileName[n],'ObjectName',objectName, 
							'NewName', newFileName[n]);
			}
		}
		selectAction ("L");
		break;
	case "SE_SaveStyle":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var styleName = doAction('REQ_GET_FORMVALUE', "StyleName", "StyleName");
			saveCustomStyle (styleName);
			write (checkReturnPage ());
	break;
	case "SE_SaveTheme":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var themeName = doAction('REQ_GET_FORMVALUE', "ThemeName", "ThemeName");
			saveCustomTheme (themeName);
			write (checkReturnPage ());
	break;
	case "SE_SetTheme":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var ST_theme_select = doAction('REQ_GET_FORMVALUE', "ThemeSelected", "ThemeSelected");
			var pageName = doAction('REQ_GET_FORMVALUE', "SetForPageName", "SetForPageName");
			setTheme (ST_theme_select, pageName);
			doAction('ST_SET_STATEDATA', 'PromptForSave', true);
			write (checkReturnPage ());
	break;
	case "SE_CreateDir":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var dirName = doAction('REQ_GET_FORMVALUE', 'DirName', 'DirName');
			var objectName = doAction('REQ_GET_FORMVALUE', 'ObjectName', 'ObjectName');
			var outBDO = doActionBDO ('DATA_MAKEDIRECTORY', 'ObjectName', objectName, 'DirectoryPath', gIMAGES_DIR+dirName, 'Permissions', 0755 );
			/* don't add the config entry unless creating the directory succeed */
			if (outBDO.Success)
			{
				var secWebUrl = doAction ('DATA_GETLITERAL', 'ObjectName', gSTORE_CFG, 'LiteralID', 'SITEMGR_HTTPS_PRIVATE_HTDOCS_ALIAS');
			
				var imData = new Array();
				imData ["DiskPath"] = gIMAGES_DIR+dirName+"/";
				imData ["SecureRelURLPath"] = secWebUrl + gWEB_ALIAS_IMAGES + "/" + dirName + "/";
				imData ["RelURLPath"] = gWEB_ROOT + gWEB_ALIAS_IMAGES + "/" + dirName + "/";
				imData ["Mask"] = "*.jpg,*.gif";
				imData ["ObjectName"] = objectName;
				imData ["Local"] = "Yes"
				imData ["ImageCategory"] = ""; 
			
				var outData = "";
				var result = doAction ('DATA_GETHEADERS',  'GetCol', true, 'ObjectName', gIMAGES_CFG);
				result = result.split('\t');
				for (var n = 0; n < result.length; n++)
				{
					/* first one is row header, not a column header */
					if (n > 0)
						outData += "\t";
					if (imData [result[n]])
						outData += imData [result[n]];	
				}
				doAction ('DATA_ADDCONFIGROW', 'ObjectName', gIMAGES_CFG, 'RowName', dirName, 'RowData', 
							outData);
			}
			write (checkReturnPage ());
	break;
	case "SE_DeleteDir":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var result = "";
			var ST_delete = doAction('REQ_GET_FORMVALUE', 'FileName', 'FileName').split('\t');
			var dirName = doAction('REQ_GET_FORMVALUE', 'DirName', 'DirName');
			var objectName = doAction('REQ_GET_FORMVALUE', 'ObjectName', 'ObjectName');
			for (var n = 0; n < ST_delete.length; n++)
				result = doActionBDO('DATA_DELETEFILE', 'ObjectName', objectName, 'FileName', ST_delete[n]);
			if (dirName)
			{
				var outBDO = doActionBDO ('DATA_REMOVEDIRECTORY', 'ObjectName', objectName, 'DirectoryPath', gIMAGES_DIR+dirName);
				/* don't delete the config entry unless creating the directory succeed */
				if (outBDO.Success)
					doAction ('DATA_DELETECONFIGROW', 'ObjectName', gIMAGES_CFG, 'RowName', dirName);
			}
			write (checkReturnPage ());
	break;
	case "SE_SetStyle":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var ST_style_select = doAction('REQ_GET_FORMVALUE', "StyleSelected", "StyleSelected");
			var pageName = doAction('REQ_GET_FORMVALUE', "SetForPageName", "SetForPageName");
			setStyle (ST_style_select, pageName);
			doAction('ST_SET_STATEDATA', 'PromptForSave', true);
			write (checkReturnPage ());
	break;
	case "SE_DeleteStyle":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var ST_style_delete = doAction('REQ_GET_FORMVALUE', "UseStyle", "UseStyle");
			var pageName = doAction('REQ_GET_FORMVALUE', "SetForPageName", "SetForPageName");
			if (pageName.indexOf(gNONE) < 0)
			{
				var ST_style_select = getStyle (gBASE_PAGE);
				setStyle (ST_style_select, pageName);
			}
			doAction('DATA_DELETEFILE', 'ObjectName', gPUBLIC, 'FileName', gSTYLES_DIR+ST_style_delete);
			write (checkReturnPage ());
	break;
	case "SE_DeleteTheme":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var ST_theme_delete = doAction('REQ_GET_FORMVALUE', "UseTheme", "UseTheme");
			var pageName = doAction('REQ_GET_FORMVALUE', "SetForPageName", "SetForPageName");
			if (pageName.indexOf(gNONE) < 0)
			{
				var ST_theme_select = getTheme (gBASE_PAGE);
				setTheme (ST_theme_select, pageName);
			}
			doAction('DATA_DELETEFILE', 'ObjectName', gPUBLIC, 'FileName', gTHEMES_DIR+ST_theme_delete);
			write (checkReturnPage ());
	break;
	case "SE_SetAllToBaseTheme":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var curTheme = getTheme (gBASE_PAGE);
			var Pages = generatePageList ();
			for (var n = 0; n < Pages.length; n++)
				setTheme (curTheme, Pages[n]);
			write (checkReturnPage ());
	break;
	case "SE_SetAllToBaseStyle":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var curStyle = getStyle (gBASE_PAGE);
			var Pages = generatePageList ();
			for (var n = 0; n < Pages.length; n++)
				setStyle (curStyle, Pages[n]);
			write (checkReturnPage ());
	break;
	case "SE_SetBaseLayout":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var layout = doAction("REQ_GET_FORMVALUE", "LayoutSelected", "LayoutSelected");
			if (layout)
				setSiteEditorCfgField (gBASE_PAGE, gLAYOUT, layout, layout);
			write (checkReturnPage ());
	break;
	case "SE_SetButtonOrder":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var align = doAction("REQ_GET_FORMVALUE", "align", "align");
			var buttonList = doAction("REQ_GET_FORMVALUE", "buttonList", "buttonList").split('\t');
			if (align)
				setSiteEditorCfgField (gBASE_PAGE, gBUTTON_ALIGNMENT, align, align);
			for (var n = 0, x = 1; n < buttonList.length; n++)
			{
				if (buttonList[n].length > 0)
					setSiteEditorCfgField (buttonList[n], gBUTTON_ORDER, (x++).toString(), '0');
			}
			write (checkReturnPage ());
	break;
	case "SE_SetSiteInfo":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var seObj = generateSEObjects (gBASE_PAGE);
			var baseKeyWords =  seObj.pageObjArray[gBASE_PAGE].KeyWords;
			var baseTitle = seObj.pageObjArray[gBASE_PAGE].Title;
			var baseDescription = seObj.pageObjArray[gBASE_PAGE].Description;
			var keyWords = escape (doAction("REQ_GET_FORMVALUE", "KeyWords", "KeyWords"));
			var title = escape (doAction("REQ_GET_FORMVALUE", "Title", "Title"));
			var description = escape (doAction("REQ_GET_FORMVALUE", "Description", "Description"));
			// not currently implemented
			//var pageName = doAction("REQ_GET_FORMVALUE", "PageName", "PageName");
			setSiteEditorCfgField (gHOME_PAGE, gKEY_WORDS, keyWords, baseKeyWords);
			setSiteEditorCfgField (gHOME_PAGE, gTITLE, title, baseTitle);
			setSiteEditorCfgField (gHOME_PAGE, gDESCRIPTION, description, baseDescription);
			write (checkReturnPage ());
	break;
	case "SE_ApplyTemplateChanges":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			WIZ_ApplyTemplateChanges();
			write(EditPage());
		break;
	case "SE_SelectNewPageType":
		incfile = includeFile ('common.js', 'JS_SRC');
		eval(incfile);
		var pagename = doAction("REQ_GET_FORMVALUE", "PageTypeDropDown", "PageTypeDropDown");
		SelectNewPage(pagename);
		selectAction ("L");
		break;
	case "SE_DeletePage":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			
			var delPage = doAction('ST_GET_STATEDATA', 'CurrentPageName', 'CurrentPageName');
			if (delPage)
			{
				if (delPage.toLowerCase() != gHOME_PAGE.toLowerCase() &&
					delPage.toLowerCase() != gCURRENT_PAGE.toLowerCase() &&
					delPage.toLowerCase() != gBASE_PAGE.toLowerCase())
				{
					deleteSiteEditorConfigEntry(delPage);
					doAction('DATA_DELETECONFIGROW', 'ObjectName', gWAT_WIZ_PG, 'RowName', delPage);
					doAction('DATA_DELETEFILE', 'ObjectName', gPRIV_PG_OBJ, 'FileName', delPage+'.blb');
					doAction('ST_DELETE_STATEDATA', 'WizNewPageName', 'WizNewPageName');
				}
			}
			doAction('ST_SET_STATEDATA', 'AlreadyBuilt', gHOME_PAGE);
			write(EditPageByName(gHOME_PAGE));
		break;
	default:
		writeln ("There was an error...no corresponding action found");
		break;
	}	
}



/* uncomment out the line below for error processing */
//write (doActionEx ("ProcessErrorQueues", "ErrorHTML"));
