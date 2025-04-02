<script runat=merc_server>

// INITIALIZE THE LANGUAGE LOCALE TO ENGLISH, FOR NOW. WE WILL NEED TO READ 
// THE DEFAULT LOCALE FROM A CONFIG FILE LATER, BUT FOR NOW IT WILL BE HARD-CODED.
var default_locale = "en";

var OrderBillTo="";
var OrderShipTo="";
var OrderSummary="";
var OrderItems = new Array();
var OrderItemCount = 0;
var region = "";
var subRegion = "";
var country = "";

function Item(theOrderID, theSequence, theDescriptionID, theDiscount, theExtended, theKey, 
		theDiscountType, thePrice, theQuantity, theShipTo, theTotal, theDiscountAmount, theTax)
{
	if (!theExtended)
		theExtended="";

	this.OrderID = theOrderID;
	this.Sequence = theSequence;
	this.DescriptionID = theDescriptionID;
	this.Discount = theDiscount;
	this.Extended = theExtended;
	this.Key = theKey;
	this.DiscountType = theDiscountType;
	this.Price = thePrice;
	this.Quantity = theQuantity;
	this.ShipTo = theShipTo;
	this.Total = theTotal;
	this.DiscountAmount = theDiscountAmount;
	this.Tax = theTax;
}

function getOrderSummary()
{
	var ret_val = false;

	var filter = "OrderID=" + OrderID;
	var qID = doActionEx("DATA_OPENQUERY", "QueryID","ObjectName", "ORDER_SUMMARY", "Filter", filter);

	if(!doActionEx("DATA_ISEOF","Result","QueryID",qID, "ObjectName", "ORDER_SUMMARY"))
	{
		OrderSummary = doActionBDO("DATA_GETROWDATA","ObjectName", "ORDER_SUMMARY", "QueryID",qID);
		if (OrderSummary.OrderID == OrderID)
			ret_val = true;
	}
	var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",qID,"ObjectName", "ORDER_SUMMARY");
	return ret_val;
}

function getOrderBillTo()
{
	var ret_val = false;

	var filter = "OrderID=" + OrderID;
	var qID = doActionEx("DATA_OPENQUERY", "QueryID","ObjectName", "ORDER_BILLTO", "Filter", filter);

	if(!doActionEx("DATA_ISEOF","Result","QueryID",qID, "ObjectName", "ORDER_BILLTO"))
	{
		OrderBillTo = doActionBDO("DATA_GETROWDATA","ObjectName", "ORDER_BILLTO", "QueryID",qID);
		if (OrderBillTo.OrderID == OrderID)
			ret_val = true;
	}
	var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",qID,"ObjectName", "ORDER_BILLTO");
	return ret_val;
}

function getOrderShipTo()
{
	var ret_val = false;

	var filter = "OrderID=" + OrderID;
	var qID = doActionEx("DATA_OPENQUERY", "QueryID","ObjectName", "ORDER_SHIPTO", "Filter", filter);

	if(!doActionEx("DATA_ISEOF","Result","QueryID",qID, "ObjectName", "ORDER_SHIPTO"))
	{
		OrderShipTo = doActionBDO("DATA_GETROWDATA","ObjectName", "ORDER_SHIPTO", "QueryID",qID);
		if (OrderShipTo.OrderID == OrderID)
			ret_val = true;
	}
	var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",qID,"ObjectName", "ORDER_SHIPTO");
	return ret_val;
}


function getOrderDetail()
{
	var ret_val = false;

	var filter = "OrderID=" + OrderID;
	var qID = doActionEx("DATA_OPENQUERY", "QueryID","ObjectName", "ORDER_ITEMS", "Filter", filter);

	while(!doActionEx("DATA_ISEOF","Result","QueryID",qID, "ObjectName", "ORDER_ITEMS"))
	{
		var item = doActionBDO("DATA_GETROWDATA","ObjectName", "ORDER_ITEMS", "QueryID",qID);
		if (item)
		{
			OrderItems[OrderItemCount] = new Item(item.OrderID, item.Sequence, item.DescriptionID, item.Discount, item.Extended, item.Key, 
					item.DiscountType, item.Price, item.Quantity, item.ShipTo, item.Total, item.DiscountAmount, item.Tax);
			OrderItemCount++;

			//writeln("<br>\nID=",item.OrderID, " Seq=", item.Sequence, " DescID=", item.DescriptionID);
			//writeln("Extended=",item.Extended, " Key=", item.Key, " DiscountType=", item.DiscountType, " Price=", item.Price, " Qty=", item.Quantity);
			//writeln("ShipTo=", item.ShipTo, " Total=", item.Total, " DiscAmount=", item.DiscountAmount, " Tax=", item.Tax , "\n<br>");
		}
		var movednext=doActionEx("DATA_MOVENEXT","Result","ObjectName","ORDER_ITEMS","QueryID",qID);
	}
	var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",qID,"ObjectName", "ORDER_ITEMS");
	return OrderItemCount;
}

function getRegion(regionID)
{
	var ret_val = false;

	var filter = "ID=" + regionID;
	var qID = doActionEx("DATA_OPENQUERY", "QueryID", "ObjectName", "TAX_REGION", "Filter", filter);

	if(!doActionEx("DATA_ISEOF", "Result", "QueryID", qID, "ObjectName", "TAX_REGION"))
	{
		resultBDO  = doActionBDO("DATA_GETROWDATA", "ObjectName", "TAX_REGION", "QueryID", qID);
		if (resultBDO && resultBDO.SHORTNAME)
		{
			region = resultBDO.SHORTNAME;
			ret_val = true;
		}
	}

	var closeConn = doAction("DATA_CLOSEQUERY", "QueryID", qID, "ObjectName", "TAX_REGION");
	return ret_val;
}

function getSubRegion(subRegionID)
{
	var ret_val = false;

	var filter = "ID=" + subRegionID;

	writeln("subRegionID=" + subRegionID);

	var qID = doActionEx("DATA_OPENQUERY", "QueryID", "ObjectName", "TAX_SUBREGION", "Filter", filter);

	if(!doActionEx("DATA_ISEOF","Result", "QueryID", qID, "ObjectName", "TAX_SUBREGION"))
	{
		resultBDO  = doActionBDO("DATA_GETROWDATA", "ObjectName", "TAX_SUBREGION", "QueryID", qID);
		if (resultBDO && resultBDO.SHORTNAME)
		{
			subRegion = resultBDO.SHORTNAME;
			ret_val = true;
		}
	}
	var closeConn = doAction("DATA_CLOSEQUERY", "QueryID", qID, "ObjectName", "TAX_SUBREGION");
	return ret_val;
}

function getCountry(countryID)
{
	var ret_val = false;

	var filter = "ID=" + countryID;
	var qID = doActionEx("DATA_OPENQUERY", "QueryID", "ObjectName", "TAX_COUNTRY", "Filter", filter);

	if(!doActionEx("DATA_ISEOF","Result", "QueryID", qID, "ObjectName", "TAX_COUNTRY"))
	{
		resultBDO  = doActionBDO("DATA_GETROWDATA", "ObjectName", "TAX_COUNTRY", "QueryID", qID);
		if (resultBDO && resultBDO.SHORTNAME)
		{
			country = resultBDO.SHORTNAME;
			ret_val = true;
		}
	}
	var closeConn = doAction("DATA_CLOSEQUERY", "QueryID",qID, "ObjectName", "TAX_COUNTRY");
	return ret_val;
}

function getOrderInfo()
{
	if (!getOrderSummary())
	{
		write("Error getting getOrderSummary");
		return false;
	}

	if (!getOrderBillTo())
	{
		write("Error getting OrderBillTo");
		return false;
	}

	if (!getOrderShipTo())
	{
		write("Error getting OrderShipTo");
		return false;
	}

	if (!getOrderDetail())
	{
		write("Error getting OrderDetail");
		return false;
	}
	
	if(!getCountry(OrderBillTo.Country))
	{
		write("Error getting Country");
		return false;
	}

	if(!getRegion(OrderBillTo.Region))
	{
		write("Error getting Region");
		return false;
	}


	writeln("Customer Name: ", OrderBillTo.BillToName);
	writeln("Order Number: ", OrderID, "\n");
	writeln("CRM Query: ", OrderBillTo.crmquery,"\n");

	writeln("Customer Address:\n", OrderBillTo.BillToName);
	writeln(OrderBillTo.Address1);
	writeln(OrderBillTo.Address2);
	writeln(OrderBillTo.SubRegion, ", ", region, " ", OrderBillTo.PostalCode, " ", country);
	writeln("Daytime Phone: ", OrderBillTo.DaytimePhone);
	writeln("Evening Phone: ", OrderBillTo.EveningPhone);
	writeln("E-mail address: ", OrderBillTo.EmailAddress,"\n");

	if(!getCountry(OrderShipTo.Country))
	{
		write("Error getting Country");
		return false;
	}

	if(!getRegion(OrderShipTo.Region))
	{
		write("Error getting Region");
		return false;
	}

	writeln("Shipping Address:\n", OrderShipTo.ShipToName);
	writeln(OrderShipTo.Address1);
	writeln(OrderShipTo.Address2);
	writeln(OrderShipTo.SubRegion, ", ", region, " ", OrderShipTo.PostalCode, " ", country);


	writeln("Products");
	for (var i=0; i < OrderItemCount; i++)
	{
		writeln("ProductSKU", i+1,"=", OrderItems[i].Key);
		writeln("ProductQty", i+1,"=", OrderItems[i].Quantity);
		writeln("ProductPrice", i+1,"=", OrderItems[i].Price);
		writeln("ProductTotal", i+1,"=", OrderItems[i].Total);
	}

	writeln("Total Shipping: ", OrderSummary.TotalShipping);
	writeln("Sales Tax: ", OrderSummary.TaxTotal);
	writeln("Order Total: ", OrderSummary.GrandTotal);

	writeln("* * * * * * * * * * * * * * * * * * * * * * * * * ");

}

getOrderInfo();

</script>
