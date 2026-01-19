// // Auth API Endpoints
// export const AUTH_API = {
//   LOGIN: "/auth/login",
//   LOGOUT: "/auth/logout",
//   REGISTER: "/auth/register",
//   REFRESH: "/auth/refresh",
//   PROFILE: "/auth/profile",
//   FORGOT_PASSWORD: "/auth/forgot-password",
//   RESET_PASSWORD: "/auth/reset-password",
// } as const;


// src/api/auth.api.ts
export const AUTH_API = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REFRESH: "/auth/refresh",

  ME: "/auth/me",
  UPDATE_PROFILE: "/auth/me",

  FORGOT_PASSWORD: "/auth/forgot-password",
  VERIFY_OTP: "/auth/verify-otp",
  RESET_PASSWORD: "/auth/reset-password",
} as const;
