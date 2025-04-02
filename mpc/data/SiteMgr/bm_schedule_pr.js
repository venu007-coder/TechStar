<SCRIPT runat="merc_server">
// INITIALIZE THE LANGUAGE LOCALE TO ENGLISH, FOR NOW. WE WILL NEED TO READ 
// THE DEFAULT LOCALE FROM A CONFIG FILE LATER, BUT FOR NOW IT WILL BE HARD-CODED.
var default_locale = "en";

var theAction= doAction('REQ_GET_FORMVALUE', "action", "action");
var output="";
var months = new Array("January","February","March","April","May","June",
		"July","August","September","October","November","December");
var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');


if (theAction)
{
	
	switch (theAction)
	{
	
	case "ADD":
		var year = doAction('REQ_GET_FORMVALUE', "val1", "val1");
		var month = doAction('REQ_GET_FORMVALUE', "val2", "val2");
		var day = doAction('REQ_GET_FORMVALUE', "val3", "val3");
		var dayofWeek = doAction('REQ_GET_FORMVALUE', "val4", "val4");

		var result = doActionEx('SVC_SET_SPECIAL_CLOSED_HOURS', 'Success', 'Mode', 'Insert', 'DAY', days[dayofWeek], 'OPEN_STATE', 'S',
								'START_HOUR', '0', 'START_MIN', '00', 'START_AMPM', 'AM',
								'END_HOUR',   '0', 'END_MIN',   '00', 'END_AMPM',   'PM',
								'ALLDAY', 'Y', 'MONTH', month, 'YEAR', year, 'DATE', day);
		break;

	case "DEL":

		var id = doAction('REQ_GET_FORMVALUE', 'val1', 'val1');
		if (id)
			var result = doActionEx('SVC_DEL_SPECIAL_CLOSED_HOURS', 'Success', 'ID', parseInt(id));
		break;

	case "SAVE":

		var IDValues = doAction('REQ_GET_FORMVALUE', 'schedule_array', 'schedule_array');
		var theScheduleIDs = new Array(); 
		var numIDs=0;
		if (IDValues.length > 0)
		{
			var temp="";
			for (var i=0; i < IDValues.length; i++)
			{
				var c = IDValues.charAt(i);
				
				if (c == ",")
				{
					theScheduleIDs[numIDs] = temp;
					numIDs++;
					temp = "";
				}
				else
					temp = temp + c;
			}
			// Capture last value in the string
			theScheduleIDs[numIDs] = temp;
			numIDs++;
		}

		var lookupValue ="";
		for (var i=0; i < numIDs; i++)
		{
			lookupValue = "closed_allday_" + theScheduleIDs[i];
			var allDayFlag = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
			if (allDayFlag) {}
			else
				allDayFlag = 'N';

			var lookupValue = "start_hours_" + theScheduleIDs[i];
			var startHour = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
			if (startHour) 
			{
				if (startHour == ' ')
					starthour = '12';
			}
			else
				startHour = "0";

			var lookupValue = "start_minutes_" + theScheduleIDs[i];
			var startMin = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
			if (startMin) {}
			else
				startMin = "00";

			var lookupValue = "start_ampm_" + theScheduleIDs[i];
			var startAMPM = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
			if (startAMPM) {}
			else
				startAMPM = "AM";

			lookupValue = "stop_hours_" + theScheduleIDs[i];
			var stopHour = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
			if (stopHour)
			{
				if (stopHour == ' ')
					stophour = '12';
			}
			else
				stopHour = "0";

			lookupValue = "stop_minutes_" + theScheduleIDs[i];
			var stopMin = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
			if (stopMin) 
			{
				if (stopMin == ' ')
					stopMin = '00';
			}
			else
				stopMin = "00";

			lookupValue = "stop_ampm_" + theScheduleIDs[i];
			var stopAMPM = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
			if (stopAMPM) {}
			else
				stopAMPM = "AM";

			lookupValue = "year_" + theScheduleIDs[i];
			var year = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
			lookupValue = "month_" + theScheduleIDs[i];
			var month = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
			lookupValue = "date_" + theScheduleIDs[i];
			var day = doAction('REQ_GET_FORMVALUE', lookupValue, lookupValue);
			
			if (allDayFlag == "Y")
			{
				var result = doActionEx('SVC_SET_SPECIAL_CLOSED_HOURS', 'Success', 'Mode', 'Update', 'DAY', '-', 'OPEN_STATE', 'S',
								'START_HOUR', '0', 'START_MIN', '00', 'START_AMPM', 'AM',
								'END_HOUR', '0', 'END_MIN', '00', 'END_AMPM', 'PM',
								'ALLDAY', allDayFlag, 'ID', parseInt(theScheduleIDs[i]),
								'MONTH', month, 'YEAR', year, 'DATE', day);
			}
			else
			{
				var result = doActionEx('SVC_SET_SPECIAL_CLOSED_HOURS', 'Success', 'Mode', 'Update', 'DAY', '-', 'OPEN_STATE', 'S',
								'START_HOUR', startHour, 'START_MIN', startMin, 'START_AMPM', startAMPM,
								'END_HOUR', stopHour, 'END_MIN', stopMin, 'END_AMPM', stopAMPM,
								'ALLDAY', allDayFlag, 'ID', parseInt(theScheduleIDs[i]),
								'MONTH', month, 'YEAR', year, 'DATE', day);
			}
		}

		break;

	default:
		writeln("<html><body>No valid ActionID</body></html>");
		break;			
	}

	// Now retrieve next page to display.
	var file = "bm_schedule-unavailable.htm";
	var whichFile = doActionEx	('DATA_READFILE',file, 'FileName', file,'ObjectName','QuartzSite', 
				'FileType', 'txt');

	var output = output + doActionEx('PAR_PARSE_BUFFER','Result', 'document', whichFile);

	if (output && output.length)
		write(output);

}
else
{
	writeln("<html><body>No valid ActionID </body></html>");
}

</SCRIPT>
