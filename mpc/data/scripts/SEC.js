/*
** Security Actions
** Copyright (c) 2001, Mercantec, Inc.
*/

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
	case "SEC_ChangePassword":
//			incfile = includeFile ('common.js', 'JS_SRC');
//			eval(incfile);
			var newpswd = doAction('REQ_GET_FORMVALUE', "newpswd", "newpswd");
			var verifypswd = doAction('REQ_GET_FORMVALUE', "verifypswd", "verifypswd");
			var oldpswd = doAction('REQ_GET_FORMVALUE', "oldpswd", "oldpswd");
			
			var user = doAction('REQ_GET_FORMVALUE', "Username", "Username");
			var pswd = doAction('REQ_GET_FORMVALUE', "Password", "Password");
			var siteid = doAction('REQ_GET_FORMVALUE', "SiteID", "SiteID");
			var pswdCheck = doAction('SEC_CHECKLOGINPSWD', "Username", user, "Password", oldpswd, "SiteID", siteid);
			if (pswdCheck != "AccessOK")
			{
				doAction('ST_SET_STATEDATA', 'SECERRNO', 2);
			}
			else if (newpswd == verifypswd)
			{
				var result = doAction('SEC_UPDATEUSER', 'Username', user, 'Password', pswd, 'SiteID', siteid, 'ChangeUser', user, 'ChangePassword', newpswd);
				if (result != "AccessOK")
				{
					if (result == "MinPswdFailure")
						doAction('ST_SET_STATEDATA', 'SECERRNO', 5);
					else
						doAction('ST_SET_STATEDATA', 'SECERRNO', 4);
				}
				else
					doAction('ST_SET_STATEDATA', 'SECERRNO', 1/*success*/);
			}
			else
			{
				// the client will alert the user if the new and verify don't match
				// prior to getting here, but set an errno anyway.
				doAction('ST_SET_STATEDATA', 'SECERRNO', 3);
			}
			selectAction ("L");
		break;
	default:
		writeln ("There was an error...no corresponding action found");
		break;
	}	
}



/* uncomment out the line below for error processing */
//write (doActionEx ("ProcessErrorQueues", "ErrorHTML"));
