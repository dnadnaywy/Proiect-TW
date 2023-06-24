const HTML_TEMPLATE = require("./mail-template.js");
const SENDMAIL = require("./emailProvider.js");

function sendEmail(email, message, subject) {
  const options = {
    from: "bddsolutions.tw@gmail.com", // sender address
    to: email, // receiver email
    subject: "Newsletter Confirmation", // Subject line
    text: message,
    html: HTML_TEMPLATE(message),
  }

  // send mail with defined transport object and mail options
  SENDMAIL(options, (info) => {
    // console.log("Email sent successfully");
    console.log("MESSAGE ID: ", info.messageId);
  });
}

// sendEmail();

module.exports = sendEmail;