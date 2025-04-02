/*
** WATCommerce
** Copyright (c) Mercantec 2001
**
** Creates base commerce files used by WAT
**
** Activation example: powershell.exe -s MySite -p ~/public_html/cgi-bin -o JS_SRC -f WATCommerce.js -q "sm_action=CreateBaseFiles"
*/
<SCRIPT runat="merc_server">

	var which_smAction = doAction('REQ_GET_FORMVALUE', "sm_action", "sm_action");
	var g_wcMOD_CART_DEFAULT_SIZE = 500;

	if (which_smAction == "CreateBaseFiles")
	{
		var scriptFile = doActionEx('DATA_READFILE', 'common.js', 'FileName', 
				 'common.js','ObjectName', 'JS_SRC', 'FileType', 'txt');
		eval (scriptFile);
		var tmpltJsFile = doActionEx('DATA_READFILE', 'template.js', 'FileName', 
				 'template.js','ObjectName', 'WATTemplates', 'FileType', 'txt');
		eval (tmpltJsFile);
		var utilFile = doActionEx('DATA_READFILE', 'SiteUtil.js', 'FileName', 
				 'SiteUtil.js','ObjectName', 'QuartzSitePublic', 'FileType', 'txt');
		eval (utilFile);

		// CreateHomePage if not already there so "Home" is the first nav button
		var pn = PageNameByType('', "HomePage");
		if (pn == "")
			CreateHomePage();
		CreateShoppingPage();
		CreateItemPage();
		CreateBillToShipToPage();
		CreateModCartPage();
		CreateTakeCCPage();
		CreateTakePOPage();
		CreatePostOrderPage();
		CreatePaymentTypePage();
		CreateConfirmPage();
		CreateSearchPage();
	}

function CreateHomePage()
{
		// Create page and setup config files
		var pageName = "Home"
		CreatePageByName(pageName);
		setSiteEditorCfgField (pageName, gTITLE, '', '');
		setSiteEditorCfgField (pageName, gPAGE_TYPE, 'HomePage', '');
		setCurrentWorkingPage (pageName);
		SavePageByName(pageName);
		addUpdateGenericCfg ('WATWizardPages', gHOME_PAGE);
		
		LoadPageByName (pageName);

		// add cross-sell
		var posObj = new Position(pageName);
		posObj.startY = 100;
		posObj.startX = 490;
		id = AddElementType("Merc_CrossSell");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');

		SavePageByName(pageName);
}
function CreateShoppingPage()
{
		var textWidth = 400;
		var width;
		var height;
		var pageName = "Shopping";

		// Create page and setup config files
		CreatePageByName(pageName);
		setSiteEditorCfgField (pageName, gTITLE, pageName, '');
		setSiteEditorCfgField (pageName, gPAGE_TYPE, 'ShopHome', '');
		setSiteEditorCfgField (pageName, gLICENSE_FOR, 'PowerCommerce', '');
		setCurrentWorkingPage (pageName);
		SavePageByName(pageName);
		LoadPageByName (pageName);

		// Create a header text element
		var posObj = new Position(pageName);
		var HeaderText = "Shopping";
		width = textWidth;
		height = getTextHeight(HeaderText, width);
		posObj.setStartX(width);
		AddTextElement(posObj, HeaderText, 'HeaderText', width, height);
		posObj.startY += height + 15;

		// Add Category List element
		id = AddElementType("Merc_CatalogList");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');

		SavePageByName(pageName);
}
function CreateItemPage()
{
		var textWidth = 400;
		var width;
		var height;
		var pageName = "ItemPage";

		// Create page and setup config files
		CreatePageByName(pageName);
		setSiteEditorCfgField (pageName, gTITLE, pageName, '');
		setSiteEditorCfgField (pageName, gPAGE_TYPE, 'ItemPage', '');
		setSiteEditorCfgField (pageName, gLICENSE_FOR, 'PowerCommerce', '');
		setSiteEditorCfgField (pageName, gBUTTON_ORDER , '-1', '');

		setCurrentWorkingPage (pageName);
		SavePageByName(pageName);
		LoadPageByName (pageName);

		// Create a header text element
		var posObj = new Position(pageName);
		var HeaderText = "Shopping";
		width = textWidth;
		height = getTextHeight(HeaderText, width);
		posObj.setStartX(width);
		AddTextElement(posObj, HeaderText, 'HeaderText', width, height);
		posObj.startY += height + 15;

		// Add Item elements
		id = AddElementType("Merc_ItemName");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
		posObj.startY += height + 15;
		id = AddElementType("Merc_ItemImage");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
		var properties = doActionBDO ("MPEA_GET_PROPERTIES", 'ElementID', id);
		height = 250;
		if (properties && properties['height'])
			height = properties['height'];
		height = (height < 250 ? 250 : height); // max
		posObj.startY += height + 15;
		id = AddElementType("Merc_ItemDesc");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
		height = 100;
		posObj.startY += height + 15;

		id = AddElementType("Merc_ItemAttr");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
		posObj.startX += 150 + 10;

		id = AddElementType("Merc_ItemPrice");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
/*		height = 40;
**		posObj.startY += height + 15;
**		posObj.startX = posObj.startX + textWidth - 120;
** Put buy button to the right of the price as the price will grow vertically with discounts
*/
		posObj.startX = posObj.startX - 150 + textWidth + 10;
		id = AddElementType("Merc_BuyButton");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
				
		/* put item weight above buy button */
		height = -20;
		posObj.startY += height - 15;
		id = AddElementType("Merc_ItemWeight");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
				
		/* put cross-sell below buy button */
		height = 40;
		width = 300;
		posObj.startY += height + 50;
		posObj.startX = 310;
		id = AddElementType("Merc_CrossSell");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');

		SavePageByName(pageName);
}
function CreateBillToShipToPage()
{
		var textWidth = 400;
		var width;
		var height;
		var pageName = "BillToShipTo";

		// Create page and setup config files
		CreatePageByName(pageName);
		setSiteEditorCfgField (pageName, gTITLE, pageName, '');
		setSiteEditorCfgField (pageName, gPAGE_TYPE, 'GeoPrompt', '');
		setSiteEditorCfgField (pageName, gLICENSE_FOR, 'PowerCommerce', '');
		setSiteEditorCfgField (pageName, gBUTTON_ORDER , '-1', '');
		setCurrentWorkingPage (pageName);
		SavePageByName(pageName);
		LoadPageByName (pageName);

		// Create a header text element
		var posObj = new Position(pageName);
		var HeaderText = "Billing and Shipping Information";
		width = textWidth;
		height = getTextHeight(HeaderText, width);
		posObj.setStartX(width);
		AddTextElement(posObj, HeaderText, 'HeaderText', width, height);
		posObj.startY += height + 15;
		posObj.startX = 200;

		// Add Category List element
		id = AddElementType("Merc_BillToShipTo");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');

		SavePageByName(pageName);
}
function CreateModCartPage()
{
		var textWidth = 400;
		var width;
		var height;
		var pageName = "ShowCart";

		// Create page and setup config files
		CreatePageByName(pageName);
		setSiteEditorCfgField (pageName, gTITLE, pageName, '');
		setSiteEditorCfgField (pageName, gPAGE_TYPE, 'ModCart', '');
		setSiteEditorCfgField (pageName, gLICENSE_FOR, 'PowerCommerce', '');
//		setSiteEditorCfgField (pageName, gBUTTON_ORDER , '-1', '');
		setCurrentWorkingPage (pageName);
		SavePageByName(pageName);
		LoadPageByName (pageName);

		// Create a header text element
		var posObj = new Position(pageName);
		var HeaderText = "Shopping Cart";
		width = textWidth;
		height = getTextHeight(HeaderText, width);
		posObj.setStartX(width);
		AddTextElement(posObj, HeaderText, 'HeaderText', width, height);
		posObj.startY += height + 15;
		posObj.startX = 200;

		// Add Category List element
		id = AddElementType("Merc_ModCart");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
				
		/* put cross-sell below buy button */
		posObj.startY += (g_wcMOD_CART_DEFAULT_SIZE + 20);
		posObj.startX = 310;
		id = AddElementType("Merc_CrossSell");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');

		SavePageByName(pageName);
}
function CreateTakeCCPage()
{
		var textWidth = 400;
		var width;
		var height;
		var pageName = "TakeCC";

		// Create page and setup config files
		CreatePageByName(pageName);
		setSiteEditorCfgField (pageName, gTITLE, pageName, '');
		setSiteEditorCfgField (pageName, gPAGE_TYPE, 'TakeCC', '');
		setSiteEditorCfgField (pageName, gLICENSE_FOR, 'PowerCommerce', '');
		setSiteEditorCfgField (pageName, gBUTTON_ORDER , '-1', '');
		setSiteEditorCfgField (pageName, gSECURE_BASE_HREF , 'yes', '');
		setCurrentWorkingPage (pageName);
		SavePageByName(pageName);
		LoadPageByName (pageName);

		// Create a header text element
		var posObj = new Position(pageName);
		var HeaderText = "Submit Order";
		width = textWidth;
		height = getTextHeight(HeaderText, width);
		posObj.setStartX(width);
		AddTextElement(posObj, HeaderText, 'HeaderText', width, height);
		posObj.startY += height + 15;

		var BodyText = "Verify your order is correct and press the 'Submit' button below to submit your order";
		height = getTextHeight(BodyText, width);
		posObj.setStartX(width);
		AddTextElement(posObj, BodyText, 'BodyText', width, height);
		posObj.startY += height + 15;

		// Add TakeCC element
		id = AddElementType("Merc_TakeCC");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
		posObj.startY += 300;

		// Add ShowCart element
		id = AddElementType("Merc_ModCart");
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'showcart', 'showcart');
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
				
		/* put cross-sell below buy button */
		posObj.startY += (g_wcMOD_CART_DEFAULT_SIZE + 20);
		posObj.startX = 310;
		id = AddElementType("Merc_CrossSell");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
				
		SavePageByName(pageName);
}
function CreateTakePOPage()
{
		var textWidth = 400;
		var width;
		var height;
		var pageName = "TakePO";

		// Create page and setup config files
		CreatePageByName(pageName);
		setSiteEditorCfgField (pageName, gTITLE, pageName, '');
		setSiteEditorCfgField (pageName, gPAGE_TYPE, 'TakePO', '');
		setSiteEditorCfgField (pageName, gLICENSE_FOR, 'PowerCommerce', '');
		setSiteEditorCfgField (pageName, gBUTTON_ORDER , '-1', '');
		setSiteEditorCfgField (pageName, gSECURE_BASE_HREF , 'yes', '');
		setCurrentWorkingPage (pageName);
		SavePageByName(pageName);
		LoadPageByName (pageName);

		// Create a header text element
		var posObj = new Position(pageName);
		var HeaderText = "Purchase Order";
		width = textWidth;
		height = getTextHeight(HeaderText, width);
		posObj.setStartX(width);
		AddTextElement(posObj, HeaderText, 'HeaderText', width, height);
		posObj.startY += height + 15;

		// Add TakePO element
		id = AddElementType("Merc_TakePO");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
		posObj.startY += 300;

		// Add ShowCart element
		id = AddElementType("Merc_ModCart");
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'showcart', 'showcart');
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
				
		/* put cross-sell below buy button */
		posObj.startY += (g_wcMOD_CART_DEFAULT_SIZE + 20);
		posObj.startX = 310;
		id = AddElementType("Merc_CrossSell");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
				
		SavePageByName(pageName);
}
function CreatePostOrderPage()
{
		var textWidth = 400;
		var width;
		var height;
		var pageName = "PostOrder";

		// Create page and setup config files
		CreatePageByName(pageName);
		setSiteEditorCfgField (pageName, gTITLE, pageName, '');
		setSiteEditorCfgField (pageName, gPAGE_TYPE, 'PostOrder', '');
		setSiteEditorCfgField (pageName, gLICENSE_FOR, 'PowerCommerce', '');
		setSiteEditorCfgField (pageName, gBUTTON_ORDER , '-1', '');
		setSiteEditorCfgField (pageName, gSECURE_BASE_HREF , 'yes', '');
		setCurrentWorkingPage (pageName);
		SavePageByName(pageName);
		LoadPageByName (pageName);

		// Create a header text element
		var posObj = new Position(pageName);
		var HeaderText = "Your Order";
		width = textWidth;
		height = getTextHeight(HeaderText, width);
		posObj.setStartX(width);
		AddTextElement(posObj, HeaderText, 'HeaderText', width, height);
		posObj.startY += height + 15;

		var Message = "Your purchase is approved. Thank you for your business.";
		width = textWidth;
		height = getTextHeight(Message, width);
		AddTextElement(posObj, Message, '', width, height);
		posObj.startY += height + 15;

		// Add OrderID element
		id = AddElementType("Merc_OrderID");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
		posObj.startY += 20;

		// Add ShowCart element
		id = AddElementType("Merc_ModCart");
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'showcart', 'showcart');
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
				
		/* put cross-sell below buy button */
		posObj.startY += (g_wcMOD_CART_DEFAULT_SIZE + 20);
		posObj.startX = 310;
		id = AddElementType("Merc_CrossSell");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
		
		SavePageByName(pageName);
}

function CreatePaymentTypePage()
{
		var textWidth = 400;
		var width;
		var height;
		var pageName = "Payment";

		// Create page and setup config files
		CreatePageByName(pageName);
		setSiteEditorCfgField (pageName, gTITLE, pageName, '');
		setSiteEditorCfgField (pageName, gPAGE_TYPE, 'PaymentType', '');
		setSiteEditorCfgField (pageName, gLICENSE_FOR, 'PowerCommerce', '');
		setSiteEditorCfgField (pageName, gBUTTON_ORDER , '-1', '');
		setCurrentWorkingPage (pageName);
		SavePageByName(pageName);
		LoadPageByName (pageName);

		// Create a header text element
		var posObj = new Position(pageName);
		var HeaderText = "Payment Type";
		width = textWidth;
		height = getTextHeight(HeaderText, width);
		posObj.setStartX(width);
		AddTextElement(posObj, HeaderText, 'HeaderText', width, height);
		posObj.startY += height + 15;

		// Add Payment Type element
		id = AddElementType("Merc_PaymentTypes");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
		posObj.startY += 275;

		// Add ShowCart element
		id = AddElementType("Merc_ModCart");
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'showcart', 'showcart');
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
				
		/* put cross-sell below buy button */
		posObj.startY += (g_wcMOD_CART_DEFAULT_SIZE + 20);
		posObj.startX = 310;
		id = AddElementType("Merc_CrossSell");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');

		SavePageByName(pageName);
}

function CreateConfirmPage()
{
		var textWidth = 400;
		var width;
		var height;
		var pageName = "Confirm";

		// Create page and setup config files
		CreatePageByName(pageName);
		setSiteEditorCfgField (pageName, gTITLE, pageName, '');
		setSiteEditorCfgField (pageName, gPAGE_TYPE, 'ConfirmOrder', '');
		setSiteEditorCfgField (pageName, gLICENSE_FOR, 'PowerCommerce', '');
		setSiteEditorCfgField (pageName, gBUTTON_ORDER , '-1', '');
		setSiteEditorCfgField (pageName, gSECURE_BASE_HREF , 'yes', '');
		setCurrentWorkingPage (pageName);
		SavePageByName(pageName);
		LoadPageByName (pageName);

		// Create a header text element
		var posObj = new Position(pageName);
		var HeaderText = "Confirm Order";
		width = textWidth;
		height = getTextHeight(HeaderText, width);
		posObj.setStartX(width);
		AddTextElement(posObj, HeaderText, 'HeaderText', width, height);
		posObj.startY += height + 15;

		var BodyText = "Verify your order is correct and press the 'Submit' button below the cart to submit your order";
		height = getTextHeight(BodyText, width);
		posObj.setStartX(width);
		AddTextElement(posObj, BodyText, 'BodyText', width, height);
		posObj.startY += height + 15;

		// Add ShowCart element
		id = AddElementType("Merc_ModCart");
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'showcart', 'confirmcart');
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
				
		/* put cross-sell below buy button */
		posObj.startY += (g_wcMOD_CART_DEFAULT_SIZE + 20);
		posObj.startX = 310;
		id = AddElementType("Merc_CrossSell");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');

		SavePageByName(pageName);
}
function CreateSearchPage()
{
		var textWidth = 400;
		var width;
		var height;
		var pageName = "Search";

		// Create page and setup config files
		CreatePageByName(pageName);
		setSiteEditorCfgField (pageName, gTITLE, pageName, '');
		setSiteEditorCfgField (pageName, gPAGE_TYPE, 'CatSearch', '');
		setSiteEditorCfgField (pageName, gLICENSE_FOR, 'PowerCommerce', '');
		setCurrentWorkingPage (pageName);
		SavePageByName(pageName);
		LoadPageByName (pageName);

		// Create a header text element
		var posObj = new Position(pageName);
		var HeaderText = "Search";
		width = textWidth;
		height = getTextHeight(HeaderText, width);
		posObj.setStartX(width);
		AddTextElement(posObj, HeaderText, 'HeaderText', width, height);
		posObj.startY += height + 15;

		// Add Category List element
		id = AddElementType("Merc_CatSearch");
		// "newLayer" must match string in WATedit.js
		doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');

		SavePageByName(pageName);
}

function AddTextElement(posObj, data, field, width, height)
{
	id = AddElementType("Merc_Text");
	// "newLayer" must match string in WATedit.js
	doAction('MPEA_SAVE_HISTORYLIST', 'moveHistoryList', 
				'(newLayer'+id.toString()+'|0,0|'+posObj.startX+','+posObj.startY+'|0)');
	if (data)
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'text', data);
	if (field == 'HeaderText')
	{
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'textalign', 'center');
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'style', 'text-header');
	}
	if (width)
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'width', width.toString());
	if (height)
		doAction('MPEA_SET_PROPERTIES', 'ElementID', id.toString(), 'height', height.toString());
}
</script>
