/*
**	Payment related functions
**	Copyright (c) Mercantec, Inc. 2001
*/

function typesObj(typesArray, typeNamesArray)
{
	this.typesArray = typesArray;
	this.typeNamesArray = typeNamesArray;
}

function getPaymentTypes()
{
	var typesArray = new Array();
	var typeNamesArray = new Array();

	// do not allow online credit card payments if encryption key not yet generated.
	var CheckKeyName = doAction ('DATA_GETCONFIGDATA', 'ObjectName', 'SecurityCfg', 'RowName', 'PGPKeyName', 'ColName', 'Value');
	if ( (CheckKeyName) && (CheckKeyName.toLowerCase() != "none") )
	{					
		if (doAction('MRA_PAYMENT_IF_ACCEPT_CREDIT_CARD_ONLINE') == 'YES')
		{
			typesArray[typesArray.length] = 0;
			typeNamesArray[typeNamesArray.length] = 'Credit Card Online';
		}
	}

	if (doAction('MRA_PAYMENT_IF_ACCEPT_CREDIT_CARD_OFFLINE') == 'YES')
	{
		typesArray[typesArray.length] = 1;
		typeNamesArray[typeNamesArray.length] = 'Credit Card Offline';
	}

	if (doAction('MRA_PAYMENT_IF_ACCEPT_OFFLINE_CHECK') == 'YES')
	{
		typesArray[typesArray.length] = 2;
		typeNamesArray[typeNamesArray.length] = 'Check Offline';
	}

	if (doAction('MRA_PAYMENT_IF_ACCEPT_COD_CREDIT_CARD') == 'YES')
	{
		typesArray[typesArray.length] = 3;
		typeNamesArray[typeNamesArray.length] = 'COD with Credit Card';
	}

	if (doAction('MRA_PAYMENT_IF_ACCEPT_COD_CHECK') == 'YES')
	{
		typesArray[typesArray.length] = 4;
		typeNamesArray[typeNamesArray.length] = 'COD with Check';
	}

	if (doAction('MRA_PAYMENT_IF_ACCEPT_COD_CASH') == 'YES')
	{
		typesArray[typesArray.length] = 5;
		typeNamesArray[typeNamesArray.length] = 'COD with Cash';
	}

	if (doAction('MRA_PAYMENT_IF_ACCEPT_COD_CASHIER_CHECK') == 'YES')
	{
		typesArray[typesArray.length] = 6;
		typeNamesArray[typeNamesArray.length] = "COD with Cashiers Check";
	}

	if (doAction('MRA_PAYMENT_IF_ACCEPT_COD_MONEY_ORDER') == 'YES')
	{
		typesArray[typesArray.length] = 7;
		typeNamesArray[typeNamesArray.length] = 'COD with Money Order';
	}

	if (doAction('MRA_PAYMENT_IF_ACCEPT_PURCHASE_ORDER') == 'YES')
	{
		typesArray[typesArray.length] = 8;
		typeNamesArray[typeNamesArray.length] = 'Purchase Order';
	}
	return (new typesObj(typesArray, typeNamesArray));
}
