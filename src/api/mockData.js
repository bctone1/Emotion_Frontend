// 데모용 mock 데이터 생성기
// REACT_APP_USE_MOCK=true 일 때 관리자 페이지 및 세션 통계에 사용됩니다.

const EMOTIONS = ["행복", "슬픔", "화남", "두려움", "역겨움", "놀람", "중립"];

const CONTENT_BY_EMOTION = {
    슬픔: { type: "poem", title: '"늙어가는 나에게" 시 감상' },
    두려움: { type: "poem", title: '"편지" 시 낭송' },
    혼란: { type: "poem", title: '"그물" 시 감상' },
    중립: { type: "art", title: "고전명화 감상 영상" },
    화남: { type: "media_art", title: "미디어아트 영상" },
    역겨움: { type: "guide", title: "스마트폰 매너 가이드" },
    행복: { type: "art", title: "고전명화 감상 영상" },
    놀람: { type: "media_art", title: "미디어아트 영상" },
};

// 시드 기반 난수 (새로고침해도 동일한 데이터가 보이도록)
function mulberry32(seed) {
    return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const rand = mulberry32(20260825);
const randInt = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
const pick = (arr) => arr[randInt(0, arr.length - 1)];
const round = (n, d = 2) => Math.round(n * 10 ** d) / 10 ** d;

export function randomIp() {
    return `${randInt(1, 223)}.${randInt(0, 255)}.${randInt(0, 255)}.${randInt(1, 254)}`;
}

function buildSeed(count = 50) {
    const sessions = [];
    const measurements = [];
    const interactions = [];
    const performance = [];

    const now = Date.now();
    let measurementId = 1;

    for (let i = 1; i <= count; i++) {
        const sessionId = i;
        // 최근 30일 내 임의 시각
        const start = new Date(now - randInt(0, 30 * 24 * 60) * 60 * 1000 - randInt(0, 59) * 1000);
        const durationSec = randInt(90, 420);
        const end = new Date(start.getTime() + durationSec * 1000);

        sessions.push({
            session_id: sessionId,
            user_number: randInt(1000, 9999),
            user_ip: randomIp(),
            start_time: start.toISOString(),
            end_time: end.toISOString(),
            total_duration: durationSec,
        });

        const first = pick(EMOTIONS);
        const second = rand() < 0.6 ? pick(["행복", "중립", "놀람"]) : pick(EMOTIONS);

        measurements.push({
            measurement_id: measurementId++,
            session_id: sessionId,
            measurement_type: "primary",
            emotion_name: first,
            confidence_score: randInt(55, 97),
            face_detection_success: true,
            timestamp: new Date(start.getTime() + 20 * 1000).toISOString(),
        });
        measurements.push({
            measurement_id: measurementId++,
            session_id: sessionId,
            measurement_type: "secondary",
            emotion_name: second,
            confidence_score: randInt(60, 99),
            face_detection_success: rand() > 0.05,
            timestamp: new Date(end.getTime() - 15 * 1000).toISOString(),
        });

        const content = CONTENT_BY_EMOTION[first] || CONTENT_BY_EMOTION["중립"];
        const completed = rand() > 0.2;
        interactions.push({
            interaction_id: i,
            session_id: sessionId,
            recommended_emotion: first,
            content_type: content.type,
            content_title: content.title,
            viewing_completed: completed,
            stopped_early: !completed,
        });

        performance.push({
            metric_id: i,
            session_id: sessionId,
            face_detection_accuracy: round(0.7 + rand() * 0.3),
            emotion_confidence_avg: round(0.55 + rand() * 0.4),
            valid_measurement_rate: round(0.6 + rand() * 0.4),
            processing_time: round(0.4 + rand() * 1.8),
            api_success_rate: round(0.95 + rand() * 0.05, 3),
        });
    }

    // 최신 세션이 위로 오도록
    sessions.sort((a, b) => new Date(b.start_time) - new Date(a.start_time));

    return { sessions, measurements, interactions, performance };
}

export const seedData = buildSeed(50);
