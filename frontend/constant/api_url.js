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

//TODO GENERIC URL
export const get_city=`${server_url}/api/city`;

export const get_country=`${server_url}/api/country`;

export const get_degree=`${server_url}/api/degree`;

export const get_designation=`${server_url}/api/designation`;

export const get_institution=`${server_url}/api/institution`;

export const get_plan=`${server_url}/api/plan`;

export const get_state=`${server_url}/api/state`;

export const get_subcription_plan=`${server_url}/api/subcription_plan`;

