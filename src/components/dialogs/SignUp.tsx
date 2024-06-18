import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { apiGetPassport } from '@/api';
import { apiRegister, apiRequestOTP } from '@/api/auth';
import { useAppContext } from '@/app/provider';
import { toast, useCountdown } from '@/hooks';
import { parseErrorMessage } from '@/lib';
import { validateIsEmail, validateName, validatePassword } from '@/lib/validate';

import { Button, Form, Input } from '../ui';

interface Props {
  onChangeMode: () => void;
  onSuccess: () => void;
}

interface SignUpComponentProps {
  onChangeMode: () => void;
  onSuccess: (d: OtpProps['data']) => void;
}

type SignUpForm = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type OtpProps = {
  data: {
    username: string;
    password: string;
    name: string;
  };
  onSuccess: () => void;
};

const SignUpComponent = ({ onChangeMode, onSuccess }: SignUpComponentProps) => {
  const controller = useForm<SignUpForm>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const { errors, isValid, isSubmitting } = controller.formState;

  const onSubmit = async (e: SignUpForm) => {
    if (e.email && e.password && e.name) {
      try {
        await apiRequestOTP({
          username: e.email,
          password: e.password,
          type_otp: 'register',
        });
        onSuccess({
          name: e.name,
          username: e.email,
          password: e.password,
        });
      } catch (err) {
        toast({
          variant: 'destructive',
          description: parseErrorMessage(err),
        });
      }
    }
  };

  return (
    <Form {...controller} onlyDirty onSubmit={onSubmit}>
      <div className="flex flex-col gap-[24px] mt-[40px] mb-[20px]">
        <p className="text-[20px] font-medium">
          Tham gia vào Avatour để có những lịch trình nhanh chóng và hấp dẫn!
        </p>

        <div>
          <Input
            useForm
            {...controller.register('name', {
              validate: v => {
                if (!v) {
                  return '';
                }
                return validateName(v) || 'Tên của bạn vượt quá 100 ký tự';
              },
            })}
            placeholder="Tên của bạn"
            errorMessage={errors.name?.message}
          />
          <Input
            useForm
            {...controller.register('email', {
              validate: v => {
                if (!v) {
                  return '';
                }
                return validateIsEmail(v) || 'Email không hợp lệ';
              },
            })}
            type="email"
            placeholder="Email"
            errorMessage={errors.email?.message}
            className="mt-[12px]"
          />
          <Input
            useForm
            {...controller.register('password', {
              validate: v => {
                if (!v) {
                  return '';
                }
                return (
                  validatePassword(v) ||
                  'Mật khẩu phải từ 9 ký tự, bao gồm ít nhất 1 chữ cái in hoa và 1 ký tự đặc biệt'
                );
              },
            })}
            type="password"
            placeholder="Mật khẩu"
            errorMessage={errors.password?.message}
            className="mt-[12px]"
          />
          <Input
            useForm
            {...controller.register('confirmPassword', {
              validate: v => {
                if (!v) {
                  return '';
                }
                return v === controller.getValues('password') || '';
              },
            })}
            type="password"
            placeholder="Mật khẩu"
            errorMessage={errors.confirmPassword?.message}
            className="mt-[12px]"
          />
        </div>

        <Button className="" type="submit" disabled={!isValid} loading={isSubmitting}>
          Đăng ký
        </Button>

        <p className="self-center text-[12px] text-gray_500 font-normal">Bạn đã là thành viên?</p>

        <p className="self-center">
          <span role="button" className="underline" onClick={onChangeMode}>
            Đăng nhập
          </span>{' '}
          để trải nghiệm Avatour
        </p>
      </div>
    </Form>
  );
};

const OtpComponent = ({ data, onSuccess }: OtpProps) => {
  const [, { setProfile }] = useAppContext();
  const { countdown, resetCountdown } = useCountdown(10);
  const [otp, setOtp] = useState('');

  const onConfirm = async () => {
    try {
      await apiRegister({
        name: data.name,
        username: data.username,
        password: data.password,
        code: otp,
      });
      const passport = await apiGetPassport();
      setProfile(passport.profile);
      onSuccess();
    } catch (err) {
      toast({
        variant: 'destructive',
        description: parseErrorMessage(err),
      });
    }
  };

  const onResend = useCallback(async () => {
    try {
      await apiRequestOTP({
        type_otp: 'register',
        username: data.username,
        password: data.password,
      });
      resetCountdown();
    } catch (err) {
      toast({
        variant: 'destructive',
        description: parseErrorMessage(err),
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-[36px] mt-[40px] mb-[20px]">
      <p className="text-[14px] font-medium">
        Mã OTP đã được gửi tới {data.username}.<p>Hãy kiểm tra email của bạn nhé.</p>
      </p>
      <Input
        placeholder="Nhập mã"
        className="w-[60%] text-center text-[20px] h-[38px]"
        onChange={e => {
          setOtp(e.target.value);
        }}
      />
      <Button className="w-[80%]" disabled={otp.length < 4} onClick={onConfirm}>
        Xác nhận
      </Button>
      {countdown > 0 ? (
        <p className="text-[12px] font-normal text-gray_500">
          Gửi lại sau 00:{String(countdown).length == 2 ? countdown : `0${countdown}`}
        </p>
      ) : (
        <p
          role="button"
          className="text-[12px] font-normal text-gray_500 underline"
          onClick={onResend}
        >
          Gửi lại
        </p>
      )}
    </div>
  );
};

const SignUp = ({ onChangeMode, onSuccess }: Props) => {
  const [otp, setOtp] = useState<OtpProps['data']>();

  if (!otp) {
    return (
      <SignUpComponent
        onChangeMode={onChangeMode}
        onSuccess={d => {
          setOtp(d);
        }}
      />
    );
  }

  return <OtpComponent data={otp} onSuccess={onSuccess} />;
};

export default SignUp;
