/*
** WATCommerce
** Copyright (c) Mercantec 2001
**
** Creates base commerce files used by WAT
**
** Activation example: powershell.exe -s MySite -p ~/public_html/cgi-bin -o JS_SRC -f WATCommerce.js -q "sm_action=CreateBaseFiles"
*/
<SCRIPT runat="merc_server">
	var which_smAction = doAction('REQ_GET_FORMVALUE', "sm_action", "sm_action");

	if (which_smAction == "CreateBaseFiles")
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


		// CreateHomePage if not already there so "Home" is the first nav button
		var pn = PageNameByType('', "HomePage");
		if (pn == "")
			CreateHomePage();
		CreateSchedulePage();
		CreateScheduleIdentifyPage();
		CreateScheduleSvcsPage();
		CreateScheduleThanksPage();
		CreateScheduleSetAppointmentPage();
	}

function CreateHomePage()
{
		// Create page and setup config files
		var pageName = "Home"
		CreatePageByName(pageName);
		setSiteEditorCfgField (pageName, gTITLE, '', '');
		setSiteEditorCfgField (pageName, gPAGE_TYPE, 'ServiceHome', '');
		setCurrentWorkingPage (pageName);
		SavePageByName(pageName);
		addUpdateGenericCfg ('WATWizardPages', gHOME_PAGE);
}

function CreateSchedulePage()
{
		var textWidth = 400;
		var width;
		var height;
		var pageName = "Schedule";

		// Create page and setup config files
		CreatePageByName(pageName);
		setSiteEditorCfgField (pageName, gTITLE, pageName, '');
		setSiteEditorCfgField (pageName, gPAGE_TYPE, 'ServiceHome', '');
		setSiteEditorCfgField (pageName, gLICENSE_FOR, 'PowerService', '');
		//setSiteEditorCfgField (pageName, gBUTTON_ORDER , '-1', '');

		setCurrentWorkingPage (pageName);
		SavePageByName(pageName);
		LoadPageByName (pageName);

		// Create a header text element
		var posObj = new Position(pageName);
		var HeaderText = "Services";
		width = textWidth;
		height = getTextHeight(HeaderText, width);
		posObj.setStartX(width);
		AddTextElement(posObj, HeaderText, 'HeaderText', width, height);
		posObj.startY += height + 15;

		// Add schedule elements
		id = AddElementType("Merc_Sched");
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', '(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
		SavePageByName(pageName);
}

function CreateScheduleIdentifyPage()
{
		var textWidth = 400;
		var width;
		var height;
		var pageName = "ScheduleIdentify";

		// Create page and setup config files
		CreatePageByName(pageName);
		setSiteEditorCfgField (pageName, gTITLE, pageName, '');
		setSiteEditorCfgField (pageName, gPAGE_TYPE, 'ScheduleIdentifyPage', '');
		setSiteEditorCfgField (pageName, gLICENSE_FOR, 'PowerService', '');
		setSiteEditorCfgField (pageName, gBUTTON_ORDER , '-1', '');

		setCurrentWorkingPage (pageName);
		SavePageByName(pageName);
		LoadPageByName (pageName);

		// Create a header text element
		var posObj = new Position(pageName);
		var HeaderText = "Services Identify";
		width = textWidth;
		height = getTextHeight(HeaderText, width);
		posObj.setStartX(width);
		AddTextElement(posObj, HeaderText, 'HeaderText', width, height);
		posObj.startY += height + 15;

		// Add schedule elements
		id = AddElementType("Merc_SchedIdentify");
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', '(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
		SavePageByName(pageName);
}

function CreateScheduleSvcsPage()
{
		var textWidth = 400;
		var width;
		var height;
		var pageName = "ScheduleSvcs";

		// Create page and setup config files
		CreatePageByName(pageName);
		setSiteEditorCfgField (pageName, gTITLE, pageName, '');
		setSiteEditorCfgField (pageName, gPAGE_TYPE, 'ScheduleIdentifyPage', '');
		setSiteEditorCfgField (pageName, gLICENSE_FOR, 'PowerService', '');
		setSiteEditorCfgField (pageName, gBUTTON_ORDER , '-1', '');

		setCurrentWorkingPage (pageName);
		SavePageByName(pageName);
		LoadPageByName (pageName);

		// Create a header text element
		var posObj = new Position(pageName);
		var HeaderText = "Services";
		width = textWidth;
		height = getTextHeight(HeaderText, width);
		posObj.setStartX(width);
		AddTextElement(posObj, HeaderText, 'HeaderText', width, height);
		posObj.startY += height + 15;

		// Add schedule elements
		id = AddElementType("Merc_SchedSvcs");
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', '(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
		SavePageByName(pageName);
}

function CreateScheduleThanksPage()
{
		var textWidth = 400;
		var width;
		var height;
		var pageName = "ScheduleThanks";

		// Create page and setup config files
		CreatePageByName(pageName);
		setSiteEditorCfgField (pageName, gTITLE, pageName, '');
		setSiteEditorCfgField (pageName, gPAGE_TYPE, 'ScheduleIdentifyPage', '');
		setSiteEditorCfgField (pageName, gLICENSE_FOR, 'PowerService', '');
		setSiteEditorCfgField (pageName, gBUTTON_ORDER , '-1', '');

		setCurrentWorkingPage (pageName);
		SavePageByName(pageName);
		LoadPageByName (pageName);

		// Create a header text element
		var posObj = new Position(pageName);
		var HeaderText = "Services";
		width = textWidth;
		height = getTextHeight(HeaderText, width);
		posObj.setStartX(width);
		AddTextElement(posObj, HeaderText, 'HeaderText', width, height);
		posObj.startY += height + 15;

		// Add schedule elements
		id = AddElementType("Merc_SchedThanks");
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', '(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
		SavePageByName(pageName);
}

function CreateScheduleSetAppointmentPage()
{
		var textWidth = 400;
		var width;
		var height;
		var pageName = "ScheduleSetAppointment";

		// Create page and setup config files
		CreatePageByName(pageName);
		setSiteEditorCfgField (pageName, gTITLE, pageName, '');
		setSiteEditorCfgField (pageName, gPAGE_TYPE, 'ScheduleIdentifyPage', '');
		setSiteEditorCfgField (pageName, gLICENSE_FOR, 'PowerService', '');
		setSiteEditorCfgField (pageName, gBUTTON_ORDER , '-1', '');

		setCurrentWorkingPage (pageName);
		SavePageByName(pageName);
		LoadPageByName (pageName);

		// Create a header text element
		var posObj = new Position(pageName);
		var HeaderText = "Services Set Appointment";
		width = textWidth;
		height = getTextHeight(HeaderText, width);
		posObj.setStartX(width);
		AddTextElement(posObj, HeaderText, 'HeaderText', width, height);
		posObj.startY += height + 15;

		// Add schedule elements
		id = AddElementType("Merc_SchedSetAppointment");
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', '(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
		SavePageByName(pageName);
}




function AddTextElement(posObj, data, field, width, height)
{
	id = AddElementType("Merc_Text");
	// "newLayer" must match string in WATedit.js
	doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
	if (data)
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'text', data);
	if (field == 'HeaderText')
	{
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'textalign', 'center');
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'style', 'text-header');
	}
	if (width)
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'width', width.toString());
	if (height)
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'height', height.toString());
}
</script>
