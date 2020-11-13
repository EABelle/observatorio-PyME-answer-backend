import {User} from '../domain/User';
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    }
});
const mailOptions = {
    from: 'Remitente',
    subject: 'Enviando desde nodemailer',
    text: 'Hola mundo'
};

export class EmailService {
    static async sendInvitation(user: User): Promise<User> {
        transporter.sendMail(
            {...mailOptions, to: user.email},
            (error: Error) => {
                if (error) {
                    console.error(error.message);
                }
        });
        return user;
    }
}
