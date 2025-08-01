// JavaScript to handle contact form submission and send mail to info@jayimpex.net using EmailJS (client-side)
// You must sign up at https://www.emailjs.com/ and replace USER_ID, SERVICE_ID, and TEMPLATE_ID with your values.

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Replace these with your EmailJS credentials
        const SERVICE_ID = 'your_service_id';
        const TEMPLATE_ID = 'your_template_id';
        const USER_ID = 'your_user_id';

        emailjs.init(USER_ID);

        const formData = {
            from_name: form.name.value,
            from_email: form.email.value,
            phone: form.phone.value,
            message: form.message.value,
            to_email: 'info@jayimpex.net'
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, formData)
            .then(function () {
                alert('Message sent successfully!');
                form.reset();
            }, function (error) {
                alert('Failed to send message. Please try again later.');
                console.error(error);
            });
    });
});