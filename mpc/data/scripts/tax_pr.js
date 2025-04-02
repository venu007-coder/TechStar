// INITIALIZE THE LANGUAGE LOCALE TO ENGLISH, FOR NOW. WE WILL NEED TO READ 
// THE DEFAULT LOCALE FROM A CONFIG FILE LATER, BUT FOR NOW IT WILL BE HARD-CODED.
var default_locale = "en";

/* Other Global Tax variables */
var CountryList = new Array();
var numCountries = 0;
var RegionList = new Array();
var numRegions = 0;
var output="";

// FUNCTION:	processTaxableArea
// Parameters:	recordSetName = either "TAX_COUNTRY", "TAX_REGION", or "TAX_SUBREGION"
//
// The following function will either return the key row ID of a given table or 
// insert a new row into that table. Each table has the same fieldname structure
// which allows us to use a generic function to retrieve or insert values to any of these
// three tables.
//
function processTaxableArea(recordSetName, areaValue)
{
	var theID=0;
	// Get ID
	//writeln("DataSourceName=" + recordSetName + ", areaValue=" + areaValue + "<br>");

	if (areaValue && areaValue != "-1") // ie We have input for Country, Region, or SubRegion
	{
		// Now check to see if the area is already in the database
		var temp = "SHORTNAME='" + areaValue + "'";
		//writeln("Filter='  "+temp+"  '<br>");

		var resultBDO = doActionBDO("DATA_OPENQUERY","ObjectName", recordSetName, "Filter", temp);
		if (resultBDO && resultBDO.QueryID > 0 && resultBDO.RowCount > 0)
		{
			var resultset = doActionBDO("DATA_GETFIELDDATA", "ObjectName", recordSetName, "QueryID", resultBDO.QueryID ,"FieldName","ID");
			//writeln("resultset=" + resultset + "<BR>");

			if (resultset && resultset.ID)
			{
				theID = resultset.ID;
				//writeln("FOUND ID!!! ID="+theID+"<br>");
			}
		}

		var closeConn = doAction("DATA_CLOSEQUERY", "QueryID", resultBDO.QueryID ,"ObjectName", recordSetName);

		if (theID == 0)
		{
			//writeln("TheID==0, so we will insert a new row!<br>");
			// Now we need to enter the areaName into its database
			theID = doActionEx("DATA_GENERATEID","ID","ObjectName","GENERATE_ID","IdType",recordSetName);

			var qID1 = doActionEx("DATA_OPENQUERY", "QueryID","ObjectName", recordSetName);

			if (qID1 > 0)
			{
				var result = doActionEx("DATA_ADDNEW", "Success","ObjectName", recordSetName, "QueryID", qID1);

				if (result)
				{
					var result = doActionEx("DATA_SETFIELDDATA", "Success", "ObjectName", recordSetName,
								"QueryID",qID1,"FieldName","ID","FieldVal",theID.toString());

					var result = doActionEx("DATA_SETFIELDDATA", "Success", "ObjectName", recordSetName,
								"QueryID",qID1,"FieldName","SHORTNAME","FieldVal",areaValue);

					// Set LongName = ShortName for now, since we don't have a GUI input for LongName
					var result = doActionEx("DATA_SETFIELDDATA", "Success", "ObjectName", recordSetName,
								"QueryID",qID1,"FieldName","LONGNAME","FieldVal",areaValue);

					var result = doActionEx("DATA_UPDATE", "Success", "ObjectName", recordSetName,"QueryID",qID1);

				}
				doAction("DATA_CLOSEQUERY","QueryID",qID1, "ObjectName", recordSetName);
			}
		}
	}

	//writeln("Returning id="+theID+"<BR>");				

	return theID;
}

function findTaxZone(countryID, regionID, subRegionID)
{

//   NOTE:	This function contains a hack!
//			The data API doesn't allow a query with more than 2 " AND " components to the where clause. 
//			Therefore, we are matching against the best 2-clause query and then checking the returned rows
//			for the exact match. 

	var ret_val = false;

	// Retrieve Tax Zone match if possible
	//var filter = "COUNTRY_LOOKUP_ID=" + countryID + " AND REGION_LOOKUP_ID=" + regionID + " AND SUBREGION_LOOKUP_ID=" + subRegionID;
	var filter = "REGION_LOOKUP_ID=" + regionID + " AND SUBREGION_LOOKUP_ID=" + subRegionID;

	var qID = doActionEx("DATA_OPENQUERY", "QueryID","ObjectName", "TAX_ZONE", "Filter", filter);

	while(!doActionEx("DATA_ISEOF","Result","QueryID",qID, "ObjectName", "TAX_ZONE"))
	{
		var resultset = doActionBDO("DATA_GETROWDATA","ObjectName", "TAX_ZONE", "QueryID",qID);

		if (resultset.COUNTRY_LOOKUP_ID == countryID)
		{
			ret_val = true;
			break;
		}
		else
			var movednext=doActionEx("DATA_MOVENEXT","Result","ObjectName","TAX_ZONE","QueryID",qID);
	}

	var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",qID,"ObjectName", "TAX_ZONE");

	return ret_val;
}


function deleteTaxCategory(taxCatID)
{
	if (taxCatID) // If no Id, then code will continue through to next screen w/o any action
	{
		// First, delete the Tax rates associated with this Tax Category
		var temp = "CATEGORY_NODE_ID=" + taxCatID;
		var qID = doActionEx("DATA_OPENQUERY", "QueryID","ObjectName", "TAX_RATE", "Filter", temp, "Delete", true);
		if (qID && qID > 0)
			var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",qID,"ObjectName", "TAX_RATE");

		// Now delete the actual Tax Category
		//writebr("Attempting to delete NodeID=" + taxCatID);

		var result = doAction("CAT_DELETENODE","NodeID",parseInt(taxCatID));
		//writebr("after deleting Tax Cat Node: result=" + result);
	}

	return true;
}

/* FUNCTION: updateTaxCategory
** Returns true or false based on success. 
** If return value is false, it is assumed the reason was due to trying to create a duplicate entry.
*/
function updateTaxCategory(taxCatID, newTaxCatName)
{
	if (taxCatID && newTaxCatName) // If no Id or name, then code will continue through to next screen w/o any action
	{
		// Check if the new category name already exists

		var nodePath = "/ZoneTax/" + newTaxCatName;
		var result = doActionBDO("CAT_GETNODEID","Path", nodePath, "Locale", default_locale);

//writebr("NodePath checked: " + nodePath + ", resultBDO=" + result + ", result.NodeID=" + result.NodeID);

		if (result && result.NodeID) // If new node exists, don't update it!
			return false; // Set to false so return value can be checked for success/failure. 

		// Now Set the new name
//writebr("Attempting to update NodeID=" + taxCatID + " with newname=" + newTaxCatName);
		
		var result = doActionBDO("CAT_SETDATA","NodeID", parseInt(taxCatID), "Name", newTaxCatName, "Picture", "none", "Desc", "blah", "Locale", default_locale );

//writebr("after updating Tax Cat Node: result=" + result);

	}
	
	return true;
}

/******************************* OBJECTS ************************************************************/
function taxRate(zoneID, ratecode, rateID, rate)
{
	this.zoneID = zoneID;
	this.ratecode = ratecode;
	this.id = rateID;
	this.rate = rate;
}

function Country(id, shortname, longname)
{
	this.ID = id;
	this.ShortName = shortname;
	this.LongName = longname;
}

function Region(id, CountryId, shortname, longname)
{
	this.ID = id;
	this.CountryId = CountryId;
	this.ShortName = shortname;
	this.LongName = longname;
}


function deleteTaxZone()
{
	// Get the table row ID and delete the selected tax zone
	var zoneID = doAction('REQ_GET_FORMVALUE', "main_id", "main_id");
	if (zoneID) // If no Id, then code will continue through to next screen w/o any action
	{
		//writeln("Calling MRA_ZONETAX_DELETEZONE with ZoneID=" + zoneID);
		var resultBDO = doActionBDO('MRA_ZONETAX_DELETEZONE', 'ZONEID', parseInt(zoneID));
	}	
}
	
function updateTaxZone(rowID, country, region, subRegion)
{
	// Get the table row ID
	if (!rowID)
		var theRowID= doAction('REQ_GET_FORMVALUE', "main_id", "main_id");
	else
		var theRowID = rowID;

	if (theRowID) // If no Id, then code will continue through to next screen w/o any action
	{
		// Determine the input country, region, and subRegion values
		if (!country)
			var country = doAction('REQ_GET_FORMVALUE', "country", "country");

		if (!region)
			var region = doAction('REQ_GET_FORMVALUE', "region", "region");

		if (!subRegion)
			var subRegion = doAction('REQ_GET_FORMVALUE', "subregion", "subregion");

		//var shippingTaxFlag = doAction('REQ_GET_FORMVALUE', "shipping_tax", "shipping_tax");
		//writeln("Passed in values: " + country + ","+region+","+subRegion+"<br>");

		var countryID = processTaxableArea("TAX_COUNTRY", country.toUpperCase());
		var regionID = processTaxableArea("TAX_REGION", region.toUpperCase());
		var subRegionID = processTaxableArea("TAX_SUBREGION", subRegion.toUpperCase());

		var zoneAlreadyExists = findTaxZone(countryID, regionID, subRegionID);

		if (zoneAlreadyExists)
		{	
			if (region.length == 0)
				region = "--";
			if (subRegion.length == 0)
				subRegion = "--";
			output = "Error: Zone already exists. Tax Zone not modified.";
			
		}
		else
		{
			// Now that we have a FINAL ID for Country, Region, and SubRegion, Update the TaxRegionRow.
			var temp = "ID=" + theRowID;

			var resultBDO = doActionBDO("DATA_OPENQUERY","ObjectName", "TAX_ZONE", "Filter", temp);
			if (resultBDO && resultBDO.QueryID > 0 && resultBDO.RowCount > 0)
			{
				var result = doActionEx("DATA_SETFIELDDATA", "Success", "ObjectName", "TAX_ZONE",
							"QueryID",resultBDO.QueryID,"FieldName","COUNTRY_LOOKUP_ID","FieldVal", countryID.toString());
				var result = doActionEx("DATA_SETFIELDDATA", "Success", "ObjectName", "TAX_ZONE",
							"QueryID",resultBDO.QueryID,"FieldName","REGION_LOOKUP_ID","FieldVal", regionID.toString());
				var result = doActionEx("DATA_SETFIELDDATA", "Success", "ObjectName", "TAX_ZONE",
							"QueryID",resultBDO.QueryID,"FieldName","SUBREGION_LOOKUP_ID","FieldVal", subRegionID.toString());

				var result = doActionEx("DATA_UPDATE", "Success", "ObjectName", "TAX_ZONE","QueryID",resultBDO.QueryID);
				var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",resultBDO.QueryID,"ObjectName", "TAX_ZONE");
			}
		}
	}
}

function addTaxZone(country, region, subRegion)
{
	// figure out which ID to return, default is country ID
	var bRetSubRegion = false, bRetRegion = false;
	if (subRegion > -1)
		bRetSubRegion = true;
	else if (region > -1)
		bRetRegion = true;

	// Determine the input country, region, and subRegion values
	if (!country || !region || !subRegion)
	{
		var country   = doAction('REQ_GET_FORMVALUE', "country", "country");
		var region    = doAction('REQ_GET_FORMVALUE', "region", "region");
		var subRegion = doAction('REQ_GET_FORMVALUE', "subregion", "subregion");
	}
	//var shippingTaxFlag = doAction('REQ_GET_FORMVALUE', "shipping_tax", "shipping_tax");

	//writebr("Passed in values: " + country + ","+region+","+subRegion+"<br>");

	var countryID = processTaxableArea("TAX_COUNTRY", country.toUpperCase());
	var regionID = processTaxableArea("TAX_REGION", region.toUpperCase());
	var subRegionID = processTaxableArea("TAX_SUBREGION", subRegion.toUpperCase());
		
//writebr("countryID=" + countryID + ", regionID=" + regionID + ", subRegionID=" + subRegionID);

	var zoneAlreadyExists = findTaxZone(countryID, regionID, subRegionID);

	//	writebr("Does zoneAlreadyExist? A=" + zoneAlreadyExists);

	if (zoneAlreadyExists)
	{	
		if (region.length == 0)
			region = "--";
		if (subRegion.length == 0)
			subRegion = "--";

		output = "Error: Zone already exists. New Zone not created";
	}
	else
	if (country) // Create new zone only if it doesn't already exist and we at leasthave a country defined.
	{
		// Now that we have a FINAL ID for Country, Region, and SubRegion, Insert the TaxRegionRow.
		var newTableID = doActionEx("DATA_GENERATEID","ID","ObjectName","GENERATE_ID","IdType","ZONE_TAX_ZONES");

		//	writebr("NewTableID=" + newTableID);

		if (newTableID)
		{
			var resultBDO = doActionBDO("DATA_OPENQUERY","ObjectName", "TAX_ZONE");
			//	writebr("After query: resultBDO=" + resultBDO + ", resultBDO.QueryID=" + resultBDO.QueryID + ", resultBDO.RowCount=" + resultBDO.RowCount);

			if (resultBDO && resultBDO.QueryID > 0 )
			{
				var result = doActionEx("DATA_ADDNEW", "Success","ObjectName", "TAX_ZONE", "QueryID", resultBDO.QueryID);

				var result = doActionEx("DATA_SETFIELDDATA", "Success", "ObjectName", "TAX_ZONE",
							"QueryID", resultBDO.QueryID, "FieldName", "ID", "FieldVal", newTableID.toString());

				var result = doActionEx("DATA_SETFIELDDATA", "Success", "ObjectName", "TAX_ZONE",
							"QueryID", resultBDO.QueryID, "FieldName", "COUNTRY_LOOKUP_ID", "FieldVal", countryID.toString());

				var result = doActionEx("DATA_SETFIELDDATA", "Success", "ObjectName", "TAX_ZONE",
							"QueryID", resultBDO.QueryID, "FieldName", "REGION_LOOKUP_ID", "FieldVal", regionID.toString());

				var result = doActionEx("DATA_SETFIELDDATA", "Success", "ObjectName", "TAX_ZONE",
							"QueryID", resultBDO.QueryID, "FieldName", "SUBREGION_LOOKUP_ID", "FieldVal", subRegionID.toString());
				
				var result = doActionEx("DATA_UPDATE", "Success", "ObjectName", "TAX_ZONE","QueryID", resultBDO.QueryID);
				var closeConn = doAction("DATA_CLOSEQUERY", "QueryID", resultBDO.QueryID, "ObjectName", "TAX_ZONE");
			}
		}

		return newTableID;
	}
	if (bRetSubRegion)
		return subRegionID
	else if (bRetRegion)
		return regionID
	else
		return countryID;
}

function deleteTaxCat()
{
	// Get the table row ID and delete the selected tax Cat
	var taxCatID= doAction('REQ_GET_FORMVALUE', "main_id", "main_id");

	if (taxCatID)
		deleteTaxCategory(taxCatID);
}

function saveNewCat()
{
//	case "NEW_CAT_SAVE":

	var newTaxCategoryName = doAction('REQ_GET_FORMVALUE', "tax_cat_name", "tax_cat_name");
	//writebr("New Tax Cat Name = " + newTaxCategoryName);

	newTaxCategoryName = newTaxCategoryName.toUpperCase();

	var taxParentNodeBDO = doActionBDO('CAT_GETNODEID', "Path", "/ZoneTax", "Locale", default_locale);
	//writebr("Parent: The result="+taxParentNodeBDO+ " id=" + taxParentNodeBDO.NodeID);

	if (taxParentNodeBDO != undefined && taxParentNodeBDO.NodeID > 0)
		var parentTaxID = taxParentNodeBDO.NodeID;
	else
		var parentTaxID = 0;

	//writebr("Found parentTaxID=" + parentTaxID);


	// Determine if this is the first category ever or if one exists already.
	if ( parentTaxID == 0)
	{
		var theParentBDO = doActionBDO("CAT_INSERTNODE","ParentNode", 0, "BeforeIndex", 1, 
										"SingleLevel", false, "Picture", "none", "Name","TaxZones",
										"Desc", "TAX Parent Category", "DefaultLocale",default_locale);
		
		if (theParentBDO != undefined && theParentBDO.NodeID != undefined)
			parentTaxID = theParentBDO.NodeID;
		else
			writebr("Error getting top Tax Category");

		//writebr("Created parentTaxID=" + parentTaxID);
	}

	// Check if the new category already exists
	var nodePath = "/ZoneTax/" + newTaxCategoryName;
	var result = doActionBDO("CAT_GETNODEID","Path", nodePath, "Locale", default_locale);

	if (result && result.NodeID) // If category already exists, set error return message
	{
		output = "Error: Tax Category already exists. No changes were made.";
	}
	else
	{
		var childBDO = doActionBDO("CAT_GETCHILDREN","NodeID",parentTaxID);
		//writebr("after Getting Children");

		if (childBDO == undefined)
			var insertOffsetPosition = 1; // Default
		else
		{
			var childList = childBDO.GetLabels();
			var insertOffsetPosition = childList.length + 1; // Set ofset to the number of child nodes + 1;
		}

		//writebr("Requesting offset position of '" + insertOffsetPosition + "'");

		var taxCategoryBDO = doActionBDO("CAT_INSERTNODE","ParentNode", parentTaxID, "BeforeIndex", insertOffsetPosition, 
										"Picture", "none", "Name",newTaxCategoryName,"Desc", newTaxCategoryName, 
										"DefaultLocale",default_locale);

		//writebr("New Child: The BDO result="+taxCategoryBDO+ ", new Node id=" + taxCategoryBDO.NodeID);
		
		if (!taxCategoryBDO.NodeID)
			output = output + "Error creating new Tax Category";

	}
}

function saveEditCat()
{
//	case "EDIT_CAT_SAVE":

	// Get the table row ID and delete the selected tax Cat
	var taxCatID= doAction('REQ_GET_FORMVALUE', "main_id", "main_id");
	var newTaxCatName= doAction('REQ_GET_FORMVALUE', "tax_cat_name", "tax_cat_name");

	newTaxCatName = newTaxCatName.toUpperCase();

	if (taxCatID)
		var retval = updateTaxCategory(taxCatID, newTaxCatName);

	if (retval == false)
		output = "Error: Tax Category already exists. No changes were made.";
}

function saveTaxRates()
{
//	case "SAVE": // ie SAVE TAX RATES/MATRIX.

	// Determine the input values
	var rowArrayValues = doAction('REQ_GET_FORMVALUE', "tax_row_array", "tax_row_array");
	var colArrayValues = doAction('REQ_GET_FORMVALUE', "tax_col_array", "tax_col_array");
	var rateNameArrayValues = doAction('REQ_GET_FORMVALUE', "tax_col2_array", "tax_col2_array");

//writeln("colArrayValues=" + colArrayValues + "<br>");
//writeln("rowArrayValues=" + rowArrayValues + "<br>");
//writeln("rateNameArrayValues=" + rateNameArrayValues + "<br>");

	var rateArray = new Array(); // rateArray array values will be in the form of (rateID, rate)"
	var numRates=0;
	var zoneArray = new Array();
	var numZones=0;
	var rateNameArray = new Array();
	var numRateNames = 0;

	if (colArrayValues.length > 0)
	{
		var temp="";
		for (var i=0; i < colArrayValues.length; i++)
		{
			var c = colArrayValues.charAt(i);
			
			if (c == ",")
			{
				var tmparray = new Array(temp, "0");
				rateArray[numRates] = tmparray;
				numRates++;
				temp = "";
			}
			else
				temp = temp + c;
		}

		// Capture last value in the string
		rateArray[numRates] = new Array(temp, "0");;
		numRates++;
	}
	else
	{
		// If no rates exist, preset the value to 1 and enter a dummy field. We need this
		// so our major loop through all fields can find new ones.
		var tmparray = new Array("0", "0");
		rateArray[numRates] = tmparray;
		numRates++;

	}
			
	//writeln("numRates: " + numRates + "<br>");
	

	if (rowArrayValues.length > 0)
	{
		var temp="";
		for (var i=0; i < rowArrayValues.length; i++)
		{
			var c = rowArrayValues.charAt(i);
			if (c == ",")
			{
				zoneArray[numZones] = temp;
				numZones++;
				temp = "";
			}
			else
				temp = temp + c;
		}

		// Capture last value in the string
		zoneArray[numZones] = temp;
		numZones++;
	}
			
	//writeln("NumZones: " + numZones+ "<br>");


	if (rateNameArrayValues.length > 0)
	{
		var temp="";
		for (var i=0; i < rateNameArrayValues.length; i++)
		{
			var c = rateNameArrayValues.charAt(i);
			if (c == ",")
			{
				rateNameArray[numRateNames] = temp;
				numRateNames++;
				temp = "";
			}
			else
				temp = temp + c;
		}

		// Capture last value in the string
		rateNameArray[numRateNames] = temp;
		numRateNames++;
	}
	
	//writeln("numRateNames: " + numRateNames+ "<br>");
	

	// Now for each row, read the column input values. Row=i, Col=j, ColName=k
	var newTaxRates = new Array();
	var numTaxRates = 0;
	var foundEntry = false;
	for (i=0; i < numZones; i++)
	{
		for (var k=0; k < numRateNames; k++)
		{
			for (var j=0, foundEntry=false; j < numRates; j++)
			{
				// note: input format is like: name='rate_id_2_3' where 2==zoneID and 3==rateCatId
				var temp = "rate_id_" + zoneArray[i] + "_" + rateNameArray[k] + "_" + rateArray[j][0] ;

				//write("Asking for '" + temp + "' input, received " );
				var newRate = doAction('REQ_GET_FORMVALUE', temp, temp);
				if (newRate)
				{
					newTaxRates[numTaxRates] = new taxRate(zoneArray[i], rateNameArray[k], rateArray[j][0], newRate);
					rateArray[j][1] = newRate;
					//write("****->" + newRate + " and subset=" + newTaxRates[numTaxRates].zoneID + "," + newTaxRates[numTaxRates].ratecode + "," + newTaxRates[numTaxRates].id + "," + newTaxRates[numTaxRates].rate + "," +"<br>");
					numTaxRates++;
					foundEntry = true;
				}
				else
				if(foundEntry == false) // If not found, try rateCatID=0
				{
					var temp = "rate_id_" + zoneArray[i] + "_" + rateNameArray[k] + "_0" ;

					//write("...RE-Asking for '" + temp + "' input, received " );
					var newRate = doAction('REQ_GET_FORMVALUE', temp, temp);
					if (newRate)
					{
						newTaxRates[numTaxRates] = new taxRate(zoneArray[i], rateNameArray[k], "0", newRate);
						//write("****->" + newRate + " and subset=" + newTaxRates[numTaxRates].zoneID + "," + newTaxRates[numTaxRates].ratecode + "," + newTaxRates[numTaxRates].id + "," + newTaxRates[numTaxRates].rate + "," +"<br>");
						numTaxRates++;
						foundEntry = true;
					}
					//else
						//writeln("nothing<br>");
				}
				//else
					//writeln("nothing<br>");

			}
		}
	}

	// Now that we've gotton an array of TaxRate objects, just add them to the database.
	for (i=0; i < numTaxRates; i++)
	{
		//writeln("Processing tax rate = " + newTaxRates[i].zoneID + "," + newTaxRates[i].ratecode + "," + newTaxRates[i].id + "," + newTaxRates[i].rate + "," +"<br>");
		if (newTaxRates[i].id !=0) // If we're updating a value, then open the query differently
		{
			//writeln("Must be UPDATE<BR>");
			var temp = "ID=" + newTaxRates[i].id;
			//writeln("Filter=" + temp + "<BR>");
			var resultBDO = doActionBDO("DATA_OPENQUERY","ObjectName", "TAX_RATE", "Filter", temp);
			if (resultBDO.RowCount < 1)
			{
				var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",resultBDO.QueryID,"ObjectName", "TAX_RATE");
				return 0;
			}
		}
		else	// Must be ADDing a new tax rate.
		{
			//writeln("Must be ADD<BR>");

			var resultBDO = doActionBDO("DATA_OPENQUERY","ObjectName", "TAX_RATE");
			if (resultBDO && resultBDO.QueryID > 0)
			{
				var result = doActionEx("DATA_ADDNEW", "Success","ObjectName", "TAX_RATE", "QueryID", resultBDO.QueryID);

				var newTableID = doActionEx("DATA_GENERATEID","ID","ObjectName","GENERATE_ID","IdType","ZONE_TAX_RATE");
				//writebr("newTableID=" + newTableID + ", qID="+resultBDO.QueryID);

				var result = doActionEx("DATA_SETFIELDDATA", "Success", "ObjectName", "TAX_RATE",
						"QueryID",resultBDO.QueryID,"FieldName","ID","FieldVal", newTableID.toString());
			}
		}

		if (resultBDO && resultBDO.QueryID > 0)
		{
			var result = doActionEx("DATA_SETFIELDDATA", "Success", "ObjectName", "TAX_RATE",
						"QueryID",resultBDO.QueryID,"FieldName","CATEGORY_NODE_ID","FieldVal", newTaxRates[i].ratecode);

			var result = doActionEx("DATA_SETFIELDDATA", "Success", "ObjectName", "TAX_RATE",
						"QueryID",resultBDO.QueryID,"FieldName","ZONE_ID","FieldVal", newTaxRates[i].zoneID);

			var result = doActionEx("DATA_SETFIELDDATA", "Success", "ObjectName", "TAX_RATE",
						"QueryID",resultBDO.QueryID,"FieldName","RATE","FieldVal", newTaxRates[i].rate);
		}
		else
		{
			//writebr("Failure opening query");
		}

		//writeln("Before  UPDATE  call...<BR>");

		var result = doActionEx("DATA_UPDATE", "Success", "ObjectName", "TAX_RATE","QueryID",resultBDO.QueryID);

		var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",resultBDO.QueryID,"ObjectName", "TAX_RATE");
		//writeln("After CLOSEQUERY<BR>");

	}

	// Now check for any fields which may have had their values erased, but no Zero entered.
	for (i=0; i < numRates; i++)
	{
		//writebr("Checking for deletions"+ rateArray[i][0] + "," + rateArray[i][1]);
		if (rateArray[i][1] == "0")
		{
			//writebr("Found row to delete! " + rateArray[i][0] + "," + rateArray[i][1]);
			var temp = "ID=" + rateArray[i][0] ;
			var qID = doActionEx("DATA_OPENQUERY", "QueryID","ObjectName", "TAX_RATE", "Filter", temp, "Delete", true);
			var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",qID,"ObjectName", "TAX_RATE");
		}
	}
}

function loadTaxCountryAndRegion()
{
	// Get list of allowed Countries
	var qID = doActionEx("DATA_OPENQUERY", "QueryID","ObjectName", "TAX_COUNTRY", "Sort", "ID ASC");
	while(!doActionEx("DATA_ISEOF","Result","QueryID",qID, "ObjectName", "TAX_COUNTRY"))
	{ 
		var resultset = doActionBDO("DATA_GETROWDATA","ObjectName", "TAX_COUNTRY", "QueryID",qID);
		
		CountryList[numCountries] = new Country(resultset.ID, resultset.SHORTNAME, resultset.LONGNAME);
		numCountries++;
							
		var movednext=doActionEx("DATA_MOVENEXT","Result","ObjectName","TAX_COUNTRY","QueryID",qID);
	}	
	var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",qID,"ObjectName", "TAX_COUNTRY");

	var qID = doActionEx("DATA_OPENQUERY", "QueryID","ObjectName", "TAX_REGION", "Sort", "ID ASC");
	while(!doActionEx("DATA_ISEOF","Result","QueryID",qID, "ObjectName", "TAX_REGION"))
	{ 
		var resultset = doActionBDO("DATA_GETROWDATA","ObjectName", "TAX_REGION", "QueryID",qID);
		
		RegionList[numRegions] = new Region(resultset.ID, resultset.COUNTRY_ID, resultset.SHORTNAME, resultset.LONGNAME);
		numRegions++;
							
		var movednext=doActionEx("DATA_MOVENEXT","Result","ObjectName","TAX_REGION","QueryID",qID);
	}	

	//CLOSE QUERY
	var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",qID,"ObjectName", "TAX_REGION");
	
	//writeln("Num countries=" + numCountries + " numRegions=" + numRegions);
}

function lookupTaxZoneLiteral(zoneID)
{
	// Get the tax zone info
	var qID = doActionEx("DATA_OPENQUERY", "QueryID","ObjectName", "TAX_ZONE", "Filter", "ID="+zoneID);
	var resultset = doActionBDO("DATA_GETROWDATA","ObjectName", "TAX_ZONE", "QueryID",qID);

	var countryID = resultset.COUNTRY_LOOKUP_ID;
	var regionID = resultset.REGION_LOOKUP_ID;
	var subregionID = resultset.SUBREGION_LOOKUP_ID;
	var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",qID,"ObjectName", "TAX_ZONE");

	// Get the country
	var qID = doActionEx("DATA_OPENQUERY", "QueryID","ObjectName", "TAX_COUNTRY", "Filter", "ID="+countryID);
	var resultset = doActionBDO("DATA_GETROWDATA","ObjectName", "TAX_COUNTRY", "QueryID",qID);
	var country = resultset.SHORTNAME;
	var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",qID,"ObjectName", "TAX_COUNTRY");

	// Get the region
	var qID = doActionEx("DATA_OPENQUERY", "QueryID","ObjectName", "TAX_REGION", "Filter", "ID="+regionID);
	var resultset = doActionBDO("DATA_GETROWDATA","ObjectName", "TAX_REGION", "QueryID",qID);
	var region = resultset.SHORTNAME;
	var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",qID,"ObjectName", "TAX_REGION");

	// Get the subregion
	var resultset = doActionBDO("DATA_OPENQUERY","ObjectName", "TAX_SUBREGION", "Filter", "ID="+subregionID);
	var qID = resultset.QueryID;
	if(resultset.RowCount > 0)
	{
		var resultset = doActionBDO("DATA_GETROWDATA","ObjectName", "TAX_SUBREGION", "QueryID",qID);
		var subregion = resultset.SHORTNAME;
		var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",qID,"ObjectName", "TAX_SUBREGION");
	}

	var retTaxZone = new Array();
	retTaxZone.country = country;
	retTaxZone.region  = region;
	retTaxZone.subregion = subregion;

	return retTaxZone;
}
