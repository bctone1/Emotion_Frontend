import { useEffect, useState } from "react";



export default function Header({ user }) {

    const [elapsedTime, setElapsedTime] = useState("00:00");

    useEffect(() => {
        if (!user.startTime) return; // startTime이 없으면 실행 X

        const start = new Date(user.startTime);

        const interval = setInterval(() => {
            const now = new Date();
            const diff = Math.floor((now - start) / 1000); // 초 단위 차이

            const minutes = String(Math.floor(diff / 60)).padStart(2, "0");
            const seconds = String(diff % 60).padStart(2, "0");

            setElapsedTime(`${minutes}:${seconds}`);
        }, 1000);

        return () => clearInterval(interval); // 언마운트 시 정리
    }, [user.startTime]);

    return (
        <>
            <div className="header">
                {/* Emotion Care 타이틀 */}
                <img src="/이모션 로고-Photoroom.png" alt="Emotion Care 로고" style={{ height: "250px" }} />
                {/* <h1 className="emotion-care-title">
                    <span className="emotion-bold">Emotion</span>{" "}
                    <span className="Care-regular">Care</span>
                </h1> */}
                <p style={{ fontSize: "1.3em", opacity: 0.9 }}>
                    단계별로 완성하며 감정의 변화를 확인해보세요!
                </p>

                {/* 개인정보 보호 안내 */}
                <div
                    style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                        borderRadius: "10px",
                        padding: "15px",
                        margin: "20px 0",
                        fontSize: "0.9em",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "8px",
                        }}
                    >
                        <span style={{ fontSize: "1.2em" }}>🔒</span>
                        <strong
                            style={{ color: "#ffffff", fontSize: "1.1em" }}
                        >
                            개인정보 보호
                        </strong>
                    </div>
                    <div style={{ color: "#f3f4f6", lineHeight: 1.4 }}>
                        • 웹캠 영상은 실시간 분석만 진행되며{" "}
                        <strong style={{ color: "#fbbf24" }}>
                            서버에 저장되지 않습니다
                        </strong>
                        <br />
                        • 모든 데이터 처리는 브라우저 내에서만 이루어집니다
                        <br />
                        • 개인 식별 정보는 수집하지 않습니다
                    </div>
                </div>

                <div className="user-info">
                    <div>
                        <span
                            style={{
                                fontSize: "1.6em",
                                fontWeight: "bold",
                                color: "#fbbf24",
                                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                            }}
                        >
                            사용자 #<span id="userNumber">{user.randomNum}</span>
                        </span>
                        <span
                            style={{
                                marginLeft: "30px",
                                fontSize: "1.4em",
                                fontWeight: 600,
                                color: "#e5e7eb",
                            }}
                        >
                            사용시간:{" "}
                            <span
                                id="sessionTime"
                                style={{
                                    color: "#fbbf24",
                                    fontWeight: "bold",
                                }}
                            >
                                {elapsedTime}
                            </span>

                        </span>

                        <span
                            style={{
                                marginLeft: "30px",
                                fontSize: "1.4em",
                                fontWeight: 600,
                                color: "#e5e7eb",
                            }}
                        >
                            사용자 IP:{" "}
                            <span
                                id="sessionTime"
                                style={{
                                    color: "#fbbf24",
                                    fontWeight: "bold",
                                }}
                            >
                                {user.user_ip}
                            </span>

                        </span>

                    </div>
                    <div className="user-stats">
                        <div className="stat-item">
                            <div className="stat-value" id="totalUsers">
                                1,247
                            </div>
                            <div className="stat-label">총 사용자</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value" id="todayMeasurements">
                                89
                            </div>
                            <div className="stat-label">오늘 측정</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value" id="myMeasurements">
                                1
                            </div>
                            <div className="stat-label">내 측정 횟수</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
