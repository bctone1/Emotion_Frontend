// API 진입점
// REACT_APP_USE_MOCK=true 이면 mock API, 아니면 실제 백엔드(REACT_APP_API_URL)를 사용합니다.
import { mockApi } from "./mockApi";
import { realApi } from "./realApi";

export const USE_MOCK = process.env.REACT_APP_USE_MOCK === "true";

export const api = USE_MOCK ? mockApi : realApi;
