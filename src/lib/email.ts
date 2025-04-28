import * as nodemailer from 'nodemailer';

type EmailInfo = {
    to: string;
    subject: string;
    text: string;
}
export const sendEmail = async (mailInfo: EmailInfo) => {
    console.log('send email to', mailInfo.to, mailInfo.subject, mailInfo.text);
    const transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: '1028286644@qq.com', // generated ethereal user
            pass: 'tdwjdkrnangobeef', // generated ethereal password
        },
    })
    transporter.verify(async (error, success) => {
        if (error) {
            console.log('error')
        } else {
            console.log('Server is ready to take our messages')
        }
    });
    return transporter.sendMail({
        from: '"👻" <1028286644@qq.com>', // sender address
        to: mailInfo.to, // list of receivers
        subject: mailInfo.subject, // Subject line
        text: mailInfo.text+'plask', // plain text body
    })
}