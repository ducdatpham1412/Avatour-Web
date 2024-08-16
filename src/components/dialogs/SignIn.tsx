import { useRef } from 'react';

import { apiLogin } from '@/api/auth';
import { apiGetPassport } from '@/api/common';
import { useAppContext } from '@/app/provider';
import { useLoading, useToast } from '@/hooks';
import { parseErrorMessage } from '@/lib';

import { Icon } from '../icon';
import { Button, Input } from '../ui';

interface ChildrenProps {
  onChangeMode: () => void;
  onLoginSuccess: () => void;
}

const SignIn = ({ onChangeMode, onLoginSuccess }: ChildrenProps) => {
  const { toast } = useToast();
  const { loading, setLoading } = useLoading();
  const [, { setProfile }] = useAppContext();

  const form = useRef({
    username: '',
    password: '',
  });

  const onSignIn = async () => {
    try {
      setLoading(true);
      await apiLogin(form.current);
      const passport = await apiGetPassport();
      setProfile(passport.profile);
      onLoginSuccess();
    } catch (err) {
      toast({
        variant: 'destructive',
        description: parseErrorMessage(err),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-[24px] mt-[40px] mb-[20px]">
      <p className="text-[20px] font-medium">
        Bạn hãy
        <span className="text-p_700"> đăng nhập </span>
        để lưu lại lịch trình yêu thích của mình nhé!
      </p>

      <div className="">
        <input type="text" autoFocus className="hidden" />
        <Input
          placeholder="Email"
          type="email"
          onChange={e => {
            form.current.username = e.target.value;
          }}
          autoFocus={false}
        />
        <Input
          className="mt-[12px]"
          placeholder="Mật khẩu"
          type="password"
          onChange={e => {
            form.current.password = e.target.value;
          }}
        />
      </div>

      <Button loading={loading} onClick={onSignIn}>
        Đăng nhập
      </Button>

      <p className="self-center text-[13px] text-gray_500 font-normal">hoặc</p>

      <Button className="bg-gray_200">
        <Icon name="google" />
        Đăng nhập với Google
      </Button>

      <p className="self-center">
        Bạn chưa có tài khoản?
        <span role="button" className="underline" onClick={onChangeMode}>
          {' '}
          Đăng ký ngay
        </span>
      </p>
    </div>
  );
};

export default SignIn;
