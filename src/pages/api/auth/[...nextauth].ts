import router from 'next/router';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

import apiService from '@/api';

const {
  GOOGLE_ID = '',
  GOOGLE_SECRET = '',
  KAKAO_ID = '',
  KAKAO_SECRET = '',
  NAVER_ID = '',
  NAVER_SECRET = '',
} = process.env;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: '이메일',
          type: 'text',
          placeholder: '이메일를 입력하세요.',
        },
        password: {
          label: '비밀번호',
          type: 'password',
          placeholder: '비밀번호를 입력하세요.',
        },
      },
      async authorize(credentials, req) {
        if (!credentials)
          throw new Error('잘못된 입력값으로 인한 오류가 발생했습니다.');

        const { email, password } = credentials;
        const exUser = '';

        // const exUser = await apiService.authService.apiLogIn({ email: email, password: password });
        // if (!exUser) throw new Error("존재하지 않는 아이디입니다.");
        // if (!exUser.data.password) throw new Error("잘못된 로그인 방식입니다.");

        // const result = (password === exUser.data.password);
        // if (!result) throw new Error("비밀번호가 불일치합니다.");

        return exUser;
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
    KakaoProvider({
      clientId: KAKAO_ID,
      clientSecret: KAKAO_SECRET,
    }),
    NaverProvider({
      clientId: NAVER_ID,
      clientSecret: NAVER_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      const user = await apiService.userService.apiGetUser({
        email: token.email!,
      });

      // 등록된 유저가 아니라면 회원가입
      if (!user.data.contents) {
        router.push(`/signup?email=${token.email!}`);
      }
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    // 세션에 로그인한 유저 데이터 입력
    async session({ session, token }) {
      const user = await apiService.userService.apiGetUser({
        email: token.email!,
      });
      if (session.user) {
        session.user.name = user.data.contents[0].name;
        session.user.role = user.data.contents[0].role;
      }
      return session;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    updateAge: 2 * 24 * 60 * 60,
  },
  // callbacks: {
  //   async jwt({ token, account }) {
  //     if (account) {
  //       const exUser = await apiService.userService.apiGetUser({ email: token.email! });
  //       console.log(exUser.data.contents)
  //       token.accessToken = account.access_token;
  //       token.info = account;
  //       console.log('JSON Web Token', token);
  //     }
  //     return token;
  //   },
  //   async session({ session, token, user }) {
  //     return session;
  //   },
  // },
  secret: process.env.SECRET,
});
