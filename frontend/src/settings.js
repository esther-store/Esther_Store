export const BASE_URL = import.meta.env.PUBLIC_API_URL;

//store urls
export const URL_STORE_GET_CATEGORIES= `${BASE_URL}/store/categories/`
export const URL_GET_PRODUCTS = `${BASE_URL}/store/products`
export const URL_GET_PROMOTIONS = `${BASE_URL}/store/promotions/`

//manage urls
export const URL_MANAGE_PRODUCTS = `${BASE_URL}/store/manage-products/`
export const URL_MANAGE_CATEGORIES = `${BASE_URL}/store/manage-categories/`
export const URL_MANAGE_PROMOTIONS = `${BASE_URL}/store/manage-promotions/`
export const URL_MANAGEMENT_USERS = `${BASE_URL}/user/managment/`

//authentication
export const LOGIN_URL = `${BASE_URL}/authentication/login/`
export const CHANGE_PASSWORD_URL = `${BASE_URL}/authentication/password/change/`

//contact info
export const CONTACT_INFO_URL = `${BASE_URL}/contact-info/`
export const MANAGE_CONTACT_INFO_URL = `${BASE_URL}/contact-info/manage/`

//user profile
export const USER_PROFILE_URL = `${BASE_URL}/authentication/user/`
