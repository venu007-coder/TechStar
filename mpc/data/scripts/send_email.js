/*===================================================================
Name: send_email.js
Purpose: To be included in service pages needing to send email.
Author: Computer Innovations, modified by David Menagh
Date:	8/15/01

Last Modified: 

====================================================================*/



function GetFormValue(valName)
{
	var ret = doAction('REQ_GET_FORMVALUE', valName, valName);
	if (ret == undefined) return '';
	return ret;
}

function isValidEmailAddy(emailAddress, requireDot) // ensure an e-mail address is of valid form
{
	if (!emailAddress || !emailAddress.length) return false;
	if (!requireDot) requireDot = true;

	// if the value begins with '$$' assume its one of our tags and let them through
	if (emailAddress.indexOf("$$") == 0)
		return true;

	// the @ must be present, must have 1+ characters to its left and 2+ characters to its right
	var atSign = emailAddress.indexOf('@');
	if (atSign == -1 || atSign == 0 || atSign >= emailAddress.length - 2) return false;

	// there can be only one @
	if (emailAddress.replace(/@/g, '').length < emailAddress.length - 1) return false;

	// all characters are in the ranges A-Z, a-z, 0-9, .-_@
	var validChars = '@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-_';
	for (var i = 0; i < emailAddress.length; i++)
		if (validChars.indexOf(emailAddress.charAt(i)) == -1) return false;

	// a dot cannot be the first or last character of the domain
	if (emailAddress.charAt(atSign + 1) == '.') return false;
	if (emailAddress.charAt(emailAddress.length - 1) == '.') return false;

	// optionally, there must be at least one dot to the right of the @
	if (requireDot && emailAddress.indexOf('.', atSign) == -1) return false;
	return true;
}

// separate multiple addresses with commas or semicolons
function getAddressesAsArray(multipleAddresses)
{
	multipleAddresses = multipleAddresses.replace(/\s/g, '').replace(/;/g, ',');
	var tmp = multipleAddresses.split(',');

	var ret = new Array();
	for (var i = 0; i < tmp.length; i++) if (isValidEmailAddy(tmp[i])) ret.push(tmp[i]);
	return ret;
}

// wrap anything that looks kinda like a dotted quad in brackets: xx.xx.xx.xx --> [xx.xx.xx.xx]
function fixQuadMailHost(possibleDottedQuad)
{
	var numericChars = '0123456789';
	var str = possibleDottedQuad.toString();
	var dots = 0;

	for (var i = 0; i < str.length; i++)
	{
		if (str.charAt(i) == '.') dots++;
		else if (numericChars.indexOf(str.charAt(i)) == -1) return str;
	}

	if (dots != 3) return str;
	return '[' + str + ']';
}

function SendEmail()
{
	var recipients = getAddressesAsArray(GetFormValue('MailTo') + ',' + GetFormValue('BCC'));

	if (!recipients.length) return 'Nobody to send to';

	var from = GetFormValue('MailFrom');
	if (!isValidEmailAddy(from))
	{
		from = g_storeEmail;
		if (!isValidEmailAddy(from)) return 'Invalid From address';
	}

	var subj = GetFormValue('Subject');
	if (!subj.length)
	{
		subj = 'Mail for you';
		if (g_storeName != '') subj += ' from ' + g_storeName;
	}

	var msg = GetFormValue('Body') + '\n';

	var mailHost = doAction('DATA_GETLITERAL', 'ObjectName', 'storecfg', 'LiteralID', 'SITEMGR_SMTP_MAIL_SERVER');
	if (mailHost == undefined || mailHost == '' || mailHost == 'SITEMGR_SMTP_MAIL_SERVER') return 'Unable to determine SMTP server';
	var mailDomain = fixQuadMailHost(mailHost);

	var errors = new Array();
	for (var i = 0; i < recipients.length; i++)
	{
		var input = GetBDO('TO', recipients[i], 'FROM', from, 'SUBJECT', subj, 'MESSAGE', msg, 'MAILHOST', mailHost, 'DOMAIN', mailDomain);
		var output = GetBDO();
		var status = ProcessRequest('INU_WSTR_BASIC_EMAIL', input, output);
		if (status != MCERR_NOERROR)
			errors.push('Could not send to recipient "' + recipients[i] + '": INU_WSTR_BASIC_EMAIL error code ' + status);
	}

	if (errors.length) return errors.toString();
	return 'Success';
}

