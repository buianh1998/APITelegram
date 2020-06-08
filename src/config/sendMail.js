import nodemailer from "nodemailer";
require("dotenv").config();
const adminEmail = process.env.ADMINEMAIL;
const adminPassword = process.env.ADMINPASSWORD;
const adminHost = process.env.ADMINHOST;
const adminPort = process.env.ADMINPORT;

let sendMail = (to, htmlContent) => {
    try {
        let transporter = nodemailer.createTransport({
            host: adminHost,
            port: adminPort,
            secure: false,
            auth: {
                user: adminEmail,
                pass: adminPassword,
            },
        });
        let option = {
            from: adminEmail,
            to: to,
            subject: "Error Message On Day!",
            html: "<h2>HihIHiHIHIh</h2>",
        };
        console.log(option);
        return transporter.sendMail(option);
        // resolve(nodemailer.sendMail(option));
    } catch (error) {
        return console.log(error);
    }
};

module.exports = sendMail;
