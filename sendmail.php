<?php
// filepath: e:\Siraj-Personal\Jayimpex-Static\Jayimpex\sendmail.php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "sirajmargin@gmail.com";
    $subject = "New Contact Form Submission from JayImpex Website";
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $message = htmlspecialchars($_POST["message"]);

    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Message:\n$message\n";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Thank you, $name! Your message has been sent.'); window.location.href='contact.html';</script>";
    } else {
        echo "<script>alert('Sorry, there was an error sending your message. Please try again later.'); window.location.href='contact.html';</script>";
    }
} else {
    header("Location: contact.html");
    exit();
}
?>