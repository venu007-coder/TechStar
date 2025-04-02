
<SCRIPT runat="merc_server">
	/*
	** SiteMgrAdmiin.htm
	**
	** Activation example: powershell.exe -s MySite -p /path/to/broker -o JS_SRC -f SiteMgrAdmin.js -q "sm_action=AddUser&user=Bozo&pswd=test.1234&site=MySite"
	*/

	var which_smAction = doAction('REQ_GET_FORMVALUE', "sm_action", "sm_action");
	
	which_smAction = which_smAction.split("\t");
	for (var n = 0; n < which_smAction.length; n++)
		selectAction (which_smAction[n]);
		
	function selectAction (action)
	{
		switch (action)
		{
		case "AddUser":
			writeln("Adding User");
			var user = doAction('REQ_GET_FORMVALUE', "user", "user");
			var pswd = doAction('REQ_GET_FORMVALUE', "pswd", "pswd");
			var site = doAction('REQ_GET_FORMVALUE', "site", "site");
	
			// GroupID is not supported for this phase
			var result = doAction('SEC_ADDUSER', 'Username', user, 'Password', pswd, 'GroupName', 'nobody', 'SiteID', site, 'MyGroup', 0);
			if (result != "AccessOK")
				write("User not added: " + result);
			break;
		case "SendRegInstall":
			var installTime = new Date();
			
			doAction ('DATA_DELETECONFIGROW',  'ObjectName', 'SendReg', 'RowName', 
						'InstallDateTime(GMT)');
			doAction ('DATA_ADDCONFIGROW', 'ObjectName', 'SendReg', 'RowName', 
						'InstallDateTime(GMT)', 'RowData', installTime.toGMTString());
			doAction ('DATA_DELETECONFIGROW',  'ObjectName', 'SendReg', 'RowName', 
						'InstallDateTimeLocale');
			doAction ('DATA_ADDCONFIGROW', 'ObjectName', 'SendReg', 'RowName', 
						'InstallDateTimeLocale', 'RowData', installTime.toLocaleString());
			
			var regSent = doAction ('DATA_GETCONFIGDATA',  'ObjectName', 'SendReg',
									'RowName', 'RegSent', 'ColName', 'Value');
					
			if (!regSent || regSent.toLowerCase() == "no")
			{					
				writeln("Registering");
				executeJsFile ('sendreg.js', 'SendReg');
			}
			break;
		case "SendRegUpgrade":
			doAction('ST_SET_STATEDATA', 'PostInstall', 'yes');
			selectAction ("SendRegInstall");
			break;
		default:
			writeln ("There was an error...no corresponding action found");
		break;
		}	
	}
	
	function executeJsFile (executeThisfile, action)
	{
		var incJsFile = doActionEx('DATA_READFILE',executeThisfile, 'FileName', executeThisfile,'ObjectName','Site','FileType','txt');
		eval (incJsFile);
		selectAction (action);
		return;
	}
</script>
