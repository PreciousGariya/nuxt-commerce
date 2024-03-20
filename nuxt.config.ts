// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@bg-dev/nuxt-auth"],
  css: ["~/assets/css/main.css"],
  js: ["~/assets/js/main.js"],
  auth: {
    oauth: {
      "github": {
        clientId: "",
        clientSecret: "",
        scopes: "",
        authorizeUrl: "",
        tokenUrl: "",
        userUrl: "",
      },
    },
    registration: {
      enable: true, // The registration can be disabled for limited user base.
      requireEmailVerification: true, // Allow non-verified users
      passwordValidationRegex: "", // Constraint for password strength
      defaultRole: "user", // Role assigned to new users
    },
    accessToken: {
      jwtSecret: "", // Required
      maxAge: 15 * 60, // The access token is valid for 15 minutes
      //Some backend services require JWT claims for authorization such as Hasura. 
      //In order to add dynamic custom claims to the access token's payload, accessToken.customClaims is provided. 
      //For injecting User related fields, use the mustache syntax.
      // customClaims: { 
      //   "https://hasura.io/jwt/claims": {
      //     "x-hasura-allowed-roles": ["user", "admin"],
      //     "x-hasura-default-role": "{{role}}",
      //     "x-hasura-user-id": "{{id}}",
      //   },
    },
    refreshToken: {
      jwtSecret: "", // Required
      maxAge: 7 * 24 * 60 * 60, // The refresh token is valid for 7 days
      cookieName: "auth_refresh_token",
    },
    redirect: {
      // These are example routes, please replace them with your own
      login: "/auth/login", //The page that the user will be redirected to if login is required.
      logout: "/auth/login", //The page that the user will be redirected to after logging out.
      home: "/", //The page that the user will be redirected to after a successful login.
      callback: "/auth/callback", //The page that the user will be redirected to after a successful authentication with a third-party provider.
      passwordReset: "/auth/reset-password", //The page that the user will be redirected to after a password reset.
      emailVerify: "/auth/verify-email", // The page that the user will be redirected to after verifying their email.
    },
    email: {
      from: process.env.SMTP_FROM, // The email address to send from
      provider: {
        name: "custom",
        url: "/api/emails/send-email", // This could also point to an external service/api endpoint
        authorization: "api_key",
      },
      templates: {
        emailVerify: `
          <html lang="en">
            <body>
              <h2>Hello {{name}},</h2>
              <p>To verify your email, please follow this link</p>
              <a href="{{link}}">Verify your email</a>
              <p>Valid for {{validityInMinutes}} minutes</p>
            </body>
          </html>
        `,
        passwordReset: `
          <html lang="en">
            <body>
              <h2>Hello {{name}},</h2>
              <p>To reset your password, please follow this link</p>
              <a href="{{link}}">Reset your password</a>
              <p>Valid for {{validityInMinutes}} minutes</p>
            </body>
          </html>
        `,
      },
    },
  },
})
