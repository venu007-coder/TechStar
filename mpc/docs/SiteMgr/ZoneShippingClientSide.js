/*===================================================================
Name: ZoneShippingLib.js
Purpose: To be included in zone shipping viewers.  Contains client side
functions for validating data and other tasks.
Author: Jeremy King, Greenbrier & Russel
Date:	7/02/01

Last Modified: 
7/02/01	jking -	Created this file.
7/30/01 dmenagh -	Modified some functions to take a dynamic DestinationHTML parameter
			so this code can be called from both the Merchant viewer and the Wizard
10/5/01 lrettberg - Added question mark to delete confirmation					
 

====================================================================*/

var duplicateValuesErrorMsg = 'Invalid Threshold value.  You are not allowed to have duplicate values.';


/******************************************************************
Function deleteThreshold(rowid, DestinationHTML) -- deletes row with ID passed in.
*******************************************************************/

function deleteThreshold(rowid, DestinationHTML) {
	if (confirm('Are you sure you want to delete this row?')) {
	
		//alert(rowid);
		document.saveThreshold.mode.value='delete_threshold';
		if (rowid)
			document.saveThreshold.deleteThresholdID.value=parseInt(rowid);
		
		parent.SubmitForm('L',DestinationHTML,'mainFrame',document.saveThreshold);
		//return(void(0));
		
	}
	
}

/******************************************************************
Function changeZoneInfo() -- Loads popup window for Zone administration.
*******************************************************************/


function changeZoneInfo() {
	
	if (document.changeZone.zoneID)
	{
		if (document.changeZone.zoneID.options.length)
			void(parent.OpenWinSubmitForm('','L','bm_shpgzones.htm','newWin',document.changeZone,parent.createSimpleSubmitWindow(225,460)));
		else
			void(parent.OpenWinSubmitForm('','L','bm_shpgzones.htm','newWin','',parent.createSimpleSubmitWindow(225,460)));
		
	}
	else
		void(parent.OpenWinSubmitForm('','L','bm_shpgzones.htm','newWin','',parent.createSimpleSubmitWindow(225,460)));
		
}
/******************************************************************
Function validateThresholds(formName) -- Makes sure there are no duplicate
	threshold values.
	
input: string formname;
output: boolean value
*******************************************************************/
function validateThresholds(formName)
{
	var thisform = eval('document.'+formName);
	var thresholdvals = new Array();
	var j=0;
	for (var i = 0; i < thisform.length; i++)
	{
			if ((thisform.elements[i].name.indexOf("_val") > -1))
			{
				for(var value in thresholdvals)
				{
					if (parseFloat(thisform.elements[i].value) == parseFloat(thresholdvals[value]))
					{
						thisform.elements[i].focus();
						return false;
					}
				}
				thresholdvals[j] = thisform.elements[i].value;
				j++;
			}
	}
	return true; //if you got here, there were no duplicates
}

/******************************************************************
Function addAnotherRange() -- Changes the mode value and submits the form
	if no duplicates
*******************************************************************/
function addAnotherRange(DestinationHTML)
{
	if (validateThresholds('saveThreshold'))
	{
		document.saveThreshold.mode.value='add_another_range';
		parent.SubmitForm('L',DestinationHTML,'mainFrame',document.saveThreshold);
		
	}
	else
		alert(duplicateValuesErrorMsg);

}

/******************************************************************
Function saveThresholds() - Submits form only if no duplicates.
*******************************************************************/
function saveThresholds(DestinationHTML)
{
        // first make sure there is a valid zone to delete.
        // if the zoneID is -1 that means there are no zones
        // and "None" appears in the dropdown.
        if(document.changeZone.zoneID.options[0].value < 0)
        {
                alert("You must add a Shipping Zone before you can save threshold values.");
                return;
        }
        else
        {
                if (validateThresholds('saveThreshold'))
                        parent.SubmitForm('L',DestinationHTML,'mainFrame',document.saveThreshold);
                else
                        alert(duplicateValuesErrorMsg);
        }

}

