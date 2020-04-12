const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

exports.setMail = ( email ) => {
    const msg = {
        to: email,
        from: 'test@example.com',
        subject: 'Register success',
        text: 'Thank you for your application. We will get back to you as soon as possible. Please check your spam folder regularly as e-mails from Thailand might end up there.',
        html: 'Thank you for your application. We will get back to you as soon as possible. Please check your spam folder regularly as e-mails from Thailand might end up there.',
    };
    sgMail.send(msg);
}