import { browser } from '$app/environment';
import { PUBLIC_CLIENT_SIDE_QUEBYS_API_BASE_URL, PUBLIC_SERVER_SIDE_QUEBYS_API_BASE_URL } from '$env/static/public';

export const QUEBYS_API_BASE_URL = browser ? PUBLIC_CLIENT_SIDE_QUEBYS_API_BASE_URL : PUBLIC_SERVER_SIDE_QUEBYS_API_BASE_URL;
