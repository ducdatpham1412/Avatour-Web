'use client';

import { useForm, useWatch } from 'react-hook-form';
import { useEffect, useMemo, useRef, useState } from 'react';
import handlebars from 'handlebars';
import { zodResolver } from '@hookform/resolvers/zod';

import { useQuery } from '@/hooks/useQuery';
import { makeError } from '@/lib';
import { Button, Form, ToastAction } from '@/components/ui';
import { sendCooperationSupplierEmail } from '@/api/admin/mail';
import { useToast } from '@/hooks';
import { mailFormSchema } from '@/lib';

import { MailForm } from './types';
import MailField from './components/MailInputField';

type TemplateCallback = (e: { from: string; to: string }) => string;

const Mail = () => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const [{ data: mailTemplate, loading }] = useQuery('mail-template', callMailTemplate);
  const [mailHtmlData, setMailHtmlData] = useState('');
  const [submiting, setSubmiting] = useState(false);
  const { toast } = useToast();
  const formController = useForm<Partial<MailForm>>({
    defaultValues: {
      title: 'Avatour | Thư mời hợp tác trên ứng dụng du lịch Avatour',
      fromEmail: '',
      fromName: '',
      password: '',
      toEmail: '',
      toName: '',
    },
    resolver: zodResolver(mailFormSchema),
    mode: 'onSubmit',
  });

  const title = useWatch({ name: 'title', control: formController.control });
  const toName = useWatch({ name: 'toName', control: formController.control });
  const fromName = useWatch({ name: 'fromName', control: formController.control });

  const template = useMemo(() => {
    if (mailTemplate) {
      return handlebars.compile(mailTemplate) as TemplateCallback;
    }
  }, [mailTemplate]);

  useEffect(() => {
    if (template && iframe.current) {
      const timeout = setTimeout(() => {
        if (iframe.current) {
          const html = template({
            to: toName || '[Tên công ty]',
            from: fromName || '[Tên người gửi]',
          });
          iframe.current.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
          setMailHtmlData(html);
        }
      }, 1500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [template, toName, fromName]);

  async function handleSubmit(data: Partial<MailForm>) {
    const mailOptions = data as MailForm;

    setSubmiting(true);
    try {
      const res = await sendCooperationSupplierEmail({
        ...mailOptions,
        html: mailHtmlData,
      });
      if (res.error) {
        throw makeError(res.error.message);
      }
      toast({
        title: 'Thông báo',
        description: 'Gửi email thành công',
      });
    } catch (error) {
      toast({
        title: 'Gửi email thất bại',
        description: (error as Error).message,
        variant: 'destructive',
        action: (
          <ToastAction onClick={() => handleSubmit(data)} altText="Try again">
            Thử lại
          </ToastAction>
        ),
      });
    } finally {
      setSubmiting(false);
    }
  }

  return (
    <div className="w-full flex items-start gap-10">
      <Form
        {...formController}
        onSubmit={handleSubmit}
        className="w-[400px] flex flex-col gap-10 p-[35px_35px]"
      >
        <div className="flex flex-col gap-2.5">
          <h2 className="font-bold text-[18px]">Nhập thông tin</h2>
          <MailField
            name="title"
            rules={{ required: true }}
            control={formController.control}
            placeholder="Tiêu đề mail"
          />
          <MailField name="toName" control={formController.control} placeholder="Tên công ty" />
          <MailField name="fromName" control={formController.control} placeholder="Tên người gửi" />
        </div>
        <div className="flex flex-col gap-2.5">
          <h2 className="font-bold text-[18px]">Mail cửa hàng</h2>
          <MailField name="toEmail" control={formController.control} placeholder="Email" />
        </div>
        <div className="flex flex-col gap-2.5">
          <h2 className="font-bold text-[18px]">Tài khoản mail</h2>
          <MailField name="fromEmail" control={formController.control} placeholder="Email" />
          <MailField
            name="password"
            control={formController.control}
            placeholder="Password"
            type="password"
          />
        </div>
        <Button
          type="submit"
          loading={loading || submiting}
          disabled={loading || submiting}
          className="font-bold rounded-full"
        >
          Gửi
        </Button>
      </Form>
      <div className="flex-grow">
        <div className="h-[70px] flex items-end pb-[15px]">
          <span className="text-[20px]">{title}</span>
        </div>
        <iframe ref={iframe} className="border-none w-full min-h-[calc(100svh_-_70px)]"></iframe>
      </div>
    </div>
  );
};

async function callMailTemplate() {
  const res = await fetch('/mails/cooperation_supplier.html');

  if (!res.ok) {
    const data = await res.json();
    if (data && 'message' in data) {
      throw makeError(data.message);
    }
    throw new Error('Cannot call mail template');
  }

  const data = await res.text();

  return data;
}

export default Mail;
