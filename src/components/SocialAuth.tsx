'use client';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { apiLogin } from '@/api/auth';
import { useAppContext } from '@/app/provider';
import { toast } from '@/hooks';
import { logger, parseErrorMessage } from '@/lib';
import { apiGetPassport } from '@/api/common';

const SocialAuth = () => {
  const [, { setInitLoading, setProfile }] = useAppContext();
  const { data: session } = useSession();

  useEffect(() => {
    const onSignIn = async () => {
      try {
        setInitLoading(true);
        await apiLogin({
          type: 'google',
        });
        const passport = await apiGetPassport();
        setProfile(passport.profile);
      } catch (err) {
        toast({
          variant: 'destructive',
          description: parseErrorMessage(err),
        });
      } finally {
        setInitLoading(false);
      }
    };

    if (session?.user) {
      onSignIn()
        .then(() => {
          signOut({ redirect: false }).catch(logger.log);
        })
        .catch(logger.log);
    }
  }, [session, setProfile]);

  return null;
};

export default SocialAuth;
