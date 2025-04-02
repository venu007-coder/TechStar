<SCRIPT runat="merc_server">

	var activeState = doAction('REQ_GET_FORMVALUE', "active", "active");

	if (activeState)
	{
		if (activeState == '1')
			var temp = 'Y';
		else
			var temp = 'N';

	    doAction('DATA_SETCONFIGDATA','ObjectName','PowerMarketingCfg','ColName','Value','RowName','active','NewValue', temp);	    

		writeln(activeState);
	}
	else
	{
		var activeState = doAction ('DATA_GETCONFIGDATA', 'ObjectName', 'PowerMarketingCfg',  'RowName', 'active', 'ColName', 'Value');

		if (activeState == 'Y')
			writeln("1");
		else
			writeln("0");
	}
</script>
