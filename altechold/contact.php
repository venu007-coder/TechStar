﻿<?php
if(isset($_POST['email'])) {
     
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "raj.chamakura@altechstar.com";
    $email_subject = "Contact Form - Altech star";
     
    function died($error) {
        // your error code can go here
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }
     
    // validation expected data exists
    if(!isset($_POST['first_name']) ||
        //!isset($_POST['last_name']) ||
        !isset($_POST['email']) ||
        //!isset($_POST['telephone']) ||
        !isset($_POST['comments'])) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');      
    }
     
   $first_name = $_POST['first_name']; // required
   $email_from = $_POST['email']; // required
   $comments = $_POST['comments']; // required
     
    $error_message = "";
  
    $string_exp = "^[a-z .'-]+$";
  if(strlen($comments) < 2) {
    $error_message .= 'The Comments you entered do not appear to be valid.<br />';
  }
  if(strlen($error_message) > 0) {
    died($error_message);
  }
    $email_message = "Form details below.\n\n";
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
     
    $email_message .= "NAME : ".clean_string($first_name)."\n";
    $email_message .= "Email : ".clean_string($email_from)."\n";
    $email_message .= "COMMENTS : ".clean_string($comments)."\n";
    
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers); 
?>
 
<!-- include your own success html here -->
Thank you for contacting us. We will be in touch with you very soon.
<p><a href="http://www.altechstar.com/">Back to the site</a></p>
<?php
}
?>