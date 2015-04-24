<?php
$url = 'http://carleyma.co.uk';
//$myemail = 'carley_oates@yahoo.com';
$myemail = 'brenoates@gmail.com';
//grab named inputs from html then post to #thanks
if (isset($_POST['contact_form_name'])) {
$name = strip_tags($_POST['contact_form_name']);
$email = strip_tags($_POST['contact_form_email']);
$message = strip_tags($_POST['contact_form_message']);

//generate email and send!
$to = $myemail;
$email_subject = "Contact form submission: $name";
$email_body = "You have received a new message. ".
" Here are the details:\n Name: $name \n ".
"Email: $email\n Message \n $message";
$headers = "From: $myemail\n";
$headers .= "Reply-To: $email";
mail($to,$email_subject,$email_body,$headers);
}
header("Location: $url");
?>