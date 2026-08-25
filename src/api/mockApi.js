// 데모용 mock API
// 실제 백엔드와 동일한 응답 형태를 흉내내며, 세션 동안 저장된 데이터는 메모리에 누적됩니다.
import { seedData, randomIp } from "./mockData";

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms + Math.random() * 150));

// 메모리 저장소 (새로고침 시 초기화)
const store = {
    sessions: [...seedData.sessions],
    measurements: [...seedData.measurements],
    interactions: [...seedData.interactions],
    performance: [...seedData.performance],
};

const nextId = (list, key) => list.reduce((m, r) => Math.max(m, r[key] || 0), 0) + 1;

const isToday = (iso) => new Date(iso).toDateString() === new Date().toDateString();

export const mockApi = {
    async getClientIp() {
        await delay(100);
        return randomIp();
    },

    async getStats(clientIp) {
        await delay();
        const today = store.sessions.filter((s) => isToday(s.start_time)).length;
        const mine = store.sessions.filter((s) => s.user_ip === clientIp).length;
        return {
            total_users: store.sessions.length + 1200,
            today_measurements: today + 3,
            my_measurements: mine,
            user_id: null,
        };
    },

    async createSession({ user_number, user_ip, start_time }) {
        await delay();
        const session_id = nextId(store.sessions, "session_id");
        store.sessions.unshift({
            session_id,
            user_number,
            user_ip,
            start_time,
            end_time: null,
            total_duration: null,
        });
        return { session_id };
    },

    async endSession({ session_id, end_time }) {
        await delay();
        const s = store.sessions.find((x) => x.session_id === session_id);
        if (s) {
            s.end_time = end_time;
            s.total_duration = Math.round((new Date(end_time) - new Date(s.start_time)) / 1000);
        }
        return { message: "세션이 종료되었습니다." };
    },

    async createEmotionData(payload) {
        await delay();
        const measurement_id = nextId(store.measurements, "measurement_id");
        store.measurements.push({
            measurement_id,
            timestamp: new Date().toISOString(),
            ...payload,
        });
        return { measurement_id };
    },

    async createContentData(payload) {
        await delay();
        const interaction_id = nextId(store.interactions, "interaction_id");
        store.interactions.push({ interaction_id, ...payload });
        return { interaction_id, session_id: payload.session_id };
    },

    async createMetricsData(payload) {
        await delay();
        const metric_id = nextId(store.performance, "metric_id");
        store.performance.push({ metric_id, ...payload });
        return { metric_id };
    },

    // ----- 관리자 -----
    async getCompletedSessions() {
        await delay();
        return store.sessions.filter((s) => s.end_time);
    },
    async getMeasurements() {
        await delay();
        return [...store.measurements].reverse();
    },
    async getContentData() {
        await delay();
        return [...store.interactions].reverse();
    },
    async getMetricsData() {
        await delay();
        return [...store.performance].reverse();
    },
    async getAdminDashboard() {
        await delay();
        return {
            session_total: store.sessions.length,
            emotions_total: store.measurements.length,
            contents_total: store.interactions.length,
            // 평균 신뢰도 (0~1) — 대시보드에서 %로 변환해 표시
            metrics_total:
                store.performance.reduce((sum, p) => sum + (p.emotion_confidence_avg || 0), 0) /
                (store.performance.length || 1),
        };
    },
};
