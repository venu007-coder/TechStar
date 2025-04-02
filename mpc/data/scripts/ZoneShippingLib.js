/*===================================================================
Name: ZoneShippingLib.js
Purpose: To be included in shipping screens.  Provides functions that handle
	Setting/Retrieval of Threshold information.
	
Author: Jeremy King, Greenbrier & Russel
Date:	7/11/01

Last Modified: 
7/11/01	jking -	Created this file.

====================================================================*/


/************************************************************************
**	Function:buildZoneSelectList(selectedID,submitForm, Action, NextPage, target, args)
**
**	Purpose: Creates Zone drop down with options:
		selectedID-> Zone to select first
		submitForm-> boolean as to generate onChange code to submit form
		Action -> action to use on form submit
		NextPage->next page to load or target for form submission
		target-> Frame or window name
		args-> any arguments for form submission
*************************************************************************/

function buildZoneSelectList(selectedID,submitForm, Action, NextPage, target, args)
{
	var zonesBDO = doActionBDO("SHIP_GET_ZONELIST");
	var zonesBDORows = zonesBDO.GetLabels("SHIP_ZONE");

	if(zonesBDO.NumZones > 0)
	{
		if (submitForm == 'true' && Action && NextPage && target && args)
		{
			writeln("<select name=\"zoneID\" onChange=\"parent.SubmitForm('"+Action+"','"+ NextPage+"','" +target+"',"+ args+")\">");
		} else 
		{
			writeln("<select name=\"zoneID\">");
		}

		for (var i=0; i<zonesBDO.NumZones; i++)
		{
			curRow=eval("zonesBDO."+zonesBDORows[i]);
				
			if (curRow.ID)
			{
				write("\n\t\t<option value=\"" + curRow.ID + "\" ");
				if (curRow.ID == selectedID) write("SELECTED");
					writeln(">" + curRow.Name+ "</option>");
			}
					
		}
				
		writeln("</select>");	
	}
	else
        {
                if (submitForm == 'true' && Action && NextPage && target && args)
                {
                        writeln("<select name=\"zoneID\" onChange=\"parent.SubmitForm('"+Action+"','"+ NextPage+"','" +target+"',"+ args+")\">");
                } else
                {
                        writeln("<select name=\"zoneID\">");
                }
                writeln('<option value="-1"> None </option>');
                writeln("</select>");
        }
	
}


function ss_deleteThreshold(rowID) 
{
		var filterStr="ID="+rowID.toString(), ret=false;
		
		var qID = doActionEx("DATA_OPENQUERY", "QueryID","ObjectName", "SHIP_THRESHOLD", "Filter", filterStr);
		
		if(!doActionEx("DATA_ISEOF","Result","QueryID",qID, "ObjectName", "SHIP_THRESHOLD"))
		{
			var litID=doActionEx("DATA_GETFIELDDATA", "MSG_LIT_ID","ObjectName", "SHIP_THRESHOLD","QueryID",qID, "FieldName", "MSG_LIT_ID");
			
			var deleteRow=doActionEx("DATA_DELETE", "Success","ObjectName", "SHIP_THRESHOLD","QueryID",qID);
			
			if (deleteRow) 
				ret = true;
		}
		
		var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",qID,"ObjectName", "SHIP_THRESHOLD");
		
		var deleteLocale = 	doAction("DATA_DELETELOCALESTRING","ObjectName", "SHIP_LITERALS", "LiteralID", parseInt(litID));
		
		return ret;	

}

function buildThresholdArray()
{
	var thresholdArray = new Array();
	
	// Get the first threshold value, which must always be present
	var limit = doAction('REQ_GET_FORMVALUE', "threshold_1_val", "threshold_1_val");
	var amount = doAction('REQ_GET_FORMVALUE', "threshold_1_charge", "threshold_1_charge");
	var id = doAction('REQ_GET_FORMVALUE', "threshold_1_id", "threshold_1_id");
	var chargetype = doAction('REQ_GET_FORMVALUE', "threshold_1_chargetype", "threshold_1_chargetype");
	var msg_id = doAction('REQ_GET_FORMVALUE', "threshold_1_msg_id", "threshold_1_msg_id");
	var msg = doAction('REQ_GET_FORMVALUE', "threshold_1_msg", "threshold_1_msg");
				
	// Since we don't know how many threshold values there are, loop until we run out of input
	var temp="";
	for (var i=1; id ; i++)
				
	{
		thresholdArray[i] = new Array(id, limit, amount,chargetype,msg_id,msg);
					
		temp = "threshold_" + eval (i+1)+"_val" ;
		var limit = doAction('REQ_GET_FORMVALUE', temp, temp);
					
		temp = "threshold_" + eval (i+1)+"_charge" ;
		var amount = doAction('REQ_GET_FORMVALUE', temp, temp);
					
		temp = "threshold_" + eval (i+1)+"_id" ;
		var id = doAction('REQ_GET_FORMVALUE', temp, temp);
					
		temp = "threshold_" + eval (i+1)+"_chargetype" ;
		var chargetype = doAction('REQ_GET_FORMVALUE', temp, temp);
					
		temp = "threshold_" + eval (i+1)+"_msg_id" ;
		var msg_id = doAction('REQ_GET_FORMVALUE', temp, temp);
					
		temp = "threshold_" + eval (i+1)+"_msg" ;
		var msg = doAction('REQ_GET_FORMVALUE', temp, temp);
				
					
	}
				
	// Read in any NEW range values
	if (i > 1)
	{
		var amount = doAction('REQ_GET_FORMVALUE', "threshold_NEW_charge", "threshold_NEW_charge");
		var limit = doAction('REQ_GET_FORMVALUE', "threshold_NEW_val", "threshold_NEW_val");
		var chargetype = doAction('REQ_GET_FORMVALUE', "threshold_NEW_chargetype", "threshold_NEW_chargetype");
		var msg_id = doAction('REQ_GET_FORMVALUE', "threshold_NEW_msg_id", "threshold_NEW_msg_id");
		var msg = doAction('REQ_GET_FORMVALUE', "threshold_NEW_msg", "threshold_NEW_msg");
				
		if (amount)
		{
			thresholdArray[i] = new Array('-1', limit, amount,chargetype,'',msg);
			i++; //increment so that max values will work
		}
		else 
		{
			//writeln("Error getting NEW values");
			//NEW row did not contain amount data
		}
					
	}	
				
	// Read the upper, or max, threshold
	if (i > 1)
	{
		var amount = doAction('REQ_GET_FORMVALUE', "threshold_max_charge", "threshold_max_charge");
		var id = doAction('REQ_GET_FORMVALUE', "threshold_max_id", "threshold_max_id");
		var chargetype = doAction('REQ_GET_FORMVALUE', "threshold_max_chargetype", "threshold_max_chargetype");
		var msg_id = doAction('REQ_GET_FORMVALUE', "threshold_max_msg_id", "threshold_max_msg_id");
		var msg = doAction('REQ_GET_FORMVALUE', "threshold_max_msg", "threshold_max_msg");
				
		//var chargetype="F";
		if (amount && id)
		{
			thresholdArray[i] = new Array(id, "MAX" , amount,chargetype,msg_id,msg);
		}
		else 
		{
			i--;
			//writeln("Error getting Max values");
		}
					
	}

	return thresholdArray;
}
