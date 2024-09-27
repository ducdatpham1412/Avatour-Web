/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET } from '@/configs';
import { setTokenCookies } from '@/api/cookies';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID ?? '',
      clientSecret: GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  secret: NEXTAUTH_SECRET,
  callbacks: {
    signIn({ user, account, profile, email, credentials }) {
      setTokenCookies({
        token: account?.access_token,
        refreshToken: account?.refresh_token,
      });
      return true;
    },
    redirect({ url, baseUrl }) {
      return baseUrl;
    },
    session({ session, token, user }) {
      return session;
    },
    jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
});

export { handler as GET, handler as POST };
