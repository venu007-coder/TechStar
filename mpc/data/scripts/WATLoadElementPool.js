/*
** WATLoadElementPool
** Copyright (c) Mercantec 2001
**
** Activation example: powershell.exe -s MySite -p ~/public_html/cgi-bin -o JS_SRC -f WATLoadElementPool.js
*/
<SCRIPT runat="merc_server">
	doAction('DATA_DELETEFILE', 'FileName', 'Merc_ElementPool.blb', 'ObjectName', 'PrivatePageObject');
	doAction('MPEA_RELOAD_ELEMENTPOOL');
</script>
