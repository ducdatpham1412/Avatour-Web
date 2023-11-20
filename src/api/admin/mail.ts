'use server';

import nodemailer from 'nodemailer';

import { MailForm } from '@/features/admin/mail';
import { logger } from '@/lib';

export async function sendCooperationSupplierEmail(
  data: MailForm & { html: string },
): Promise<ActionResponse> {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: data.fromEmail,
        pass: data.password /* 'kwaiscsrhgbcfolj' */,
      },
    });

    const mailOption = {
      from: data.fromEmail,
      to: data.toEmail,
      subject: data.title,
      html: data.html,
    };

    const res = await transporter.sendMail(mailOption);
    return {
      data: res,
    };
  } catch (error) {
    logger.error(error);
    return {
      error: {
        message: 'Vui lòng tài khoản hoặc mật khẩu',
        code: 401,
      },
    };
  }
}
