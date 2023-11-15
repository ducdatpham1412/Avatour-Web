import { z } from 'zod';

export const mailFormSchema = z.object({
  title: z.string().min(2, {
    message: 'Tiêu đề không hợp lệ',
  }),
  toName: z.string().min(2, {
    message: 'Tên công ty không hợp lệ',
  }),
  fromName: z.string().min(2, {
    message: 'Tên người gửi không hợp lệ',
  }),
  toEmail: z.string().email('Email không hợp lệ'),
  fromEmail: z.string().email('Email không hợp lệ'),
  password: z.string().min(16, {
    message: 'Mật khẩu không hợp lệ',
  }),
});
