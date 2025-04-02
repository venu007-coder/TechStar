<SCRIPT runat="merc_server">

	// Note: Output value of "TRUE" means the user is authenticated. Any other value means not authenticated.

	/* Check password */
	var user = doAction('REQ_GET_FORMVALUE', "Username", "Username");
	var pswd = doAction('REQ_GET_FORMVALUE', "Password", "Password");
	var siteid = doAction('REQ_GET_FORMVALUE', "SiteID", "SiteID");
	var access;

	access = doActionBDO('SEC_CHECKACCESS', 'Username', user, 'Password', pswd,
			'SiteID', siteid);

	if (access.Result == 'AccessOK')
		writeln("TRUE");
	else
		writeln("FALSE");

</script>
