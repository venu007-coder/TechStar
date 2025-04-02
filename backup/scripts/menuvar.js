//Menu Width, Height, FontFace, FontSize, FontColor, FontHighlite, MenuBgcolor, MenuBghiglite, MenuBorder, MenuItemBorder Spec

var MenuHeight=18;
var FontFace="arial,verdana,helvetica";
var FontSize=10;
var MenuBorder=1;
var MenuItemBorder=1;

// Menu 1 Spec
var Menu01Width=100;
var Menu01FontColor="#FFFFFF";
var Menu01FontHighliteColor="#000000";
var Menu01Bgcolor="#818D5E";
var Menu01BgHighlite="#DFE8C0";
var Menu01BorderColor="#C3D078";
var Menu01ItemBorderColor="#C3D078";
var Menu01LiteBgcolor="#C3D078";

// Menu 2 Spec
var Menu02Width=150;
var Menu02FontColor="#FFFFFF";
var Menu02FontHighliteColor="#000000";
var Menu02Bgcolor="#818D5E";
var Menu02BgHighlite="#DFE8C0";
var Menu02BorderColor="#C3D078";
var Menu02ItemBorderColor="#C3D078";
var Menu02LiteBgcolor="#C3D078";

// Menu 3 SubMenu Spec
var SubMenu03Width=150;
var SubMenu03FontColor="#FFFFFF";
var SubMenu03FontHighliteColor="#000000";
var SubMenu03Bgcolor="#648724";
var SubMenu03BgHighlite="#9BB369";
var SubMenu03BorderColor="#C3D078";
var SubMenu03ItemBorderColor="#C3D078";
var SubMenu03LiteBgcolor="#C3D078";

// Menu 3 Spec
var Menu03Width=150;
var Menu03FontColor="#FFFFFF";
var Menu03FontHighliteColor="#000000";
var Menu03Bgcolor="#818D5E";
var Menu03BgHighlite="#DFE8C0";
var Menu03BorderColor="#C3D078";
var Menu03ItemBorderColor="#C3D078";
var Menu03LiteBgcolor="#C3D078";


// Menu 1
    window.Menu01 = new Menu("Menu01", Menu01Width, MenuHeight, FontFace, FontSize, Menu01FontColor, Menu01FontHighliteColor, Menu01Bgcolor, Menu01BgHighlite, MenuBorder, MenuItemBorder, Menu01BorderColor, Menu01ItemBorderColor, Menu01LiteBgcolor);
	Menu01.addMenuItem("Quality Focus",parentUrl+"about/quality.htm");
	Menu01.addMenuItem("Why Altech Star",parentUrl+"about/why.htm");
	Menu01.addMenuItem("Locations",parentUrl+"about/locations.htm");
    Menu01.hideOnMouseOut=true;
/*
	commented for removing Navison
 */
// Menu 02 - SubMenu 01
//	window.SubMenu02_01 = new Menu("Enterprise Solutions", SubMenu02Width, MenuHeight, FontFace, FontSize, SubMenu02FontColor, SubMenu02FontHighliteColor, SubMenu02Bgcolor, SubMenu02BgHighlite, MenuBorder, MenuItemBorder, SubMenu02BorderColor, SubMenu02ItemBorderColor, SubMenu02LiteBgcolor);
//	SubMenu02_01.addMenuItem("Actuate Reporting Services",parentUrl+"services/reportingservices.htm");

// Menu 2
    window.Menu02 = new Menu("Menu02", Menu02Width, MenuHeight, FontFace, FontSize, Menu02FontColor, Menu02FontHighliteColor, Menu02Bgcolor, Menu02BgHighlite, MenuBorder, MenuItemBorder, Menu02BorderColor, Menu02ItemBorderColor, Menu02LiteBgcolor);
/*
 	 commented for removing Navison
*/
//	Menu02.addMenuItem(SubMenu02_01,parentUrl+"services/enter.htm");
	Menu02.addMenuItem("Enterprise Solutions",parentUrl+"services/enter.htm");
	Menu02.addMenuItem("Web Enterprise Solutions",parentUrl+"services/web.htm");
	Menu02.addMenuItem("Data Warehousing & BI",parentUrl+"services/data.htm");
	Menu02.addMenuItem("Application Development",parentUrl+"services/appdev.htm");
	Menu02.addMenuItem("Application Management",parentUrl+"services/appmgmt.htm");
	Menu02.addMenuItem("Actuate Reporting Services",parentUrl+"services/reportingservices.htm");
	Menu02.hideOnMouseOut=true;


   //Menu 03 - SubMenu 01
	window.SubMenu03_01 = new Menu("Health Care", SubMenu03Width, MenuHeight, FontFace, FontSize, SubMenu03FontColor, SubMenu03FontHighliteColor, SubMenu03Bgcolor, SubMenu03BgHighlite, MenuBorder, MenuItemBorder, SubMenu03BorderColor, SubMenu03ItemBorderColor, SubMenu03LiteBgcolor);
	SubMenu03_01.addMenuItem("MediView",parentUrl+"products/medi.htm");
	SubMenu03_01.addMenuItem("GastroView",parentUrl+"products/gastrov.htm");
   	SubMenu03_01.addMenuItem("Gastro Expert",parentUrl+"products/gastro.htm");
    	SubMenu03_01.addMenuItem("OB SCAN",parentUrl+"products/obscan.htm");

	   //Menu 03 - SubMenu 02
	window.SubMenu03_02 = new Menu("Manufacturing", SubMenu03Width, MenuHeight, FontFace, FontSize, SubMenu03FontColor, SubMenu03FontHighliteColor, SubMenu03Bgcolor, SubMenu03BgHighlite, MenuBorder, MenuItemBorder, SubMenu03BorderColor, SubMenu03ItemBorderColor, SubMenu03LiteBgcolor);
	SubMenu03_02 .addMenuItem("BizClaire",parentUrl+"products/bizclaire.htm");
	//SubMenu03_02 .addMenuItem("Value Insight",parentUrl+"products/value.htm");
   	SubMenu03_02 .addMenuItem("FinAC",parentUrl+"products/finac.htm");

  //Menu 03 - SubMenu 03
	window.SubMenu03_03 = new Menu("Banking", SubMenu03Width, MenuHeight, FontFace, FontSize, SubMenu03FontColor, SubMenu03FontHighliteColor, SubMenu03Bgcolor, SubMenu03BgHighlite, MenuBorder, MenuItemBorder, SubMenu03BorderColor, SubMenu03ItemBorderColor, SubMenu03LiteBgcolor);
	SubMenu03_03.addMenuItem("Stelar",parentUrl+"products/stelar.htm");
	//SubMenu03_03.addMenuItem("Value Insight",parentUrl+"products/value.htm");

//Menu 03 - SubMenu 04
	window.SubMenu03_04 = new Menu("Business Intelligence", SubMenu03Width, MenuHeight, FontFace, FontSize, SubMenu03FontColor, SubMenu03FontHighliteColor, SubMenu03Bgcolor, SubMenu03BgHighlite, MenuBorder, MenuItemBorder, SubMenu03BorderColor, SubMenu03ItemBorderColor, SubMenu03LiteBgcolor);
	SubMenu03_04.addMenuItem("Value Insight",parentUrl+"products/value.htm");
	SubMenu03_04.addMenuItem("ChartWeaver",parentUrl+"products/chart.htm");

//Menu 03 - SubMenu 05
//	window.SubMenu03_05 = new Menu("Information Technology", SubMenu03Width, MenuHeight, FontFace, FontSize, SubMenu03FontColor, SubMenu03FontHighliteColor, SubMenu03Bgcolor, SubMenu03BgHighlite, MenuBorder, MenuItemBorder, SubMenu03BorderColor, SubMenu03ItemBorderColor, SubMenu03LiteBgcolor);
	//SubMenu03_05.addMenuItem("ChartWeaver",parentUrl+"products/chart.htm");
    	
// Menu 3
    window.Menu03 = new Menu("Menu03", Menu03Width, MenuHeight, FontFace, FontSize, Menu03FontColor, Menu03FontHighliteColor, Menu03Bgcolor, Menu03BgHighlite, MenuBorder, MenuItemBorder, Menu03BorderColor, Menu03ItemBorderColor, Menu03LiteBgcolor);
    Menu03.addMenuItem(SubMenu03_01,parentUrl+"products/medi.htm");  
    Menu03.addMenuItem(SubMenu03_02,parentUrl+"products/bizclaire.htm");
	 Menu03.addMenuItem(SubMenu03_04,parentUrl+"products/value.htm");
    Menu03.addMenuItem(SubMenu03_03,parentUrl+"products/stelar.htm");
   
   // Menu03.addMenuItem(SubMenu03_05,"#");


/*    Commented to remove the existing product main list and added it in the sub menu list
       Menu03.addMenuItem("BizClaire",parentUrl+"products/bizclaire.htm");
	Menu03.addMenuItem("Value Insight",parentUrl+"products/value.htm");
	Menu03.addMenuItem("ChartWeaver",parentUrl+"products/chart.htm");
	Menu03.addMenuItem("FinAC",parentUrl+"products/finac.htm");
	//Menu03.addMenuItem("Gastro Expert",parentUrl+"products/gastro.htm");
	//Menu03.addMenuItem("GastroView",parentUrl+"products/gastrov.htm");
	//Menu03.addMenuItem("MediView",parentUrl+"products/medi.htm");
	//Menu03.addMenuItem("OB SCAN",parentUrl+"products/obscan.htm");
	Menu03.addMenuItem("Stelar",parentUrl+"products/stelar.htm");

*/
	Menu03.hideOnMouseOut=true;
	


	Menu03.writeMenus();