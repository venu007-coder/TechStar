<script runat="merc_server">

function includeFile (fileName, objectName)
{
	var incFile = doActionEx	('DATA_READFILE',fileName, 'FileName', fileName,'ObjectName',
								objectName, 'FileType', 'txt');
//	eval (incFile);
	return incFile;
}
</script>

<script runat="merc_server">
function TemplateOn(eventName, templateName, paymentType)
{
	if (templateName == undefined) return false; // not enough arguments
	if (eventName == '' || templateName == '') return false;

	paymentType = parseInt(paymentType);
	if (isNaN(paymentType)) return false;

	var input = GetBDO('Event', eventName, 'Template', templateName, 'PaymentType', paymentType);
	var output = GetBDO();

	var status = ProcessRequest('PORD_ADD_EMAIL_TEMPLATE', input, output);
	return (status == MCERR_NOERROR);
}

function TemplateOff(eventName, templateName, paymentType)
{
	if (templateName == undefined) return false; // not enough arguments
	if (eventName == '' || templateName == '') return false;

	paymentType = parseInt(paymentType);
	if (isNaN(paymentType)) return false;

	var input = GetBDO('Event', eventName, 'Template', templateName, 'PaymentType', paymentType);
	var output = GetBDO();

	var status = ProcessRequest('PORD_REMOVE_EMAIL_TEMPLATE', input, output);
	return (status == MCERR_NOERROR);
}
</script>

<script runat="merc_server">
/* Global Vars */
var which_smAction = doAction('REQ_GET_FORMVALUE', "sm_action", "sm_action");
var SessionID = doAction('ST_GET_STATEDATA','SessionID', 'SessionID');
var pageEdFile = 'PageEditor.xml', pageEdObj = 'XML_SRC';

/* call the action processor */
selectAction (which_smAction);


function selectAction (action)
{

	switch (action)
	{
	case "L":
		var file = doAction('REQ_GET_FORMVALUE', "NextPage", "NextPage");
		var whichFile = doActionEx	('DATA_READFILE',file, 'FileName', file,'ObjectName','QuartzSite', 
					'FileType', 'txt');
		var output = doActionEx('PAR_PARSE_BUFFER','Result', 'document', whichFile);
		write (output);
		break;
	case "PAYMENT": 
              //write("PAYMENT");
	       var task = doAction('REQ_GET_FORMVALUE', 'PAYMENT_TASK', 'PAYMENT_TASK');
              //write(task);
	      switch(task)
              {
		case "clearcommerceconfig":
		     var data = doAction('REQ_GET_FORMVALUE', 'data', 'data');
                     result = doActionBDO('MRA_PAYMENT_CLEARCOMMERCE_CONFIG','data',data);	
                     //write("Content-type: text/html\n\n<HTML>\n<BODY>\n");
			//write("<HTML>\n<BODY>\n");

		    //debug = "Result="+result.Result + "\nDebug=" + result.Debug + "\nStatus=" + result.Status + "\nErrorMessage=" + result.ErrorMessage;
                    //doAction('DATA_WRITEFILE','FileName', 'ConfigDebug.log','ObjectName','PAYMENTDIR','FileType', 'txt', 'Data',debug,'Permissions', 384);

		     write (result.Result); 
		     //write ("<BR>"); 
		     //write (result.Debug); 
		     //write ("<BR>"); 
		     //write (result.Status); 
		     //write ("<BR>"); 
		     //write (result.ErrorMessage); 
                     //write("</BODY>\n</HTML>\n");
                     break;
            
	        case "PaymentEditSave": /* Added by Tom Chang */
	        	//Update payment.cfg file
                	var creditcardtype = "";
                	var defaultcreditcardtypes = "";
                	var selectedcreditcardtypes="";
                	defaultcreditcardtypes   = doActionEx ('DATA_GETCONFIGDATA','Result','ObjectName','PAYMENT','ColName','value','RowName','default_credit_card_types');	
                	var arraydefaultcreditcardtypes    = new Array();
                	arraydefaultcreditcardtypes = defaultcreditcardtypes.split(",");
                	var len = 0;
                	var value = "NO";
                	len = arraydefaultcreditcardtypes.length;
	        	//Update payment.cfg first 
  	        	for (i=0; i < len; i++)
  	        	{
		   	creditcardtype = "";
    		   	creditcardtype = doAction('REQ_GET_FORMVALUE', arraydefaultcreditcardtypes[i],arraydefaultcreditcardtypes[i]);
                   	if (creditcardtype != "" && creditcardtype == arraydefaultcreditcardtypes[i])
                   	{
                      		if (selectedcreditcardtypes != "")
                      		{
                         		selectedcreditcardtypes = selectedcreditcardtypes + ",";
                      		}
                   
                      		selectedcreditcardtypes = selectedcreditcardtypes + creditcardtype;
                   
                   	}
   	         	}//for
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','default_credit_card_types_selected','NewValue',selectedcreditcardtypes);	

			var onlineccauth = "";
                	value = "NO";
    			onlineccauth = doAction('REQ_GET_FORMVALUE', 'onlineccauth','onlineccauth');
                	if (onlineccauth != "" && onlineccauth  == "onlineccauth")
                	{
				value = "YES";
                	}
  
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','online_credit_card_auth','NewValue',value);	

                	value = "NO";
			var offlineccauth = "";
    			offlineccauth = doAction('REQ_GET_FORMVALUE', 'offlineccauth','offlineccauth');
                	if (offlineccauth != "" && offlineccauth  == "offlineccauth")
                	{
                  		value = "YES";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','offline_credit_card_auth','NewValue',value);	

                	value = "NO";
			var offlinechecks = "";
    			offlinechecks = doAction('REQ_GET_FORMVALUE', 'offlinechecks','offlinechecks');
                	if (offlinechecks != "" && offlinechecks  == "offlinechecks")
                	{
				value = "YES";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','offline_checks','NewValue',value);	

                	value = "NO";
			var onlinesubmission = "";
    			onlinesubmission = doAction('REQ_GET_FORMVALUE', 'onlinesubmission','onlinesubmission');
                	if (onlinesubmission != "" && onlinesubmission  == "onlinesubmission")
                	{
				value = "YES";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','ordertype_online_submission','NewValue',value);	

                	value = "NO";
			var codcreditcard = "";
    			codcreditcard  = doAction('REQ_GET_FORMVALUE', 'COD_CREDITCARD','COD_CREDITCARD');
                	if (codcreditcard  != "" && codcreditcard   == "COD_CREDITCARD")
                	{
				value = "YES";
                	}
	
                    	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','cod_creditcard','NewValue',value);	

               		value = "NO";
			var codcheck = "";
    			codcheck = doAction('REQ_GET_FORMVALUE', 'COD_CHECK','COD_CHECK');
                	if (codcheck != "" && codcheck == "COD_CHECK")
                	{
				value = "YES";
                	}
                    	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','cod_check','NewValue',value);	
       
                	value = "NO";
			var codcash = "";
    			codcash = doAction('REQ_GET_FORMVALUE', 'COD_CASH','COD_CASH');
                	if (codcash != "" && codcash == "COD_CASH")
                	{
				value = "YES";
                	}
                    	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','cod_cash','NewValue',value);	
	   
                	value = "NO";
			var codmoneyorder = "";
    			codmoneyorder = doAction('REQ_GET_FORMVALUE', 'COD_CASH','COD_MONEYORDER');
                	if (codmoneyorder != "" && codmoneyorder == "COD_MONEYORDER")
                	{
				value = "YES";
                	}
                     	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','cod_moneyorder','NewValue',value);	
	       
                	value = "NO";
			var codcashierscheck = "";
    			codcashierscheck = doAction('REQ_GET_FORMVALUE', 'COD_CASH','COD_CASHIERSCHECK');
                	if (codcashierscheck  != "" && codcashierscheck == "COD_CASHIERSCHECK")
                	{
				value = "YES";
                	}
                     	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','cod_cashierscheck','NewValue',value);	

                	value = "NO";
			var PurchaseOrder = "";
    			PurchaseOrder = doAction('REQ_GET_FORMVALUE', 'PURCHASEORDER','PURCHASEORDER');
                	if (PurchaseOrder != "" && PurchaseOrder  == "PURCHASEORDER")
                	{
				value = "YES";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','purchaseorder','NewValue',value);	             

                	value = "YES";
			var OnlineCCshopperemail = "";
    			OnlineCCshopperemail = doAction('REQ_GET_FORMVALUE', 'onlineccshopperemail','onlineccshopperemail');
 			/*
	               	if (OnlineCCshopperemail != "" && OnlineCCshopperemail == "onlineccshopperemail")
                	{
				value = "NO";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','onlineccshopperemail','NewValue',value);	             
			*/
               		if (OnlineCCshopperemail != "" && OnlineCCshopperemail == "onlineccshopperemail")
 	               	{
				TemplateOff('ON_ORDER_CREATED', 'OnlineCC_OrderConf_Shopper', 0);
                	}
			else
			{
				TemplateOn('ON_ORDER_CREATED', 'OnlineCC_OrderConf_Shopper', 0);
			}
			

			
               		value = "YES";
			var OnlineCCowneremail = "";
    			OnlineCCowneremail = doAction('REQ_GET_FORMVALUE', 'onlineccowneremail','onlineccowneremail');
			/*
                	if (OnlineCCowneremail != "" && OnlineCCowneremail == "onlineccowneremail")
                	{
				value = "NO";
                	} 
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','onlineccowneremail','NewValue',value);	             
			*/
               		if (OnlineCCowneremail != "" && OnlineCCowneremail == "onlineccowneremail")
                	{
				TemplateOff('ON_ORDER_CREATED', 'OnlineCC_OrderConf_Merchant', 0);
                	}
			else
			{
				TemplateOn('ON_ORDER_CREATED', 'OnlineCC_OrderConf_Merchant', 0);
			}


               		value = "YES";
			var OnlineCCShipmentemail = "";
    			OnlineCCShipmentemail = doAction('REQ_GET_FORMVALUE', 'onlineccshipmentemail','onlineccshipmentemail');
			/*
                	if (OnlineCCShipmentemail != "" && OnlineCCShipmentemail == "onlineccshipmentemail")
                	{
				value = "NO";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','onlineccshipmentemail','NewValue',value);	             
			*/

                	if (OnlineCCShipmentemail != "" && OnlineCCShipmentemail == "onlineccshipmentemail")
                	{
				TemplateOff('ON_ORDER_SHIPPED', 'OnlineCC_OrderShip_Shopper', 0);
                	}
			else
			{
				TemplateOn('ON_ORDER_SHIPPED', 'OnlineCC_OrderShip_Shopper', 0);
			}


                	value = "YES";
			var OfflineCCshopperemail = "";
    			OfflineCCshopperemail = doAction('REQ_GET_FORMVALUE', 'offlineccshopperemail','offlineccshopperemail');
			/* 
               		if (OfflineCCshopperemail != "" && OfflineCCshopperemail == "offlineccshopperemail")
                	{
				value = "NO";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','offlineccshopperemail','NewValue',value);	             
			*/
               		if (OfflineCCshopperemail != "" && OfflineCCshopperemail == "offlineccshopperemail")
                	{
				TemplateOff('ON_ORDER_CREATED', 'OfflineCC_OrderConf_Shopper', 1);
                	}
			else
			{
				TemplateOn('ON_ORDER_CREATED', 'OfflineCC_OrderConf_Shopper', 1);
			}


               		value = "YES";
			var OfflineCCowneremail = "";
    			OfflineCCowneremail = doAction('REQ_GET_FORMVALUE', 'offlineccowneremail','offlineccowneremail');
			/*
                	if (OfflineCCowneremail != "" && OfflineCCowneremail == "offlineccowneremail")
                	{
				value = "NO";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','offlineccowneremail','NewValue',value);	             
			*/
               		if (OfflineCCowneremail != "" && OfflineCCowneremail == "offlineccowneremail")
                	{
				TemplateOff('ON_ORDER_CREATED', 'OfflineCC_OrderConf_Merchant', 1);
                	}
			else
			{
				TemplateOn('ON_ORDER_CREATED', 'OfflineCC_OrderConf_Merchant', 1);
			}
               		value = "YES";
			var OfflineCCShipmentemail = "";
    			OfflineCCShipmentemail = doAction('REQ_GET_FORMVALUE', 'offlineccshipmentemail','offlineccshipmentemail');
			/*
                	if (OfflineCCShipmentemail != "" && OfflineCCShipmentemail == "offlineccshipmentemail")
                	{
				value = "NO";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','offlineccshipmentemail','NewValue',value);	             
			*/

                	if (OfflineCCShipmentemail != "" && OfflineCCShipmentemail == "offlineccshipmentemail")
                	{
				TemplateOff('ON_ORDER_SHIPPED', 'OfflineCC_OrderShip_Shopper', 1);
                	}
			else
			{
				TemplateOn('ON_ORDER_SHIPPED', 'OfflineCC_OrderShip_Shopper', 1);
			}

                	value = "YES";
			var OfflineCheckshopperemail = "";
    			OfflineCheckshopperemail = doAction('REQ_GET_FORMVALUE', 'offlinecheckshopperemail','offlinecheckshopperemail');
			/*
                	if (OfflineCheckshopperemail != "" && OfflineCheckshopperemail == "offlinecheckshopperemail")
                	{
				value = "NO";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','offlinecheckshopperemail','NewValue',value);	             
			*/
                	if (OfflineCheckshopperemail != "" && OfflineCheckshopperemail == "offlinecheckshopperemail")
                	{
				TemplateOff('ON_ORDER_CREATED', 'Check_OrderConf_Shopper', 2);
                	}
			else
			{
				TemplateOn('ON_ORDER_CREATED', 'Check_OrderConf_Shopper', 2);
			}


               		value = "YES";
			var OfflineCheckowneremail = "";
    			OfflineCheckowneremail = doAction('REQ_GET_FORMVALUE', 'offlinecheckowneremail','offlinecheckowneremail');
			/*
                	if (OfflineCheckowneremail != "" && OfflineCheckowneremail == "offlinecheckowneremail")
                	{
				value = "NO";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','offlinecheckowneremail','NewValue',value);	             
			*/

                	if (OfflineCheckowneremail != "" && OfflineCheckowneremail == "offlinecheckowneremail")
                	{
				TemplateOff('ON_ORDER_CREATED', 'Check_OrderConf_Merchant', 2);
                	}
			else
			{
				TemplateOn('ON_ORDER_CREATED', 'Check_OrderConf_Merchant', 2);
			}



               		value = "YES";
			var OfflineCheckShipmentemail = "";
    			OfflineCheckShipmentemail = doAction('REQ_GET_FORMVALUE', 'offlinecheckshipmentemail','offlinecheckshipmentemail');
			/*
                	if (OfflineCheckShipmentemail != "" && OfflineCheckShipmentemail == "offlinecheckshipmentemail")
                	{
				value = "NO";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','offlinecheckshipmentemail','NewValue',value);	             
			*/
                	if (OfflineCheckShipmentemail != "" && OfflineCheckShipmentemail == "offlinecheckshipmentemail")
               		{
				TemplateOff('ON_ORDER_SHIPPED', 'Check_OrderShip_Shopper', 2);
                	}
			else
			{
				TemplateOn('ON_ORDER_SHIPPED', 'Check_OrderShip_Shopper', 2);
			}



                	value = "YES";
			var CODshopperemail = "";
    			CODshopperemail = doAction('REQ_GET_FORMVALUE', 'codshopperemail','codshopperemail');
/*
                	if (CODshopperemail != "" && CODshopperemail == "codshopperemail")
                	{
				value = "NO";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','codshopperemail','NewValue',value);	             
*/
                	if (CODshopperemail != "" && CODshopperemail == "codshopperemail")
               		{
				TemplateOff('ON_ORDER_CREATED', 'COD_OrderConf_Shopper', 3);
                	}
			else
			{
				TemplateOn('ON_ORDER_CREATED', 'COD_OrderConf_Shopper', 3);
			}

               		value = "YES";
			var CODowneremail = "";
    			CODowneremail = doAction('REQ_GET_FORMVALUE', 'codowneremail','codowneremail');
/*
                	if (CODowneremail != "" && CODowneremail == "codowneremail")
                	{
				value = "NO";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','codowneremail','NewValue',value);	             
*/
                	if (CODowneremail != "" && CODowneremail == "codowneremail")
               		{
				TemplateOff('ON_ORDER_CREATED', 'COD_OrderConf_Merchant', 3);
                	}
			else
			{
				TemplateOn('ON_ORDER_CREATED', 'COD_OrderConf_Merchant', 3);
			}


               		value = "YES";
			var CODShipmentemail = "";
    			CODShipmentemail = doAction('REQ_GET_FORMVALUE', 'codshipmentemail','codshipmentemail');
/*
                	if (CODShipmentemail != "" && CODShipmentemail == "codshipmentemail")
                	{
				value = "NO";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','codshipmentemail','NewValue',value);	             
*/                	
			if (CODShipmentemail != "" && CODShipmentemail == "codshipmentemail")
               		{
				TemplateOff('ON_ORDER_SHIPPED', 'COD_OrderShip_Shopper', 3);
                	}
			else
			{
				TemplateOn('ON_ORDER_SHIPPED', 'COD_OrderShip_Shopper', 3);
			}

             		value = "YES";
			var POshopperemail = "";
    			POshopperemail = doAction('REQ_GET_FORMVALUE', 'poshopperemail','poshopperemail');
/*
                	if (POshopperemail != "" && POshopperemail == "poshopperemail")
                	{
				value = "NO";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','poshopperemail','NewValue',value);	             
*/
                	if (POshopperemail != "" && POshopperemail == "poshopperemail")
              		{
				TemplateOff('ON_ORDER_CREATED', 'PO_OrderConf_Shopper', 8);
                	}
			else
			{
				TemplateOn('ON_ORDER_CREATED', 'PO_OrderConf_Shopper', 8);
			}

               		value = "YES";
			var POowneremail = "";
    			POowneremail = doAction('REQ_GET_FORMVALUE', 'poowneremail','poowneremail');
/*
                	if (POowneremail != "" && POowneremail == "poowneremail")
                	{
				value = "NO";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','poowneremail','NewValue',value);	             
*/
                	if (POowneremail != "" && POowneremail == "poowneremail")
              		{
				TemplateOff('ON_ORDER_CREATED', 'PO_OrderConf_Merchant', 8);
                	}
			else
			{
				TemplateOn('ON_ORDER_CREATED', 'PO_OrderConf_Merchant', 8);
			}



               		value = "YES";
			var POShipmentemail = "";
    			POShipmentemail = doAction('REQ_GET_FORMVALUE', 'poshipmentemail','poshipmentemail');
/*
                	if (POShipmentemail != "" && POShipmentemail == "poshipmentemail")
                	{
				value = "NO";
                	}
                	result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','PAYMENT','ColName','value','RowName','poshipmentemail','NewValue',value);	             
*/
                	if (POShipmentemail != "" && POShipmentemail == "poshipmentemail")
              		{
				TemplateOff('ON_ORDER_SHIPPED', 'PO_OrderShip_Shopper', 8);
                	}
			else
			{
				TemplateOn('ON_ORDER_SHIPPED', 'PO_OrderShip_Shopper', 8);
			}


			selectAction ("L");
			break;

	  	case "clearcommerceauthmode": /* Added by Tom Chang */
	                //Update clearcommerce.cfg file
                          var authmode = "";
       		          authmode = doAction('REQ_GET_FORMVALUE', 'authmode','authmode');
                          if (authmode != "")
                          {
	                    result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','CLEARCOMMERCE','ColName','value','RowName','AUTHMODE','NewValue',authmode);	
     	                  }
		        selectAction ("L");
			break;

	  	case "clearcommercemidapp":  /*Added by Tom Chang */

	             //Update clearcommerce.cfg file
                     midappdatetime = new Date();
                     //Update MIDAPPSTATUS
                     result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','CLEARCOMMERCE','ColName','value','RowName','MIDAPPSTATUS','NewValue','YES');
                    //Update MIDAPPDATE
                     result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','CLEARCOMMERCE','ColName','value','RowName','MIDAPPDATE','NewValue',midappdatetime.toString());	
                     //Update AUTHMODE
                     result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','CLEARCOMMERCE','ColName','value','RowName','AUTHMODE','NewValue','Test');	
                     //Update Status
                     //result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','CLEARCOMMERCE','ColName','value','RowName','Status','NewValue','Test');	
                     //Update CONFIGSTATUS
                     result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','CLEARCOMMERCE','ColName','value','RowName','CONFIGSTATUS','NewValue','NO');	
                     //Update CONFIGDATE
                     result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','CLEARCOMMERCE','ColName','value','RowName','CONFIGDATE','NewValue','n/a');	    
                     //Update ClearCommerceStoreNameLive
                     result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','CLEARCOMMERCE','ColName','value','RowName','ClearCommerceStoreNameLive','NewValue','NONE');	    
           		//Update sid
                     result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','CLEARCOMMERCE','ColName','value','RowName','sid','NewValue','NONE');	    
           		//Update KeyFileLive
                     result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','CLEARCOMMERCE','ColName','value','RowName','KeyFileLive','NewValue','NONE');	    
                        //Update SiteID
                     siteid = doAction ('REQ_GET_FORMVALUE','SiteID', 'SiteID');
            	     result = doActionEx('DATA_SETCONFIGDATA','NewValue','ObjectName','CLEARCOMMERCE','ColName','value','RowName','SITEID','NewValue', siteid);

		     selectAction ("L");
                 
		     break;
		}

		break;
		//End of Payment

	case "OrdersDecrypt":
		//
		// Reads the encrypted credit card data and sends the data to
		// the browser, as well as the correct mime type to launch the
		// decryption software.
		//
		var OrdID = doAction('REQ_GET_FORMVALUE', 'OrderID', 'OrderID');
		var filter_string = "OrderID=" + OrdID;
		var qID = doActionEx("DATA_OPENQUERY", "QueryID", "ObjectName", "ORDER_BILLTO", "Filter", filter_string);
		if (qID > 0)
		{
			var resultset = doActionBDO("DATA_GETFIELDDATA", "ObjectName", "ORDER_BILLTO", "QueryID", qID, "FieldName", "ccData");
			if (resultset && resultset.ccData)
			{
				var encData = "Order ID: " + OrdID + "\n" + resultset.ccData;
				var DoDecrypt = true;
			}
			else
			{
				//
				// If there is no encrypted credit card data, then the merchant
				// hasn't set up his encryption software, and no credit card
				// data was saved.  This means that either he is using
				// Clear Commerce or does not accept online orders.
				// A default message is written to the file.
				//
				var encData = "Order ID: " + OrdID + "\r\nOrder was approved.";
				var DoDecrypt = false;
			}
		}
		var closeConn = doAction("DATA_CLOSEQUERY", "QueryID", qID, "ObjectName", "ORDER_BILLTO");

		if (DoDecrypt == true)
		{
			var filename = OrdID + ".olf";
			doAction('REQ_SET_HEADERS', 'Content-Type', 'application/x-mercantec-olf', 'Content-Disposition', ('filename='+filename));
		}
		else
		{
			var filename = OrdID + ".txt";

			//
			// I made this mime type up to force the browser to simply download
			// the file, since no decryption is necessary.
			//
			doAction('REQ_SET_HEADERS', 'Content-Type', 'Orders/mercantec-unencrypted', 'Content-Disposition', ('filename='+filename));
		}

		write(encData);

		//End of OrdersDecrypt
		break;

	case "SecurityAcceptKey":
		var KeyName = doAction('REQ_GET_FORMVALUE', 'SecurityKeyName', 'SecurityKeyName');
		var KeyData = doAction('REQ_GET_FORMVALUE', 'SecurityKeyData', 'SecurityKeyData');
		if (KeyName && KeyData)
		{
			doAction ('DATA_WRITEFILE', 'FileName', 'securityPGP.key', 'Data', 
							KeyData, 'Size', KeyData.length, 'Permissions', 384, 'ObjectName', 'CfgDir');
			doAction ('DATA_SETCONFIGDATA', 'ObjectName', 'SecurityCfg', 'RowName', 
						'PGPKeyName', 'ColName', 'Value', 'NewValue', KeyName);
			doAction ('DATA_SETCONFIGDATA', 'ObjectName', 'SecurityCfg', 'RowName', 
						'PGPKeyObject', 'ColName', 'Value', 'NewValue', 'CfgDir');
			doAction ('DATA_SETCONFIGDATA', 'ObjectName', 'SecurityCfg', 'RowName', 
						'PGPKeyFileName', 'ColName', 'Value', 'NewValue', 'securityPGP.key');
		}
		selectAction ("L");
		break;
	case "Entry":
		//selectAction ("PE_CreatePageNoReload");
		selectAction ("L");
		break;
	case "InfoPage":
		var file = doAction('REQ_GET_FORMVALUE', "TabSelected", "TabSelected");
		write ("<html><body bgcolor='#ffffcc'><H3>Hey, you selected the ");
		write (file + " Tab</H3></body></html>");
		break;
	case "ViewOrder":
		var whichFile = doActionEx('DATA_READFILE', "def_orders2.htm", 'FileName', "def_orders2.htm", 'ObjectName', 'QuartzSite', 'FileType', 'txt');
		var output = doActionEx('PAR_PARSE_BUFFER','Result', 'document', whichFile);
		write (output);
		break;
	case "UploadFile":
		var fileName = doAction('REQ_GET_FORMVALUE', 'FileName', 'FileName');
		var objectName = doAction('REQ_GET_FORMVALUE', 'ObjectName', 'ObjectName');
		var inputLabel = doAction('REQ_GET_FORMVALUE', 'InputLabel', 'InputLabel');
		doAction ('REQ_SAVE_UPLOADEDFILE', 'FileName', fileName, 'ObjectName', objectName, 'InputLabel', inputLabel, 'Permissions', 420 );
		selectAction ("L");
		break;
	case "PleaseWaitBeforeLoading":
		var file = doAction("REQ_GET_FORMVALUE", "NextPage", "NextPage");
		doAction('ST_SET_STATEDATA', 'NextPage', file);

		var whichFile = doActionEx	('DATA_READFILE','please_wait_priv.htm', 'FileName', 
									'please_wait_priv.htm', 'ObjectName','QuartzSite', 
									'FileType', 'txt');
		var output = doActionEx('PAR_PARSE_BUFFER','Result', 'document', whichFile);
		write (output);
		break;
	default:
		writeln ("There was an error...no corresponding action found!  Action=[ " + action + " ]" );
		break;
	}	
}

/* uncomment out the line below for error processing */
//write (doActionEx ("ProcessErrorQueues", "ErrorHTML"));
</script>
