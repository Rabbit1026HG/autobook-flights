const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

// Auth URLs
const SIGNUP_URL = `${BASE_URL}/auth/register`;
const LOGIN_URL = `${BASE_URL}/auth/login`;
const GOOGLE_LOGIN_URL = `${BASE_URL}/auth/google-login`;
const GOOGLE_REGISTER_URL = `${BASE_URL}/auth/google-register`;

export { SIGNUP_URL, LOGIN_URL, GOOGLE_LOGIN_URL, GOOGLE_REGISTER_URL };
