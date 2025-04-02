/***************************************************************************
This file contains a hodge podge of global variables and functions.
It contians all the necessary code for pages which need to display a calendar,
such as the scheduling pages.

Most functions in here are merely javascript class definitions, with the
exception of GetCalenday(x,y);
***************************************************************************/

	var incJsFile = doActionEx('DATA_READFILE','ServicesLib.js', 'FileName', 'ServicesLib.js','ObjectName','Site','FileType','txt');
	eval (incJsFile);

	var g_prefBrowserLocale = "en";

	Array.prototype.addlink = addlink;
	//var linkdays = new Array();

	// Check Today's values
	var bClosedToday = true;
	var todayDate=new Date();
	var TodaysMonth= todayDate.getMonth();
	var TodaysDate = todayDate.getDate();
	var TodaysYear = todayDate.getYear();
	TodaysYear = TodaysYear % 100;
	TodaysYear = ((TodaysYear < 50) ? (2000 + TodaysYear) : (1900 + TodaysYear));
	var TodaysDayofWeek=todayDate.getDay();
	var TodaysDateString = days[TodaysDayofWeek] + ", " + months[TodaysMonth] + " " + TodaysDate+", " + TodaysYear;

	var DisplayYear = doAction('REQ_GET_FORMVALUE', "val1", "val1");
	var DisplayMonth = doAction('REQ_GET_FORMVALUE', "val2", "val2");
	var DisplayDay = doAction('REQ_GET_FORMVALUE', "val3", "val3");
	var DisplayDayofWeek = doAction('REQ_GET_FORMVALUE', "val4", "val4");

	if (DisplayYear) {}
	else
		var DisplayYear = TodaysYear;

	if (DisplayMonth) {}
	else
		var DisplayMonth = TodaysMonth;

	if (DisplayDay) {}
	else
		var DisplayDay = TodaysDate;

	if (DisplayDayofWeek) {}
	else
		var DisplayDayofWeek = TodaysDayofWeek;

//writebr("DisplayYear=", DisplayYear, " DisplayMonth=", DisplayMonth, " DisplayDay=", DisplayDay, "DisplayDayofWeek=", DisplayDayofWeek);
//writebr("TodaysYear=", TodaysYear, " TodaysMonth=", TodaysMonth, " TodaysDate=", TodaysDate, "TodaysDayofWeek=", TodaysDayofWeek);

	var DisplayDateString = days[DisplayDayofWeek] + ", " + months[DisplayMonth] + " " + DisplayDay+", " + DisplayYear;

	function addlink(month, day, href) 
	{
		var entry = new Array(3);
		entry[0] = month;
		entry[1] = day;
		entry[2] = href;
		this[count++] = entry;
	}

	function weeklyTimeSlot(closed)
	{
		this.Closed = closed
	}

	var resultBDO = doActionBDO('SVC_GET_DAILY_HOURS');
//writebr("Closed Days resultBDO.Count=" + resultBDO.Count);

	// Initialize Schedule
	var ClosedDays = new Array();
	var ClosedDaysCount=0;

	for (var i=0; i < shortDays.length; i++)
		ClosedDays[shortDays[i]] = new weeklyTimeSlot('NO');

	// Now set needed values
	if (resultBDO.Count)
	{
		var BDORows = resultBDO.GetLabels('TIMESLOT');
		BDORows.sort();

		for (var i = 0; i < BDORows.length; i++)
		{
			var timeSlotBDO = eval("resultBDO." + PadLeft('TIMESLOT',i+1));
			if (timeSlotBDO && timeSlotBDO.Day && timeSlotBDO.OpenState != 'U')
				ClosedDays[timeSlotBDO.Day].Closed = timeSlotBDO.Allday;
		}
	}
	
// create the special day schedule
GetSpecialDays ();

function GetCalendar(nMonth, nYear)
{
	var output="";
	var count=0;
	var thisday = 1;

	if (((nYear % 4 == 0) && !(nYear % 100 == 0)) || (nYear % 400 == 0))
		daysinmonth[1]++;

	// Set up the month to display
	var date = new Date(); // date
	date.setYear(nYear);
	date.setMonth(nMonth);
	date.setDate(thisday);


	var bFlagTodaysDate = (TodaysYear == nYear && TodaysMonth == nMonth);
	var bFlagDisplayDate = (DisplayYear == nYear && DisplayMonth == nMonth);

	//writebr("TodaysYear=" + TodaysYear + ", Month=" + TodaysMonth + ", today=" + TodaysDate + ", bFlagTodaysDate=" + bFlagTodaysDate); 

	startspaces=date.getDay();

	output = output + "<table border=3 bgcolor=#ffffcc bordercolor=darkgreen>\n";
	output = output + "<tr><td colspan=7><center><b>" + months[nMonth] + " " + nYear + "</b></center></font></td></tr>\n";
	output = output + "<tr bgcolor='cccccc'>\n";
	output = output + "<td align=center><font face='Arial' size=2>Su</td>\n";
	output = output + "<td align=center><font face='Arial' size=2>M</td>\n";

	output = output + "<td align=center><font face='Arial' size=2>Tu</td>\n";
	output = output + "<td align=center><font face='Arial' size=2>W</td>\n";
	output = output + "<td align=center><font face='Arial' size=2>Th</td>\n";
	output = output + "<td align=center><font face='Arial' size=2>F</td>\n";
	output = output + "<td align=center><font face='Arial' size=2>Sa</td>\n";
	output = output + "</tr>\n";

	var bClosed=false;
	var rowcount=0;
	count=1;
	while (count <= daysinmonth[nMonth]) 
	{
		output = output + "<tr>\n";
		if (count == 1)
		{
			for (var s=0; s < startspaces; s++) 
				output = output + "<td> </td>\n";
		}

		for (var b = startspaces; b < 7; b++) 
		{
			//linktrue=false;
			bClosed=false;
			if ((ClosedDays[shortDays[b]].Closed == 'Y') && count <= daysinmonth[nMonth])
				bClosed=true;
			else
				bClosed=false;

			// Check for special closed days if day isn't already a closed weekly day
			if (!bClosed)
			{
				var tmp = days[b] + ", " + months[nMonth] + " " + count + ", " + nYear;
				for (var c=0; c < ScheduleCount && !bClosed; c++)
					bClosed = (theSchedule[c].AllDay == "Y" && tmp == theSchedule[c].ClosedDate);
			}
			
							
			if (bClosed)
				output = output + "<td align='center' bgcolor='#CC6666'>";
			else
			if (bFlagDisplayDate && count==DisplayDay) 
			{
				output = output + "<td align='center' bgcolor='#33FF00'>";
				bClosedToday = false;
			}
			else
			if (count <= daysinmonth[nMonth])
				output = output + "<td align='center' bgcolor='#FFFFFF'>";
			else
				output = output + "<td align='center'>";

			if (count <= daysinmonth[nMonth]) 
				output = output + "<a STYLE='font-size:10pt;font-family:Arial;font-style:normal;color:#003399;text-decoration:none;' href='javascript:setGridPos(" + nMonth + "," + count + "," + nYear + ");'>" + count + "</a>";
			else 
				output = output + " ";

			output = output + "</td>\n";
			count++;
		}

		output = output + "</tr>\n";
		startspaces=0;
		rowcount++;
	}
	
	if (rowcount < 6)
		output = output + "<tr><td colspan=7> &nbsp </td></tr>\n";

	output = output + "</table>\n";
	return output;
}

var dispMonth1= doAction('REQ_GET_FORMVALUE', "month1", "month1");
var dispYear1= doAction('REQ_GET_FORMVALUE', "year1", "year1");

if (dispMonth1 && dispYear1)
{}
else
{
	// Check Today's values
	var todayDate=new Date();
	dispMonth1= todayDate.getMonth();
	dispYear1 = todayDate.getYear();
	dispYear1 = dispYear1 % 100;
	dispYear1 = ((dispYear1 < 50) ? (2000 + dispYear1) : (1900 + dispYear1));
}

dispMonth1 = parseInt(dispMonth1);
dispYear1 = parseInt(dispYear1);

// Check for possible incremental value passed in and check for end-of-year condition
if (dispMonth1 > 11)
{
	dispYear1++;
	dispMonth1=dispMonth1 - 12;
}
else
if (dispMonth1 < 0)
{
	dispYear1--;
	dispMonth1 = 12 + dispMonth1; 
}

// Set month2 to be the next sequential month and check for end-of-year condition
var dispYear2 = dispYear1;
var dispMonth2 = dispMonth1 + 1; 

if (dispMonth2 > 11)
{
	dispYear2++;
	dispMonth2=0;
}

