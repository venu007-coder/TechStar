/*===================================================================
Name: BizInfoLib.js
Purpose: To be included in Business Information viewer and the Service
	wizard.  Contains functions for getting/setting data.
Author: Jason Jackson, C.I.
Date:	6/28/01

Last Modified: 
6/29/01	jking -	Created this file.
 

====================================================================*/

var g_needsReg = false;
var gTIMEZONE_WARNING = '<span class="warning-note"><br>Changing your timezone will result in times being '+
				'displayed relative to your new selection (e.g. 9:00 under EST will display as 8:00 under CST).</span>';

var TimeZoneArray = new Array('AST4AST', 'AST4ADT', 'EST5EST', 'EST5EDT', 'CST6CST', 'CST6CDT', 'MST7MST', 
							'MST7MDT', 'PST8PST', 'PST8PDT', 'AKST9AKST', 'AKST9AKDT', 'HST10HST',
							'GMT0', 'BST-1', 'IST-1', 'WET0', 'WET0WEST-1', 'CET-1', 'CET-1CEST-2',
							'EET-2', 'EET-2EEST-3', 'MSK-3', 'MSK-3MSD-4', 
							'AEST-10', 'AEST-10AEDT-11', 'ACST-9:30', 'ACST-9:30ACDT-10:30', 'AWST-8');
var TimeZoneArrayDisplay = new Array('AST-(Atlantic Standard Time)', 'ADT-(Atlantic Daylight Time)', 
									'EST-(Eastern Standard Time)', 'EDT-(Eastern Daylight Time)', 
									'CST-(Central Standard Time)', 'CDT-(Central Daylight Time)', 
									'MST-(Mountain Standard Time)', 'MDT-(Mountain Daylight Time)', 
									'PST-(Pacific Standard Time)', 'PDT-(Pacific Daylight Time)', 
									'AKST-(Alaska Standard Time)', 'AKDT-(Alaska Daylight Time)', 
									'HST-(Hawaii Standard Time)','GMT-(Greenwich Mean Time)', 
									'BST-(British Summer Time)', 'IST-(Irish Summer Time)',
									'WET-(Western Europe Time)','WEST-(Western Europe Summer Time)',
									'CET-(Central Europe Time)','CEST-(Central Europe Summer Time)',
									'EET-(Eastern Europe Time)','EEST-(Eastern Europe Summer Time)',
									'MSK-(Moscow Time)','MSD-(Moscow Summer Time)',
									'AEST-(Australian Eastern Standard Time)',
									'AEDT-(Australian Eastern Daylight Time)', 
									'ACST-(Australian Central Standard Time)',
									'ACDT-(Australian Central Daylight Time)',
									'AWST-(Australian Western Standard Time)');
function SetData(fieldName, formValue)
{
	var tmpBDO = GetBDO();
	var tmp = doAction('REQ_GET_FORMVALUE', formValue, formValue);
	if (tmp == undefined) return 1;

	tmp = tmp.replace(/\r\n/g, '__nl__').replace(/\n/g, '__nl__');
	tmp = tmp.replace(/"/g, '');

	if (ProcessRequest('BIZ_SETDATA', 'FieldName', fieldName, 'FieldValue', tmp, tmpBDO) != MCERR_NOERROR)
		return 1;

	if (tmpBDO.NeedsRegistration != undefined && tmpBDO.NeedsRegistration) g_needsReg = true;
	return 0;
}

function GetData(fieldName)
{
	var tmp = doActionEx('BIZ_GETDATA', 'FieldValue', 'FieldName', fieldName);
	if (tmp == undefined) return '';

	tmp = tmp.replace(/__nl__/g, '\n');
	return tmp;
}

function DoTask()
{
	if (task == 'save')
	{
		var errors = 0;
		errors += SetData('Name', 'bizname');
		errors += SetData('Street1', 'bizstreet1');
		errors += SetData('Street2', 'bizstreet2');
		errors += SetData('City', 'bizcity');
		errors += SetData('State', 'bizstate');
		errors += SetData('Postal', 'bizpostal');
		errors += SetData('Country', 'bizcountry');
		errors += SetData('Phone', 'bizphone');
		errors += SetData('Fax', 'bizfax');
		errors += SetData('Email', 'bizemail');
		errors += SetData('MerchantTimeZone', 'biztimezone');
		//errors += SetData('Logo', 'bizlogo');

		if (errors) return 'SetData reported ' + errors + ' problems';

		// this action call could take a long time to complete..
		if (g_needsReg) doAction('PR_REGISTER_CHANGE');

		return 'Success';
	}

	return 'Unknown task';
}
