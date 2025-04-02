/*===================================================================
Name: FormattingLib.js
Purpose: To be included in any viewer needing number formatting.  
		Contains functions for formatting ints/doubles/currencies.
Author: Jeremy King, Greenbrier & Russel
Date:	7/02/01

Last Modified: 
7/02/01	jking -	Created this file.

I18N actions
	I18_MAKELOWER - make lowercase
	I18_MAKEUPPER - make uppercase
	I18_FORMATINTEGER - format integer
	I18_FORMATDOUBLE - format double
	I18_FORMATCURRENCY - format currency
	I18_FORMATPERCENT - format percent
	I18_CURRENCY_SYMBOL -
	I18_GET_NOW


====================================================================*/
	
//Global Variables

var input=GetBDO("Locale", getMerchantLocale());
var output=GetBDO();		
var ret = ProcessRequest("I18_CURRENCY_SYMBOL", input, output);

var CURRENCY_SYMBOL = output.Result;
var DECIMAL_POINT = output.MonetarySeparator;
var NUMERIC_COMMA= ',';
var CURRENCY_PRECISION = 2;



/******************************************************************
Function GetNumFormValue(valName) - returns an integer value of
		the form variable that matches the passed in value.
input: string variable name
output: integer value of variable, if non-existent the value
		then it returns 0;
*******************************************************************/

function GetNumFormValue(valName)
{
	var ret = doAction('REQ_GET_FORMVALUE', valName, valName);
	if (ret == undefined) return 0;
	ret = parseInt(ret, 10);
	return isNaN(ret) ? 0 : ret;
}

/******************************************************************
Function GetStringFormValue(valName) - returns an string value of
		the form variable that matches the passed in value.
input: string variable name
output: string value of variable, if non-existent then it returns '';
		
*******************************************************************/

function GetStringFormValue(valName)
{
	var ret = doAction('REQ_GET_FORMVALUE', valName, valName);
	if (ret == undefined) return '';
	ret = ret.toString();
	return ret;
}

/******************************************************************
Function GetFloatFormValue(valName) - returns an string value of
		the form variable that matches the passed in value.
input: string variable name
output: Floating point value of variable, if non-existent the value
		then it returns 0;
*******************************************************************/

function GetFloatFormValue(valName)
{
	var ret = doAction('REQ_GET_FORMVALUE', valName, valName);
	if (ret == undefined) 
		return 0;
	ret = parseFloat(ret);
	return isNaN(ret) ? 0 : ret;
}
/******************************************************************
Function formatDouble(formatMe,locale,precision) - formats double all
pretty with commas according to locale and precision.
input:	string or float of number to be unformatted
		string locale identifier (optional)
		integer precision (optional);
output: string value of formatted double

*******************************************************************/

function formatDouble(formatMe, locale, precision)
{
	if (precision == undefined) 
		precision = getDefaultPrecision();
	if (locale == undefined) 
		locale = getMerchantLocale();
				
	var minFractDigits = (precision >= 2) ? 2 : precision;
	
	var input=GetBDO("Locale", locale, "Data", formatMe,"Min_fraction_digits", minFractDigits, "Max_fraction_digits", precision);
	var output=GetBDO();		
	var ret = ProcessRequest("I18_FORMATDOUBLE", input, output);
	
	if(output.Result)
		return output.Result;
	else
		return "";
}

/******************************************************************
Function unformatDouble(unformatMe, precision) - strips out comma's 
returns String version of number.
input:	string or float of number to be unformatted
		integer precision (optional);
output: string value of unformatted double
*******************************************************************/

function unformatDouble(unformatMe, precision)
{
	precision = parseInt(precision);

	if (precision == undefined)
		precision = getDefaultPrecision();
	
	if (unformatMe.toString().indexOf(",") > -1)
		unformatMe = stripCommas(unformatMe.toString());
	
	//format properly
	var locale = getMerchantLocale();
	formatMe = formatDouble(parseFloat(unformatMe),locale,precision);
	
	//Now Strip out commas (again if necessary)
	ret = stripCommas(formatMe);

	//check for nan and set it to zero if this happened
	if ((ret == "nan") || (ret == "NaN"))
		ret = "0.00";
	
	return ret;
}


/******************************************************************
Function formatInteger(formatMe) - formats for display. Adds commas
so BE CAREFUL to use this in non-editable fields
input: string or integer value to be formatted
output: string value of formatted integer.
*******************************************************************/

function formatInteger(formatMe, locale)
{
	if (locale == undefined) 
		precision = getMerchantLocale();
		
	var input=GetBDO("Locale", locale, "Data", parseInt(unformatInteger(formatMe)));
	var output=GetBDO();		
	var ret = ProcessRequest("I18_FORMATINTEGER", input, output);
	
	return output.Result;	

}

/******************************************************************
Function unformatInteger(formatMe) - removes commas from int
input: string or integer value to be unformatted
output: integer value
*******************************************************************/

function unformatInteger(unformatMe)
{
	return parseInt(unformatDouble(unformatMe));
}


/******************************************************************
Function formatCurrency(unformatMe, locale, precision) - formats 
	currency using currency symbol and commas
input:	Floating point value to be formatted
		String locale identifier (optional)
		Integer precision (optional)
output: string value of formatted currency

*******************************************************************/

function formatCurrency(formatMe, locale, precision)
{
	precision = parseInt(precision);

	if (precision == undefined) 
		precision = getDefaultPrecision();
	if (locale == undefined) 
		locale = getMerchantLocale();

	var minFractDigits = (precision >= 2) ? 2 : precision;
		
	var input=GetBDO("Locale", locale, "Data", formatMe,"Min_fraction_digits", minFractDigits, "Max_fraction_digits", precision);
	var output=GetBDO();		
	var ret = ProcessRequest("I18_FORMATCURRENCY", input, output);
	
	return output.Result;
	
	
}

/******************************************************************
Function unformatCurrency(unformatMe, precision) - removes currency
	symbol and commas from a formatted currenc
input:	string or int to be formatted
		precision to use (optional)
output: string value with symbol and commas extracted
*******************************************************************/

function unformatCurrency(unformatMe, precision)
{
	precision = parseInt(precision);

	if (precision == undefined)
		precision = getDefaultPrecision();
	
	if (unformatMe.toString().indexOf(CURRENCY_SYMBOL) > -1)
		unformatMe = stripCurrency(unformatMe.toString());

	var ret = unformatDouble(unformatMe,precision);
	return ret;
}


/******************************************************************
Function getMerchantLocale() - returns the locale defined for the store.
input: none
output: string value of language identifier
*******************************************************************/

function getMerchantLocale()
{
	return "en"; // right now US only
}


/******************************************************************
Function getBrowserLocale() - returns the locale of the web browser.
input: none
output: string value of language identifier
*******************************************************************/

function getBrowserLocale()
{
	return "en"; // right now US only
}

/******************************************************************
Function getDefaultPrecision() - returns the default precisions for the
	store.  Be careful not to use this if you are dealing with values that
	might have a different precision than the default (ie. product prices)
input: none
output: integer value of default precision
*******************************************************************/

function getDefaultPrecision()
{
	return CURRENCY_PRECISION;
}

/******************************************************************
Function stripCommas() - strips the commas out of a formatted number
	or any string.
input: any string or number
output: string with commas extracted
*******************************************************************/

function stripCommas(stripMe)
{
	var re = RegExp('\\' + NUMERIC_COMMA, 'g');
	var ret = stripMe.toString().replace(re, '');
	return ret;

}

/******************************************************************
Function stripCurrency() - strips out the currency symbol from a 
	formatted currency or any string.
input: any string or number
output: string with currency identifier extracted
*******************************************************************/
function stripCurrency(stripMe)
{
	var re = RegExp('\\' + CURRENCY_SYMBOL, 'g');
	var ret = stripMe.toString().replace(re, '');
	return ret;

}

