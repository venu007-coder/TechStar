<script runat=merc_server>
/*
** Session ID will be set by powershell.exe, since SessionID is a passed in parameter, it tricks
** the broker/shopping cart component into seeing a sessionID of the passed in value.
*/

var count=0;
for (var currentShipTo = MERC_SHOPCART.GetFirstRow("ShipTo"); currentShipTo != "END_OF_TABLE"; currentShipTo = MERC_SHOPCART.GetNextRow("ShipTo",currentShipTo))
{
	for (var itemID = MERC_SHOPCART.GetFirstRow("Items","ShipTo",currentShipTo); itemID != "END_OF_TABLE"; itemID = MERC_SHOPCART.GetNextRow("Items",itemID,"ShipTo",currentShipTo))
	{
		var sku = MERC_SHOPCART.GetField("Items",itemID,"Key");
		if (sku)
		{
			if (count)
				write("\t"+sku);
			else
				write(sku);

			count++;
		}
	}
}
// If not items in cart, return an empty string
if (count == 0)
	write("");
</script>

