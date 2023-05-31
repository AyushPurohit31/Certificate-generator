const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { PDFDocument, degrees, rgb } = require('pdf-lib');

// Read the PNG template file
const templatePath = path.join(__dirname, 'templates/certificate.pdf');
const templateData = fs.readFileSync(templatePath);

// Function to generate the e-certificate
async function generateCertificate(name) {
  const pdfDoc = await PDFDocument.load(templateData);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  firstPage.drawText(name, {
    x: 100,
    y: 100,
    size: 24,
    color: rgb(0, 0, 0),
    rotate: degrees(0),
  });

  const generatedCertificate = await pdfDoc.save();

  return generatedCertificate;
}

// Function to send the e-certificate as a PDF attachment via email
async function sendCertificate(email, certificate) {
  // Implementation of sending email with attachment using Nodemailer
  // Replace the placeholder code with your actual email sending logic
  // Here's an example using a Gmail account with Nodemailer:
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'earnestine.langworth@ethereal.email',
        pass: 'UUxrn55ReTTgnsDU6n'
    }
  });

  const mailOptions = {
    from: 'earnestine.langworth@ethereal.email',
    to: email,
    subject: 'Your e-certificate',
    text: 'Attached is your e-certificate.',
    attachments: [
      {
        filename: 'certificate.pdf',
        content: await certificate,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  generateCertificate,
  sendCertificate,
};
