<SCRIPT runat="merc_server">

/*
** Function retrieves the timestamp of the lastupdate to the catalog.
** The format is the number of seconds since 1970
*/

function printCatalogDate()
{
	//writeln("seconds=990000000");
	var catTimeStamp = doActionEx('CAT_GETTIMESTAMP','Result');
	if (catTimeStamp)
		writeln("seconds=" + parseInt(catTimeStamp.getTime()/1000));
}

printCatalogDate();


</script>
