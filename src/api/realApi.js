// 실제 백엔드 호출 (기존 컴포넌트에 흩어져 있던 fetch/axios 호출을 모은 것)
import axios from "axios";

const BASE = process.env.REACT_APP_API_URL;

async function post(path, body) {
    const response = await fetch(`${BASE}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || JSON.stringify(data));
    return data;
}

async function get(path) {
    const response = await axios.get(`${BASE}${path}`);
    return response.data;
}

export const realApi = {
    async getClientIp() {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        return data.ip;
    },
    getStats: (clientIp) => get(`/session/stats?client_ip=${clientIp}`),
    createSession: (body) => post("/session/session_create", body),
    endSession: (body) => post("/session/session_end", body),
    createEmotionData: (body) => post("/emotion_measurements/create_emotion_data", body),
    createContentData: (body) => post("/content_interactions/create_content_data", body),
    createMetricsData: (body) => post("/performance_metrics/create_metrics_dtaa", body),

    getCompletedSessions: () => get("/session/completed_sessions?page=1&size=100"),
    getMeasurements: () => get("/emotion_measurements/getMeasurement?page=1&size=100"),
    getContentData: () => get("/content_interactions/get_content_data?page=1&size=100"),
    getMetricsData: () => get("/performance_metrics/get_metrics_data?page=1&size=100"),
    getAdminDashboard: () => get("/session/admin_dashboard"),
};
