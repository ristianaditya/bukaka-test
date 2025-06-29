import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(refreshToken: {
  accessToken: string;
  accessTokenExpires: string;
  refreshToken: string;
}) {
  try {
    const refreshedTokens = await $fetch<{
      data: {
        access_token: string;
        expires_in: number;
        refresh_token: string;
      };
    } | null>(`${process.env.BASE_URL_API_SERVICE}/user/refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken.refreshToken}`,
      },
    });

    return {
      ...refreshToken,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: refreshedTokens.expires_in,
      refreshToken: refreshedTokens.access_token,
    };
  } catch (error) {
    const cookie = useCookie("next-auth.session-token");
    cookie.value = null;
    console.log(error.message);

    return {
      ...refreshToken,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NuxtAuthHandler({
  secret: process.env.AUTH_ORIGIN,
  pages: {
    signIn: "/login",
    error: "/login?validation=true",
    signOut: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;

      if (isSignIn) {
        token.accessToken = user?.accessToken;
        token.accessTokenExpires = user?.expires_in;
        token.refreshToken = user?.refreshToken;
      }
      const currentTime = parseInt(Date.now().toString().slice(0, 10));
      const refreshTime = currentTime + 30 * 60;

      if (refreshTime >= token.accessTokenExpires) {
        return refreshAccessToken(token);
      }
      return Promise.resolve(token);
    },
    session: async ({ token, session }) => {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;

      return Promise.resolve(session);
    },
  },
  providers: [
    CredentialsProvider.default({
      name: "Credentials",
      async authorize(credentials: any) {
        try {
          const user = await $fetch(
            `${process.env.BASE_URL_API_SERVICE}/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: {
                email: credentials.email,
                password: credentials.password,
              },
            },
          );

          const dataUser = {
            ...user.data,
            accessToken: user.access_token,
            refreshToken: user.access_token,
            expires_in: user.expires_in,
          };
          return dataUser;
        } catch (error) {
          throw new Error("error");
        }
      },
    }),
  ],
});
