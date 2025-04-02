function begin()
{
		var cs_inc2 = doActionEx ('DATA_READFILE','common.js', 'FileName', 'common.js',
						'ObjectName', 'JS_SRC', 'FileType', 'txt');
		eval (cs_inc2);
		var mode = doAction('ST_GET_STATEDATA', 'PE_OutputMode', 'PE_OutputMode');
		var currentPage = doAction('ST_GET_STATEDATA', 'CurrentPageName', 'CurrentPageName');
		if (mode == "PE_EditMode")
		{
			var seObj = generateSEObjects ('*CurrentWorkingPage*');
			var pageObj = seObj.pageObjArray['*CurrentWorkingPage*'];
		}
		else
		{
			var seObj = generateSEObjects (currentPage);
			var pageObj = seObj.pageObjArray[currentPage];
		}
		/* need these up here or else Netscape won't see them */
		writeln('<form name="someform">'+
			'<input type=hidden name="NSSelectedLayer" value="">'+
			'<input type=hidden name="IESelectedLayer" value="">');
			
		var numElements=doAction('MPEA_GET_ELEMENTCOUNT');
		for (i=0; i < numElements; i++)
		{
			var index = String(i);
			var merc_elementid=doAction('MPEA_GET_ELEMENTIDBYPOS', 'Position', index);
			writeln('<input type=hidden name="newLayer'+merc_elementid+'_X" value="0">');
			writeln('<input type=hidden name="newLayer'+merc_elementid+'_Y" value="0">');
		}
		writeln('<input type=hidden name="controlPanelLink_X" value="0">'+
		'<input type=hidden name="controlPanelLink_Y" value="0">'+
		'<input type=hidden name="moveHistoryList" value="">'+
		'</form>'+
		'<div class="text-body">');

		var myThemeName = pageObj.Theme;
		var myStyleName = pageObj.Style;

		var selectedTheme = myThemeName;
		var selectedStyle = myStyleName;

		var secureAlias = doAction ('DATA_GETLITERAL', 'ObjectName', gSTORE_CFG, 'LiteralID', 'SITEMGR_HTTPS_PRIVATE_HTDOCS_ALIAS');
		var secureSharedAlias = doAction ('DATA_GETLITERAL', 'ObjectName', gSTORE_CFG, 'LiteralID', 'SITEMGR_HTTPS_SHARED_HTDOCS_ALIAS');
		if (myThemeName.indexOf ("TS_") == 0)
		{
			if (mode != "PE_EditMode" && pageObj.SecureBaseHref.toLowerCase() == "yes")
				myThemeName = secureSharedAlias + gWEB_ALIAS_THEMES + "/" + myThemeName;
			else
				myThemeName = gCOMMON_URL + gWEB_ALIAS_THEMES + "/" + myThemeName;
		}
		else
		{
			if (mode != "PE_EditMode" && pageObj.SecureBaseHref.toLowerCase() == "yes")
				myThemeName = secureAlias + gWEB_ALIAS_THEMES + "/" + myThemeName;
			else
				myThemeName = gWEB_ROOT + gWEB_ALIAS_THEMES + "/" + myThemeName;
		}
		if (myStyleName.indexOf ("SS_") == 0)
		{
			if (mode != "PE_EditMode" && pageObj.SecureBaseHref.toLowerCase() == "yes")
				myStyleName = secureSharedAlias + gWEB_ALIAS_STYLES + "/" + myStyleName;
			else
				myStyleName = gCOMMON_URL + gWEB_ALIAS_STYLES + "/" + myStyleName;
		}
		else
		{
			if (mode != "PE_EditMode" && pageObj.SecureBaseHref.toLowerCase() == "yes")
				myStyleName = secureAlias + gWEB_ALIAS_STYLES + "/" + myStyleName;
			else
				myStyleName = gWEB_ROOT + gWEB_ALIAS_STYLES + "/" + myStyleName;
		}

		var SC_BaseUrl;
		if (mode == "PE_EditMode")
		{
			SC_BaseUrl = doAction('DATA_GETLITERAL', 'ObjectName', 'storecfg', 'LiteralID', 'BaseHref');
			writeln('<BASE href='+SC_BaseUrl+'>');
		}
		else if (mode == "PE_PublishMode")
		{
			// check for which value to use in base tag
			if (pageObj.SecureBaseHref.toLowerCase() == "yes")
				SC_BaseUrl = doAction('DATA_GETCONFIGDATA', 'ObjectName', 'PageEditorCfg', 'RowName', 'SecurePublishBaseHref', 'ColName', 'Value');
			else
				SC_BaseUrl = doAction('DATA_GETCONFIGDATA', 'ObjectName', 'PageEditorCfg', 'RowName', 'PublishBaseHref', 'ColName', 'Value');
			writeln('<BASE href='+SC_BaseUrl+'>');
		}
		else // Preview mode
		{
			if (pageObj.SecureBaseHref.toLowerCase() == "yes")
				SC_BaseUrl = doAction('DATA_GETCONFIGDATA', 'ObjectName', 'PageEditorCfg', 'RowName', 'SecurePreviewBaseHref', 'ColName', 'Value');
			else
				SC_BaseUrl = doAction('DATA_GETCONFIGDATA', 'ObjectName', 'PageEditorCfg', 'RowName', 'PreviewBaseHref', 'ColName', 'Value');
			writeln('<BASE href='+SC_BaseUrl+'>');
		}

		if (mode != "PE_EditMode" && pageObj.SecureBaseHref.toLowerCase() == "yes")
			writeln('<link rel="stylesheet" href="'+secureSharedAlias+'styles/master_layer.css">');
		else
			writeln('<link rel="stylesheet" href="'+gCOMMON_URL+'styles/master_layer.css">');
		writeln('<link rel="stylesheet" type="text/css" href="'+escape(myStyleName)+'">');
		writeln('<link rel="stylesheet" type="text/css" href="'+escape(myThemeName)+'">');

		var bCommerce = IsCommerceEnabled();
		var bService = IsServiceEnabled();

		if (isPageObjValid (pageObj))
		{
			if (mode == "PE_EditMode")
			{
				output = doAction('MPEA_GET_EDITMODEOUTPUT');
			}
			else
			{
				output = doAction('MPEA_GET_PUBLISHEDOUTPUT');
			}
			write(output);
			writeln('</div>');
		}

		if (currentPage && currentPage.toLowerCase() != gHOME_PAGE.toLowerCase() &&
			currentPage.toLowerCase() != gCURRENT_PAGE.toLowerCase() &&
			currentPage.toLowerCase() != gBASE_PAGE.toLowerCase() &&
			(!pageObj[gPAGE_TYPE] || pageObj[gPAGE_TYPE] == ''))
			writeln ("<script language='javascript'>var bCanDelete = true;</script>");
		else
			writeln ("<script language='javascript'>var bCanDelete = false;</script>");
		// Check for editmode as that sets gCURRENT_PAGE, whereas publish loops through
		// all pages.
		if (!currentPage || currentPage == '' || mode == "PE_EditMode")
			currentPage = gCURRENT_PAGE;

		var keyWords =  unescape (pageObj.KeyWords);
		var title;
		if (mode == 'PE_EditMode')
			title = 'mainFrame';
		else
			title = unescape (pageObj.Title);
		var description = unescape (pageObj.Description);
		// remove CR LF that creates an extra return in text areas
		description = description.replace (/[\f\r]/g, '');
		writeln ('<TITLE>'+title+'</TITLE>\n'+
				'<META NAME="description" Content="'+description+'">\n'+
				'<META NAME="keywords" Content="'+keyWords+'">');
		writeln('</HEAD>');
		var output;
	if (mode == "PE_EditMode")
	{
		writeln('<SCRIPT SRC="WATedit.js" language="javascript"></script>');
	}
	var undoAvailable = doAction("MPEA_UNDO_AVAILABLE");
	var controlPanelPos = doAction('DATA_GETCONFIGDATA', 'ObjectName', 'PageEditorCfg', 'RowName', 'ControlPanelPos', 'ColName', 'Value');
	var pos = controlPanelPos.indexOf('|');
	writeln('<script language="javascript">'+
		'var dragLayers = new Array();'+
		'	var allDragLayers = new Array();'+
		'	/* order is important */'+
		'	var alwaysOnTop = new Array(\'controlPanel\', \'pulldownMenu\', \'pulldownPage\', \'pulldownGoTo\', \'pulldownStoreElement\', \'controlPanelLink\');'+
		'	bPromptForSave = '+undoAvailable+';');

	cellmargin=5;
	cellborder=1;

	writeln('var controlPanelX = '+controlPanelPos.substring(0, pos)+';');
	writeln('var controlPanelY = '+controlPanelPos.substring(pos+1)+';');

	var prompt = doAction ('ST_GET_STATEDATA', 'PromptForSave', 'PromptForSave');
	if (prompt)
	{
		writeln ("if (!bPromptForSave)");
		write ("bPromptForSave = "+prompt+";");
	}
	var aHeight = (isNaN (pageObj.layoutObjArray.top.height) ? 80 :pageObj.layoutObjArray.top.height);
	var aWidth = (isNaN (pageObj.layoutObjArray.top.width) ? 600 : pageObj.layoutObjArray.top.width);
	var bHeight = (isNaN (pageObj.layoutObjArray.left.height) ? 350 : pageObj.layoutObjArray.left.height);
	var bWidth = (isNaN (pageObj.layoutObjArray.left.width) ? 120 : pageObj.layoutObjArray.left.width);
	var cHeight = (isNaN (pageObj.layoutObjArray.main.height) ? 350 : pageObj.layoutObjArray.main.height);
	var cWidth = (isNaN (pageObj.layoutObjArray.main.width) ? 480 : pageObj.layoutObjArray.main.width);
			
	var pageHeight = doAction('MPEA_GET_PAGEHEIGHT', 'Minimum', cHeight.toString());
	if (!isNaN(pageHeight))
		cHeight = pageHeight;
	writeln ("var A_height="+aHeight+", B_height="+bHeight+", C_height="+cHeight+";");
	writeln ("var A_width="+aWidth+", B_width="+bWidth+", C_width="+cWidth+";");
	writeln ("var pageName = '"+currentPage+"';");
	writeln ("margin="+cellmargin+";");
	writeln ("border="+cellborder+";");
	writeln ("baseUrl='"+SC_BaseUrl+"';");
	
	writeln(''+
	'useTheme = \''+selectedTheme+'\';'+
	'useStyle = \''+selectedStyle+'\';'+
	'table_layout=3;'+
	'A_top_corner_X=parseInt(margin+border);'+
	'A_top_corner_Y=parseInt(margin+border);'+
	'A_btm_corner_Y=parseInt(margin+A_height+(2*border));'+
	'A_btm_corner_X=parseInt(margin+A_width+(2*border));'+
	'B_top_corner_X=parseInt(margin+border);'+
	'B_top_corner_Y=parseInt(margin+A_height+(2*border));'+
	'B_btm_corner_Y=parseInt(margin+A_height+B_height+(2*border));'+
	'B_btm_corner_X=parseInt(margin+B_width+(2*border));'+
	'C_top_corner_X=parseInt(margin+B_width+(2*border));'+
	'C_top_corner_Y=parseInt(margin+A_height+(2*border));'+
	'C_btm_corner_Y=parseInt(margin+A_height+C_height+(3*border));'+
	'C_btm_corner_X=parseInt(margin+B_width+C_width+(3*border));'+
	'</script>');

	if (mode == "PE_EditMode")
	{
		write('<BODY class="penda-bkgrd" TOPMARGIN="5" LEFTMARGIN="5" MARGINWIDTH="5" MARGINHEIGHT="5" ');
		write('onLoad="init();');
		var numElements=doAction('MPEA_GET_ELEMENTCOUNT');
		var z = 0, zAll = 0;
		for (i=0; i < numElements; i++)
		{
			var index = String(i);
			var cell=doAction('MPEA_GET_ELEMENTCELLBYPOS', 'Position', index);
			var merc_elementcell = 'C';
			switch (cell)
			{
				// returned value is the index into the add_pagelayoutcells order above
				// Convert to A,B,C for client JavaScript
				case 0:
					merc_elementcell = 'A';
					break;
				case 1:
					merc_elementcell = 'B';
					break;
				case 2:
					merc_elementcell = 'C';
					break;
				default:
					merc_elementcell = 'C';
					break;
			}
			var merc_elementid=doAction('MPEA_GET_ELEMENTIDBYPOS', 'Position', index);
			var stringID=String(merc_elementid);
			var global=doAction('MPEA_ELEMENT_GLOBAL', 'ElementID', stringID);
			var buf="MERC_dragLayer('newLayer"+merc_elementid+"','',0,0,0,0,true,true,";
			if (global)
				buf+="0,0,0,0,";
			else
				buf+="-1,-1,-1,-1,";
			buf+="-1,-1,-1,'/*checkOverlap(\\'newLayer"+merc_elementid+"\\', ";
			buf+="\\'\\');*/layerConfineTo(\\'newLayer"+merc_elementid+"\\',\\'"
			buf+=merc_elementcell+"\\');addToMoveList(\\'newLayer"+merc_elementid;
			buf+="\\');',1,'bPromptForSave = true;');"
			writeln(buf);
			writeln ("allDragLayers["+(zAll++)+"] = 'newLayer"+merc_elementid+"';");
			if (!global)
				writeln ("dragLayers["+(z++)+"] = 'newLayer"+merc_elementid+"';");
		}
		writeln("for (var n = 0; n < dragLayers.length; n++)"+
				"{"+
				"	var posLeft=(document.layers ? document[dragLayers[n]].left : document.all[dragLayers[n]].style.left);"+
				"	var posTop=(document.layers ? document[dragLayers[n]].top : document.all[dragLayers[n]].style.top);"+
				""+
				"	current_layerStartX = (parseInt(posLeft) < (B_width) ? (B_width+margin+border) : parseInt(posLeft));"+
				"	current_layerStartY = (parseInt(posTop) < (A_height) ? (A_height+margin+border) : parseInt(posTop));"+
				"	current_layer = dragLayers[n];"+
				"	layerConfineTo (dragLayers[n], 'C');"+
				"}"+
				"current_layer='';"+
				"current_layerStartX='';"+
				"current_layerStartY='';"+
				"bounceBack=false;"+
				"MERC_dragLayer('controlPanel','',0,180,80,30,true,false,-1,-1,-1,-1,-1,-1,-1,'addToMoveList(\\'controlPanel\\');',1,'');checkLocation('controlPanelLink');"+
				"initForm();"+
				"initControlPanel('controlPanel');"+
				"setAlwaysOnTopLayers();"+
				"parent.CloseWin();\""+
				"onUnload = \""+
				"	if (bPromptForSave)"+
				"		savePage(false, false, '', '');\">");
	}
	else
	{
		write("<body TOPMARGIN=5 LEFTMARGIN=5 RIGHTMARGIN=0 MARGINWIDTH=5 MARGINHEIGHT=0>");
	}
	if (mode == "PE_EditMode")
	{
		write (generateThemeTableHTML (eval("pageObj."+gTHEME), pageObj, 1));
	}
	else
	{
		write(generateThemeTableHTML (eval("pageObj."+gTHEME), pageObj, -1));
	}

	// generate nav bar
	aLeft=parseInt(cellmargin+cellborder);
	aTop=parseInt(cellmargin+cellborder);
	bLeft=parseInt(cellmargin+cellborder);
	bTop=parseInt(cellmargin+aHeight+(2*cellborder));
	cLeft=parseInt(cellmargin+bWidth+(2*cellborder));
	cTop=parseInt(cellmargin+aHeight+(2*cellborder));

	if (aHeight == 0)
	{
		aTop = cTop; // nav bar goes in cell c if no a
		aLeft = cLeft;
		aWidth = cWidth;
	}
	if (bWidth == 0)
	{
		bLeft = cLeft; // nav bar goes in cell c if no b
		bTop = cTop;
	}

	// Set initial yPos of nav bar below any image in theme
	var styObj = generateCSSObject (selectedTheme);
	var topPx = 10;
	if (styObj['navbar-vertical-start'])
		if (styObj['navbar-vertical-start'].height)
			topPx = styObj['navbar-vertical-start'].height;
	bTop += parseInt(topPx);

	var rc = generateNavButtonsHTML (aTop, aLeft, aWidth, aHeight-cellmargin, bTop, bLeft, bWidth, bHeight, 1, mode);
	for (var i=0; i < rc.length; i++)
	{
		if (mode != "PE_EditMode" && pageObj.SecureBaseHref.toLowerCase() == "yes")
			write (rc[i].replace ("class='btn-background'", "class='secure-btn-background'"));
		else
			write (rc[i]);
	}

	// Insert the commerce tone tracking javascript if we are not in edit mode and only if the commerce tone piece is installed

	if (mode != "PE_EditMode")
	{
		var PwrMktgActive = doAction ('DATA_GETCONFIGDATA',  'ObjectName', 'PowerMarketingCfg',  
										'RowName', 'active', 'ColName', 'Value');
												
		if (PwrMktgActive && PwrMktgActive.toLowerCase() == "y")
		{
			var PwrMktgURL =  doAction ('DATA_GETCONFIGDATA',  'ObjectName', 'PowerMarketingCfg',
														'RowName', 'location', 'ColName', 'Value');
			if (PwrMktgURL) // if this exists then the commerce tone piece is installed
			{
				var ctUrlPath = 'http://altechstar.com:80/cgi-local/mpc/ctone_process.cgi';
				if (pageObj.SecureBaseHref.toLowerCase() == "yes")
					ctUrlPath = 'http://altechstar.com:80/cgi-local/mpc/ctone_process.cgi';
				writeln('<!-- CommerceTone Begin -->');
				write('<scr');
				write('ipt language="javascr');
				writeln('ipt">');
				writeln('ctone_referrer = "bookmark";');
				writeln('ctone_ref_host = "bookmark";');
				writeln('if (window.document.referrer) ');
				writeln('{');
				writeln('	ctone_referrer = window.document.referrer;');
				writeln('	ctone_arr = ctone_referrer.split("/");');
				writeln('	if (ctone_arr.length >= 3) {');
				writeln('	  ctone_ref_host = ctone_arr[2];');
				writeln('	}');
				writeln('}');
				writeln('if (ctone_ref_host != window.location.host) {');
				writeln('  ctone_dt = new Date();');
				writeln('  ctone_img2 = new Image();');
				writeln('  ctone_img2.src = "'+ctUrlPath+'?referrer=" + escape(ctone_referrer) + "&dt=" + ctone_dt.getTime();');
				writeln('}');
				write('</scr');
				writeln('ipt>');
				writeln('<!-- CommerceTone End -->');
			}
		}
	}

	if (mode == "PE_EditMode")
	{
/* SMALL CONTROL PANEL */
		writeln('<div id="controlPanelLink" name="controlPanelLink" style="position:absolute;z-index:1">'+
			'<!--BE SURE TO CHANGE IMAGE and CSS width/height-->'+
			'<a href="javascript://;" onMouseDown="javascript:shiftControlPanelLayers();" onMouseOver="window.status=\'Reset Control Panel\';return true;"'+
			 'onMouseOut="window.status=\'\';return true;"><img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/controlpaneltiny.gif" name="controlpaneltiny" border=0 alt="Get Control Panel"></a>'+
		'</div>');
		
/* PAGE DROPDOWN */	
		writeln('<div id="pulldownPage" name="pulldownPage" onMouseOver="showLayer(\'pulldownPage\');" style="position:absolute;width:75;height:16;layer-background-color:#666666;background-color:#666666;z-index:1">'+
			'<table width="75" border="0" cellspacing="0" cellpadding="0"><tr><td align="center"><a href="#" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="hideSubMenus();return false;"><img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/pulldown_arrow_up.gif" border="0" alt="close"></a></td></tr></table>'+
			'<a href="#" class="pulldown" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="hideSubMenus();if(!NS){gDISABLE_NEXT_EVENT=\'mouseup\';}if(confirmDeletePage()){deletePage();}" onClick="return false;"><font color="#ffffff">&nbsp;Delete</font></a><br>'+
			'<a href="#" class="pulldown" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="hideSubMenus();gotoTheme();"><font color="#ffffff">&nbsp;Theme...</font></a><br>'+
			'<a href="#" class="pulldown" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="hideSubMenus();gotoStyle();"><font color="#ffffff">&nbsp;Style...</font></a><br>'+
			'<table border="0"><tr><td width="70">'+
			'<a href="#" class="pulldown" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="showHideLayerSwitch(\'pulldownGoTo\', \'\');return false;" onMouseOver="showLayer(\'pulldownGoTo\')"><font color="#ffffff">Go To</font></a>'+
			'</td><td align="right"><a href="#" class="pulldown" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="showHideLayerSwitch(\'pulldownGoTo\', \'\');return false;" onMouseOver="showLayer(\'pulldownGoTo\')">'+
			'<img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/pulldown_arrow_right.gif" border="0"></a><br>'+
			'</td></tr></table>'+
		'</div>');
		/* set where the third level navigation appears */
		writeln ('<script language="javascript">gotoOffSetTop=60,gotoOffSetLeft=75;</script>');
		
/* GOTO DROPDOWN */	
		writeln('<div id="pulldownGoTo" name="pulldownGoTo" onMouseOver="showLayer(\'pulldownPage\');showLayer(\'pulldownGoTo\');" style="position:absolute;width:100;height:16;layer-background-color:#666666;background-color:#666666;z-index:1;color:#ffffff;">'+
			'<table width="100" border="0" cellspacing="0" cellpadding="0"><tr><td align="center"><a href="#" class="pulldown" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="hideLayer(\'pulldownGoTo\');return false;"><img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/pulldown_arrow_up.gif" border="0" alt="close"></a></td></tr></table>');
			
			
		var pageList = generatePageList();
		for (var n = 0; n < pageList.length; n++)
		{
			writeln('<a href="#" class="pulldown" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="hideSubMenus();editPage(\''+pageList[n]+'\');"><font color="#ffffff">&nbsp;'+pageList[n]+'</font></a><br>');
		}
		writeln('</div>');
		
/* INSERT DROPDOWN */
		writeln('<div id="pulldownMenu" name="pulldownMenu" onMouseOver="showLayer(\'pulldownMenu\');" style="position:absolute;width:80;height:16;layer-background-color:#666666;background-color:#666666;z-index:1">'+
		'	<table width="80" border="0" cellspacing="0" cellpadding="0"><tr><td align="center"><a href="#" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="hideSubMenus();return false;"><img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/pulldown_arrow_up.gif" border="0" alt="close"></a></td></tr></table>');
		//graphics, texts and types return the same named results (Result0, Result1, Result2, ...)
//		var UIgraphics = doActionBDO('MPEA_GET_ELEMENTPOOLGRAPHICS');
		var UItexts = doActionBDO('MPEA_GET_ELEMENTPOOLTEXTS');
		var eleTypes = doActionBDO('MPEA_GET_ELEMENTPOOLTYPES');
		var labels = eleTypes.GetLabels();
		var helpSrvr = doAction ("DATA_GETCONFIGDATA", "ObjectName", "HelpCfg", "RowName", "helpdomain", "ColName", "Domain");
		var helpversion = doAction ("DATA_GETCONFIGDATA", "ObjectName", "HelpCfg", "RowName", "helpversion", "ColName", "Domain");
		var addToOffset = 0;
		for (var i=0; i < labels.length; i++)
		{
			if (UItexts[labels[i]] != '')
			{
				write('<a href="#" class="pulldown" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="hideSubMenus();addElement(\''+eleTypes[labels[i]]+'\');">');
				write('<font color="#ffffff">&nbsp;'+UItexts[labels[i]]+'</font>');
				writeln('</a><br>');
				addToOffset+=8;
			}
		}

		writeln('<a href="#" class="pulldown" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="hideSubMenus();addPage();"><font color="#ffffff">&nbsp;Page</font></a><br>');
		/* check for commerce enabled */
		//if (bCommerce) 
		//	writeln('<a href="#" class="pulldown" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="showHideLayerSwitch(\'pulldownStoreElement\', \'\');return false;" onMouseOver="showLayer(\'pulldownStoreElement\')"><font color="#ffffff">&nbsp;Store Element</font><img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/pulldown_arrow_right.gif" border="0"></a><br>');
		writeln('</div>');
		/* set where the third level navigation appears */
		writeln ('<script language="javascript">seOffSetLeft=80,seOffSetTop=12+'+addToOffset+';</script>');
		
/* STORE_ELEMENT DROPDOWN */	
		writeln('<div id="pulldownStoreElement" name="pulldownStoreElement" onMouseOver="showLayer(\'pulldownMenu\');showLayer(\'pulldownStoreElement\');" style="position:absolute;width:75;height:16;layer-background-color:#666666;background-color:#666666;z-index:1;color:#ffffff;">'+
			'<table width="75" border="0" cellspacing="0" cellpadding="0"><tr><td align="center"><a href="#" class="pulldown" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="hideLayer(\'pulldownStoreElement\');return false;"><img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/pulldown_arrow_up.gif" border="0" alt="close"></a></td></tr></table>');
			
		writeln('</div>');
		
/* CONTROL PANEL */
		writeln('	<!--THIS IS FOR THE BOTTOM, CUSTOMIZE AS YOU SEE FIT-->'+
		'	<div id="pulldownBottom" name="pulldownBottom" style="layer-background-color:#666600;background-color:#666600">'+
		'		<table width=104 border=0 cellpadding=1 cellspacing=1><tr><td>This is my bottom...</td></tr></table>'+
		'	</div>'+
		'	<div id="controlPanel" name="controlPanel" style="padding:2px;position:absolute; width:80px; height:176px; z-index:3; left: 800px; top: 9px; visibility: visible">'+
		'	  <table width="80" class="tb_edges" border="0" bordercolorlight="#996600" bordercolordark="#FFCC33" bgcolor="#CC0000" cellpadding="2">'+
		'	    <tr>'+
		'	      <td>'+
		'	        <table width="80" bgcolor="#333333" border="0" cellpadding="1" cellspacing="0" bordercolorlight="#996600" bordercolordark="#FFCC33" bgcolor="#CC0000">'+
		'			  <tr align="center">'+
		'	            <td height="16" colspan="2"><a href="#" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}frontBack(\'front\');" onMouseUp="if(!NS){gDISABLE_NEXT_EVENT=\'mouseup\';}"><img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/tbrlg_front.gif" width=36 height=16 border=0 align="middle" alt="Front"></a><a href="#" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}frontBack(\'back\');" onMouseUp="if(!NS){gDISABLE_NEXT_EVENT=\'mouseup\';}"><img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/tbrlg_back.gif" width=36 height=16 border=0 align="middle" alt="Back"></a></td>'+
		'	          </tr>'+
		'			  <tr align="center">'+
		'	            <td height="16" colspan="2"><a href="#" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="hideLayer(\'pulldownPage\');hideLayer(\'pulldownGoTo\');showHideLayerSwitch(\'pulldownMenu\', \'pulldownStoreElement\');return false;" ><img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/tbrlg_insert.gif" width=74 height=16 border=0 name="pd" align="middle" alt="Insert"></a></td>'+
		'	          </tr>'+
		'	          <tr align="center">'+
		'	            <td height="16" colspan="2">'+
		'	              <a href="#" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}editLayer();" onMouseUp="hideSubMenus();" ><img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/tbrlg_edit.gif" width="74" height="16" border=0 alt="Edit"></a></td>'+
		'	          </tr>'+
		'	          <tr align="center">'+
		'	            <td height="16" colspan="2"> <a href="#" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}deleteLayer();" onMouseUp="hideSubMenus();"><img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/tbrlg_delete.gif" width="74" height="16" border=0 alt="Delete"></a></td>'+
		'	          </tr>'+
		'	          <tr align="center">'+
		'	            <td height="16" colspan="2"><a href="#" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="hideLayer(\'pulldownMenu\');hideLayer(\'pulldownStoreElement\');showHideLayerSwitch(\'pulldownPage\', \'pulldownGoTo\');return false;" ><img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/tbrlg_page.gif" width="74" height="16" border=0 name="pd" alt="Page"></a></td>'+
		'	          </tr>'+
		'	          <tr align="center">'+
		'	            <td height="16" valign="middle" align="center" colspan="2"><a href="#" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="hideSubMenus();undo();return false;" ><img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/tbrlg_undo.gif" width="74" height="16" border=0 alt="Undo"></a></td>'+
		'	          </tr>'+
		'	          <tr align="center">'+
		'	            <td align="center"  height="16" colspan="2">'+
		'	              <a href="#" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="hideSubMenus();savePage(true, true, \'\', \'\');" ><img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/tbrlg_save.gif" width="74" height="16" border=0 alt="Save"></a></td>'+
		'	          </tr>'+
		'	          <tr align="center">'+
		'	            <td align="center"  valign="middle" height="16" colspan="2">'+
		'	              <a href="#" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="hideSubMenus();savePublish();"><img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/tbrlg_savpub.gif" width="74" height="16" border=0 alt="Save & Publish"></a></td>'+
		'	          </tr>'+
		'	          <tr align="center">'+
		'	            <td height="16"  align="center" colspan="2">'+
		'	              <div align="center"><a href="#" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="hideSubMenus();revertToPublished();return false;" ><img border=0 src="/cgi-docs/Mercantec/PC_F_6.6.1/images/tbrlg_revert.gif" width="74" height="16" alt="Revert"></a></div></td>'+
		'	          </tr>'+
		'	          <tr align="center">'+
		'	            <td height="16"  align="center" colspan="2">'+
		'	              <div align="center"><a href="#" onClick="return false;" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="hideSubMenus();previewSite();return false;" ><img border=0 src="/cgi-docs/Mercantec/PC_F_6.6.1/images/tbrlg_preview.gif" width="74" height="16" alt="Preview"></a></div></td>'+
		'	          </tr>'+
		'	          <tr align="center">'+
		'	            <td align="center" valign="middle" height="14" colspan="2" bgcolor="#000066">'+
		'	              <img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/mover_wht.gif" width="14" height="14" align="baseline" alt="Move Control Panel">&nbsp;<!--HELP WINDOW LINK-->'+
		'	<a href="#" onClick="return false" onMouseDown="if(!NS){gDISABLE_NEXT_EVENT=\'mousedown\';}" onMouseUp="parent.openHelpWindow(\'http://'+helpSrvr+'/cgi-bin/helpsrvr.exe?R+helpsrvr+OH_WAT_SITEPAGES+SoftCart+'+helpversion+'+en-us\', \'Alane\');"> <img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/help_sm2.gif" width="38" border="0" height="15" align="baseline" alt="Help on Page Elements"></a></td><!--END HELP WINDOW-->'+
		'	          </tr>'+
		'	        </table>'+
		'	      </td>'+
		'	    </tr>'+
		'	  </table>'+
		'	</div>');
	}

	if (mode == "PE_EditMode")
	{
		writeln('<div id="disableControlPanel" name="disableControlPanel" style="width:1000px;height:800px;position:absolute;top:0px;left:0px;z-index:10;visibility:hidden;">'+
			'<table width="1000" border="0"><tr><td>&nbsp;</td></tr></table></div>');
	}
	else if (pageObj.PageType.toLowerCase() == "postorder")
	{
		// destroy the cart on postorder page, need to make sure this
		// is called at the end of the page so as not to interfere with the
		// display cart action that can happen above
		writeln('<script runat=merc_server>doAction ("SC_DELETE_SHOPCART");');
		writeln('doAction("ST_SET_STATEDATA","BTST_DONE","NO");');
		writeln('doAction("ST_REALLY_DESTROY_SESSION","BTST_DONE","NO");');
		writeln('</script>'); 
	}
}
