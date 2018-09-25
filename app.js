const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const nodemailer = require("nodemailer");

//bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;
//open postman and make a post request and contain body name and message and click send this will send mail with your name and message
app.post("/send", (req, res) => {
  const output = `
  <p>name: ${req.body.name}</p>
  <p>message:${req.body.message}</p>`;

  console.log(output);
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "", //enter your host for mailgun it will be like smtp.mailgun.org
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "", // generated ethereal user
        pass: "" // generated ethereal password
      },
      tls: {
        refectUnauthorized: false
      } //this is used for sending mails when your in local pc
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Pratheep👻"', // sender address
      to: "vrpratheep22@gmail.com", // list of receivers
      subject: "Nodemailer", // Subject line
      text: "Hello world?", // plain text body
      html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
});

app.listen(port, () => console.log(`server is running on port ${port}`));
