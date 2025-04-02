/*===================================================================
Name: ServicesLib.js
Purpose: To be included in bm_schedule-services.htm and the Service
	wizard.  Contains functions for adding/modifying/deleting Services.
Author: Jeremy King, Greenbrier & Russel
Date:	6/28/01

Last Modified: 
6/28/01	jking -	Created this file.
7/10/01 dmenagh - added new functions, moved some functions around. 

====================================================================*/
//include Formatting Library
var cs_inc = doActionEx ('DATA_READFILE','FormattingLib.js', 'FileName', 'FormattingLib.js','ObjectName',
	    'JS_SRC', 'FileType', 'txt');
eval (cs_inc)


/***********************************
*******   GLOBAL DEFINES   *********
***********************************/

var g_prefBrowserLocale=getBrowserLocale();
var gPRECISION = getDefaultPrecision();
var local_AppointmentCount= 0;
var gIS_STORE_CLOSED_TODAY = false;

var daysinmonth = new Array(12);
daysinmonth[0]=31;
daysinmonth[1]=28;
daysinmonth[2]=31;
daysinmonth[3]=30;
daysinmonth[4]=31;
daysinmonth[5]=30;
daysinmonth[6]=31;
daysinmonth[7]=31;
daysinmonth[8]=30;
daysinmonth[9]=31;
daysinmonth[10]=30;
daysinmonth[11]=31;

var hours = new Array("12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11");
var minutes = new Array("00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55");
var minutes2 = new Array("00", "5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55");
var months = new Array("January","February","March","April","May","June",
	"July","August","September","October","November","December");
var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
var shortDays = new Array('Sun','Mon','Tues','Wed','Thur','Fri','Sat');

var ID_S_NEEDS_APPROVAL = '1';
var ID_S_APPROVED = '2';
var ID_S_REJECTED = '3';
var ID_S_CANCELED = '4';

// Initialize Schedule
var theSchedule = new Array();
var ScheduleCount=0;

/****************************
**	protytpe the Date object with some utility functions
****************************/
Date.prototype.getAmPm = getAmPm;
Date.prototype.getNonMilHours = getNonMilHours;

/****************************
****  CLASS DEFINITIONS  ****
****************************/

function TimeSlot(id, day, openHour, openMin, openAMPM, closeHour, closeMin, closeAMPM, allday, openstate)
{
	this.ID = id;
	this.Day = day;
	this.OpenHour = openHour;
	this.OpenMin = openMin;
	this.OpenAMPM = openAMPM;
	this.CloseHour = closeHour;
	this.CloseMin = closeMin;
	this.CloseAMPM = closeAMPM;
	this.AllDay = allday;
	this.State = openstate;
	this.startDateObj = 0;
	this.endDateObj = 0;
}

function Appointment(id, serviceID, status, apptDate, startHour, startMin, startAMPM, duration, name, address1, address2, city, state, zip, email, phone, comments)
{
	this.ID = id;
	this.ServiceID = serviceID;
	this.Status = status;
	this.ApptDate = apptDate;
	this.StartHour = startHour;
	this.StartMin = startMin;
	this.StartAMPM = startAMPM;
	this.Duration = duration;
	this.Name = name;
	this.Address1 = address1;
	this.Address2 =	address2;
	this.City = city;
	this.State = state;
	this.Zip = zip;
	this.Email = email;
	this.Phone = phone;
	this.Comments = comments;
}


/******************************
*******   FUNCTIONS   *********
******************************/

/******************************************************************
**	Function syncMonthYearDate (syncThis, toThis)
**
**	Overview:	sets the month, year, and date
**				values of the 'syncThis' Date Object equal to the 'toThis' 
**				Date Object
*******************************************************************/
function syncMonthYearDate (syncThis, toThis)
{
	syncThis.setYear(toThis.getYear()+1900);
	syncThis.setMonth(toThis.getMonth());
	syncThis.setDate(toThis.getDate());
	return syncThis;
}

/******************************************************************
**	Function validateAppt (startDateObj, endDateObj)
**
**	Overview:	Validates an appointment time based on 'startDateObj' and
**				'endDateObj' which are date objects representing start and 
**				end times of a requested appouintment.  Returns an error 
**				string if not valid, else returns an empty string
*******************************************************************/
function validateAppt (startDateObj, endDateObj)
{
	if (openScheduleCount <= 0)
		GetDailyHours();
	if (ScheduleCount <= 0)
		GetSpecialDays ();
	
	if (theOpenSchedule[shortDays[startDateObj.getDay()]].State.toLowerCase() == "c")
		return "Store Closed";
	var tmpStartDateObj = syncMonthYearDate (theOpenSchedule[shortDays[startDateObj.getDay()]].startDateObj, startDateObj);
	var tmpEndDateObj = syncMonthYearDate (theOpenSchedule[shortDays[startDateObj.getDay()]].endDateObj, startDateObj);

	var today = new Date();
	if (startDateObj.getTime() < today.getTime())
		return "Requested Appointment Time Occurs In The Past";
	if (startDateObj.getTime() < tmpStartDateObj.getTime())
		return "Appointment Time Occurs Before Store Is Open";
	if (startDateObj.getTime() >= tmpEndDateObj.getTime())
		return "Appointment Time Occurs After Store Is Closed";
		
	tmpStartDateObj = syncMonthYearDate (theUnavailSchedule[shortDays[startDateObj.getDay()]].startDateObj, startDateObj);
	tmpEndDateObj = syncMonthYearDate (theUnavailSchedule[shortDays[startDateObj.getDay()]].endDateObj, startDateObj);

	if (startDateObj.getTime() >= tmpStartDateObj.getTime() && startDateObj.getTime() < tmpEndDateObj.getTime())
		return "Appointment Time Occurs During Unavailable Hours";

	for (var n = 0; n < ScheduleCount; n++)
	{
		if (theSchedule[n].startDateObj.getYear() == startDateObj.getYear() && 
			theSchedule[n].startDateObj.getMonth() == startDateObj.getMonth() &&
			theSchedule[n].startDateObj.getDate() == startDateObj.getDate())
		{
			if (theSchedule[n].AllDay.toLowerCase() == "y")
				return "Store Closed";
			else if (startDateObj.getTime() >= theSchedule[n].startDateObj.getTime() && 
					startDateObj.getTime() < theSchedule[n].endDateObj.getTime())
				return "Appointment Time Occurs During Unavailable Hours";
		}
	}

	return "";
}

/******************************************************************
**	Function GetSpecialDays ()
**
**	Overview:	Fills the 'theSchedule' array with the values of the
**				special unavailable days as opposed tothe daily
**				schedule
*******************************************************************/
function GetSpecialDays ()
{
	var resultBDO = doActionBDO('SVC_GET_SPECIAL_CLOSED_HOURS');
	//writebr("resultBDO.Count=" + resultBDO.Count);

	ScheduleCount=resultBDO.Count;

	for (var i=0; i < ScheduleCount; i++)
		theSchedule[i] = new TimeSlot(i, "-","12","00","PM","12","00","PM","N","O","07-APR-1969");

	// Now set needed values
	if (resultBDO.Count)
	{
		var BDORows = resultBDO.GetLabels('TIMESLOT');
		BDORows.sort();

		for (var i = 0; i < BDORows.length; i++)
		{
			var timeSlotBDO = eval("resultBDO." + PadLeft('TIMESLOT',i+1));
			if (timeSlotBDO)
			{
				theSchedule[i].startDateObj = timeSlotBDO.DATETIME_START;
				theSchedule[i].endDateObj = timeSlotBDO.DATETIME_END;
				theSchedule[i].ID = timeSlotBDO.ID;
				theSchedule[i].month = timeSlotBDO.DATETIME_START.getMonth();
				theSchedule[i].year = (timeSlotBDO.DATETIME_START.getYear()+1900);
				theSchedule[i].date = timeSlotBDO.DATETIME_START.getDate();
				if (timeSlotBDO.Allday == "Y")
				{
					theSchedule[i].OpenHour = "0";
					theSchedule[i].OpenMin = "0";
					theSchedule[i].OpenAMPM = "AM";
					theSchedule[i].CloseHour = "0";
					theSchedule[i].CloseMin = "0";
					theSchedule[i].CloseAMPM = "AM";
				}
				else
				{
					theSchedule[i].OpenHour = timeSlotBDO.DATETIME_START.getNonMilHours();
					theSchedule[i].OpenMin = timeSlotBDO.DATETIME_START.getMinutes();
					theSchedule[i].OpenAMPM = timeSlotBDO.DATETIME_START.getAmPm();
					theSchedule[i].CloseHour = timeSlotBDO.DATETIME_END.getNonMilHours();
					theSchedule[i].CloseMin = timeSlotBDO.DATETIME_END.getMinutes();
					theSchedule[i].CloseAMPM = timeSlotBDO.DATETIME_END.getAmPm();
				}
				theSchedule[i].AllDay = timeSlotBDO.Allday;
				theSchedule[i].State = timeSlotBDO.OpenState;
				theSchedule[i].ClosedDate = days[timeSlotBDO.DATETIME_END.getDay()] + ", " +
											months[timeSlotBDO.DATETIME_END.getMonth()] + " " +
											timeSlotBDO.DATETIME_END.getDate() + ", " +
											(timeSlotBDO.DATETIME_END.getYear()+1900);

//writebr("id=",timeSlotBDO.ID,",",timeSlotBDO.Day," ",timeSlotBDO.StartHour,":",timeSlotBDO.StartMin,timeSlotBDO.StartAMPM," ",timeSlotBDO.EndHour,":",timeSlotBDO.EndMin,timeSlotBDO.EndAMPM," AllDay=",timeSlotBDO.Allday,", OpenState=",timeSlotBDO.OpenState,"  ClosedDate=",timeSlotBDO.ClosedDate);

			}
		}
		theSchedule.sort(sortDates);
	}
}

/******************************************************************
**	Function addDisplayHoursHtmlRow (header, dateObj, tz)
**
**	Overview:	Returns an HTML formatted table row with unavailable hours.
**				'header' is the row name, 'dateObj' is the object containg
**				the hours, and 'tz' is the display string for time zone
*******************************************************************/
function addDisplayHoursHtmlRow (header, dateObj, tz)
{
	var useTd = "<td class='general-label'>";
	var useTdr = "<td class='general-label' align='right'>";
	var openMin = dateObj.OpenMin.toString();
	var closedMin = dateObj.CloseMin.toString();
	return ("<tr>" + useTd + header + "</td>" + useTdr + "" +
			dateObj.OpenHour+ ":" + 
			(openMin.length < 2 ? "0" : "") + openMin +
			dateObj.OpenAMPM + " - " + 
			dateObj.CloseHour+ ":" + 
			(closedMin.length < 2 ? "0" : "") + closedMin + 
			dateObj.CloseAMPM + " " + tz +
			"</td></tr>");
}

/******************************************************************
**	Function sortDates (a, b))
**
**	Overview:	Sort routine for 'TimeSlot' object
*******************************************************************/
function sortDates (a, b)
{
	return (a.startDateObj.getTime() - b.startDateObj.getTime())
}

/******************************************************************
**	Function displayHoursHtml ()
**
**	Overview:	Returns an HTML formatted table conataining the store
**				hours.
*******************************************************************/
function displayHoursHtml ()
{
	
	if (openScheduleCount <= 0)
		GetDailyHours();
	if (ScheduleCount <= 0)
		GetSpecialDays ();
		
	// modify dispaly if we are on the merchant side
	var bMerchantSide = true;
	if (doAction("REQ_GET_FORMVALUE", "sh_action", "sh_action"))
		bMerchantSide = false;

	var nYear = doAction('REQ_GET_FORMVALUE', 'val1', 'val1');
	if (!nYear)
		nYear = doAction('REQ_GET_FORMVALUE', 'SelectedYear', 'SelectedYear');
	var nMonth = doAction('REQ_GET_FORMVALUE', 'val2', 'val2');
	if (!nMonth)
		nMonth = doAction('REQ_GET_FORMVALUE', 'SelectedMonth', 'SelectedMonth');
	var nDate = doAction('REQ_GET_FORMVALUE', 'val3', 'val3');
	if (!nDate)
		nDate = doAction('REQ_GET_FORMVALUE', 'SelectedDay', 'SelectedDay');
	
	if (!nYear || !nMonth || !nDate)
		var selectedDate = new Date();
	else
		var selectedDate = new Date(nYear, nMonth, nDate);
	
	var storeHours = "<tr><td colspan='2' class='general-label' align='center'>Closed</td></tr>";
	var bOpen = true;
	var aMatchDates = new Array();
	if (theOpenSchedule[shortDays[selectedDate.getDay()]].State.toLowerCase() == "c")
		bOpen = false;
	
	for (var n = 0; n < ScheduleCount && bOpen; n++)
	{
		if (theSchedule[n].startDateObj.getYear() == selectedDate.getYear() && 
			theSchedule[n].startDateObj.getMonth() == selectedDate.getMonth() &&
			theSchedule[n].startDateObj.getDate() == selectedDate.getDate())
		{
			if (theSchedule[n].AllDay.toLowerCase() == "y")
				bOpen = false;
			aMatchDates[aMatchDates.length] = theSchedule[n];
		}
	}
	if (bOpen)
	{
		var tz = doActionEx('BIZ_GETDATA', 'FieldValue', 'FieldName', 'MerchantTimeZone');
		var reTz = /([a-zA-Z]+)+[^a-zA-Z]+([a-zA-Z]*)/
		var num = tz.match(reTz);
		if (num && num.length > 1)
		{
			tz = num[1];
			if (num.length > 2 && num[2].length > 0)
				tz = num[2];
		}
		storeHours = addDisplayHoursHtmlRow ("Store Hours:  ", theOpenSchedule[shortDays[selectedDate.getDay()]], tz);
		if (theUnavailSchedule[shortDays[selectedDate.getDay()]].OpenHour != 0)
			aMatchDates[aMatchDates.length] = theUnavailSchedule[shortDays[selectedDate.getDay()]];
				
		aMatchDates.sort(sortDates);		
		for (var x = 0; x < aMatchDates.length; x++)
			storeHours += addDisplayHoursHtmlRow ("Unavailable:  ", aMatchDates[x], tz);
	}
	
	gIS_STORE_CLOSED_TODAY = !bOpen;
	
	var disCurDate = days[selectedDate.getDay()] + ", " + months[selectedDate.getMonth()] + " " + 
					selectedDate.getDate() + ", " + (selectedDate.getYear()+1900);
	var header = (bMerchantSide ? " class='table-header'>" + disCurDate : "><b>" + disCurDate + "</b>");
		
	return ("<table border=3 bgcolor=#ffffcc bordercolor=darkgreen>"+
			"<tr><td colspan=2 align='center'" + header + "</td></tr>" +
			storeHours +
			"</table>");
}

/*
** getAmPm ()
** Function to protoypte to the Date object, returns string 'AM' or 'PM' based
** on time stored in current Date object
*/
function getAmPm ()
{
	if (this.getTime() == 0)
		return "AM";
		
	if (this.getHours() > 11)
		return "PM";
	else 
		return "AM";
}

/*
** getNonMilHours ()
** Function to protoypte to the Date object, return the current date object's
** hours as non-24 hour time (i.e. 1 - 12)
*/
function getNonMilHours ()
{
	if (this.getTime() == 0)
		return 0;
		
	var hours = this.getHours();
	if (hours > 11)
		hours -= 12;
	if (hours == 0)
		hours = 12;
		
	return hours;
}

/*
** PadLeft()
** Function to assist in dissect returning rray of BDO Labels
*/
function PadLeft(prefix, num)
{
	var temp = '';
	if (num < 10) temp = prefix + '000' + num;
	else if (num < 100) temp = prefix + '00' + num;
	else if (num < 1000) temp = prefix + '0' + num;
	else if (num < 10000) temp = prefix + num;
	return temp;
}

/******************************************************************
Function saveRowChanges(items) - requires items array to be passed in.
	will save all values to existing rows.  The only requirement is
	that the form values should be named service_<ID>_<Fieldname>.
		ex. service_112_Name
*******************************************************************/
function saveRowChanges(items)
{
		for(var i=0;i<items.length;i++)
		{
			var serviceID = items[i].ID;
				
			var tmp ="service_"+serviceID+"_Name";
			var serviceName= doAction('REQ_GET_FORMVALUE',tmp,tmp);
				
			var tmp ="service_"+serviceID+"_NameID";
			var serviceNameID= doAction('REQ_GET_FORMVALUE',tmp,tmp);
				
			var tmp ="service_"+serviceID+"_Description";
			var serviceDescription = doAction('REQ_GET_FORMVALUE',tmp,tmp);
				
			var tmp ="service_"+serviceID+"_DescriptionID";
			var serviceDescriptionID = doAction('REQ_GET_FORMVALUE',tmp,tmp);
				
			var tmp ="service_"+serviceID+"_Duration";
			var serviceDuration= doAction('REQ_GET_FORMVALUE',tmp,tmp);
			if (!serviceDuration)
				serviceDuration = "0";
				
			var tmp ="service_"+serviceID+"_Price";
			var servicePrice= doAction('REQ_GET_FORMVALUE',tmp,tmp);
			if (!servicePrice)
				servicePrice = "0";
				
			//writebr(serviceID, ' ',serviceName,'-',serviceNameID, ' ', serviceDescription, '-',serviceDescriptionID, ' ',serviceDuration, '-',servicePrice);
				
			var input = GetBDO('Locale', g_prefBrowserLocale, 'Type', 1);
			input.Name = serviceName;
			input.NameID = serviceNameID;
			input.Description = serviceDescription;
			input.Duration = serviceDuration;
			input.Price = servicePrice;
			input.ItemID = serviceID;
			input.DescriptionID = serviceDescriptionID;
				
				
			var output = GetBDO();
			var status = ProcessRequest('ITEM_MODIFY', input, output);
			if (status !=0)
				return -1; //problem with saving
			//writebr('save status: ', status);
				
		}
	return 0;
}
/******************************************************************
Function saveNewRow() - saves new row to the Db. Requirement: the 
	form values should follow service<fieldname>. Ex. "serviceName"
*******************************************************************/
function saveNewRow(name)
{		
		var serviceName = name;
		var tmp ="newDescription";
		var serviceDescription = doAction('REQ_GET_FORMVALUE',tmp,tmp);
							
		var tmp ="newDuration";
		var serviceDuration= doAction('REQ_GET_FORMVALUE',tmp,tmp);
		if (!serviceDuration)
			serviceDuration = "0";
				
		var tmp ="newPrice";
		var servicePrice= doAction('REQ_GET_FORMVALUE',tmp,tmp);
		if (!servicePrice)
			servicePrice = "0";
				
		//writebr(serviceName,'-',serviceNameID, ' ', serviceDescription, '-',serviceDescriptionID, ' ',serviceDuration, '-',servicePrice);
				
		var newinput = GetBDO('Locale', g_prefBrowserLocale, 'Type', 1);
		newinput.Name = serviceName.toString();
		newinput.Description = serviceDescription.toString();
		newinput.Duration = parseFloat(serviceDuration);
		newinput.Price = parseFloat(servicePrice);
				
		newinput.Key = newinput.Name; // set SKU to equal name...
		//newinput["Key"] = "mynewkey";
				
		newinput.PictureFile="none.jpg";
		newinput.PricePrecision=g_PRICEPRECISION;
		newinput.PriceType=0;
		newinput.Cost=0;
		newinput.TAX_CATEGORY_NODE_ID=201;
		newinput.FractQty=1;
							
		var output = GetBDO();
		var status = ProcessRequest('ITEM_ADD', newinput, output);
		//writebr('save status: ', status);
		return (status == 0)? 0:-1;
}			
/******************************************************************
Function deleteServiceRow() - generates HTML for new row flaggin the new 
	entries with a prefix of 'new' rather than 'item_'.
*******************************************************************/
function deleteServiceRow(deleteMeID)
{
	var output = GetBDO();
	if (deleteMeID > 0) // deleteID could be 0 if 'New' was passed in
	{
		return ProcessRequest('ITEM_DELETE', 'ItemID', deleteMeID, output);
		//writebr('delete status: ', status);
	}
	return -1; //deleteMeID was not a positive int
			
}			
/******************************************************************
Function addNewRow() - generates HTML for new row flaggin the new 
	entries with a prefix of 'new' rather than 'item_'.
*******************************************************************/
function addNewRowHTML()
{
	writeln('<tr>');
	//write Name row
	writeln('<td width="26%" height="36"><span class="general-label">\
		\n<input type="text" name="newName" size="24" maxlength="40" value="">\
		\n</span></td>');
	//write Description row
	writeln('<td width="26%" height="36"> \
			\n<div align="center"><span class="general-label"> \
			\n<input type="text" name="newDescription" size="24" maxlength="100" value="">\
			\n</span></div></td>');
	//write Duration
	writeln('<td width="18%" height="36"> \
			\n<div align="center"><span class="general-label"> \
			\n<input type="text" name="newDuration" size="8" maxlength="8" value="">\
			\n</span> </div>\
			\n</td>');
	//write Price
	writeln('<td width="11%"> \
			\n<div align="center"><span class="general-label"> \
			\n <input type="text" name="newPrice" size="8" maxlength="8" value="">\
			\n </span></div>\
			\n</td>');
	//write delete column
	writeln('<td width="19%" nowrap height="36"> \
			 \n<div align="center"><a href="javascript:deleteService(\'New\',\'\');"><img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/btnbsm_delete.gif" width="60" height="19" border="0"></a></div>\
			 \n</td>');
	writeln('\n</tr>');
}
/******************************************************************
Function readServiceItems(SortByName) - reads the Services from the db, returning the
	items array of BDOs. Will sort by fieldname passed in.
*******************************************************************/
function readServiceItems(SortBy)
{
	if (SortBy == 'Name')
		var input = GetBDO('Locale', g_prefBrowserLocale, 'Sort', SortBy , 'Type', 1);
	else
		var input = GetBDO('Locale', g_prefBrowserLocale, 'Type', 1);

	var output = GetBDO();
	var status = ProcessRequest('ITEM_GETALLITEMS', input, output);

	var items = output.GetValues(output.GetLabels('Item')); // this is the items array w/no fields
	return items;
}
/******************************************************************
Function generateServiceHTML(items) - generates HTML for existing rows naming
	the form values service_<ID>_<FieldName>.
*******************************************************************/
function generateServiceHTML(items)
{
	for (var i = 0; i < items.length; i++)
	{
		if (items[i].ID && items[i].Name)
		{
			var allfields = GetBDO();
			var input = GetBDO('Locale', g_prefBrowserLocale, 'ItemID', parseInt(items[i].ID, 10));
			var status = ProcessRequest('ITEM_GETALLFIELDS', input, allfields);
			//writebr('ID=', items[i].ID, ' Type=', items[i].Type, ', Name=', items[i].Name);
				
			//writebr(allfields.GetLabels());
			//writebr('Name:', allfields.Name,' Duration:', allfields.Duration, ' Description:', allfields.Description, ' Price:',allfields.Price);
			writeln('<tr>');
			//write Name row
			writeln('<td width="26%" height="36"><span class="general-label">\
				\n<input type="text" name="service_',allfields.ID,'_Name" size="24" maxlength="40" value="',allfields.Name , '">\
				\n<input type="hidden" name="service_',allfields.ID,'_NameID" value="',allfields.NameID, '"></span></td>');
			//write Description row
			writeln('<td width="26%" height="36"> \
				\n<div align="center"><span class="general-label"> \
				\n<input type="text" name="service_',allfields.ID,'_Description" size="24" maxlength="100" value="',allfields.Description,'">\
				\n<input type="hidden" name="service_',allfields.ID,'_DescriptionID" value="',allfields.DescriptionID, '"></span></div></td>');
			//write Duration
			writeln('<td width="18%" height="36"> \
				\n<div align="center"><span class="general-label"> \
				\n<input type="text" name="service_',allfields.ID,'_Duration" size="8" maxlength="8" value="',formatDouble(allfields.Duration, gPRECISION),'">\
				\n</span> </div>\
				\n</td>');
			//write Price
			writeln('<td width="11%"> \
				\n<div align="center"><span class="general-label"> \
				\n<input type="text" name="service_',allfields.ID,'_Price" size="8" maxlength="8" value="',formatDouble(allfields.Price, gPRECISION),'">\
				\n</span></div>\
				\n</td>');
			//write delete column
			writeln('<td width="19%" nowrap height="36"> \
				\n<div align="center"><a href="javascript:void(deleteService(',allfields.ID,',\'',allfields.Name,'\'));"><img src="/cgi-docs/Mercantec/PC_F_6.6.1/images/btnbsm_delete.gif" width="60" height="19" border="0"></a></div>\
				\n</td>');
			writeln('\n</tr>');
			//*/
		}
	}
}



/***************************************************************************
Function GetDailyHours() - Retrieves Daily Hours from database
***************************************************************************/
// Initialize Schedule
var theOpenSchedule = new Array();
var theUnavailSchedule = new Array();
var openScheduleCount=0;
var unavailScheduleCount=0;

function GetDailyHours()
{
	var resultBDO = doActionBDO('SVC_GET_DAILY_HOURS');
	//writebr("Daily Hour resultBDO.Count=" + resultBDO.Count);

	for (var i=0; i < days.length; i++)
	{
		theOpenSchedule[shortDays[i]] = new TimeSlot("-1",shortDays[i],"8","00","AM","5","00","PM","N","O");
		theUnavailSchedule[shortDays[i]] = new TimeSlot("-1",shortDays[i],"0","0","PM","0","00","PM","N","U");
		//writebr("Creating timeslot for " + shortDays[i]);
	}

	// Now set needed values
	if (resultBDO.Count)
	{
		var BDORows = resultBDO.GetLabels('TIMESLOT');
		BDORows.sort();
		for (var i = 0; i < BDORows.length; i++)
		{
			var timeSlotBDO = eval("resultBDO." + PadLeft('TIMESLOT',i+1));
			if (timeSlotBDO && timeSlotBDO.Day)
			{
				if (timeSlotBDO.OpenState == 'U')
				{
					theUnavailSchedule[timeSlotBDO.Day].startDateObj = timeSlotBDO.DATETIME_START;
					theUnavailSchedule[timeSlotBDO.Day].endDateObj = timeSlotBDO.DATETIME_END;
					theUnavailSchedule[timeSlotBDO.Day].ID = timeSlotBDO.ID;
					theUnavailSchedule[timeSlotBDO.Day].OpenHour = timeSlotBDO.DATETIME_START.getNonMilHours();
					theUnavailSchedule[timeSlotBDO.Day].OpenMin = timeSlotBDO.DATETIME_START.getMinutes();
					theUnavailSchedule[timeSlotBDO.Day].OpenAMPM = timeSlotBDO.DATETIME_START.getAmPm();
					theUnavailSchedule[timeSlotBDO.Day].CloseHour = timeSlotBDO.DATETIME_END.getNonMilHours();
					theUnavailSchedule[timeSlotBDO.Day].CloseMin = timeSlotBDO.DATETIME_END.getMinutes();
					theUnavailSchedule[timeSlotBDO.Day].CloseAMPM = timeSlotBDO.DATETIME_END.getAmPm();
					theUnavailSchedule[timeSlotBDO.Day].AllDay = timeSlotBDO.Allday;
					theUnavailSchedule[timeSlotBDO.Day].State = timeSlotBDO.OpenState;
					unavailScheduleCount++;
				}
				else
				{
					theOpenSchedule[timeSlotBDO.Day].startDateObj = timeSlotBDO.DATETIME_START;
					theOpenSchedule[timeSlotBDO.Day].endDateObj = timeSlotBDO.DATETIME_END;
					theOpenSchedule[timeSlotBDO.Day].ID = timeSlotBDO.ID;
					theOpenSchedule[timeSlotBDO.Day].OpenHour = timeSlotBDO.DATETIME_START.getNonMilHours()
					theOpenSchedule[timeSlotBDO.Day].OpenMin = timeSlotBDO.DATETIME_START.getMinutes();
					theOpenSchedule[timeSlotBDO.Day].OpenAMPM = timeSlotBDO.DATETIME_START.getAmPm();
					theOpenSchedule[timeSlotBDO.Day].CloseHour = timeSlotBDO.DATETIME_END.getNonMilHours();
					theOpenSchedule[timeSlotBDO.Day].CloseMin = timeSlotBDO.DATETIME_END.getMinutes();
					theOpenSchedule[timeSlotBDO.Day].CloseAMPM = timeSlotBDO.DATETIME_END.getAmPm();
					theOpenSchedule[timeSlotBDO.Day].AllDay = timeSlotBDO.Allday;
					theOpenSchedule[timeSlotBDO.Day].State = timeSlotBDO.OpenState;
					openScheduleCount++;
				}
				//writebr("ID=",timeSlotBDO.ID," ",timeSlotBDO.Day," ",timeSlotBDO.StartHour,":",timeSlotBDO.StartMin,timeSlotBDO.StartAMPM," ",timeSlotBDO.EndHour,":",timeSlotBDO.EndMin,timeSlotBDO.EndAMPM," alldayFlag=",timeSlotBDO.Allday,", OpenState=",timeSlotBDO.OpenState);
			}
		}
	}
}

/***************************************************************************
Function SaveDailyHours() - Saves input from the Set Daily Hours HTML screen
***************************************************************************/
function SaveDailyHours()
{

	var IDValues = doAction('REQ_GET_FORMVALUE', 'open_array', 'open_array');
	var theOpenScheduleIDs = new Array(); 
	var numOpenIDs=0;
	if (IDValues.length > 0)
	{
		var temp="";
		for (var i=0; i < IDValues.length; i++)
		{
			var c = IDValues.charAt(i);
			if (c == ",")
			{
				theOpenScheduleIDs[numOpenIDs] = temp;
				numOpenIDs++;
				temp = "";
			}
			else
				temp = temp + c;
		}
		// Capture last value in the string
		theOpenScheduleIDs[numOpenIDs] = temp;
		numOpenIDs++;
	}

	var IDValues = doAction('REQ_GET_FORMVALUE', 'unavail_array', 'unavail_array');
	var theUnavailScheduleIDs = new Array(); 
	var numUnavailIDs=0;
	if (IDValues.length > 0)
	{
		var temp="";
		for (var i=0; i < IDValues.length; i++)
		{
			var c = IDValues.charAt(i);
			
			if (c == ",")
			{
				theUnavailScheduleIDs[numUnavailIDs] = temp;
				numUnavailIDs++;
				temp = "";
			}
			else
				temp = temp + c;
		}
		// Capture last value in the string
		theUnavailScheduleIDs[numUnavailIDs] = temp;
		numUnavailIDs++;
	}

/*
	for (var i=0; i < numOpenIDs; i++)
		writebr("OpenIDArrayValues: " + theOpenScheduleIDs[i]);

	for (var i=0; i < numUnavailIDs; i++)
		writebr("UnavailableIDArrayValues: " + theUnavailScheduleIDs[i]);
*/
	var ReverseClosedFlag = doAction('REQ_GET_FORMVALUE', 'reverse_closed_flag', 'reverse_closed_flag');
	var lookupValue ="";
	for (var i=0; i < shortDays.length; i++)
	{
		lookupValue = "closed_24_" + shortDays[i];
		var allDayFlag = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);

		if (allDayFlag) {}
		else
			allDayFlag = 'O';

		lookupValue = "open_hours_" + shortDays[i];
		var startHour = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
		if (startHour) 
		{
			if (startHour == ' ')
				starthour = '8';
		}
		else
			startHour = "8";

		var lookupValue = "open_minutes_" + shortDays[i];
		var startMin = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
		if (startMin) {}
		else
			startMin = "00";

		var lookupValue = "open_ampm_" + shortDays[i];
		var startAMPM = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
		if (startAMPM) {}
		else
			startAMPM = "AM";

		lookupValue = "closed_hours_" + shortDays[i];
		var stopHour = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
		if (stopHour) 
		{
			if (stopHour == ' ')
				stopHour = '5';
		}
		else
			stopHour = "5";

		lookupValue = "closed_minutes_" + shortDays[i];
		var stopMin = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
		if (stopMin)
		{
			if (stopMin == ' ')
				stopMin = '00';
		}
		else
			stopMin = "00";


		lookupValue = "closed_ampm_" + shortDays[i];
		var stopAMPM = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
		if (stopAMPM) {}
		else
			stopAMPM = "AM";


//write( "Day=" , shortDays[i] , " startingtime= ", startHour, ":", startMin, startAMPM, "  closingtime= ", stopHour, ":", stopMin, stopAMPM, " ----------");


		if (ReverseClosedFlag)
		{
			if (allDayFlag == 'Y')
				allDayFlag = 'N';
			else
				allDayFlag = 'Y';
		}

		if (allDayFlag == 'Y')
		{
			startHour = '0';
			startMin = '00';
			startAMPM = 'AM';
			stopHour = '0';
			unavailToMin = '00';
			stopAMPM = 'PM';
			var openState='C';
		}
		else
			var openState='O';

		if (theOpenScheduleIDs[i] != '-1') // ie already in the database
		{
			//writebr("TYPE=STANDARD OPEN/CLOSE   Calling with UPDATE!!!");
			var result = doActionEx('SVC_SET_DAILY_HOURS', 'Success', 'Mode', 'Update', 'DAY', shortDays[i], 'OPEN_STATE', openState,
						'START_HOUR', startHour, 'START_MIN', startMin, 'START_AMPM', startAMPM,
						'END_HOUR', stopHour, 'END_MIN', stopMin, 'END_AMPM', stopAMPM,
						'ALLDAY', allDayFlag, 'ID', parseInt(theOpenScheduleIDs[i]));
		}
		else
		{
			//writebr("TYPE=STANDARD OPEN/CLOSE   Calling with Insert!!!");
			var result = doActionEx('SVC_SET_DAILY_HOURS', 'Success', 'Mode', 'Insert', 'DAY', shortDays[i], 'OPEN_STATE', openState,
						'START_HOUR', startHour, 'START_MIN', startMin, 'START_AMPM', startAMPM,
						'END_HOUR', stopHour, 'END_MIN', stopMin, 'END_AMPM', stopAMPM,
						'ALLDAY', allDayFlag, 'ID', 0);
		}

		/*
		** Now take action on the unavailable slots.
		*/
		lookupValue = "unavail_from_hours_" + shortDays[i];
		var unavailFromHour = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
		if (unavailFromHour)
		{
			if (unavailFromHour == ' ')
				unavailFromHour = '0';
		}
		else
			unavailFromHour = "0";

		lookupValue = "unavail_from_minutes_" + shortDays[i];
		var unavailFromMin = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
		if (unavailFromMin) 
		{
			if (unavailFromMin == ' ')
				unavailFromMin = '00';
		}
		else
			unavailFromMin = "00";

		lookupValue = "unavail_from_ampm_" + shortDays[i];
		var unavailFromAMPM = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
		if (unavailFromAMPM) {}
		else
			unavailFromAMPM = "PM";

		var lookupValue = "unavail_to_hours_" + shortDays[i];
		var unavailToHour = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
		if (unavailToHour)
		{
			if (unavailToHour == ' ')
				unavailToHour = '0';
		}
		else
			unavailToHour = "0";

		var lookupValue = "unavail_to_minutes_" + shortDays[i];
		var unavailToMin = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
		if (unavailToMin)
		{
			if (unavailToMin == ' ')
				unavailToMin = '00';
		}
		else
			unavailToMin = "00";

		lookupValue = "unavail_to_ampm_" + shortDays[i];
		var unavailToAMPM = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
		if (unavailToAMPM) {}
		else
			unavailToAMPM = "PM";

//writebr( "&nbsp; &nbsp;  UNAVAILABLE FROM ", unavailFromHour,":",unavailFromMin,unavailFromAMPM, " to ", unavailToHour, ":", unavailToMin, unavailToAMPM);

		if (allDayFlag == 'Y')
		{
			unavailFromHour = '0';
			unavailFromMin = '00';
			unavailFromAMPM = 'AM';
			unavailToHour = '0';
			unavailToMin = '00';
			unavailToAMPM = 'PM';
		}

		if (theUnavailScheduleIDs[i] != '-1') // ie already in the database
		{
			//writebr("Calling with UPDATE!!!");
			var result = doActionEx('SVC_SET_DAILY_HOURS', 'Success', 'Mode', 'Update', 'DAY', shortDays[i], 'OPEN_STATE', 'U',
						'START_HOUR', unavailFromHour, 'START_MIN', unavailFromMin, 'START_AMPM', unavailFromAMPM,
						'END_HOUR', unavailToHour, 'END_MIN', unavailToMin, 'END_AMPM', unavailToAMPM,
						'ALLDAY', allDayFlag, 'ID', parseInt(theUnavailScheduleIDs[i]));
		}
		else
		{
			//writebr("Calling with INSERT!!!");
			var result = doActionEx('SVC_SET_DAILY_HOURS', 'Success', 'Mode', 'Insert', 'DAY', shortDays[i], 'OPEN_STATE', 'U',
						'START_HOUR', unavailFromHour, 'START_MIN', unavailFromMin, 'START_AMPM', unavailFromAMPM,
						'END_HOUR', unavailToHour, 'END_MIN', unavailToMin, 'END_AMPM', unavailToAMPM,
						'ALLDAY', allDayFlag, 'ID', 0);
		}
	}

}

/***************************************************************************
Function Set24Hours() - Saves input from the Set Daily Hours HTML screen
***************************************************************************/
function Set24Hours()
{
	ClearDailyHours();

	for (var i=0; i < shortDays.length; i++)
	{
		var result = doActionEx('SVC_SET_DAILY_HOURS', 'Success', 'Mode', 'Insert', 'DAY', shortDays[i], 'OPEN_STATE', 'O',
						'START_HOUR', '12', 'START_MIN', '00', 'START_AMPM', 'AM',
						'END_HOUR', '12', 'END_MIN', '00', 'END_AMPM', 'AM',
						'ALLDAY', 'N', 'ID', 0);

		var result = doActionEx('SVC_SET_DAILY_HOURS', 'Success', 'Mode', 'Insert', 'DAY', shortDays[i], 'OPEN_STATE', 'U',
						'START_HOUR', '0', 'START_MIN', '00', 'START_AMPM', 'AM',
						'END_HOUR', '0', 'END_MIN', '00', 'END_AMPM', 'AM',
						'ALLDAY', 'N', 'ID', 0);
	}

}

/***************************************************************************
Function ClearDailyHours() - Saves input from the Set Daily Hours HTML screen
***************************************************************************/
function ClearDailyHours()
{
	var resultBDO = doActionBDO("DATA_OPENQUERY","ObjectName", "SERV_AVAILABILITY", "Filter", "TYPE = 'D'", "Delete", true);
	var closeConn = doAction("DATA_CLOSEQUERY", "QueryID", resultBDO.QueryID, "ObjectName", "SERV_AVAILABILITY");

}

/***********************************************************************************
** Function apptObjSortByTime (a, b):
**		compares 2 'Appointment' objects by time (not date) and returns <0 if 
**		'a' is before 'b', 0 if they are the same, and >0 if 'a' is later than 'b'
***********************************************************************************/
function apptObjSortByTime (a, b)
{
	if (a.StartAMPM.toLowerCase() == b.StartAMPM.toLowerCase())
	{
		if (a.StartHour == b.StartHour)
			return (a.StartMin - b.StartMin);
		else
			return (a.StartHour - b.StartHour);
	}
	return ((a.StartAMPM.toLowerCase() == "am" ? -1 : 1));
}

/***************************************************************************
Function loadAppointments() - loads the Appointmsnts for a given Date
***************************************************************************/
function loadAppointments(dateString)
{
	var AppointmentList = new Array();

	var resultBDO = doActionBDO('SVC_GET_APPOINTMENTS', 'Date', dateString);
	//writebr("resultBDO.Count=" + resultBDO.Count);

	local_AppointmentCount= resultBDO.Count;
	for (var i=0; i < local_AppointmentCount; i++)
		AppointmentList[i] = new Appointment(i, "-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-");

	// Now set needed values
	if (resultBDO.Count)
	{
		var BDORows = resultBDO.GetLabels('APPT');
		BDORows.sort();

		for (var i = 0; i < BDORows.length; i++)
		{
			var apptBDO = eval("resultBDO." + PadLeft('APPT',i+1));
			if (apptBDO)
			{
				AppointmentList[i].ID = apptBDO.ID;
				AppointmentList[i].ServiceID = apptBDO.ServiceID;
				AppointmentList[i].Status = apptBDO.Status;
				AppointmentList[i].ApptDate = apptBDO.ApptDate;
				AppointmentList[i].StartHour = apptBDO.StartHour;
				AppointmentList[i].StartMin = apptBDO.StartMin;
				AppointmentList[i].StartAMPM = apptBDO.StartAMPM;
				AppointmentList[i].Duration = apptBDO.Duration;
				AppointmentList[i].Name = apptBDO.Name;
				AppointmentList[i].Address1 = apptBDO.Address1;
				AppointmentList[i].Address2 = apptBDO.Address2;
				AppointmentList[i].City = apptBDO.City;
				AppointmentList[i].State = apptBDO.State;
				AppointmentList[i].Zip = apptBDO.Zip;
				AppointmentList[i].Email = apptBDO.Email;
				AppointmentList[i].Phone = apptBDO.Phone;
				AppointmentList[i].Comments = apptBDO.Comments;

//write("id=",apptBDO.ID," ServiceID=",apptBDO.ServiceID," Status=",apptBDO.Status," Date=",apptBDO.ApptDate," StartHour=",apptBDO.StartHour,":",apptBDO.StartMin,apptBDO.StartAMPM," Dur=",apptBDO.Duration);
//writebr("  Name=",apptBDO.Name," Ad1=",apptBDO.Address1," 2=",apptBDO.Address2," City=",apptBDO.City," state=",apptBDO.State," zip=",apptBDO.Zip);

			}
		}
	}
	AppointmentList.sort(apptObjSortByTime);
	return AppointmentList;
}

/***************************************************************************
Function getAppointmentListCount() - returns the count set by loadAppointments
***************************************************************************/
function getAppointmentListCount()
{
	return local_AppointmentCount;
}


/*
** function makeAppt() will search for submit values and use them to
** add an entry into the SERVICES_APPOINTMENT table
*/
function makeAppointment()
{

	var startHour = doAction('REQ_GET_FORMVALUE', 'hour', 'hour');
	if (startHour) 
	{
		if (startHour == ' ')
			starthour = '8';
	}
	else
		startHour = "8";

	var startMin = doAction('REQ_GET_FORMVALUE', 'minutes', 'minutes');
	if (startMin) {}
	else
		startMin = "00";

	var startAMPM = doAction('REQ_GET_FORMVALUE', 'ampm', 'ampm');
	if (startAMPM) {}
	else
		startAMPM = "AM";

	var apptDate = doAction('REQ_GET_FORMVALUE', 'date', 'date');
	var serviceID = doAction('REQ_GET_FORMVALUE', 'service_id', 'service_id');
	var name = doAction('REQ_GET_FORMVALUE', 'name', 'name');

	var duration = doAction('REQ_GET_FORMVALUE', 'duration', 'duration');
	if (duration) {}
	else
		duration = "-";

	var address1 = doAction('REQ_GET_FORMVALUE', 'address1', 'address1');
	if (address1) {}
	else
		address1 = "-";

	var phone = doAction('REQ_GET_FORMVALUE', 'phone', 'phone');
	if (phone) {}
	else
		phone = "-";

	var email = doAction('REQ_GET_FORMVALUE', 'email', 'email');
	if (email) {}
	else
		email = "-";

	var comments = doAction('REQ_GET_FORMVALUE', 'comments', 'comments');
	if (comments) {}
	else
		comments = "-";

	var AppointmentID = doAction('REQ_GET_FORMVALUE', 'id', 'id');

	var merchantViewer = doAction('REQ_GET_FORMVALUE', 'AppID', 'AppID');
	if (merchantViewer && merchantViewer == "merchant")
		var apptStatus = ID_S_APPROVED;
	else
		var apptStatus = ID_S_NEEDS_APPROVAL;

	
//writebr("Calling with Insert!!!!");
//writebr("Sending date=|", apptDate, "| duration=", duration, ", Time=", startHour, ":", startMin, startAMPM,", SeviceID=", serviceID);
//writebr("name=",name, ",address=", address1, ",phone=", phone, ",email=", email, ", comments=", comments);

	// Get the date formatted to #seconds since 1970...
	var nYear = doAction('REQ_GET_FORMVALUE', 'val1', 'val1');
	var nMonth = doAction('REQ_GET_FORMVALUE', 'val2', 'val2');
	var nDate = doAction('REQ_GET_FORMVALUE', 'val3', 'val3');

	var temp='';
	if (nYear && nMonth && nDate)
	{
		temp = nYear + ", " + months[nMonth] + ", " + nDate;
		temp = new Date(temp);
		var date_ss = temp.getTime() / 1000;
	}
	else
		var date_ss = "-";

//writebr("Date_ss string=|" + date_ss + "|");
var useHour = parseInt(startHour);
var useMinute = parseInt(startMin);
var useDuration = parseFloat(duration);
if(isNaN(useDuration))
	useDuration = 0;
if (useHour == 12)
	useHour = 0;
if (startAMPM.toLowerCase() == "pm")
	useHour += 12;
	
var startApptDate = new Date(nYear, nMonth, nDate, useHour, useMinute, 0);
var endApptDate = new Date(startApptDate.getTime() + (useDuration * 3600000));
var errMsg = validateAppt (startApptDate, endApptDate);
if (errMsg.length > 0)
	return ("Appointment Rejected:  Reason = " + errMsg);

	if (AppointmentID)
	{
//writeln("AppointmentID = " + AppointmentID);

		var resultBDO = doActionBDO('SVC_SET_APPOINTMENTS', 'Mode', 'Update', 'ID', parseInt(AppointmentID), 'StartHour', startHour, 'StartMin', startMin,
							'StartAMPM', startAMPM, 'Duration', duration, 'ServiceID', parseInt(serviceID), 'Name', name, 'Address1', address1,
							'Phone', phone, 'Email', email, 'Comments', comments, 'ApptDate', apptDate, 'Status', apptStatus,
							'Address2', '-', 'City', '-', 'State', '-', 'Zip', '-', 'Date_ss', date_ss.toString());
	}
	else
	{
//writeln("Calling INSERT MODE, AppointmentID = " + AppointmentID);

		var resultBDO = doActionBDO('SVC_SET_APPOINTMENTS', 'Mode', 'Insert', 'StartHour', startHour, 'StartMin', startMin,
							'StartAMPM', startAMPM, 'Duration', duration, 'ServiceID', parseInt(serviceID), 'Name', name, 'Address1', address1,
							'Phone', phone, 'Email', email, 'Comments', comments, 'ApptDate', apptDate, 'Status', ID_S_APPROVED,
							'Address2', '-', 'City', '-', 'State', '-', 'Zip', '-', 'Date_ss', date_ss.toString());

		// Only raise the ON_SERVICE_REQUEST event if the appointment is new
		if (resultBDO.Success)
			doAction('ON_SERVICE_REQUEST', 'OrderID', parseInt(resultBDO.ID));

	}
	return "";
}

function acceptAppointment()
{
	var theID = doAction('REQ_GET_FORMVALUE', 'appt_id', 'appt_id');
	if (theID && theID > 0)
	{
		var result = doActionEx('SVC_CHANGE_APPT_STATUS', 'Success', 'ID', parseInt(theID), 'Status', ID_S_APPROVED);
		if (result == true)
			doAction('ON_SERVICE_ACCEPTED', 'OrderID', parseInt(theID));
	}
}

function rejectAppointment()
{
	var theID = doAction('REQ_GET_FORMVALUE', 'appt_id', 'appt_id');
	if (theID && theID > 0)
	{
		doAction('ON_SERVICE_REJECTED', 'OrderID', parseInt(theID));
		var result = doActionEx('SVC_DEL_APPOINTMENT', 'Success', 'ID', parseInt(theID));
	}
}


function cancelAppointment()
{
	var theID = doAction('REQ_GET_FORMVALUE', 'appt_id', 'appt_id');
	if (theID && theID > 0)
	{
		doAction('ON_SERVICE_CANCELED', 'OrderID', parseInt(theID));
		var result = doActionEx('SVC_DEL_APPOINTMENT', 'Success', 'ID', parseInt(theID));
	}
}


