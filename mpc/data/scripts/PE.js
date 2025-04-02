

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
	case "PE_PageEditorTest":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			CreatePage ();
			AddElementType ('Merc_BannerAD');
			AddElementType ('Merc_Image');
			AddElementType ('Merc_Text');
			SavePage ();
			write (EditPage ());
		break;
	case "PE_SavePage":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var PgName = SavePage ();
			doAction('ST_SET_STATEDATA', 'AlreadyBuilt', PgName);
			doAction('ST_SET_STATEDATA', 'PromptForSave', false);
			var file = doAction('REQ_GET_FORMVALUE', "NextPage", "NextPage");
			if (file)
				write (readAndParseFile (file));
			else
				write (EditPage ());
		break;
	case "PE_SavePageNoReload":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var PageName = SavePage ();
			doAction('ST_SET_STATEDATA', 'PromptForSave', false);
			doAction('ST_SET_STATEDATA', 'AlreadyBuilt', PageName);
		break;
	case "PE_CreatePage":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var pageName = CreatePage ();
			SavePageByName (pageName);
			write (EditPageByName (pageName));
		break;
	case "PE_CreatePageNoReload":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			CreatePage ();
			SavePage ();
		break;
	case "PE_AddElement":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var elemID = AddElement ();
			write (doActionEx('MPEA_EDIT_PROPERTIES', 'Result', 'ElementID', elemID.toString()));
		break;
	case "PE_DeleteElement":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var ElementID = doAction('REQ_GET_FORMVALUE', "ElementID", "ElementID");
			doActionEx('MPEA_DELETE_ELEMENT', 'Result', 'ElementID', ElementID);
			write (EditPage ());
		break;
	case "PE_EditPage":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var build = doAction('ST_GET_STATEDATA', "AlreadyBuilt", "AlreadyBuilt");
			if (build)
				write(EditPageByName (build));
			else
			{
				doAction('ST_SET_STATEDATA', 'AlreadyBuilt', gHOME_PAGE);
				write (EditPageByName (gHOME_PAGE));
			}
		break;
	case "PE_EditPageByName":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var page = doAction('REQ_GET_FORMVALUE', "PageName", "PageName");
			if (page)
				write(EditPageByName (page));
			else
				write (EditPage ());
		break;
	case "PE_EditProperties":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var ElementID = doAction('REQ_GET_FORMVALUE', "ElementID", "ElementID");
			write (doActionEx('MPEA_EDIT_PROPERTIES', 'Result', 'ElementID', ElementID));
		break;
	case "PE_SaveProperties":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			doAction('MPEA_SAVE_PROPERTIES');
			write (EditPage ());
		break;
	case "PE_GetElementCount":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var result = doAction('MPEA_GET_ELEMENTCOUNT');
			write(result);
		break;
	case "PE_GetElementIDByPos":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			doAction('MPEA_GET_ELEMENTCOUNT');
			var result = doAction('MPEA_GET_ELEMENTIDBYPOS', 'Position', '0');
			write(result);
		break;
	case "PE_Undo":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			doAction('MPEA_UNDO_CHANGE');
			write (EditPage ());
		break;
	case "PE_SetTheme":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var ST_theme_select = getAndCopyTheme ();
			setTheme (ST_theme_select, gCURRENT_PAGE);
			doAction('ST_SET_STATEDATA', 'PromptForSave', true);
			write (checkReturnPage ());
		break;
	case "PE_Cancel":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var addEditMode = doAction('REQ_GET_FORMVALUE', "ElementAddEdit", "ElementAddEdit");
			if (addEditMode && addEditMode.toLowerCase() == "add")
				doAction('MPEA_UNDO_CHANGE');
			write (EditPage ());
		break;
	default:
		writeln ("There was an error...no corresponding action found");
		break;
	}	
}



/* uncomment out the line below for error processing */
//write (doActionEx ("ProcessErrorQueues", "ErrorHTML"));
