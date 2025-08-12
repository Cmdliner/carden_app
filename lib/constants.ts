import { Platform } from "react-native";

export const API_SERVER_URL = Platform.OS === "web" ? process.env.EXPO_PUBLIC_API_URL : process.env.EXPO_PUBLIC_LIVE_API_URL;
export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const USER_KEY = 'user_data';