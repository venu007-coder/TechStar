

function includeFile (fileName, objectName)
{
	var incFile = doActionEx	('DATA_READFILE',fileName, 'FileName', fileName,'ObjectName',
								objectName, 'FileType', 'txt');
	return incFile;
}

/*	use this to validate page, if user uses back button, and then 
**	clicks next or back this will ensure correct handling of the page 
*/
function syncWizState()
{
	var wizstate = doAction('DATA_GETCONFIGDATA', 'ObjectName', gsWizCfg, 'RowName', 'WizardState', 'ColName', 'Value');
	var wizstate_post = doAction('REQ_GET_FORMVALUE', "WizState", "WizState");
	if (wizstate)
	{
		if (wizstate_post)
		{
			if (wizstate_post != wizstate)
				doAction('DATA_SETCONFIGDATA', 'ObjectName', gsWizCfg, 'RowName', 'WizardState', 'ColName', 'Value', 'NewValue', wizstate_post.toString());
			return (wizstate_post);
		}
		return (wizstate);
	}
	
	return "";
}

/* use global to prevent re-syncing on recursive function calls */
var gbWIZ_SYNC = false;
var gsWizCfg = "PageEditorCfg"; // Default
var gsWizardComponent = "WAT"; // Default

function selectAction (action)
{
	var wizstate = "";
	if (!gbWIZ_SYNC)
	{
		var file = doAction('REQ_GET_FORMVALUE', "NextPage", "NextPage");
		if (file && file.indexOf ("pwizwat_") == 0)
		{
			gsWizCfg = "PageEditorCfg";
			gsWizardComponent = "WAT";
		}
		else
		if (file && file.indexOf ("swizserv_") == 0)
		{
			gsWizCfg = "ServicesCfg";
			gsWizardComponent = "SERVICE";
		}
		else
		if (file && file.indexOf ("comwiz_") == 0)
		{
			gsWizCfg = "CommerceWizCfg";
			gsWizardComponent = "";
		}
		else
		{// this is a HUGE HACK put in place just to get things working for the InterNet World tradeshow.
		 // All this needs to be dynamic!
			var file = doAction('REQ_GET_FORMVALUE', "LastPage", "LastPage");

			if (file && file.indexOf ("swizserv_") == 0)
				gsWizCfg = "ServicesCfg";
			else
			if (file && file.indexOf ("comwiz_") == 0)
				gsWizCfg = "CommerceWizCfg";

			gsWizardComponent = "";
		}
		wizstate = syncWizState();
		gbWIZ_SYNC = true;
	}
		
	switch (action)
	{
	case "L":
		var file = doAction('REQ_GET_FORMVALUE', "NextPage", "NextPage");
		var whichFile = doActionEx	('DATA_READFILE',file, 'FileName', file,'ObjectName','QuartzSite', 
					'FileType', 'txt');
		var output = doActionEx('PAR_PARSE_BUFFER','Result', 'document', whichFile);
		write (output);
		break;

	case "WIZ_WizardNext":

		incfile = includeFile ('common.js', 'JS_SRC');
		eval(incfile);
		if (!wizstate || wizstate <= 0)
			wizstate = 1;

		if(gsWizardComponent == "WAT")
		{
			switch (wizstate)
			{
				case '2': //General info
				{
					var seObj = generateSEObjects ('');
					if (!seObj.pageObjArray[gHOME_PAGE])
					{
						// Page not found, create it
						CreatePageByName(gHOME_PAGE);
						addUpdateGenericCfg ('WATWizardPages', gHOME_PAGE);
						SavePageByName(pagename);
						setSiteEditorCfgField (gHOME_PAGE, gPAGE_TYPE, 'HomePage', '');
					}
					SelectNewPage(gHOME_PAGE);
					setCurrentWorkingPage (gHOME_PAGE);

					var keywords = escape(doAction('REQ_GET_FORMVALUE', "keywords", "keywords"));
					var title = escape(doAction('REQ_GET_FORMVALUE', "pagetitle", "pagetitle"));
					var desc = escape(doAction('REQ_GET_FORMVALUE', "description", "description"));
					var baseKeywords =  seObj.pageObjArray[gBASE_PAGE].KeyWords;
					var baseTitle = seObj.pageObjArray[gBASE_PAGE].Title;
					var baseDesc = seObj.pageObjArray[gBASE_PAGE].Description;

					setSiteEditorCfgField (gHOME_PAGE, gKEY_WORDS, keywords, baseKeywords);
					setSiteEditorCfgField (gHOME_PAGE, gTITLE, title, baseTitle);
					setSiteEditorCfgField (gHOME_PAGE, gDESCRIPTION, desc, baseDesc);

					break;
				}
				case '3': // Design
				{
					SelectThemeLayout();
					SetPageFormat();
					break;
				}
				case '4': // Home Page
				{
					WIZ_ApplyTemplateChanges();
					// Clear WizNewPageName so New Page comes in clear
					doAction('ST_DELETE_STATEDATA', 'WizNewPageName', 'WizNewPageName');
					break;
				}
				case '5': // New Page
				{
					WIZ_ApplyTemplateChanges();
					break;
				}
			}
		}

		wizstate++;
		doAction('DATA_SETCONFIGDATA', 'ObjectName', gsWizCfg, 'RowName', 'WizardState', 'ColName', 'Value', 'NewValue', wizstate.toString());
		selectAction ("L");


		break;
	case "WIZ_WizardBack":
			if (!wizstate || wizstate == 0)
				wizstate = 1;

			wizstate--;
			doAction('DATA_SETCONFIGDATA', 'ObjectName', gsWizCfg, 'RowName', 'WizardState', 'ColName', 'Value', 'NewValue', wizstate.toString());
			selectAction ("L");
		break;
	case "WIZ_SetMoreThemeAndLayout":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			SelectThemeLayout();
			selectAction ("L");
		break;
	case "WIZ_SelectThemeAndLayout":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			SelectThemeLayout();
			// Update preview?
			selectAction ("L");
		break;
	case "WIZ_SelectPageFormat":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			SetPageFormat();
			selectAction ("L");
		break;
	case "WIZ_ApplyTemplateChanges":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			WIZ_ApplyTemplateChanges();
			selectAction ("L");
		break;
	case "WIZ_ApplyChangesEditAnother":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			WIZ_ApplyTemplateChanges();
			doAction('ST_DELETE_STATEDATA', 'WizNewPageName', 'WizNewPageName');
			selectAction ("L");
		break;
	case "WIZ_CreateNewPage":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			WIZ_ApplyTemplateChanges();
			doAction('ST_DELETE_STATEDATA', 'WizNewPageName', 'WizNewPageName');

			selectAction ("L");
		break;
	case "WIZ_DeletePage":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			
			var delPage = doAction('ST_GET_STATEDATA', 'WizNewPageName', 'WizNewPageName');
			if (delPage)
			{
				if (delPage.toLowerCase() != gHOME_PAGE.toLowerCase())
				{
					deleteSiteEditorConfigEntry(delPage);
					doAction('DATA_DELETECONFIGROW', 'ObjectName', gWAT_WIZ_PG, 'RowName', delPage);
					doAction('DATA_DELETEFILE', 'ObjectName', gPRIV_PG_OBJ, 'FileName', delPage+'.blb');
					doAction('ST_DELETE_STATEDATA', 'WizNewPageName', 'WizNewPageName');
				}
			}
			selectAction ("L");
		break;
	case "WIZ_EditPage":
		incfile = includeFile ('common.js', 'JS_SRC');
		eval(incfile);
		var pagename = doAction("REQ_GET_FORMVALUE", "PageEditDropDown", "PageEditDropDown");
		SelectNewPage(pagename);
		selectAction("L");
		break;
	case "WIZ_SelectNewPageType":
		incfile = includeFile ('common.js', 'JS_SRC');
		eval(incfile);
		var pagename = doAction("REQ_GET_FORMVALUE", "PageTypeDropDown", "PageTypeDropDown");
		SelectNewPage(pagename);
		selectAction ("L");
		break;
	case "WIZ_CreateNewPageType":
		incfile = includeFile ('common.js', 'JS_SRC');
		eval(incfile);
		var pagename = doAction("REQ_GET_FORMVALUE", "PageName", "PageName");
		if (pagename && pagename != '')
		{
			WIZ_CreateNewPage(pagename);
		}
		selectAction ("L");
		break;
	case "WIZ_Publish":
			wizstate++;
			doAction('DATA_SETCONFIGDATA', 'ObjectName', gsWizCfg, 'RowName', 'WizardState', 'ColName', 'Value', 'NewValue', wizstate.toString());
			// set the config file first to tell the publisher if the wizard is done or not
			doAction('MPUB_PUBLISH_SITE');

			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			if (gDEFAULT_WEB_PAGE && gDEFAULT_WEB_PAGE.length > 0)
			{
				var pageObjs = generateSEObjects (gHOME_PAGE);
				var file = gHOME_PAGE + pageObjs.pageObjArray[gHOME_PAGE].FileExt;
				var whichFile = doActionEx	('DATA_READFILE', file, 'FileName', file,
											'ObjectName', 'WATPublishDir', 'FileType', 'txt');
											
				doAction ('DATA_WRITEFILE', 'FileName', gDEFAULT_WEB_PAGE,'Data', whichFile, 'Size', 
											whichFile.length, 'ObjectName', 'DefaultDoc', 'Permissions',0644);
			}

			selectAction ("L");
		break;
	case "WIZ_PreviewSite":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			write(PreviewSite());
		break;
	case "WIZ_Exit":
			wizstate++;
			doAction('DATA_SETCONFIGDATA', 'ObjectName', gsWizCfg, 'RowName', 'WizardState', 'ColName', 'Value', 'NewValue', wizstate.toString());
			selectAction ("L");
		break;

	default:
		writeln ("There was an error...no corresponding action found");
		break;
	}	
}



/* uncomment out the line below for error processing */
//write (doActionEx ("ProcessErrorQueues", "ErrorHTML"));
