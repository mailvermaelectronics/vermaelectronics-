<?php
// =====================================
//  Verma Electronics Contact Mailer
// =====================================

// --- SETTINGS ---
$to = "mail.vermaelectronics@gmail.com"; // Your email
$subject = "New Contact Message from Verma Electronics Website";

// --- SANITIZE INPUTS ---
$name    = htmlspecialchars(trim($_POST['name'] ?? ''));
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone   = htmlspecialchars(trim($_POST['phone'] ?? ''));
$message = htmlspecialchars(trim($_POST['message'] ?? ''));

if (!$name || !$email || !$message) {
  echo "❌ Error: Please fill all required fields.";
  exit;
}

// --- BUILD EMAIL ---
$body = "
You have received a new contact form submission from Verma Electronics:

Name: $name
Email: $email
Phone: $phone

Message:
$message
";

$headers  = "From: Verma Electronics <no-reply@yourdomain.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// --- SEND EMAIL ---
if (mail($to, $subject, $body, $headers)) {
  echo "✅ Message sent successfully! We'll get back to you soon.";
} else {
  echo "❌ Error: Unable to send message. Please try again later.";
}
?>
