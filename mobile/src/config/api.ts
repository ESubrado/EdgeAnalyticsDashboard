const API_BASE_URL = (
  process.env.EXPO_PUBLIC_API_URL ??
  "https://edgeanalytics-server.onrender.com"
).replace(/\/$/, "");

export default API_BASE_URL;
