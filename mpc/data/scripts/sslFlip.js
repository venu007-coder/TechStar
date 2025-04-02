
<SCRIPT runat="merc_server">

	// site.cfg entries
	var SITEMGR_HTTPS_PROTOCOL="http";
	var SITEMGR_HTTPS_PORT="80";
	var SITEMGR_HTTPS_WEBSERVER="altechstar.com";
	var SITEMGR_HTTPS_PRIVATE_HTDOCS_ALIAS="/mpc/docs/";
	var SITEMGR_HTTPS_PRIVATE_CGIBIN_ALIAS="/cgi-local/mpc/";

	var SITE_HTTPS_PROTOCOL="http";
	var SITE_HTTPS_PORT="80";
	var SITE_HTTPS_WEBSERVER="altechstar.com";
	var SITE_HTTPS_PRIVATE_HTDOCS_ALIAS="/mpc/docs/";
	var SITE_HTTPS_PRIVATE_CGIBIN_ALIAS="/cgi-local/mpc/";
	var SecureSiteUrl="http://altechstar.com:80/cgi-local/mpc/PowerCommerce.cgi";
	var SecureBaseHref="http://altechstar.com:80/mpc/docs/SiteMgr/";

	// images.cfg entries
	var SecureRelURLPath = "/mpc/docs/images/";
	
	// PageEditor.cfg entries
	var SecurePublishBaseHref = "http://altechstar.com:80/mpc/docs/Site/";
	var SecurePreviewBaseHref = "http://altechstar.com:80/mpc/docs/Site/Preview/";
	var SecurePublishLinkHref = "http://altechstar.com:80/mpc/docs/Site/";
	var SecurePreviewLinkHref = "http://altechstar.com:80/mpc/docs/Site/Preview/";

	var n = 0;
	
	var scriptFile = doActionEx('DATA_READFILE', 'common.js', 'FileName', 
								'common.js','ObjectName', 'JS_SRC', 'FileType', 'txt');
	eval (scriptFile);
	
	// Editing Styles
	writeln ("Editing Styles");
	var rc = getThemeStyleList (true, true, false);
	
	var origPath = doAction("DATA_GETLITERAL","ObjectName",gSTORE_CFG,"LiteralID","SITEMGR_HTTPS_PRIVATE_HTDOCS_ALIAS");
	origPath += "images/";
	for (n = 0; n < rc.themes.customThemes.length; n++)
	{
		var fileOut = "";
		var cssObj = generateCSSObject (rc.themes.customThemes[n]);
		for (var z = 0; z < cssObj['#className'].length; z++)
		{
			if (cssObj['#className'][z].indexOf(":") < 0)
				fileOut += ".";
			
			fileOut += cssObj['#className'][z] + " {\n";
			for (var x = 0; x < cssObj[cssObj['#className'][z]]['#styleName'].length; x++)
			{
				if (cssObj['#className'][z].indexOf("secure") == 0 && 
					cssObj[cssObj['#className'][z]]['#styleName'][x].toLowerCase() == "background-image")
				{
					var styVal = cssObj[cssObj['#className'][z]][(cssObj[cssObj['#className'][z]]['#styleName'][x])][0];
					if (styVal.indexOf("/") == styVal.indexOf(origPath))
						styVal = styVal.replace (origPath, SecureRelURLPath);
					cssObj[cssObj['#className'][z]][(cssObj[cssObj['#className'][z]]['#styleName'][x])][0] = styVal;
				}
				fileOut += cssObj[cssObj['#className'][z]]['#styleName'][x] + ': ' +
						cssObj[cssObj['#className'][z]][(cssObj[cssObj['#className'][z]]['#styleName'][x])].join(',')+';\n';
			} 
			fileOut += "\n}\n\n";
		}
		
		doAction ('DATA_WRITEFILE', 'FileName', gTHEMES_DIR+rc.themes.customThemes[n],'Data', fileOut, 
					'Size', fileOut.length, 'ObjectName', gPUBLIC,'Permissions',0644);
	}
	
	
	
	// Editing PageEditor.cfg
	writeln ("Editing PageEditor.cfg");
	var peArray = new Array("SecurePublishBaseHref", "SecurePreviewBaseHref", "SecurePublishLinkHref",
							"SecurePreviewLinkHref");
	for (n = 0; n < peArray.length; n++)
		doAction ('DATA_SETCONFIGDATA',  'ObjectName', 'PageEditorCfg',  'RowName', 
				  peArray[n], 'ColName', 'Value', 'NewValue', eval(peArray[n]));
				  
	
	// Editing Site.cfg
	writeln ("Editing Site.cfg");
	var scArray = new Array("SITEMGR_HTTPS_PROTOCOL", "SITEMGR_HTTPS_PORT", "SITEMGR_HTTPS_WEBSERVER",
							"SITEMGR_HTTPS_PRIVATE_HTDOCS_ALIAS", "SITEMGR_HTTPS_PRIVATE_CGIBIN_ALIAS",
							"SITE_HTTPS_PROTOCOL", "SITE_HTTPS_PORT", "SITE_HTTPS_WEBSERVER",
							"SITE_HTTPS_PRIVATE_HTDOCS_ALIAS", "SITE_HTTPS_PRIVATE_CGIBIN_ALIAS",
							"SecureSiteUrl", "SecureBaseHref");
							
	var tmpFile = doActionEx ('DATA_READFILE', 'site.cfg', 'FileName', 'site.cfg','ObjectName',
								 'CfgDir', 'FileType', 'txt');
					
	// create a backup
	var now = new Date();			 
	doAction ('DATA_WRITEFILE', 'FileName', 'site_'+now.getTime()+'.cfg','Data', tmpFile, 'Size', 
										tmpFile.length, 'ObjectName', 'CfgDir','Permissions',0600);
	for (n = 0; n < scArray.length; n++)
	{
		var curVal = doAction ('DATA_GETLITERAL', 'ObjectName', gSTORE_CFG,  'LiteralID', 
								scArray[n]);
		
		tmpFile = tmpFile.replace(scArray[n]+"="+curVal, scArray[n]+"="+eval(scArray[n]));
	}
		
	doAction ('DATA_WRITEFILE', 'FileName', 'site.cfg','Data', tmpFile, 'Size', 
			 tmpFile.length, 'ObjectName', 'CfgDir','Permissions',0600);	
			 
	// Editing images.cfg
	writeln ("Editing images.cfg");
		 
	var result = doAction ('DATA_GETHEADERS',  'GetRow', true, 'ObjectName', gIMAGES_CFG);
	result = result.split('\t');
	
	for (n = 0; n < result.length; n++)
	{
		var local = doAction ('DATA_GETCONFIGDATA',  'ObjectName', gIMAGES_CFG,  'RowName', 
							result[n], 'ColName', 'Local');
		if (local && local.toLowerCase() == "yes")
		{
			var useVal = SecureRelURLPath + result[n] + "/";
			if (result[n] == "*My Images*")
				useVal = SecureRelURLPath;
			doAction ('DATA_SETCONFIGDATA',  'ObjectName', gIMAGES_CFG,  'RowName', 
					result[n], 'ColName', 'SecureRelURLPath', 'NewValue', useVal);
		}
	}	  
				  
</script>


