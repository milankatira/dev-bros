import {server_url} from '../config/app_config';

//TODO AUTH URL
export const login_url = `/api/auth/login`;

export const signup_url = `${server_url}/api/register`;

export const logout_url = `${server_url}/api/logout`;

export const forgot_password_url = `${server_url}/api/forgot`;

export const reset_password_url = (token)=>`${server_url}/api/reset/:${token}`;

export const verify_email_url = (token) => `${server_url}/api/verify/email/:${token}`;

//TODO USER URL

export const user_profile_url = `${server_url}/api/user/me`;

export const update_profile_url = `${server_url}/api/user/me/update`;

