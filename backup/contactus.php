<?php 

if($_SERVER['REQUEST_METHOD'] == 'POST')
{	
	$msg  ="<table><tr><td>First name</td><td>";
	$msg .=$_POST['fname'];
	$msg .="</td></tr><tr><td>Last nmae</td><td>";
	$msg .=$_POST['lname'];
	$msg .="</td></tr>";
	
	$msg.="<tr><td>Email</td><td>";
	$msg .=$_POST['email'];
	$msg .="</td></tr><tr><td>Company</td><td>";
	$msg .=$_POST['cname'];
	$msg .="</td></tr>";
	
	if(!empty($_POST['address']) && $_POST['address'] != 'Address')
	{
		$msg .="<tr><td>Address</td><td>";
		$msg .= $_POST['address'];
		$msg .="</td></tr>";
		
	}
	if(!empty($_POST['state']) && $_POST['state'] != 'State')
	{
		$msg .="<tr><td>state</td><td>";
		$msg .= $_POST['state'];
		$msg .="</td></tr>";
		
	}
	if(!empty($_POST['zip']) && $_POST['zip'] != 'Zip/Postalcode')
	{
		$msg .="<tr><td>Zip/Postalcode</td><td>";
		$msg .= $_POST['zip'];
		$msg .="</td></tr>";
		
	}
	$msg .="<tr><td>Phone number </td><td>";
	$msg .= $_POST['pnum'];
	$msg .="</td></tr>";
	if(!empty($_POST['fax']) && $_POST['fax'] != 'Fax')
	{
		$msg .="<tr><td>Fax</td><td>";
		$msg .= $_POST['fax'];
		$msg .="</td></tr>";		
	}
	$msg .="<tr><td>Comments</td><td>";
	$msg .= $_POST['cmms'];
	$msg .="</td></tr></table>";
	

	$headers = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	$subject = 'requesting information';

// Additional headers
$headers .= 'To: contact@altechstar.com' . "\r\n";
$headers .= 'From: '.$_POST['email'].  "\r\n";

mail ('contact@altechstar.com',$subject,$msg,$headers);
header('location:thanks.html');
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="author" content="Websitename" />
<meta name="keywords" content="Websitename" />
<meta name="description" content="Websitename" />
<meta name="language" content="English" />
<title>Welcome to Altech Star</title>
<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
<link href="css/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript">
	$(document).ready(
		function(){
			$(".btn-slide").click(function(){
			$("#newslettersignup").slideToggle("slow");
			$(this).toggleClass("active"); return false;
		});
			$('.close-icon').click(function()
		{
		$("#newslettersignup").slideUp("slow");
		});
	
	});
	
function validate()
	{
		if(document.cfrm.fname.value=='' || document.cfrm.fname.value=='*First Name')
		{
			alert('Please enter first name');
			document.cfrm.fname.focus();
			return false;
		}
		if(document.cfrm.lname.value == '' || document.cfrm.lname.value=='*Last Name')
		{
			alert('please enter last name');
			document.cfrm.lname.focus();
			return false;
		}
		if(document.cfrm.email.value == '' || document.cfrm.email.value == '*Email Address')
		{
			alert('please enter email');
			document.cfrm.email.focus();
			return false;
		}
		if(document.cfrm.email.value !='')
		{
		    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   			var address = document.cfrm.email.value;
   			if(reg.test(address) == false) {
       			alert('Invalid Email Address');
				document.cfrm.email.focus();;
      			return false;
   			}
		}
		if(document.cfrm.cname.value =='' || document.cfrm.cname.value =='*Company')
		{
			alert('please enter company name');
			document.cfrm.cname.focus();
			return false;
		}
		if(document.cfrm.pnum.value == '' || document.cfrm.pnum.value == '*Phone Number' )
		{
			
			alert('please enter phone number');
			document.cfrm.pnum.focus();
			return false;
		}
		
		if(document.cfrm.cmms.value == '' || document.cfrm.cmms.value == '*Comments')
		{
			alert('please enter comments');
			document.cfrm.cmms.focus();
			return false;			
		}
		
		document.cfrm.action = "./contactus.php";
		document.cfrm.submit();
		
	}	
</script>
<!--[if IE 6]>
	<style type="text/css">
		img, div, p, span, { behavior: url(iepngfix.htc) }
	</style>
    <script type="text/javascript" language="javascript" src="js/iepngfix.js"></script>
<![endif]-->
</head>
<body>
<!--Header Starts Here-->
<div id="header">
  <div class="container">
  	<div id="logo"><a href="index.html"><img src="images/logo.png" alt="" width="222" height="96" /></a></div>
    <div id="header-rgt">
    	<div class="clear1">&nbsp;</div>
		<ul id="menu">
			<li><a href="index.html">Home</a></li>
			<li><a href="#">Company</a>
				<ul>
					<li><a href="aboutus.html">About Us</a></li>
					<li><a href="philosophy.html">Philosophy</a></li>
					<li><a href="csr.html">CSR</a></li>
				</ul>
			</li>
			<li><a href="#">Services</a>
				<ul>
					<li><a href="services-healthcare.html">Healthcare</a></li>
					<li><a href="services-it.html">IT</a></li>
					<li><a href="services-staffing.html">Staffing</a></li>
					<li><a href="services-bpo.html">BPO</a></li>
				</ul>
			</li>
			<li><a href="career.php">Career</a></li>
			<li class="last inpage"><a href="contactus.php">Contact&nbsp;Us</a></li>
		</ul>
    </div>
  </div>
</div>
<!--Header Ends Here-->
<!--Banner Start Here-->
<div id="inner-banner" class="contact-banner">
	<div class="container">
		<h2 style="font-size:100px">@ </h2>
	</div>
</div>
<!--Banner end Here-->
<!--Content Starts Here-->
<div id="wrapper">
  <div class="container">
  	<div id="content">
		<!--left strip HTML code here-->
		<div id="sidebar">
			<div class="latestnews">
				<h2>News &amp; Events</h2>
				<div class="news1">
					<p><span>August 24, 2011</span><br /><a href="news-events.html">Princeton, New Jersey Altech Star Inc...</a></p>
				</div>
				<div class="news1">
					<p><span>September 2011</span><br /><a href="news-events.html">Saint Joseph Mercy Health System in Michigan has signed with Hallmark Healthcare for its “Einstein II” workforce optimizer solution...</a></p>
				</div>
				<div class="news1">
					<p><span>September 2011</span><br /><a href="news-events.html">Trinity Health (at the IT Corporate level) has signed a contract with Hallmark Health as their certified software service vendor...</a></p>
				</div>
				<p class="clear"><a href="news-events.html" class="viewallnews-link">View all News &amp; Events</a></p>
			</div>
		</div>
		<!--rgt strip conent code here-->
		<div id="rgt-content">
			<div class="contact-details">
				<img src="images/contactus-img.png" alt="" width="266" height="341" class="contactus-img" />
				<h1>Our Contact Details</h1>
				<div class="contact-address">
					<p><strong class="green-title">Altech Star Inc.Locations</strong>USA:<br />186 Princeton-Hightstown Road<br />Bldg 3, Suite 10<br />West Windsor, NJ 08550<br /><br />
                    <strong>Phone:</strong> 609-520-9000<br /><strong>email:</strong><a href="mailto:contact@altechstar.com">contact@altechstar.com</a></p>
                    
                    <p><strong class="green-title"></strong>INDIA:<br />DP-111 (S.P) F-18A, Ambattur Industrial Estate,<br />Chennai - 600 058<br /><br />4th Main Road, Siruseri<br />Chennai - 603 103<br /><br />
                    <strong>Phone:</strong> 91-44- 2635 0145 / 2635 0146<br /><strong>email:</strong><a href="mailto:contact@altechbpo.com">contact@altechbpo.com</a></p>
                    
                    <!--<p><strong class="green-title">UAE :</strong>Star Software Solutions Pvt. Ltd., <br />P.O.Box No 5239, <br />Dubai.<br />
                    <strong>Phone:</strong> + 9714 7073165<br /><strong>email:</strong><a href="mailto:contact@altechbpo.com">contact@altechbpo.com</a></p>-->
					 
					 
				</div>
				 
			</div>
			<form name="cfrm" method="post" >
			<div class="contacts-form">
				<h4>Please feel free to contact us for any queries.</h4>
				<div class="form-row1">
					<div class="input-tab1"><input type="text" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'*First Name':this.value;" value="*First Name" name="fname"/></div>
					<div class="input-tab1 midd-tab"><input type="text" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'*Last Name':this.value;" value="*Last Name"  name="lname"/></div>
					<div class="input-tab1"><input type="text" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'*Email Address':this.value;" value="*Email Address" name="email"/></div>
				</div>
				<div class="form-row1">
					<div class="input-tab1"><input type="text" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'*Company':this.value;" value="*Company" name="cname"/></div>
					<div class="input-tab1 midd-tab"><input type="text" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'Address':this.value;" value="Address" name="address"/></div>
					<div class="input-tab1"><input type="text" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'State':this.value;" value="State" name="state"/></div>
				</div>
				<div class="form-row1">
					<div class="input-tab1"><input type="text" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'Zip/Postalcode':this.value;" value="Zip/Postalcode" name="zip"/></div>
					<div class="input-tab1 midd-tab"><input type="text" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'*Phone Number ':this.value;" value="*Phone Number" name="pnum"/></div>
					<div class="input-tab1"><input type="text" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'Fax ':this.value;" value="Fax" name="fax"/></div>
				</div>
				<div class="form-row1">
					<div class="textarea">
						<textarea cols="" rows="" onfocus="if(this.value == '*Comments') this.value='';" onblur="if(this.value == '') this.value='*Comments';"  name="cmms">*Comments</textarea>
					</div>
				</div>
				<div class="form-row1">
					<input type="button" class="submit-button"  onclick="return validate()"/>
				</div>
			</div>
			</form>
		</div>
	</div>
  </div>
</div>
<!--Content Ends Here-->
<!--Footer Starts Here-->
<div id="footer">
  <div class="container">
  	<div class="fltlft">
		<ul>
			<li><a href="index.html">Home</a></li>
			<li>|</li>
			<li><a href="aboutus.html">About Us</a></li>
			<li>|</li>
			<li><a href="services-healthcare.html">Services</a></li>
			<li>|</li>
			<li><a href="philosophy.html">Philosophy</a></li>
			<li>|</li>
			<li><a href="news-events.html">News &amp; Events</a></li>
			<li>|</li>
			<li><a href="career.php">Career</a></li>
			<li>|</li>
			<li><a href="contactus.html">Contact Us</a></li>
		</ul>
		<p>Copyright &copy; 2011. Altechstar. All rights reserved</p>
    </div>
	<p class="designby">Design &amp; Developed by <a href="http://www.acedezines.com/" target="_blank">ACEDEZINES</a></p>
  </div>
</div>
<!--Footer Ends Here-->
<script type="text/javascript">
	var TabbedPanels1 = new Spry.Widget.TabbedPanels("TabbedPanels1");
	var TabbedPanels1 = new Spry.Widget.TabbedPanels("TabbedPanels2");
	var TabbedPanels1 = new Spry.Widget.TabbedPanels("TabbedPanels3");
	var TabbedPanels1 = new Spry.Widget.TabbedPanels("TabbedPanels4");
	var TabbedPanels1 = new Spry.Widget.TabbedPanels("TabbedPanels5");
	var TabbedPanels1 = new Spry.Widget.TabbedPanels("TabbedPanels6");
</script>
</body>
</html>
