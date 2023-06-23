const HTML_TEMPLATE = require("./mail-template.js");
const SENDMAIL = require("./emailProvider.js");

function sendEmail(email) {
  const message = "Hi there, your newsletter confirmation for subscribing at <b>bddsolutions</b> website is here.<br><br>Thank you,<br>BDDSolutions Team"
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