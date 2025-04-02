<SCRIPT runat="merc_server">


// INITIALIZE THE LANGUAGE LOCALE TO ENGLISH, FOR NOW. WE WILL NEED TO READ 
// THE DEFAULT LOCALE FROM A CONFIG FILE LATER, BUT FOR NOW IT WILL BE HARD-CODED.
var default_locale = "en";

var domain = doActionEx("DATA_GETLITERAL","Result","ObjectName","storecfg","LiteralID","SITE_HTTP_WEBSERVER");
var secureDomain = doActionEx("DATA_GETLITERAL","Result","ObjectName","storecfg","LiteralID","SITE_HTTPS_WEBSERVER");
var httpProtocol = doActionEx("DATA_GETLITERAL","Result","ObjectName","storecfg","LiteralID","SITE_HTTP_PROTOCOL");
var httpsProtocol = doActionEx("DATA_GETLITERAL","Result","ObjectName","storecfg","LiteralID","SITE_HTTPS_PROTOCOL");
var cgi_bin = doActionEx("DATA_GETLITERAL","Result","ObjectName","storecfg","LiteralID","SITE_HTTP_PRIVATE_CGIBIN_ALIAS");
var secureCgi_bin = doActionEx("DATA_GETLITERAL","Result","ObjectName","storecfg","LiteralID","SITE_HTTPS_PRIVATE_CGIBIN_ALIAS");
var baseURL = doActionEx("DATA_GETLITERAL","Result","ObjectName","storecfg","LiteralID","BaseHref");
var merchantdir = doActionEx("DATA_GETLITERAL","Result","ObjectName","storecfg","LiteralID","SITE_HTTP_PRIVATE_DATA_DIR");

if (baseURL && baseURL.length > 0)
{}
else
	var baseURL="Unavailable";


var cjsInc = doActionEx	('DATA_READFILE','common.js', 'FileName', 'common.js','ObjectName', 'JS_SRC', 'FileType', 'txt');
eval (cjsInc);

var shopperURL = "";


var siteUrl =  doAction ('DATA_GETCONFIGDATA',  'ObjectName', 'PageEditorCfg',  
						'RowName', 'PublishLinkHref', 'ColName', 'Value');

var seObj = generateSEObjects (gHOME_PAGE);
if (siteUrl && seObj)
{
	var homePage = gHOME_PAGE+seObj.pageObjArray[gHOME_PAGE][gFILE_EXT];

	shopperURL = siteUrl+homePage;
	/* need to escape spaces out of filename, but we don't want to
	** escape the whole thing, i.e. colons, etc. so we parse after the domain */
	var findPos = shopperURL.indexOf ("//");
	var findPos2 = 0;
	if (findPos >= 0)
		findPos2 = shopperURL.indexOf ("/", findPos+2);
	if (findPos2 < 0)
		findPos2 = 0;	
			
	shopperURL = shopperURL.substring (0, findPos2+1) + escape (shopperURL.substr(findPos2+1));
		
}


/*
writeln("domain=" + domain);
writeln("secureDomain=" + secureDomain);
writeln("httpProtocol=" + httpProtocol);
writeln("httpsProtocol=" + httpsProtocol);
writeln("cgi_bin=" + cgi_bin);
writeln("baseURL=" + baseURL);
writeln("merchantdir=" + merchantdir);
writeln("\n");
*/

var output = "";

for (var i=1; i <= 9; i++)
{

	var key = "key" + i;

	var lookupValue = doAction('REQ_GET_FORMVALUE', key, key);

	if (lookupValue && output && output.length > 1)
		output = output + "&";

	if (lookupValue && lookupValue == "StoreURL")
		output = output + lookupValue + "=" + shopperURL;
	else
	if (lookupValue && lookupValue == "MgrURL")
		output = output + lookupValue + "=" + baseURL;
	else
	if (lookupValue && lookupValue == "Storetype")
		output = output + lookupValue + "=PC";
	else
	if (lookupValue && lookupValue == "Version")
		output = output + lookupValue + "=6.0";
	else
	if (lookupValue && lookupValue == "NonSecureDomain")
		output = output + lookupValue + "=" + httpProtocol + "://" + domain;
	else
	if (lookupValue && lookupValue == "SecureDomain")
		output = output + lookupValue + "=" + httpsProtocol + "://" + secureDomain;
	else
	if (lookupValue && lookupValue == "CGIBinPath")
		output = output + lookupValue + "=" + cgi_bin;
	else
	if (lookupValue && lookupValue == "SecureCGIBinPath")
		output = output + lookupValue + "=" + secureCgi_bin;
	else
	if (lookupValue && lookupValue == "MerchantDir")
		output = output + lookupValue + "=" + merchantdir;
}
writeln(output);
</script>
