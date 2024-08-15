import type { NextApiRequest, NextApiResponse } from 'next';
import Mailgun from 'mailgun.js';
import FormData from 'form-data';

// Initialize Mailgun
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY! });

interface FeedbackRequest {
  messageId: string;
  rating: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { messageId, rating }: FeedbackRequest = req.body;

    const emailData = {
      // Replace with your Mailgun domain email
      from: 'mailgun@sandbox4633a4a1b1544c38855f6b9c32ce2c4b.mailgun.org', 
      to: 'atqarana@gmail.com', // Replace with your email address
      subject: 'New Feedback Received',
      text: `
        Message ID: ${messageId}
        Rating: ${rating}
      `,
    };

    try {
      if (!process.env.MAILGUN_DOMAIN) {
        throw new Error('MAILGUN_DOMAIN environment variable is not set.');
      }

      await mg.messages.create(process.env.MAILGUN_DOMAIN, emailData);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error.message || error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message || error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
