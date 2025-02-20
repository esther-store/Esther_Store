export const BASE_URL = import.meta.env.PUBLIC_API_URL;

//store urls
export const URL_STORE_GET_CATEGORIES= `${BASE_URL}/api/store/categories/`
export const URL_GET_PRODUCTS = `${BASE_URL}/api/store/products`
export const URL_GET_PROMOTIONS = `${BASE_URL}/api/store/promotions/`

//manage urls
export const URL_MANAGE_PRODUCTS = `${BASE_URL}/api/store/manage-products/`
export const URL_MANAGE_CATEGORIES = `${BASE_URL}/api/store/manage-categories/`
export const URL_MANAGE_PROMOTIONS = `${BASE_URL}/api/store/manage-promotions/`
export const URL_MANAGEMENT_USERS = `${BASE_URL}/api/user/managment/`

//authentication
export const LOGIN_URL = `${BASE_URL}/api/authentication/login/`
export const CHANGE_PASSWORD_URL = `${BASE_URL}/api/authentication/password/change/`

//contact info
export const CONTACT_INFO_URL = `${BASE_URL}/api/contact-info/`
export const MANAGE_CONTACT_INFO_URL = `${BASE_URL}/api/contact-info/manage/`

//user profile
export const USER_PROFILE_URL = `${BASE_URL}/api/authentication/user/`
