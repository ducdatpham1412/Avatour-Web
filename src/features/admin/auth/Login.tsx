'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Icon } from '@/components/icon';
import { Button, Input } from '@/components/ui';
import { adminLogin } from '@/api/admin/login';
import { useToast } from '@/hooks';
import { logger } from '@/lib';

const AdminLogin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    adminLogin(formState.email, formState.password)
      .then(({ error }) => {
        if (!error) {
          router.replace('/admin/suppliers');
        } else {
          toast({
            variant: 'destructive',
            title: 'Thông báo',
            description: 'Vui lòng kiểm tra tài khoản và mật khẩu',
          });
        }
      })
      .catch(err => {
        logger.error('err', err.message);
        toast({
          variant: 'destructive',
          title: 'Thông báo',
          description: 'Đăng nhập thất bại',
        });
      })
      .finally(() => setLoading(false));
  }
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center gap-3 w-[min(400px,_calc(100%_-_10px))]"
      >
        <Icon name="logo" size={60} />
        <h2 className="font-bold text-xl mb-3">Avatour CMS</h2>
        <Input
          value={formState.email}
          onChange={e => setFormState({ ...formState, email: e.target.value })}
          className="w-full h-[46px] rounded-[10px]"
          placeholder="Email / SĐT"
        ></Input>
        <Input
          value={formState.password}
          onChange={e => setFormState({ ...formState, password: e.target.value })}
          className="w-full h-[46px] rounded-[10px]"
          type="password"
          placeholder="Mật khẩu"
        ></Input>
        <div className="flex items-center justify-center px-5 w-full">
          <Button loading={loading} className="font-bold w-full rounded-full h-12">
            Đăng nhập
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
