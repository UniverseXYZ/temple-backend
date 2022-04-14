import { TEMPLE_EMAIL } from '../../../constants';
import nodemailer from 'nodemailer';
import { error, log } from '@johnkcr/temple-lib/dist/utils';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const mailCreds = JSON.parse(readFileSync(resolve(__dirname, '../../../../creds/firebase-dev.json'), 'utf-8'));

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: TEMPLE_EMAIL,
    serviceClient: mailCreds.client_id,
    privateKey: mailCreds.private_key
  }
});

export function sendEmail(to: string, subject: string, html: string) {
  log('Sending email to', to);

  const mailOptions = {
    from: TEMPLE_EMAIL,
    to,
    subject,
    html
  };

  transporter.sendMail(mailOptions).catch((err) => {
    error('Error sending email');
    error(err);
  });
}
