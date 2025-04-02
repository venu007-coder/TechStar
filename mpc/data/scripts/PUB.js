

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
	case "PUB_SavePublish":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var currentPage = SavePage ();
			doAction('ST_SET_STATEDATA', 'AlreadyBuilt', currentPage);
			doAction('ST_SET_STATEDATA', 'PromptForSave', false);
			doAction('MPUB_PUBLISH_SITE');

			if (gDEFAULT_WEB_PAGE && gDEFAULT_WEB_PAGE.length > 0)
			{
				var pageObjs = generateSEObjects (gHOME_PAGE);
				var file = gHOME_PAGE + pageObjs.pageObjArray[gHOME_PAGE].FileExt;
				var whichFile = doActionEx	('DATA_READFILE', file, 'FileName', file,
											'ObjectName', 'WATPublishDir', 'FileType', 'txt');
											
				doAction ('DATA_WRITEFILE', 'FileName', gDEFAULT_WEB_PAGE,'Data', whichFile, 'Size', 
											whichFile.length, 'ObjectName', 'DefaultDoc', 'Permissions',0644);
			}

			if (!currentPage || currentPage == '')
				write (EditPage ());
			else
				write (EditPageByName (currentPage));
		break;
	case "PUB_PreviewSite":
			incfile = includeFile ('common.js', 'JS_SRC');
			eval(incfile);
			var PageName = doAction('ST_GET_STATEDATA', 'CurrentPageName', 'CurrentPageName');
			write(PreviewSite());
			if (PageName)
			{
				doAction('ST_SET_STATEDATA', 'CurrentPageName', PageName);
				LoadPageByName (PageName);
			}
		break;
	case "PUB_RevertToPublished":
		incfile = includeFile ('common.js', 'JS_SRC');
		eval(incfile);
		doAction('MPUB_REVERT_TO_PUBLISHED');
		write(EditPageByName(gHOME_PAGE));
		break;
	default:
		writeln ("There was an error...no corresponding action found");
		break;
	}	
}



/* uncomment out the line below for error processing */
//write (doActionEx ("ProcessErrorQueues", "ErrorHTML"));
