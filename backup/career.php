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
<script type="text/javascript" src="js/rotator.js"></script>
<script src="js/jquery-2.js" type="text/javascript"></script>
<script src="js/jquery.simplemodal.js" type="text/javascript"></script>
<script src="js/basic.js" type="text/javascript"></script>
<script src="js/SpryTabbedPanels.js" type="text/javascript"></script>
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
</script>
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
		
		if(document.cfrm.pnum.value == '' || document.cfrm.pnum.value == '*Phone Number' )
		{
			
			alert('please enter phone number');
			document.cfrm.pnum.focus();
			return false;
		}
		
		if(document.cfrm.cmms.value == '' || document.cfrm.cmms.value == '*Tell us briefly about yourself')
		{
			alert('please enter Tell us briefly about yourself');
			document.cfrm.cmms.focus();
			return false;			
		}
		
		document.cfrm.action = "./sendmail2.php";
		document.cfrm.submit();
		
	}	
</script>

<script type="text/javascript">
function validate1()
	{
		//alert(document.getElementById('email1').value);
		if(document.getElementById('name').value=='Name *')
		{
			alert('Please enter name');
			document.getElementById('name').focus();
			return false;
		}
		
		
		if(document.getElementById('email1').value == 'Email *')
		{
			alert('please enter email');
			document.getElementById('email1').focus();
			return false;
		}
		if(document.getElementById('email1').value !='')
		{
		    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   			var address = document.getElementById('email1').value;
   			if(reg.test(address) == false) {
       			alert('Invalid Email Address');
				document.getElementById('email1').focus();
      			return false;
   			}
		}
		
		if(document.getElementById('jobcode1').value == 'Job Code *')
		{
			
			alert('please enter jobcode');
			document.getElementById('jobcode1').focus();
			return false;
		}
		
		
		if(document.getElementById('note1').value == 'Note*')
		{
			
			alert('please enter note');
			document.getElementById('note1').focus();
			return false;
		}
		
		/*if(document.cfrm.cmms.value == '' || document.cfrm.cmms.value == '*Tell us briefly about yourself')
		{
			alert('please enter Tell us briefly about yourself');
			document.cfrm.cmms.focus();
			return false;			
		}*/
		
		document.cfrm1.action = "./sendmail.php";
		document.cfrm1.submit();
		
	}	
	
	
	
	
	
	
	function validate2()
	{
		//alert(document.getElementById('email1').value);
		if(document.getElementById('name2').value=='Name *')
		{
			alert('Please enter name');
			document.getElementById('name2').focus();
			return false;
		}
		
		
		if(document.getElementById('email2').value == 'Email *')
		{
			alert('please enter email');
			document.getElementById('email2').focus();
			return false;
		}
		if(document.getElementById('email2').value !='')
		{
		    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   			var address = document.getElementById('email2').value;
   			if(reg.test(address) == false) {
       			alert('Invalid Email Address');
				document.getElementById('email2').focus();
      			return false;
   			}
		}
		
		if(document.getElementById('jobcode2').value == 'Job Code *')
		{
			
			alert('please enter jobcode');
			document.getElementById('jobcode2').focus();
			return false;
		}
		
		
		if(document.getElementById('note2').value == 'Note*')
		{
			
			alert('please enter note');
			document.getElementById('note2').focus();
			return false;
		}
		
		/*if(document.cfrm.cmms.value == '' || document.cfrm.cmms.value == '*Tell us briefly about yourself')
		{
			alert('please enter Tell us briefly about yourself');
			document.cfrm.cmms.focus();
			return false;			
		}*/
		
		document.cfrm2.action = "./sendmail.php";
		document.cfrm2.submit();
		
	}	
	
	
	
	function validate3()
	{
		//alert(document.getElementById('email1').value);
		if(document.getElementById('name3').value=='Name *')
		{
			alert('Please enter name');
			document.getElementById('name3').focus();
			return false;
		}
		
		
		if(document.getElementById('email3').value == 'Email *')
		{
			alert('please enter email');
			document.getElementById('email3').focus();
			return false;
		}
		if(document.getElementById('email3').value !='')
		{
		    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   			var address = document.getElementById('email3').value;
   			if(reg.test(address) == false) {
       			alert('Invalid Email Address');
				document.getElementById('email3').focus();
      			return false;
   			}
		}
		
		if(document.getElementById('jobcode3').value == 'Job Code *')
		{
			
			alert('please enter jobcode');
			document.getElementById('jobcode3').focus();
			return false;
		}
		
		
		if(document.getElementById('note3').value == 'Note*')
		{
			
			alert('please enter note');
			document.getElementById('note3').focus();
			return false;
		}
		
		/*if(document.cfrm.cmms.value == '' || document.cfrm.cmms.value == '*Tell us briefly about yourself')
		{
			alert('please enter Tell us briefly about yourself');
			document.cfrm.cmms.focus();
			return false;			
		}*/
		
		document.cfrm3.action = "./career.php";
		document.cfrm3.submit();
		
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
			<li class="inpage"><a href="career.php">Career</a></li>
			<li class="last"><a href="contactus.php">Contact&nbsp;Us</a></li>
		</ul>
    </div>
  </div>
</div>
<!--Header Ends Here-->
<!--Banner Start Here-->
<div id="inner-banner">
	<div class="container">
		<h2>Nurturing <span>relationships for mutual growth</span></h2>
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
					<p><span>August 24, 2011</span><br /><a href="news-events.html">Princeton, New Jersey Altech Star Inc.....</a></p>
				</div>
				<p class="clear"><a href="news-events.html" class="viewallnews-link">View all News &amp; Events</a></p>
			</div>
		</div>
		<!--rgt strip conent code here-->
		<div id="rgt-content">
			<div>
			<h1 class="page-title">Career</h1>
			<div class="service-conentblock1">
				<div class="service-leftcontent1">We believe that our cardiovascular system is our employees. We provide equal employment opportunities to all employees and applicants without regard to race, colour, religion, sex, sexual orientation, national origin, age, disability, military status, or status as a Vietnam-era or special disabled veteran in accordance with applicable federal and state laws. <br /><br />Our employees secure challenging and rewarding projects and positions that advance their individual careers to their fullest potential while making valuable contributions to today's most exciting and innovative technologies.</div>
				<img src="images/career-img.png" alt="" width="255" height="334" class="service-img" />			</div>
			</div>
		<div class="clear">
			<div class="openings-block">
      <ul class="openings-list openings-list-titles">
        <li class="opening-number">Ref #</li>
        <li class="opening-position-title">Position Title</li>
        <li class="opening-location">Location</li>
      </ul>
      <ul class="openings-list openings-list-alt">
        <li class="opening-number">NY0512</li>
        <li class="opening-position-title"> <a href="#" class="position1">Senior Business Systems Analyst</a>
          <div class="opening-popup" id="popup-1" style="display:none">
            <div id="pane1">
              <div id="TabbedPanels1" class="TabbedPanels">
                <ul class="TabbedPanelsTabGroup">
                  <li class="TabbedPanelsTab">Job Discription</li>
                  <li class="TabbedPanelsTab">Apply</li>
                </ul>
                <div class="TabbedPanelsContentGroup">
                  <div class="TabbedPanelsContent">
                    <div class="content_w">
                      <div class="opportunitie1">
                        <div class="jobdtls_row1 jobdtls_row2">
                          <div class="jobtitle">Job Code</div>
                          <div class="job_discription">
                            <p><strong>NY0512</strong></p>
                          </div>
                        </div>
                        <div class="jobdtls_row1">
                          <div class="jobtitle">Title</div>
                          <div class="job_discription">
                            <p><strong>Senior Business Systems Analyst</strong></p>
                          </div>
                        </div>
                        <div class="jobdtls_row1">
                          <div class="jobtitle">Job Location</div>
                          <div class="job_discription">
                            <p><strong>New york,NY</strong></p>
                          </div>
                        </div>
                        <div class="jobdtls_row1">
                          <div class="jobtitle">Qualification</div>
                          <div class="job_discription">
                            <p>Master's Degree in Economics, Mathematics or Engineering</p>
                          </div>
                        </div>
                        <div class="jobdtls_row1">
                          <div class="jobtitle">Experience</div>
                          <div class="job_discription">
                            <p>12 months of previous work experience as Financial or Business Analyst</p>
                          </div>
                        </div>
                        <div class="jobdtls_row1" style="border-bottom:0;">
                          <div class="jobtitle">Skillset</div>
                          <div class="job_discription">
                            <p>Trading and Strategic Risk Management</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
				  
				  
				  
                  <div class="TabbedPanelsContent">
                    <div class="content_w">
                      <div class="career_popup1">
                        <h1>Post Your Resume</h1>
						<form name="cfrm1" action="sendmail.php" method="post" enctype="multipart/form-data">
                        <div class="popup_content1">
                          <div class="clear">
                            <div class="fltlft">
                              <div class="form_row1">
                                <p class="tb1">
                                  <input type="text" name="name" id="name" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'Name *':this.value;" value="Name *" />
                                </p>
                              </div>
                              <div class="form_row1">
                                <p class="tb1">
                                  <input type="text" name="email" id="email1" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'Email *':this.value;" value="Email *" />
                                </p>
                              </div>
                              <div class="form_row1">
                                <p class="tb1">
                                  <input type="text" name="jobcode" id="jobcode1" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'Job Code *':this.value;" value="Job Code *" />
                                </p>
                              </div>
                              <div class="form_row1">
                                <p class="clear">
                                  <input name="file" value="file" type="file" />
                                </p>
                              </div>
                            </div>
                            <div class="fltrt">
                              <div class="form_row1">
                                <p class="ta3">
                                  <textarea onblur="if(this.value=='') this.value='Note*';" onfocus="if(this.value=='Note*') this.value='';" rows="" cols="" name="note1" id="note1">Note*</textarea>
                                </p>
                              </div>
                              <div class="form_row1">
                                <input type="submit" value="" class="sendresume_but" onclick="return validate1()" />
                              </div>
                            </div>
                          </div>
                          <p class="clear"><br />
                            <strong class="read-colour">Please note that all fields marked with * are MANDATORY</strong></p>
                        </div>
						</form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="opening-location">New York</li>
      </ul>
       <ul class="openings-list">
        <li class="opening-number">IL 001</li>
        <li class="opening-position-title"> <a href="#" class="position2">Hadoop Consultant </a>
          <div class="opening-popup" id="popup-2" style="display:none">
            <div id="pane2">
              <div id="TabbedPanels2" class="TabbedPanels">
                <ul class="TabbedPanelsTabGroup">
                  <li class="TabbedPanelsTab">Job Description</li>
                  <li class="TabbedPanelsTab">Apply</li>
                </ul>
                <div class="TabbedPanelsContentGroup">
                  <div class="TabbedPanelsContent">
                    <div class="content_w">
                      <div class="opportunitie1">
                        <div class="jobdtls_row1 jobdtls_row2">
                          <div class="jobtitle">Job Code</div>
                          <div class="job_discription">
                            <p><strong>IL 001 </strong></p>
                          </div>
                        </div>
                        <div class="jobdtls_row1">
                          <div class="jobtitle">Title</div>
                          <div class="job_discription">
                            <p><strong>Hadoop Consultant </strong></p>
                          </div>
                        </div>
                        <div class="jobdtls_row1">
                          <div class="jobtitle">Job Location</div>
                          <div class="job_discription">
                            <p><strong>Chicago, IL </strong></p>
                          </div>
                        </div>
                        <div class="jobdtls_row1">
                          <div class="jobtitle">Qualification</div>
                          <div class="job_discription">
                            <p>Bachelor Degree in the field of Engineering or Computer Science OR Master Degree in Computer Science </p>
                          </div>
                        </div>
                        <div class="jobdtls_row1">
                          <div class="jobtitle">Experience</div>
                          <div class="job_discription">
                            <p>5 years of total experience </p>
                          </div>
                        </div>
                        <div class="jobdtls_row1" style="border-bottom:0;">
                          <div class="jobtitle">Skillset</div>
                          <div class="job_discription">
                            <p>Java with Hadoop technology </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
		 <div class="TabbedPanelsContent">
                    <div class="content_w">
                      <div class="career_popup1">
                        <h1>Post Your Resume</h1>
						<form name="cfrm1" action="sendmail.php" method="post" enctype="multipart/form-data">
                        <div class="popup_content1">
                          <div class="clear">
                            <div class="fltlft">
                              <div class="form_row1">
                                <p class="tb1">
                                  <input type="text" name="name" id="name" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'Name *':this.value;" value="Name *" />
                                </p>
                              </div>
                              <div class="form_row1">
                                <p class="tb1">
                                  <input type="text" name="email" id="email1" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'Email *':this.value;" value="Email *" />
                                </p>
                              </div>
                              <div class="form_row1">
                                <p class="tb1">
                                  <input type="text" name="jobcode" id="jobcode1" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'Job Code *':this.value;" value="Job Code *" />
                                </p>
                              </div>
                              <div class="form_row1">
                                <p class="clear">
                                  <input name="file" value="file" type="file" />
                                </p>
                              </div>
                            </div>
                            <div class="fltrt">
                              <div class="form_row1">
                                <p class="ta3">
                                  <textarea onblur="if(this.value=='') this.value='Note*';" onfocus="if(this.value=='Note*') this.value='';" rows="" cols="" name="note1" id="note1">Note*</textarea>
                                </p>
                              </div>
                              <div class="form_row1">
                                <input type="submit" value="" class="sendresume_but" onclick="return validate1()" />
                              </div>
                            </div>
                          </div>
                          <p class="clear"><br />
                            <strong class="read-colour">Please note that all fields marked with * are MANDATORY</strong></p>
                        </div>
						</form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
       <li class="opening-location">Chicago, IL</li>
      </ul>
    </div>
		<form name="cfrm" action="sendmail2.php" method="post">
			<div class="contacts-form career-form1">
						<h4>Please contact us for employment opportunities.</h4>
						<div class="form-row1">
							<div class="input-tab1"><input type="text" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'*First Name':this.value;" value="*First Name" name="fname"/></div>
							<div class="input-tab1 midd-tab"><input type="text" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'*Last Name':this.value;" value="*Last Name"  name="lname"/></div>
						</div>
						<div class="form-row1">
							<div class="input-tab1"><input type="text" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'*Email Address':this.value;" value="*Email Address" name="email"/></div>
							<div class="input-tab1 midd-tab"><input type="text" onclick="this.value='';" onfocus="this.select()" onblur="this.value=!this.value?'*Phone Number ':this.value;" value="*Phone Number" name="pnum"/></div>
						</div>
						<div class="form-row1">
							<div class="textarea">
								<textarea name="cmms" onblur="if(this.value == '') this.value='*Tell us briefly about yourself';" onfocus="if(this.value == '*Tell us briefly about yourself') this.value='';" rows="" cols="">*Tell us briefly about yourself</textarea>
							</div>
						</div>
						<div class="form-row1">
							<input  type="submit" value=""  class="submit-button" onclick="return validate()"/>
						</div>
					</div>
					</form>
		</div>
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
			<li><a href="contactus.php">Contact Us</a></li>
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
