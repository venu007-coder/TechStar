<SCRIPT runat="merc_server">

// INITIALIZE THE LANGUAGE LOCALE TO ENGLISH, FOR NOW. WE WILL NEED TO READ 
// THE DEFAULT LOCALE FROM A CONFIG FILE LATER, BUT FOR NOW IT WILL BE HARD-CODED.
var default_locale = "en";

// GLOBALS used for printProductSubset() function routine
var numToPrint = -1; // negative to indicate no limit, or ALL
var printStartNum = 1;
var nPrintCount = 1; 

/*
** Function to display all subcategories for a given category. 
** Designed to be called recursively to display all sub-sub levels
*/
function printAllCategories(sourceNodeBDO)
{

	if (sourceNodeBDO == 0)
	{
		var sourceNodeBDO = doActionBDO('CAT_GETNODEID', "Path", "/Items", "Locale", default_locale);
	}

	if (sourceNodeBDO != undefined )
	{
		var children = doActionBDO("CAT_GETCHILDREN", "NodeID", sourceNodeBDO.NodeID);
		var labels = children.GetLabels();

		if (labels)
		{		
			for (var i = 0; i < labels.length; i++)
			{

				var categoryNodeID = eval("children." + labels[i]);
				var tempNodeDataBDO = doActionBDO("CAT_GETDATA","NodeID",categoryNodeID,"Locale",default_locale);

				writeln("n=" + escape(tempNodeDataBDO.Desc) + "&id=" + categoryNodeID + "&p=" + sourceNodeBDO.NodeID );

				// Make recursive call
				tempNodeDataBDO.NodeID = categoryNodeID;
				printAllCategories(tempNodeDataBDO);
			}
		}
	}

	return;

}

/*
** Function to display all products (ie sku's or itemID)  for a given category. 
** Designed to be called recursively to display all sub-sub levels
*/
function printAllProductsInCategory(sourceNodeBDO)
{

	if (sourceNodeBDO == 0)
	{
		var sourceNodeBDO = doActionBDO('CAT_GETNODEID', "Path", "/Items", "Locale", default_locale);
	}

	if (sourceNodeBDO != undefined )
	{
		var children = doActionBDO("CAT_GETCHILDREN", "NodeID", sourceNodeBDO.NodeID);
		var labels = children.GetLabels();

		if (labels)
		{		
			for (var i = 0; i < labels.length; i++)
			{
				var categoryNodeID = eval("children." + labels[i]);
				var tempNodeDataBDO = doActionBDO("CAT_GETDATA","NodeID",categoryNodeID,"Locale",default_locale);

				var ItemsBDOArray = doActionBDO('CAT_GETNODEITEMS', "NodeID", categoryNodeID);

				if (ItemsBDOArray)
				{
					//writeln("NodeID=" + categoryNodeID + ", ItemsBDOArray=" + ItemsBDOArray);

					var itemLabels = ItemsBDOArray.GetLabels();

					for (var j=0; j < itemLabels.length; j++)
					{
						var theItemID = eval("ItemsBDOArray." + itemLabels[j]);
						var key = doActionEx("ITEM_GETFIELD","Key","ItemID",theItemID,"FieldName","Key");

						if (key)
						{
							writeln("p=" + escape(key) + "&c=" + categoryNodeID );
						}
					}

					// Make recursive call
					tempNodeDataBDO.NodeID = categoryNodeID;
					printAllProductsInCategory(tempNodeDataBDO);
				}
			}
		}
	}

	return;

}

/*
** Function to display all subcategories for a given category. 
** Designed to be called recursively to display all sub-sub levels
**
*/

function printProductSubset(sourceNodeBDO)
{
	if (sourceNodeBDO == 0)
	{
		var sourceNodeBDO = doActionBDO('CAT_GETNODEID', "Path", "/Items", "Locale", default_locale);
	}

	if (sourceNodeBDO != undefined )
	{
		var children = doActionBDO("CAT_GETCHILDREN", "NodeID", sourceNodeBDO.NodeID);
		var labels = children.GetLabels();

		if (labels)
		{		
			for (var i = 0; i < labels.length; i++)
			{
				if (numToPrint != -1 && (numToPrint <= (nPrintCount - printStartNum)))
				{
					//writeln("******** 2 -- Returning because Count was exceeded! *********");
					return 0;
				}

				var categoryNodeID = eval("children." + labels[i]);
				var tempNodeDataBDO = doActionBDO("CAT_GETDATA","NodeID",categoryNodeID,"Locale",default_locale);
				
				var ItemsBDOArray = doActionBDO('CAT_GETNODEITEMS', "NodeID", categoryNodeID);

				//writeln("NodeID=" + categoryNodeID + ", ItemsBDOArray=" + ItemsBDOArray);

				if (ItemsBDOArray)
				{
					var itemLabels = ItemsBDOArray.GetLabels();

					for (var j=0; j < itemLabels.length; j++)
					{
						var theItemID = eval("ItemsBDOArray." + itemLabels[j]);

						if (theItemID)
						{
							// Need ItemID, Locale
							var ItemBDO = doActionBDO('ITEM_GETALLFIELDS', "ItemID", theItemID, "Locale", default_locale);

							if (ItemBDO && nPrintCount >= printStartNum)
							{
								writeln("n=" + escape(ItemBDO.Name) + "&s=" + escape(ItemBDO.Key) + "&p=" + ItemBDO.Price + "&u=USD&l=1" );
							}

							nPrintCount++;
						}
					}

					// Make recursive call
					tempNodeDataBDO.NodeID = categoryNodeID;
					printProductSubset(tempNodeDataBDO);
				}
			}
		}
	}

	return;

}


/*
** Globals for the duplicate Item function
*/
var ItemArray = new Array();
var ItemArrayCount = 0;

function duplicateItem(theItemID)
{
	for (var i=0; i < ItemArrayCount; i++)
	{
		if (theItemID == ItemArray[i])
			return 1;
	}

	ItemArray[ItemArrayCount] = theItemID;
	ItemArrayCount++;

	return 0;
}

/*
** Function retrieves a count of all items.
** This function was superceeded by newItemCount, but I'm leaving the code here just in case there is a discrepancy in item counts...
*/
function getAllItemCount(sourceNodeBDO)
{
	if (sourceNodeBDO == 0)
	{
		var sourceNodeBDO = doActionBDO('CAT_GETNODEID', "Path", "/Items", "Locale", default_locale);
	}

	if (sourceNodeBDO != undefined )
	{
		var children = doActionBDO("CAT_GETCHILDREN", "NodeID", sourceNodeBDO.NodeID);
		var labels = children.GetLabels();

		if (labels)
		{		
			for (var i = 0; i < labels.length; i++)
			{
				var categoryNodeID = eval("children." + labels[i]);
				var tempNodeDataBDO = doActionBDO("CAT_GETDATA","NodeID",categoryNodeID,"Locale",default_locale);
				
				var ItemsBDOArray = doActionBDO('CAT_GETNODEITEMS', "NodeID", categoryNodeID);

				//writeln("NodeID=" + categoryNodeID + ", ItemsBDOArray=" + ItemsBDOArray);

				if (ItemsBDOArray)
				{
					var itemLabels = ItemsBDOArray.GetLabels();

					for (var j=0; j < itemLabels.length; j++)
					{
						var theItemID = eval("ItemsBDOArray." + itemLabels[j]);

						// Calling the duplicateItem() function automatically adds the item to 
						// a global array and check for dups. We don't have to take any action
						// here to affect the count -- this call does everything for us.
						if (theItemID && !duplicateItem(theItemID))
						{
							//writeln("theItemID=" + theItemID);
						}
					}

					// Make recursive call
					tempNodeDataBDO.NodeID = categoryNodeID;
					getAllItemCount(tempNodeDataBDO);
				}
			}
		}
	}

	return;


}

function newItemCount()
{
	var itemBDO = doActionBDO("ITEM_GETALLITEMS", "CountOnly", true, "Type", 0, "Locale", default_locale);

	return itemBDO.RowCount;

}





var ActionType = doAction('REQ_GET_FORMVALUE', "type", "type");
if (ActionType)
{
	if (ActionType == "categoryList")
	{
		printAllCategories(0);
	}
	else
	if (ActionType == "productCount")
	{
		//getAllItemCount(0); this was my way of counting items before an actual function was written to do so.
		//writeln("count=" + ItemArrayCount);
		writeln("count=" + newItemCount() );
	}
	else
	if (ActionType == "categoryFields")
	{
		printAllProductsInCategory(0);
	}
	else
	if (ActionType == "productList")
	{
		var val = doAction('REQ_GET_FORMVALUE', "start", "start");
		if (val)
			printStartNum = val;

		var val = doAction('REQ_GET_FORMVALUE', "num", "num");
		if (val)
			numToPrint = val;

		printProductSubset(0);
	}
}

</script>
