import axios from "axios";

const REFRESH_TOKEN_URL = `${import.meta.env.VITE_API_HOST}/auth/refresh`;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const cookies = document.cookie;
    const accessTokenCookie = cookies.match(/(^|;) ?accessToken=([^;]*)(;|$)/);

    if (accessTokenCookie) {
      const accessToken = accessTokenCookie[2];
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      // Get Access token
      const refreshTokenCookie = cookies.match(
        /(^|;) ?refreshToken=([^;]*)(;|$)/,
      );
      if (refreshTokenCookie) {
        const refreshToken = refreshTokenCookie[2];

        const refreshResponse = await axios.get(REFRESH_TOKEN_URL, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        if (!refreshResponse) {
          // Redireact to login
          console.log("Refresh token expired!");
          throw new Error("Refresh token error detected!");
        }

        const accessToken = refreshResponse.data.accessToken;
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      // console.log("Access Token not found.");
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
