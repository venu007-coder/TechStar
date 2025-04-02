/*===================================================================
Name: Validate.js
Purpose: Some common validation routines.

====================================================================*/

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