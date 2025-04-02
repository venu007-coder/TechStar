<%
'===============================================================================
Dim mySmartUpload
function sendMail()
	on error resume next
	Dim mailbody
	strBody="More Information on	: " & request("product")&""& Chr(10)&_
			"Message			: " & request("message")&""&Chr(10)&_
			"Name			: " & request("name")&""&Chr(10)&_
			"Designation		: " & request("designation")&""&Chr(10)&_
			"Name of Organization	: " & request("organization")&""&Chr(10)&_
			"Corporate Website URL	: " & request("websiteurl")&""&Chr(10)&_
			"Address			: " & request("address1")&""&Chr(10)&_
			"			: " & request("address2")&""&Chr(10)&_
			"City			: " & request("city")&""&Chr(10)&_
			"Postal Code		: " & request("postalcode")&""&Chr(10)&_
			"Telephone		: " & request("phone")&""&Chr(10)&_
			"Fax			: " & request("fax")&""&Chr(10)&_
			"Email			: " & request("email")&""&Chr(10)

	Set objMailer = Server.CreateObject("Persits.MailSender")
	'change the IP address to either name of mail server or its IP address
	objMailer.Host		= "127.0.0.1"
	if not request("name") ="" then
		objMailer.FromName	= request("name")
	end if
	if not request("email") ="" then
		objMailer.From		= request("email")
	end if
	'change ajay@rage-india.com to mail id at which you want to receive your mails
	objMailer.AddAddress  "sales@altechindia.com","sales"
	objMailer.Subject	= "Contact Form"
	objMailer.Body	= strBody
	objMailer.Send
	if err<>0 then
		response.write "<p>&nbsp;</p><p>&nbsp;</p><p align='center'><B>Failed to send your message,</B> <a href='contact.htm'> "_
				&"please try again !</a>"
	else
	%>
		<p>&nbsp;</p><p>&nbsp;</p><p align="center"><font face="Arial"><big>
		Thank you.</big></font></p><p>&nbsp;</p>
	<%
	end if
	on error goto 0
end function
'===============================================================================
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD>
<TITLE> Altech Star - Contact Us </TITLE>
<META NAME="Generator" CONTENT="EditPlus">
<META NAME="Author" CONTENT="Rage Communications">
<META NAME="Keywords" CONTENT="Altech Star Solutions, Altech Star, IT services, Navision, delivery models, global delivery model, Quality Assurance, Quality Management, software professionals, Off Shore Development Centre, roi, Enterprise solutions, B to B Solutions, e Business Services, Data Warehousing, Business Intellingence, Customer Relationship Management, Supply Chain Management, Mediview, Gastro Expert, GastroView, OB SCAN, BizClaire, Value Insight, Stelar, Chart Weaver, FinAC, Video Endoscopes, health care, digital image management, Retail Banking System">
<META NAME="Description" CONTENT="Altech Star offers cost effective solutions and services with expertise in seamlessly integrating technology and strategy and a global offshore onsite delivery process that ensures optimum benefit both in terms of cost and quality delivery.">
<link rel="stylesheet" href="scripts/stylesheet.css">

<SCRIPT LANGUAGE="JavaScript">
<!--
//Menu Positions Spec
    var agt=navigator.userAgent.toLowerCase();
    var is_major = parseInt(navigator.appVersion);
    var is_minor = parseFloat(navigator.appVersion);
    var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
                && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
                && (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1));
    var is_nav4 = (is_nav && (is_major == 4));
	var ns4 = (is_nav4);
    var is_ie     = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
    var ie4  = (is_ie && (is_major >= 4));
    var ie55  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.5") !=-1));
    var ns6 = (is_nav && (is_major >= 5));

function popup(url,name,prop){
	Hwnd = window.open(url,name,prop);
}
//-->
</SCRIPT>

<SCRIPT LANGUAGE="JavaScript1.2" SRC="scripts/menu.js"></SCRIPT>
</HEAD>

<BODY bgcolor="#FFFFFF" topmargin=5 leftmargin=0 marginwidth=0 marginheight=0  onResize="location.reload();">
<SCRIPT LANGUAGE="JavaScript1.2" SRC="scripts/MenuPosition.js"></SCRIPT>
<SCRIPT LANGUAGE="JavaScript1.2" SRC="scripts/menuvar.js"></SCRIPT>
<TABLE width="768" cellpadding=1 cellspacing=0 border=0 align=center BGCOLOR="#C3D078"><TR><TD><TABLE width="100%" cellpadding=0 cellspacing=0 border=0 BGCOLOR="#FFFFFF"><TR><TD>
<!-- Master Table -->
<TABLE width="100%" cellpadding=0 cellspacing=0 border=0>
<TR>
	<TD width="210" valign=top><A HREF="index.htm"><IMG SRC="images/altechstar_logo.gif" WIDTH="210" HEIGHT="71" BORDER="0" ALT="Altech Star"></A></TD>
	<TD valign=top><TABLE width="250" cellpadding=5 cellspacing=0 border=0 align=right><TR><TD valign=top><FONT FACE="verdana, arial, helvetica" SIZE="-2">&nbsp;&nbsp;<A HREF="default.htm" class=a1>Home</A>&nbsp;&nbsp;|&nbsp;&nbsp;<A HREF="careers.htm" class=a1>Careers</A>&nbsp;&nbsp;|&nbsp;&nbsp;<A HREF="sitemap.htm" class=a1>Sitemap</A>&nbsp;&nbsp;|&nbsp;&nbsp;<A HREF="contact.htm" class=a1>Contact</A>&nbsp;&nbsp;</FONT></TD></TR></TABLE></TD>
</TR>
</TABLE>
<!-- /Master Table -->

<!-- Top Navigation -->
<TABLE width="100%" cellpadding=0 cellspacing=0 border=0>
<TR>
	<TD VALIGN=TOP BGCOLOR="#C3D078"><IMG SRC="images/spacer.gif" WIDTH="1" HEIGHT="1" BORDER="0" ALT=""></TD>
</TR>
<TR>
	<TD BGCOLOR="#818D5E"><TABLE width="100%" cellpadding=0 cellspacing=5 border=0><TR><TD align=right><FONT FACE="verdana, arial, helvetica" SIZE="-2" COLOR="#FFFFFF"><A href="about.htm" onmouseover="javascript:FW_showMenu(window.Menu01,Menu01Left,MenuTop);" onmouseout="mouseoutMenu();" class=a4>About Us</A>&nbsp;&nbsp;|&nbsp;&nbsp;<A href="services.htm" onmouseover="javascript:FW_showMenu(window.Menu02,Menu02Left,MenuTop);" onmouseout="mouseoutMenu();" class=a4>Services</A>&nbsp;&nbsp;|&nbsp;&nbsp;<A HREF="delivery.htm" class=a4>Delivery Models</A>&nbsp;&nbsp;|&nbsp;&nbsp;<A href="products.htm" onmouseover="javascript:FW_showMenu(window.Menu03,Menu03Left,MenuTop);" onmouseout="mouseoutMenu();" class=a4>Products</A>&nbsp;&nbsp;|&nbsp;&nbsp;<A HREF="clients.htm" class=a4>Clients</A>&nbsp;&nbsp;|&nbsp;&nbsp;<A HREF="alliances.htm" class=a4>Alliances</A>&nbsp;&nbsp;</FONT></TD></TR></TABLE></TD>
</TR>
<TR>
	<TD VALIGN=TOP BGCOLOR="#C3D078"><IMG SRC="images/spacer.gif" WIDTH="1" HEIGHT="1" BORDER="0" ALT=""></TD>
</TR>
<TR>
	<TD VALIGN=TOP><IMG SRC="images/contacthd.jpg" WIDTH="766" HEIGHT="126" BORDER="0" ALT=""></TD>
</TR>
<TR>
	<TD VALIGN=TOP COLSPAN=2 BGCOLOR="#C3D078"><IMG SRC="images/spacer.gif" WIDTH="1" HEIGHT="1" BORDER="0" ALT=""></TD>
</TR>
</TABLE>
<!-- /Top Navigation -->

<!-- Body Table -->
<TABLE width="100%" cellpadding=0 cellspacing=0 border=0>
<TR>
	<TD valign=top>
		<TABLE width="100%" cellpadding=0 cellspacing=20 border=0>
			<TR>
				<TD>
					<FONT face="verdana, arial, helvetica" SIZE="-1">
					<%
					call sendMail()
					%>
					</FONT>
				</TD>
			</TR>
		</TABLE>
	</TD>
	<!-- Right Column -->
	<TD valign=top width="150"><TABLE width="100%" cellpadding=5 cellspacing=0 border=0>
		<TR><TD bgcolor="#D7D7D4" align=center><IMG SRC="images/locations.gif" WIDTH="120" HEIGHT="20" BORDER="0" ALT=""></TD></TR>
		<TR bgcolor="#EEEEEE"><TD><FONT FACE="verdana, arial, helvetica" SIZE="-2"><font color="#567200"><B>USA</B>:</font><BR>Altech Star Solutions Inc.,<BR>5, Independence Way,<BR>Suite 300, Princeton,<BR>NJ - 08540<BR>Telephone: 609-514-5109<BR>email:<A HREF="mailto:sales@altechstar.com" class=a3>sales@altechstar.com</A>
		<P><font color="#567200"><B>INDIA</B>:</font><BR>Altech Star Solutions Pvt. Ltd., "Mount Casa Blanca" 1st floor, 260, Anna Salai, Chennai - 600 006. India.<BR>Telephone: 91-44-28510551<BR>/28510574/28510549<BR>email:<A HREF="mailto:sales@altechindia.com" class=a3>sales@altechindia.com</A>
		<P><font color="#567200"><B>UAE</B>:</font><BR>Star Software Solutions Pvt. Ltd., P.O.Box No 5239, Dubai.<BR>Telephone: + 9714 7073165<BR>email:<A HREF="mailto:sales@altechindia.com" class=a3>sales@altechindia.com</A></FONT></TD></TR>
	</TABLE></TD>
	<!-- /Right Column -->
</TR>

<TR>
	<TD bgcolor="#C3D078" colspan=2><IMG SRC="images/spacer.gif" WIDTH="1" HEIGHT="1" BORDER="0" ALT=""></TD>
</TR>
</TABLE>
<!-- /Body Table -->

<!-- Bottom Navigation -->
<TABLE width="100%" cellpadding=5 cellspacing=0 border=0 BGCOLOR="#FFFFFF">
<TR>
	<TD width="120"><A HREF="http://www.navision.com/" target="_blank"><IMG SRC="images/navision.jpg" WIDTH="110" HEIGHT="45" BORDER="0" ALT="Navision Solution Center"></A></TD>
	<TD align=right><FONT FACE="verdana, arial, helvetica" SIZE="-2"><A HREF="about.htm" class=a1>About Us</A>&nbsp;|&nbsp;<A HREF="services.htm" class=a1>Services</A>&nbsp;|&nbsp;<A HREF="delivery.htm" class=a1>Delivery Models</A>&nbsp;|&nbsp;<A HREF="products.htm" class=a1>Products</A>&nbsp;|&nbsp;<A HREF="clients.htm" class=a1>Clients</A>&nbsp;|&nbsp;<A HREF="alliances.htm" class=a1>Alliances</A>
	<br><A HREF="index.htm" class=a1>Home</A>&nbsp;|&nbsp;<A HREF="careers.htm" class=a1>Careers</A>&nbsp;|&nbsp;<A HREF="sitemap.htm" class=a1>Sitemap</A>&nbsp;|&nbsp;<A HREF="contact.htm" class=a1>Contact</A>&nbsp;|&nbsp;<A HREF="privacy.htm" class=a1>Privacy Policy</A>&nbsp;|&nbsp;<A HREF="disclaimer.htm" class=a1>Disclaimer</A>&nbsp;|&nbsp;<A HREF="terms.htm" class=a1>Terms & Conditions</A><P><font color="#808080">© 2003, Altech Star Solutions Pvt. Ltd, India.</FONT></TD>
</TR>
</TABLE>
<!-- /Bottom Navigation -->
</TD><TR></TABLE>
</TD><TR></TABLE>
</BODY>
</HTML>

