import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import crypto from 'crypto';
import nodemailer from 'nodemailer';



export const generateToken = (): string => {
    const randomBytes = crypto.randomBytes(20);
    return randomBytes.toString('hex');
  };


  export const sendResetEmail = (to: string, token: string) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

const resetUrl = `https://stackoverflow.com/questions/65679654/howto-reset-password-using-nodejs` //tansech tbadel url waaa 
    const mailOptions = {
        from: 'Example App <noreply@example.com>',
        to,
        subject: 'Password Reset',
        html: `
          <p>You have requested to reset your password.</p>
          <p>Please click <a href="${resetUrl}">here</a> to reset your password.</p>
          <p>If you did not make this request, please ignore this email.</p>
        `,
      };

      
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending password reset email:', error);
    } else {
      console.log('Password reset email sent:', info.response);
    }
  });
};