/* =======================================================================
DESC: Javascript file for Marble web editor.

PLATFORMS: IE 4+ and NN4+ (NOT NETSCAPE 6)

USAGE NOTES: simply include this file in your HTML and trigger a few calls
using the onLoad event on the BODY tag.
====================================================================== */
	var visibleVar="null", gCURRENT_SELECTED_TYPE="", gCURRENT_DRAG = -1;
	var gDISABLE_NEXT_EVENT = "";

/*===================================================================
Function:frontBack(mode)
Purpose: Moves the currently selected layer to the front or back
		 of the current z-index order depending on whether mode is
		 'front' or 'back'
===================================================================*/

function frontBack(mode)
{
	var thisLayer=null;
	if (NS) 
		thisLayer=eval(formRef+'["'+sysForm+'"].NSSelectedLayer.value');
	else
		thisLayer= eval(formRef+'["'+sysForm+'"].IESelectedLayer.value');

 	if ( thisLayer )
 	{
 		// get the user added layer info
 		var maxZ = 0, minZ = getMaxZ();
 		for (var x = 0; x < allDragLayers.length; x++)
 		{
 			if (allDragLayers[x] == thisLayer)
 				gCURRENT_DRAG = x;
 			var aLayerZ = eval(layerRef+'["'+allDragLayers[x]+'"]'+styleSwitch+'.zIndex');
			if (aLayerZ > maxZ) 
				maxZ = aLayerZ;
			if (aLayerZ < minZ) 
				minZ = aLayerZ;
 		}
 		var curDrag = null;
		curDrag = MM_findObj(allDragLayers[gCURRENT_DRAG]); 
    
		var oldX = current_layerStartX, oldY = current_layerStartY;
    
		current_layerStartZ=(NS)?curDrag.zIndex:curDrag.style.zIndex;
		current_layerStartX=(NS)?curDrag.left:curDrag.style.pixelLeft;
		current_layerStartY=(NS)?curDrag.top:curDrag.style.pixelTop;
    
		// set the new z-index
		toggleBG(allDragLayers[gCURRENT_DRAG], 'on');
		if (mode.toLowerCase() == "front")
		{
			if (current_layerStartZ < maxZ)
			{
				setZIndexToTop(allDragLayers[gCURRENT_DRAG]);
				setAlwaysOnTopLayers();
			}
		}
		else
		{
			// min for layers should start at 28029
			if (current_layerStartZ > minZ)
				(NS)?curDrag.zIndex=(minZ-1):curDrag.style.zIndex=(minZ-1);	
		}
		curDrag.MM_oldZ=(NS)?curDrag.zIndex:curDrag.style.zIndex;
		addToMoveList(allDragLayers[gCURRENT_DRAG]);
		current_layerStartX=oldX;
		current_layerStartY=oldY;
	}
	else 
		alert(parent.gSELECT_LAYER);
}

/*===================================================================
Function:setZIndexToTop(layerID)
Purpose: sets the layerID to the current highest z-index + 1
===================================================================*/		
	
	function setZIndexToTop(layerID) {
		/* move to the top of the z-order */
       	var maxZ = getMaxZ();
		eval(layerRef+'["'+layerID+'"]'+styleSwitch+'.zIndex=maxZ+1');
		return (maxZ+1);
	}
	
/*===================================================================
Function:getMaxZ()
Purpose: gets the maximum z-index in use
===================================================================*/		
	
	function getMaxZ() {
       	var maxZ = 0;
		for (i=0; i<document.allLayers.length; i++) 
		{ 
			var aLayer = document.allLayers[i];
			var aLayerZ = (NS)?aLayer.zIndex:aLayer.style.zIndex;
			if (aLayerZ > maxZ) maxZ = aLayerZ;
		}
		return (maxZ);
	}
	
/*===================================================================
Function:setAlwaysOnTopLayers()
Purpose: sets all layers in the 'alwaysOnTop' array to the maximum
		 z-index+1 if they are not already
===================================================================*/		
	
	function setAlwaysOnTopLayers() {
		var maxZ = getMaxZ();
		var newZ = maxZ + 1;
		for (var z = 0; z < alwaysOnTop.length; z++)
		{
			var curZ = eval(layerRef+'["'+alwaysOnTop[z]+'"]'+styleSwitch+'.zIndex');
			if (curZ != (maxZ-(alwaysOnTop.length-(z+1))))
				eval(layerRef+'["'+alwaysOnTop[z]+'"]'+styleSwitch+'.zIndex=(newZ+'+z+').toString()');
		}
	}
	
/*===================================================================
Function:displayQueryString()
Purpose: to simply alert the contents of a query string, for debugging only.
===================================================================*/	
function displayQueryString() {
		var pattern = /\&|\?/g;
		var qString=window.location.search;
		if ( qString ) {
   		alert(unescape(qString.replace(pattern, "\n")));
		}
	}
	
/*===================================================================
Function:init()
Purpose: preloads images and defines a slew of NS/IE specific vars
used when addressing objects in Javascript.
===================================================================*/
	
	function init(){
		//Preload arrow images
		controlPanelLayerName="controlPanel";
		current_layer="";
		current_layerStartX="";
		current_layerStartY="";
		current_layerStartZ="";
		bounceBack=false;
		arrowup = new Image();
		arrowup.src ="/cgi-docs/Mercantec/PC_F_6.6.1/images/arrowupJK.gif";
		arrowdown = new Image();
		arrowdown.src = "/cgi-docs/Mercantec/PC_F_6.6.1/images/arrowdownJK.gif";
		sysForm="someform"; //form name that tracks info
		layerSubStringID="newLayer"; //substring found in all editable layer names
		NS6=0;
		
		
			
		displayQueryString();//for dubugging
		if (document.layers) {
				NS=1;
				layerStyleRef="layer.";
				layerRef="document.layers";
				formRef="document.forms";
				styleSwitch="";
				clipSwitch=".clip";
				bgImgSwitch=".src";
				visibleVar="show";
				hiddenVar="hidden";
				documentSwitch=".document"
				horz=".left";
				vert=".top"; 
				docStyle="document."; 
				innerW="window.innerWidth";
				innerH="window.innerHeight" ;
				offsetX="window.pageXOffset" ;
				offsetY="window.pageYOffset";
        	}else{
				if (document.getElementById && !document.all) {
				alert('This is not compatible with Netscape 6 at the moment\n\nPlease use IE4+ or Netscape 4.x'); return false;}
        		NS=0;
				layerStyleRef="layer.style.";
				layerRef="document.all";
				formRef="document.forms";
				styleSwitch=".style";
				clipSwitch="";
				bgImgSwitch="";
				visibleVar="visible";
				hiddenVar="hidden";
				documentSwitch="";
				horz=".pixelLeft";
				vert=".pixelTop";
				docStyle=""; 
				innerW="document.body.clientWidth";
				innerH="document.body.clientHeight";
				offsetX="document.body.scrollLeft";
				offsetY="document.body.scrollTop";
		}
		
		//The following is the URL of a blank pixel gif used to indicate
		//selection has been removed.
		 		
		NObgURL=(NS)? '/cgi-docs/Mercantec/PC_F_6.6.1/images/pxtransparent.gif' :'url(/cgi-docs/Mercantec/PC_F_6.6.1/images/pxtransparent.gif)';
		
		//The following is the URL of the gif file to indicate selection.
		bgURL=(NS)? '/cgi-docs/Mercantec/PC_F_6.6.1/images/highlite_sm.gif' :'url(/cgi-docs/Mercantec/PC_F_6.6.1/images/highlite_sm.gif)';
		       		 		
 		
		numberOfLayers = (NS)?document.layers.length:document.all.length;
}

if (navigator.appName == "Netscape")
{
browser = "1"
}
else
{
browser = "0"
}

//
function previous() {
window.history.go(-1);
}

//
function loadframes(toppage,instrpage,prevpage) {
parent.frmtop.location.href = toppage;
parent.frminst.location.href = instrpage;
parent.frmprev.location.href = prevpage;
}

//
function openChild(filename, title, featurelist) {
var cWindow = window.open(filename, title, featurelist);
}

//
function closeChild() {
cWindow.close()
}


var timerIDclock = null;
var timerIDccal = null;
//var timerRunningclock = true;
//var id,pause=0,position=0;

function showtime() {

  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var timeValue = "" + ((hours >12) ? hours -12 :hours);
  timeValue += ((minutes < 10) ? ":0" : ":") + minutes;
  timeValue += (hours >= 12) ? " P.M." : " A.M.";
  document.clock.face.value = timeValue;
  timerIDclock = setTimeout("showtime()",1000);

}


function showdate () {
  var nowD = new Date();
  year = new String(nowD.getYear());
  yearLen = year.length;
  year = year.split("");
  year = year[yearLen - 2] + year[yearLen - 1];
  var month = nowD.getMonth() + 1;
  var date = nowD.getDate();
  var dateValue = "";
  dateValue += ((month < 10) ? " 0" : " ") + month + "/";
  dateValue += date + "/" + year + "    ";
  document.cal.face.value = dateValue;
  timerIDcal = setTimeout("showdate()",1000);
}


/*===================================================================
Function:initForm()
Purpose: simply initializes the form that tracks the editable elements
This will be used to track position, contents, type, etc..
===================================================================*/	
	function initForm() {
		//Initalize form with values
		
		for (var i=0; i<numberOfLayers;i++) { 
 			var curName = eval(layerRef+'['+i+']'+'.name');
 			var thisLeft = parseInt(eval(layerRef+'['+i+']'+styleSwitch+'.left'));
 			var thisTop = parseInt(eval(layerRef+'['+i+']'+styleSwitch+'.top'));
 			if (thisLeft && (curName.indexOf(layerSubStringID) !=-1) && curName) {
 				updateForm(sysForm, curName, thisLeft, thisTop);
 			}
 			
 		}
 		
 		/*The fields below must exist in the form of the page using this file.
 		If you want to rename these make SURE to do that here as well*/
 		
 		eval(formRef+'["'+sysForm+'"].IESelectedLayer.value=\'\'');
 		eval(formRef+'["'+sysForm+'"].NSSelectedLayer.value=\'\'');
 		eval(formRef+'["'+sysForm+'"].moveHistoryList.value=\'\'');

	}
	
/*===================================================================
Function:initControlPanel(layerID)
Purpose: simply initializes the control panel to be set at the top right
corner of the main table content cell (referred as cell type C)
===================================================================*/		
	
	function initControlPanel(layerID) {
		if (controlPanelX)
			newLeft = controlPanelX;
		else
		{
			newLeft = parseInt((margin+B_width + 30));
			// allow for the buttons
			(newLeft < 140 ? newLeft = 140 : newLeft = newLeft);
		}
		if (controlPanelY)
			newTop = controlPanelY;
		else
			newTop = parseInt(margin+A_height + (2*border) + 30);
		
		moveLayer(layerID, newLeft, newTop);	
		moveLayer('pulldownMenu', 90+newLeft, 9+newTop);
		moveLayer('pulldownPage', 90+newLeft, 71+newTop);
		moveLayer('pulldownGoTo', 90+gotoOffSetLeft+newLeft, 71+gotoOffSetTop+newTop);
		moveLayer('pulldownStoreElement', 90+seOffSetLeft+newLeft, 71+seOffSetTop+newTop);
        moveLayer('pulldownBottom', 4+newLeft, 212+newTop);
	}
	

/*===================================================================
Undo last change
===================================================================*/
function undo() {
	var args = new Array ('moveHistoryList',
   						eval(formRef+'["'+sysForm+'"].moveHistoryList.value'));
   	bPromptForSave = false;
   	parent.SubmitForm ('PE_Undo', 
   							'Layout1.htm', 'mainFrame', args);   		
}

/*===================================================================
Function:editLayer()
Purpose: This takes the current layer selected as defined in the form
and would execute the code to perform a layer edit.
===================================================================*/
function editLayer() {
 if (NS) {
  	toggleBG(eval(formRef+'["'+sysForm+'"].NSSelectedLayer.value'), 'on');  
 	thisLayer=eval(formRef+'["'+sysForm+'"].NSSelectedLayer.value');
 } else {
 	thisLayer= eval(formRef+'["'+sysForm+'"].IESelectedLayer.value');
 }
 	if ( thisLayer ) {
   		toggleBG(eval(formRef+'["'+sysForm+'"].NSSelectedLayer.value'), 'off');

   		for (numIndex = thisLayer.length-1; 
   				!isNaN (thisLayer.charAt(numIndex)) && numIndex >= 0; numIndex--);
   		layerNum = parseInt (thisLayer.substring(numIndex+1, thisLayer.length), 10);

   		var args = new Array ('ElementID', layerNum, 'moveHistoryList',
   								eval(formRef+'["'+sysForm+'"].moveHistoryList.value'),
   								'ElementAddEdit', 'Edit');
   		bPromptForSave = false;
   		//parent.SubmitForm ('L', 'please_wait.htm', 'mainFrame', '');   		
	
		parent.OpenWinSubmitForm ('', 'PE_EditProperties', 
										'Layout1.htm', 'EditWindow', args, '');
		togglePleaseWaitLayer('on');
  }
  else {
     	alert(parent.gSELECT_LAYER);	
  }
}

/*===================================================================
Function:gotoTheme()
Purpose: Pops open a new window with the available themes.
===================================================================*/
function gotoTheme() {
	bPromptForSave = false;
	var WinObj = parent.createSimpleSubmitWindow ("570", "670");
	var args = new Array ("UseTheme", useTheme, "moveHistoryList",
   						eval(formRef+'["'+sysForm+'"].moveHistoryList.value'),
   						"SetForPageName", pageName);
	parent.OpenWinSubmitForm ('', 'L', 'ed_themeselect.htm', 'newWin', args, WinObj);
	
	togglePleaseWaitLayer('on');		
}

/*===================================================================
Function:gotoStyle()
Purpose: Pops open a new window with the available styles.
===================================================================*/
function gotoStyle() {
	bPromptForSave = false;
	var WinObj = parent.createSimpleSubmitWindow ("570", "670");
	var args = new Array ("UseStyle", useStyle, "moveHistoryList",
   						eval(formRef+'["'+sysForm+'"].moveHistoryList.value'), 
   						"SetForPageName", pageName);
	parent.OpenWinSubmitForm ('', 'L', 'ed_styleselect.htm', 'newWin', args, WinObj);
	
	togglePleaseWaitLayer('on');		
}

/*===================================================================
Function:editPage(pageName)
Purpose: Edits the page.
===================================================================*/
function editPage(pageName) {

	var args = new Array ('moveHistoryList',
						eval(formRef+'["'+sysForm+'"].moveHistoryList.value'),
						'PageName', pageName);
						
	var onLdStr = 'onLoad="opener.SubmitForm '+
					'(\'PE_EditPageByName\', \'Layout1.htm\', \'mainFrame\', '+
					'new Array (\'PageName\', \''+pageName+'\'));"';
	
	var aTg = parent.gLOADING + '</FONT><BR><FONT CLASS="instr-note">'+
			parent.gWINDOW_WILL_CLOSE+'</FONT>';
	
	var bSavePage = bPromptForSave;
	bPromptForSave = false;
	if (bSavePage)
		bSavePage = savePage(false, false, onLdStr, aTg);

	if (!bSavePage)
		parent.SubmitForm ('PE_EditPageByName', 'Layout1.htm', 'mainFrame', args); 
}

/*===================================================================
Function:savePage(bReload, bSilent)
Purpose: Saves the page.
===================================================================*/
function savePage(bReload, bSilent, onLoadString, aTagString) {
	if (!bSilent)
		if (!confirm (parent.gCONFIRM_SAVE_PAGE))
			return false;
			
	var aStr = '';
	var bLoadStr = 'onLoad=\"self.close();\"';
	if (bReload)
	{
		aStr = parent.gRELOADING + '</FONT><BR><FONT CLASS="instr-note">'+
				parent.gWINDOW_WILL_CLOSE+'</FONT>';
				
		bLoadStr = 'onLoad="'+
					'opener.SubmitForm (\'PE_EditPage\', \'\', \'mainFrame\', \'\');"';;
	}
							
	if (aTagString)
		aStr = aTagString;
		
	if (onLoadString)
		bLoadStr = onLoadString;
					
	parent.createAndWriteToPopUp ("150", "300", "newWin", baseUrl, parent.gSAVING_PAGE, 
								parent.gWINDOW_WILL_CLOSE);
	
	bPromptForSave = false;
	var args = new Array ('moveHistoryList',
						eval(formRef+'["'+sysForm+'"].moveHistoryList.value'),
						'onLoad', bLoadStr, 'aTag', aStr);
	
	parent.SubmitForm ('PE_SavePage', 'confirm_save.htm', 'newWin', args);
	//alert(eval(formRef+'["'+sysForm+'"].moveHistoryList.value'));
	return true;
}

/*===================================================================
Function:confirmDeletePage()
Purpose: deletes the page.
===================================================================*/
function confirmDeletePage() {
	if (!bCanDelete)
	{
		alert (parent.gCANNOT_DELETE);
		return false;
	}
	if (!confirm (parent.gARE_YOU_SURE))
		return false;
					
	return true;
}

/*===================================================================
Function:deletePage()
Purpose: deletes the page.
===================================================================*/
function deletePage() {
	parent.createAndWriteToPopUp ("150", "300", "newWin", baseUrl, parent.gDELETING_PAGE, 
								parent.gWINDOW_WILL_CLOSE);
	
	bPromptForSave = false;
	var args = new Array ('moveHistoryList',
						eval(formRef+'["'+sysForm+'"].moveHistoryList.value'));


	parent.SubmitForm ('SE_DeletePage', '', 'mainFrame', args);
}

/*===================================================================
Function:savePublish()
Purpose: save then publish
===================================================================*/
function savePublish() {
	var args = new Array ('moveHistoryList',
   							eval(formRef+'["'+sysForm+'"].moveHistoryList.value'));

	parent.createAndWriteToPopUp ("150", "300", "newWin", baseUrl, parent.gSAVPUB_PAGE, 
								parent.gWINDOW_WILL_CLOSE);
								
	bPromptForSave = false;
	parent.SubmitForm ('PUB_SavePublish', 
   			'Layout1.htm', 'mainFrame', args); 
}

/*===================================================================
Function: revertToPublished()
Purpose: Reverts the edit mode to the last published set of files
===================================================================*/
function revertToPublished()
{
	if (confirm("WARNING! Reverting to the last published site will erase any changes you have made in the ENTIRE SITE (all pages) since you last Published.  Do you still wish to revert to your last published site? Click OK to revert, Cancel to stop."))
	{
		bPromptForSave = false;
		parent.SubmitForm ('PUB_RevertToPublished', 'Layout1.htm', 'mainFrame', ''); 
	}
}

/*===================================================================
Function:previewSite()
Purpose: preview
===================================================================*/
function previewSite() {
	var args = new Array ('moveHistoryList',
   							eval(formRef+'["'+sysForm+'"].moveHistoryList.value'));

	if (bPromptForSave)
		savePage(false, false, '', '');
	bPromptForSave = false;
	// open preview site in new window
	var WinObj = parent.createSimpleSubmitWindow ("600", "800");
	WinObj.values["toolbar"]="yes";
	WinObj.values["menubar"]="yes";
	parent.OpenWinSubmitForm (baseUrl+'please_wait.htm', 'PUB_PreviewSite', '', 'NewWindow', args, WinObj);
}


/*===================================================================
Function:addElement(type)
Purpose: Submits a form to add an element to the page.
===================================================================*/
function addElement(type) {
	gCURRENT_SELECTED_TYPE = type;
	var args = new Array ('moveHistoryList',
   							eval(formRef+'["'+sysForm+'"].moveHistoryList.value'),
   							'ElementType', type, 'ElementAddEdit', 'Add');
   	bPromptForSave = false;
   	
   	if (type.toLowerCase() == "merc_image" || type.toLowerCase() == "merc_globalimage")
   		insertImageWindow ();
   	else
		someWinID = parent.OpenWinSubmitForm ('', 'PE_AddElement', 
												'Layout1.htm', 'EditWindow', args, ''); 
									
	togglePleaseWaitLayer('on');
	
	/*=====================================================
	To load "please wait" page, simply uncomment the following line
	=======================================================*/
	//setTimeout("parent.SubmitForm ('L', 'please_wait.htm', 'mainFrame', '')", 5000);
	

}


/*===================================================================
Function:insertImageWindow ()
Purpose: Opens a select image window for the image element.
===================================================================*/
function insertImageWindow ()
{
	var winObj = parent.createSimpleSubmitWindow ('425', '750');
										
	var args = new Array ("UseImageCategory", "Buttons");
	parent.OpenWinSubmitForm ('', 'L', 'ed_selectimage_frameset.htm', 
								'insertImageWin', args, winObj);
		
	return false;
}

/*===================================================================
Function:submitImageChange (url, secureUrl, rowName)
Purpose: Select image window calls back to this function for the image element.
===================================================================*/
function submitImageChange (url, secureUrl, rowName)
{
	var args = new Array ('moveHistoryList',
   							eval(formRef+'["'+sysForm+'"].moveHistoryList.value'),
   							'ElementType', gCURRENT_SELECTED_TYPE, 'ImageURL', url, 
							'SecureImageURL', secureUrl,
							'ImageRow', rowName, 'ElementAddEdit', 'Add');
	var winObj = new parent.submitWindow ();
	// need to open a new window because the old window needs to stay open till the form 
	// submits, otherwise we get errors
	childWin = window.open ('', 'editImgOut', winObj.createOutput());  	 		
	parent.SubmitForm ('PE_AddElement', 'Layout1.htm', 'editImgOut', args); 
}

/*===================================================================
Function:addPage()
Purpose: Creates a new page.
===================================================================*/
function addPage() {

	bPromptForSave = false;
	var WinObj = parent.createSimpleSubmitWindow ("210", "670");
	var args = new Array ("moveHistoryList",
   						eval(formRef+'["'+sysForm+'"].moveHistoryList.value'));
	parent.OpenWinSubmitForm ('', 'L', 'ed_insert_page.htm', 'newWin', args, WinObj);
	
	togglePleaseWaitLayer('on');
}

/*===================================================================
Function:deleteLayer()
Purpose: This takes the current layer selected as defined in the form
and would execute the code to perform a layer delete.
===================================================================*/

function deleteLayer() {
 if (NS) {
 	toggleBG(eval(formRef+'["'+sysForm+'"].NSSelectedLayer.value'), 'on');
 	thisLayer = eval(formRef+'["'+sysForm+'"].NSSelectedLayer.value');
 } else {
 	thisLayer =eval(formRef+'["'+sysForm+'"].IESelectedLayer.value');
 }
 if (thisLayer)  
 {
	for (numIndex = thisLayer.length-1; 
   		!isNaN (thisLayer.charAt(numIndex)) && numIndex >= 0; numIndex--);
   	layerNum = parseInt (thisLayer.substring(numIndex+1, thisLayer.length), 10);
	if (confirm(parent.gARE_YOU_SURE))
	{
 		toggleBG(eval(formRef+'["'+sysForm+'"].NSSelectedLayer.value'), 'off');
 		if (self != top) 
   		{
   			var args = new Array ('ElementID', layerNum, 'moveHistoryList',
   									eval(formRef+'["'+sysForm+'"].moveHistoryList.value'));
   			parent.SubmitForm ('PE_DeleteElement', 
   									'Layout1.htm', 'mainFrame', args); 
   			bPromptForSave = false;  		
			parent.createAndWriteToPopUp ("150", "300", "newWin", baseUrl, parent.gDELETING_PAGE, 
										parent.gWINDOW_WILL_CLOSE);
		}
	}
 } 
 else alert("Please select a Layer");
}


/*===================================================================
Function:addToMoveList(targetLayer)
Purpose: receives a layername and adds the move coordinates to a list.
This is only done after the overlap and positioning rules have been 
applied.  So this must happen last.
===================================================================*/	
	function addToMoveList(target) {

		var curDrag = null;
		curDrag = MM_findObj(target); 
		
		var targetleft = parseInt(eval(layerRef+'["'+target+'"]'+styleSwitch+'.left'));
		var targettop = parseInt(eval(layerRef+'["'+target+'"]'+styleSwitch+'.top'));
		var targetZ = parseInt(curDrag.MM_oldZ);
		var posString = '('+target+'|'+current_layerStartX+','+current_layerStartY+
						'|'+targetleft.toString()+','+targettop.toString()+'|'+
						targetZ.toString()+')';
		//alert(posString);
		//eval(formRef+'["'+sysForm+'"].'+'moveHistoryList.value=\''+eval(formRef+'["'+sysForm+'"].'+'moveHistoryList.value').toString()+posString+'\'');
		if(!bounceBack && (current_layerStartX != targetleft.toString() || 
					current_layerStartY != targettop.toString() ||
					current_layerStartZ != targetZ.toString())) {
			eval(formRef+'["'+sysForm+'"].moveHistoryList.value+=\''+posString+'\'');
		} else {
			bounceBack=false;
		}
	}
	
/*===================================================================
Function:layerConfineTo(targetLayer, tableSection)
Purpose: receives a layer name and section name and enforces the rule
that will confine the layer to that section
===================================================================*/	
	function layerConfineTo(target, section) {
		//Capture all position information and store
		var targetleft = parseInt(eval(layerRef+'["'+target+'"]'+styleSwitch+'.left'))
		var targettop = parseInt(eval(layerRef+'["'+target+'"]'+styleSwitch+'.top'))
		var targetwidth = parseInt(eval(layerRef+'["'+target+'"]'+styleSwitch+clipSwitch+'.width'))
		var targetheight = parseInt(eval(layerRef+'["'+target+'"]'+styleSwitch+clipSwitch+'.height'))
		
		var sectionTopX=parseInt(eval(section+'_top_corner_X'));
		var sectionTopY=parseInt(eval(section+'_top_corner_Y'));
		var sectionBottomX=parseInt(eval(section+'_btm_corner_X'));
		var sectionBottomY=parseInt(eval(section+'_btm_corner_Y'));
				
		if ((targetleft>sectionBottomX) || (targetleft<sectionTopX)) {
			bounceBack = true;
			//alert(" left edget out of range");
		}
		if ((targettop>sectionBottomY) || (targettop<sectionTopY)) {
			bounceBack = true;
			//alert(" top out of range");
		}
		
		if ((targetleft+targetwidth)>sectionBottomX) {
			bounceBack = true;
			//alert(" Right edge out of range");
		}
		if ((targettop+targetheight)>sectionBottomY) {
			bounceBack = true;
			//alert(" Bottom out of range");
		}
		
		if (bounceBack) {
			//alert("Layer out of range");
			//snap layer back and update form
			moveLayer(current_layer,current_layerStartX,current_layerStartY);
			updateForm(sysForm, current_layer,current_layerStartX,current_layerStartY);
		}
	}
	
	
/*===================================================================
Function:layerSnapTo(targetLayer, overlappingLayer, directionToMove)
Purpose: receives 2 layers and a direction and moves target so that it 
no longer overlaps.  This is called from checkOverlap().
===================================================================*/	
	function layerSnapTo(target, overlap, direction) {
		//Capture all position information and store
		var overlapleft = parseInt(eval(layerRef+'["'+overlap+'"]'+styleSwitch+'.left'))
		var overlaptop = parseInt(eval(layerRef+'["'+overlap+'"]'+styleSwitch+'.top'))
		var overlapwidth = parseInt(eval(layerRef+'["'+overlap+'"]'+styleSwitch+clipSwitch+'.width'))
		var overlapheight = parseInt(eval(layerRef+'["'+overlap+'"]'+styleSwitch+clipSwitch+'.height'))
		var targetleft = parseInt(eval(layerRef+'["'+target+'"]'+styleSwitch+'.left'))
		var targettop = parseInt(eval(layerRef+'["'+target+'"]'+styleSwitch+'.top'))
		var targetwidth = parseInt(eval(layerRef+'["'+target+'"]'+styleSwitch+clipSwitch+'.width'))
		var targetheight = parseInt(eval(layerRef+'["'+target+'"]'+styleSwitch+clipSwitch+'.height'))
		var cmgFrom = ''; //this is used for recursion so we do NOT bounce back and forth
		
		
		if ( direction =='right' ) {
			moveLayer(target, (overlapleft+overlapwidth+5), overlaptop);
			cmgFrom = 'left';
		} else if ( direction =='left' ) {
			var leftpos = (overlapleft-targetwidth-5);
			if(leftpos < 0) {
   			shiftAllLayers('right', (leftpos *-1)+5);
   			moveLayer(target, 5, overlaptop);
   		} else {
   			moveLayer(target,leftpos, overlaptop);
   			cmgFrom = 'right';
   		}
		} else if ( direction =='top' ) {
   		var toppos = (overlaptop-targetheight-5);
   		if(toppos < 0) {
   			shiftAllLayers('down', (toppos *-1)+5);
   			moveLayer(target, overlapleft, 5);
   		} else {
    		moveLayer(target, overlapleft, toppos);
    		cmgFrom = 'bottom';
   		}
		} else if (direction=='bottom') {
			moveLayer(target, overlapleft, (overlaptop+targetheight+5));
			cmgFrom = 'top';
		}
		checkOverlap(target, cmgFrom);

	}
/*===================================================================
Function:shiftAllLayers()
Purpose: Moves every layer either right or down by a given delta
===================================================================*/	
	function shiftAllLayers(direction, delta) {
		
		for (var i=0; i<numberOfLayers;i++) { 
 			var curName = eval(layerRef+'['+i+']'+'.name');
 			var thisLeft = parseInt(eval(layerRef+'['+i+']'+styleSwitch+'.left'));
 			var thisTop = parseInt(eval(layerRef+'['+i+']'+styleSwitch+'.top'));
 			if (thisLeft && (curName.indexOf(layerSubStringID)!=-1)) {
 				if (direction == 'right') {
 					moveLayer(curName, parseInt(thisLeft+delta), thisTop);
 				} else if ( direction=='down' ) {
   				moveLayer(curName, thisLeft, parseInt(thisTop+delta))
				}
			}
		}
	}
/*===================================================================
Function:checkOverlap(TargetLayer, shiftedFrom)
Purpose: checks to see if the target layer is overlapping other editable
layers.  To prevent recursion problems, a second var is passed that describes
the direction in which the layer came from.
===================================================================*/
	function checkOverlap(objName, comingFrom) {
		
 		var objLeftX = parseInt(eval(layerRef+'["'+objName+'"]'+styleSwitch+'.left'));
 		var objRightX = objLeftX + parseInt(eval(layerRef+'["'+objName+'"]'+styleSwitch+clipSwitch+'.width'));
 		var objTopY = parseInt(eval(layerRef+'["'+objName+'"]'+styleSwitch+'.top'));
 		var objBottomY =objTopY + parseInt(eval(layerRef+'["'+objName+'"]'+styleSwitch+clipSwitch+'.height'));

 		for (var i=0; i<numberOfLayers;i++) { 
 			var curName = eval(layerRef+'['+i+']'+'.name');
 			if (eval(layerRef+'['+i+']'+styleSwitch+'.left') && (curName != objName) && (curName.indexOf(layerSubStringID)!=-1)) {
 				var curName = eval(layerRef+'['+i+']'+'.name');
  				var curLeftX =parseInt(eval(layerRef+'['+i+']'+styleSwitch+'.left'));
  				var curWidth =parseInt(eval(layerRef+'['+i+']'+styleSwitch+clipSwitch+'.width'));
  				var curHeight =  parseInt(eval(layerRef+'['+i+']'+styleSwitch+clipSwitch+'.height'));
  				var curRightX = curLeftX + curWidth;
  				var curTopY = parseInt(eval(layerRef+'['+i+']'+styleSwitch+'.top'));
   			var curBottomY =curTopY +curHeight;
   			
   			if((objLeftX >= curLeftX && objLeftX <= curRightX) && (objTopY >= curTopY && objTopY <= curBottomY)) {
  					//upper left corner inside layer
  					//alert("UL layer overlap with "+curName);
  					if (objTopY < (curTopY+(curHeight/2))) {
  						if (comingFrom=='right'){
  							//move down since moving left would not solve the overlap
  							layerSnapTo(objName, curName, 'bottom');
  						} else {
  							layerSnapTo(objName, curName, 'right');
  						}
  					} else {
  						layerSnapTo(objName, curName, 'bottom');
  					}
  					break;
  				} else if((objRightX >= curLeftX && objRightX <= curRightX) && (objTopY >= curTopY && objTopY <= curBottomY)) {
   				//upper right corner
   				//alert("UR layer overlap with "+curName);
   				if (objTopY < (curTopY+(curHeight/2))) {
  						if (comingFrom=='left'){
  							//move down since moving left would not solve the overlap
  							layerSnapTo(objName, curName, 'bottom');
  						} else {
  							layerSnapTo(objName, curName, 'left');
  						}
  					} else {
  						layerSnapTo(objName, curName, 'bottom');
  					}
   				break;
  				} else if((objRightX >= curLeftX && objRightX <= curRightX) && (objBottomY >= curTopY && objBottomY <= curBottomY)) {
  					//lower right corner
  					//alert("LR layer overlap with "+curName);
  					if (objBottomY < (curTopY+(curHeight/2))) {
  						if (comingFrom=='top'){
  							//move right since moving up would not solve the overlap
  							layerSnapTo(objName, curName, 'right');
  						} else {
  							layerSnapTo(objName, curName, 'top');
  						}
  					} else {
  						layerSnapTo(objName, curName, 'left');
  					}
  					break;
  				} else if((objLeftX >= curLeftX && objLeftX <= curRightX) && (objBottomY >= curTopY && objBottomY <= curBottomY)) {
  					//lower left corner
  					//alert("LL layer overlap with "+curName);
  					if (objBottomY < (curTopY+(curHeight/2))) {
  						if (comingFrom=='top'){
  							//move right since moving up would not solve the overlap
  							layerSnapTo(objName, curName, 'right');
  						} else {
  							layerSnapTo(objName, curName, 'top');
  						}
  					} else {
  						layerSnapTo(objName, curName, 'right');
  					}
  					break;
  				}
 			}
 		}
 		//alert('updating form');
 		updateForm(sysForm, objName, objLeftX, objTopY);
	}
/*===================================================================
Function:updateForm(formname,layerName,x,y)
Purpose: To update the form because an editable layer was just repositioned.
===================================================================*/	
	function updateForm(fName,objName,xLoc, yLoc) {
		eval(formRef+'["'+fName+'"].'+objName+'_X.value='+xLoc);
		eval(formRef+'["'+fName+'"].'+objName+'_Y.value='+yLoc);

	}
/*===================================================================
Function:showHideLayerSwitch(layerName)
Purpose: Toggle visibility
===================================================================*/	
	function showHideLayerSwitch(layerName, layerNameSub){
		if (eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.visibility == visibleVar')){
			hideLayer(layerName);
			if(layerNameSub){
				hideLayer(layerNameSub);
			}
		}else{
			showLayer(layerName);
		}
		
	}
/*===================================================================
Function:showLayer(layerName)
Purpose: make layer visibile
===================================================================*/		
	function showLayer(layerName){
		eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.visibility="visible"');
	}
/*===================================================================
Function:hideLayer(layerName)
Purpose: hide layer
===================================================================*/		
	function hideLayer(layerName){
		eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.visibility="hidden"');
	}
	
	function hideSubMenus() {
		hideLayer('pulldownMenu');
      hideLayer('pulldownPage');
      hideLayer('pulldownGoTo');
      hideLayer('pulldownStoreElement');
      return false;
	}

/*===================================================================
Function:moveLayer(layerName,x,y)
Purpose: repositions Layer to the x,y position
===================================================================*/	
	function moveLayer(layerName,x,y){

		eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.xpos='+x);
		eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.ypos='+y);
		
		eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.left='+x);
		eval(layerRef+'["'+layerName+'"]'+styleSwitch+'.top='+y);
		
	}
/*===================================================================
Function:toggleBG(layerName)
Purpose: Sets layer background to another image to indicate selection.
===================================================================*/	
	function toggleBG(objName, toggleSwitch) {
 		
 		for (var i=0; i<numberOfLayers;i++) { 
 			var curName = eval(layerRef+'['+i+']'+'.name');
 			if (eval(layerRef+'['+i+']'+styleSwitch+'.left') && (curName != objName) && (curName.indexOf(layerSubStringID) !=-1)) {
 				eval(layerRef+'['+i+']'+styleSwitch+'.background'+bgImgSwitch+'=\''+NObgURL+'\'');
 			}
 		}
 		//Set the background of the layer just selected.
 		if (objName) {
 			
   		if (toggleSwitch=='on') {
   		
   			
       		
       		if (objName.indexOf(layerSubStringID) != -1) {
       			eval(layerRef+'["'+objName+'"]'+styleSwitch+'.background'+bgImgSwitch+'=\''+bgURL+'\'');
       			//Update the form of which layer is currently selected
       			eval(formRef+'["'+sysForm+'"].IESelectedLayer.value="'+objName+'"');
       		}
       	
       	} else if (toggleSwitch=='off'){
   			eval(layerRef+'["'+objName+'"]'+styleSwitch+'.background'+bgImgSwitch+'=\''+NObgURL+'\'');
   			eval(formRef+'["'+sysForm+'"].IESelectedLayer.value=""');
   			
   		}
 		}
        
}

/*The following function does nothing!*/

function myVoid() {
	if (NS) {
		return void(0);
	} else {
		return false
	}
}


// Drag layer functions (from DreamWeaver)

function MM_findObj(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
}



/*===================================================================
Function:checkLocation()
Purpose: 
===================================================================*/	

	function checkLocation(layerName){
		var availableX=eval(innerW);
		var availableY=eval(innerH);
		var currentX=eval(offsetX);
		var currentY=eval(offsetY);
		//x=availableX-145+currentX;
		//y=availableY-40+currentY;
		x=currentX+5;
		y=currentY+5;
		//******************************
		eval(layerRef+'["'+layerName+'"]'+styleSwitch+horz+'='+x);
		eval(layerRef+'["'+layerName+'"]'+styleSwitch+vert+'='+y);
		eval('setTimeout("checkLocation(\''+layerName+'\')",100)');
		//******************************
		}


/*===================================================================
Function:shiftControlPanelLayers()
Purpose: Shifts popup menus and control panel to default location
===================================================================*/	
	function shiftControlPanelLayers() {
	
		var leftPos = parseInt((margin+B_width + 30));
		(leftPos < 140 ? leftPos = 140 : leftPos = leftPos);
		var topPos = parseInt(margin+A_height + (2*border) + 30);
		
		moveLayer(controlPanelLayerName,leftPos,topPos);
		moveLayer('pulldownMenu', 90+leftPos, 9+topPos);
		moveLayer('pulldownPage', 90+leftPos, 71+topPos);
		moveLayer('pulldownGoTo', 90+gotoOffSetLeft+newLeft, 71+gotoOffSetTop+newTop);
		moveLayer('pulldownStoreElement', 90+seOffSetLeft+newLeft, 71+seOffSetTop+newTop);
        	moveLayer('pulldownBottom', 4+leftPos, 212+topPos);
		addToMoveList('controlPanel');
	}
/*===================================================================
Function:changeArrow(layerName, image)
Purpose: changes the arrow image on the bottom of the control panel
===================================================================*/		
	function changeArrow(layerName,imgName) {
	if (document.images) {
		//	need to convert to lower case because dynamic parsing of the page will
		//	sometimes result in changing the case of the images (probably a bug to 
		//	be fixed soon
		if (eval(layerRef+'["'+layerName+'"].document["'+imgName+'"].src').toLowerCase() == arrowdown.src.toLowerCase()) {
			eval(layerRef+'["'+layerName+'"].document["'+imgName+'"].src='+'\''+arrowup.src+'\'');
		} else {
			//document[imgName].src =  arrowdown.src;
			eval(layerRef+'["'+layerName+'"].document["'+imgName+'"].src='+'\''+arrowdown.src+'\'');
		}
	}
}
	
/*######################################################################################
THE FOLLOWING FUNCTION (MERC_dragLayer) SHOULD ONLY BE APPLIED TO THE WAT ELEMENTS.  
THE CODE HAS BEEN MODIFIED FROM THE ORIGINAL MACROMEDIA CODE AND WOULD HAVE SOME DAMAGING EFFECTS
ON GUI PRESENTATION IF APPLIED TO OTHER NON-LAYER ELEMENTS.  IF YOU WISH TO HAVE A DRAGGABLE
LAYER OUTSIDE OF THE APPLICATION, PLEASE USE/CREATE YOUR OWN ROUTINES.  FOR INFORMATION REGARDING
THE PARAMETERS, PLEASE REFER TO THE ACCOMPANYING DOCUMENTATION.
########################################################################################*/

function MERC_dragLayer(objName,x,hL,hT,hW,hH,toFront,dropBack,cU,cD,cL,cR,targL,targT,tol,dropJS,et,dragJS) { //v3.0

  eval(formRef+'["'+sysForm+'"].NSSelectedLayer.value="'+eval(formRef+'["'+sysForm+'"].IESelectedLayer.value')+'"');
  //Copyright 1998 Macromedia, Inc. All rights reserved.
  

  var i,j,aLayer,retVal,curDrag=null,NS=(navigator.appName=='Netscape'), curLeft, curTop;
  if (!document.all && !document.layers) return false;
  retVal = true; if(!NS && event) event.returnValue = true;
  if (MERC_dragLayer.arguments.length > 1) {
    
    curDrag = MM_findObj(objName); 
    if (!curDrag) return false;
    if (!document.allLayers) { 
    document.allLayers = new Array();
      with (document) 
      if (NS) { 
      		for (i=0; i<layers.length; i++) allLayers[i]=layers[i];
        		for (i=0; i<allLayers.length; i++) if (allLayers[i].document && allLayers[i].document.layers)
          	with (allLayers[i].document) for (j=0; j<layers.length; j++) allLayers[allLayers.length]=layers[j];
      } else for (i=0;i<all.length;i++) if (all[i].style&&all[i].style.position) allLayers[allLayers.length]=all[i];
    }
    curDrag.MM_dragOk=true; curDrag.MM_targL=targL; curDrag.MM_targT=targT;
    curDrag.MM_tol=Math.pow(tol,2); curDrag.MM_hLeft=hL; curDrag.MM_hTop=hT;
    curDrag.MM_hWidth=hW; curDrag.MM_hHeight=hH; curDrag.MM_toFront=toFront;
    curDrag.MM_dropBack=dropBack; curDrag.MM_dropJS=dropJS;
    curDrag.MM_everyTime=et; curDrag.MM_dragJS=dragJS;
    curDrag.MM_oldZ = (NS)?curDrag.zIndex:curDrag.style.zIndex;
    curLeft= (NS)?curDrag.left:curDrag.style.pixelLeft; curDrag.MM_startL = curLeft;
    curTop = (NS)?curDrag.top:curDrag.style.pixelTop; curDrag.MM_startT = curTop;
    curDrag.MM_bL=(cL<0)?null:curLeft-cL; curDrag.MM_bT=(cU<0)?null:curTop -cU;
    curDrag.MM_bR=(cR<0)?null:curLeft+cR; curDrag.MM_bB=(cD<0)?null:curTop +cD;
    curDrag.MM_LEFTRIGHT=0; curDrag.MM_UPDOWN=0; curDrag.MM_SNAPPED=false; //use in your JS!
    
    //MERC
    //Changed the following to fix IE5 bug of click events
	document.onmousedown = MERC_dragLayer; document.onmouseup = MERC_dragLayer;
	
	//if (NS) {document.onmousedown = MERC_dragLayer; document.onmouseup = MERC_dragLayer;}
	//else {curDrag.onmousedown = MERC_dragLayer; curDrag.onmouseup = MERC_dragLayer;}
	
	if (NS) document.captureEvents(Event.MOUSEDOWN|Event.MOUSEUP);
  } else {
  
  //MERC Don't allow anything if popup is active
  if (parent.WindowID) 
  {
	if (!parent.WindowID.closed)
	{
		parent.WindowID.focus();
		return false;
		//This trick works in Netscape but IE would allow links to work still
		//Therefore in IE we use an overlaying layer to "disable" all functionality
	}
  }
  
  
    var theEvent = ((NS)?objName.type:event.type);
    if (theEvent == 'mousedown') {
    if (gDISABLE_NEXT_EVENT=='mousedown')
    {
		gDISABLE_NEXT_EVENT='';
		return false;
	}
      var mouseX = (NS)?objName.pageX : event.clientX + document.body.scrollLeft;
      var mouseY = (NS)?objName.pageY : event.clientY + document.body.scrollTop;
      var maxDragZ=null; document.MM_maxZ = 0;
      for (i=0; i<document.allLayers.length; i++) { aLayer = document.allLayers[i];
        var aLayerZ = (NS)?aLayer.zIndex:aLayer.style.zIndex;
        if (aLayerZ > document.MM_maxZ) document.MM_maxZ = aLayerZ;
        var isVisible = (((NS)?aLayer.visibility:aLayer.style.visibility).indexOf('hid') == -1);
        if (aLayer.MM_dragOk != null && isVisible) with (aLayer) {
          var parentL=0; var parentT=0;
          if (!NS) { parentLayer = aLayer.parentElement;
            while (parentLayer != null && parentLayer.style.position) {
              parentL += parentLayer.offsetLeft; parentT += parentLayer.offsetTop;
              parentLayer = parentLayer.parentElement; 
            }
          }
          var tmpX=mouseX-(((NS)?pageX:style.pixelLeft+parentL)+MM_hLeft);
          var tmpY=mouseY-(((NS)?pageY:style.pixelTop +parentT)+MM_hTop);
          var tmpW = MM_hWidth;  if (tmpW <= 0) tmpW += ((NS)?clip.width :offsetWidth);
          var tmpH = MM_hHeight; if (tmpH <= 0) tmpH += ((NS)?clip.height:offsetHeight);
          if ((0 <= tmpX && tmpX < tmpW && 0 <= tmpY && tmpY < tmpH) && (maxDragZ == null || maxDragZ <= aLayerZ)) { 
          	curDrag = aLayer; maxDragZ = aLayerZ; 
          } 
         }
       }
      if (curDrag) {
      
		  //change background to indicate selection
		  current_layer=curDrag.name;//set name of current dragged layer
		  toggleBG(current_layer, 'on');
 		  
 		  
        document.onmousemove = MERC_dragLayer; if (NS) document.captureEvents(Event.MOUSEMOVE);
        curLeft = (NS)?curDrag.left:curDrag.style.pixelLeft;
        curTop = (NS)?curDrag.top:curDrag.style.pixelTop;
        current_layerStartX=curLeft;
        current_layerStartY=curTop;
        current_layerStartZ=curDrag.MM_oldZ;
          
        MM_oldX = mouseX - curLeft; MM_oldY = mouseY - curTop;
        document.MM_curDrag = curDrag;  curDrag.MM_SNAPPED=false;
        if(curDrag.MM_toFront) {
          eval('curDrag.'+((NS)?'':'style.')+'zIndex=document.MM_maxZ+1');
          if (!curDrag.MM_dropBack) document.MM_maxZ++; }
        retVal = false; if(!NS) event.returnValue = false;
      } else {
      
      //MERC
      //since we are listening on the entire document, we must close the menus
      //if we are NOT dragging a layer. Also deselect current layer (if any)
      	//hideLayer('pulldownMenu');
      	//hideLayer('pulldownPage');
      	toggleBG(eval(formRef+'["'+sysForm+'"].IESelectedLayer.value'), 'off');
      	      	
      } 
      
    } else if (theEvent == 'mousemove') {
      if (document.MM_curDrag) with (document.MM_curDrag) {
        var mouseX = (NS)?objName.pageX : event.clientX + document.body.scrollLeft;
        var mouseY = (NS)?objName.pageY : event.clientY + document.body.scrollTop;
        newLeft = mouseX-MM_oldX; newTop  = mouseY-MM_oldY;
        if (MM_bL!=null) newLeft = Math.max(newLeft,MM_bL);
        if (MM_bR!=null) newLeft = Math.min(newLeft,MM_bR);
        if (MM_bT!=null) newTop  = Math.max(newTop ,MM_bT);
        if (MM_bB!=null) newTop  = Math.min(newTop ,MM_bB);
        MM_LEFTRIGHT = newLeft-MM_startL; MM_UPDOWN = newTop-MM_startT;
        if (NS) {left = newLeft; top = newTop;}
        else {style.pixelLeft = newLeft; style.pixelTop = newTop;}
                
        //MERC
        //Move the other three menus along with the parent...
        
        if ( name == controlPanelLayerName ) {
         moveLayer('pulldownMenu', 90+newLeft, 9+newTop);
         moveLayer('pulldownPage', 90+newLeft, 71+newTop);
         moveLayer('pulldownGoTo', 90+gotoOffSetLeft+newLeft, 71+gotoOffSetTop+newTop);
         moveLayer('pulldownStoreElement', 90+seOffSetLeft+newLeft, 71+seOffSetTop+newTop);
         moveLayer('pulldownBottom', 4+newLeft, 212+newTop);
			}         
        
        if (MM_dragJS) eval(MM_dragJS);
        retVal = false; if(!NS) event.returnValue = false;
    } } else if (theEvent == 'mouseup') {
		if (gDISABLE_NEXT_EVENT=='mouseup')
		{
			gDISABLE_NEXT_EVENT='';
			return false;
		}
      document.onmousemove = null;
      if (NS) document.releaseEvents(Event.MOUSEMOVE);
      if (NS) document.captureEvents(Event.MOUSEDOWN); //for mac NS
      if (document.MM_curDrag) {
      	with (document.MM_curDrag) {
        if (typeof MM_targL =='number' && typeof MM_targT == 'number' &&
            (Math.pow(MM_targL-((NS)?left:style.pixelLeft),2)+
             Math.pow(MM_targT-((NS)?top:style.pixelTop),2))<=MM_tol) {
          if (NS) {left = MM_targL; top = MM_targT;}
          else {style.pixelLeft = MM_targL; style.pixelTop = MM_targT;}
          MM_SNAPPED = true; MM_LEFTRIGHT = MM_startL-MM_targL; MM_UPDOWN = MM_startT-MM_targT; }
        if (MM_everyTime || MM_SNAPPED) eval(MM_dropJS);
        if(MM_dropBack) {if (NS) {zIndex = MM_oldZ;} else style.zIndex = MM_oldZ;}
        setAlwaysOnTopLayers();
        retVal = false; if(!NS) event.returnValue = false; }
      }
      document.MM_curDrag = null;
    }
    if (NS) document.routeEvent(objName);
  } 
  
   return retVal;
}

/*===================================================================
Function:togglePleaseWaitLayer()
Purpose: makes transparent layer visible.  This is used to "disable"
the main frame while a popup is active/open.
===================================================================*/	
	
function togglePleaseWaitLayer(onOrOff) 
{
	/*=====================================================
	load "please wait" layer
	=======================================================*/
	if (document.layers) 
	{
		layerRef="document.layers";
		styleSwitch="";
     	}
     	else
     	{
		layerRef="document.all";
		styleSwitch=".style";
	}
	var topZ = parseInt(eval(layerRef+'["controlPanel"]'+styleSwitch+'.zIndex'));
	eval(layerRef+'["disableControlPanel"]'+styleSwitch+'.zIndex='+ parseInt(topZ+1) );
		
	if (onOrOff == 'on') 
	{
		/* Disabling because older browsers don't interpret the opacity correctly
		** and put in a solid layer
		**
		if (document.all)
		{
			eval(layerRef+'["disableControlPanel"]'+styleSwitch+'.backgroundColor="#CCCCCC"');
			eval(layerRef+'["disableControlPanel"]'+styleSwitch+'.filter+="alpha(opacity=0)"');
			eval(layerRef+'["disableControlPanel"].filters.item("alpha").enabled=true');
		}
		*/
		showLayer("disableControlPanel");
			
	} 
	else
		hideLayer("disableControlPanel");
}

