import { useEffect, useState } from "react";



export default function Header({ user, total }) {

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
                <img src="/이모션 로고-Photoroom.png" alt="Emotion Care 로고"  className="header-logo" />
                {/* <h1 className="emotion-care-title">
                    <span className="emotion-bold">Emotion</span>{" "}
                    <span className="Care-regular">Care</span>
                </h1> */}
                {/* <h1 className="emotion-care-title">
                    <span className="emotion-bold">Emotion</span> <span className="Care-regular">Care</span>
                </h1> */}
                <p style={{ fontSize: "1.1em", opacity: "1", marginBottom: "15px", color: "#1f2937", fontWeight: "600" }}>단계별로 완성하며
                    감정의 변화를 확인해보세요!</p>



                <div className="user-info">
                    <div>
                        <span
                            style={{
                                fontSize: "1.3em",
                                fontWeight: "bold",
                                color: "#1f2937",
                            }}
                        >
                            사용자 #<span id="userNumber">{user.randomNum}</span>
                        </span>
                        <span
                            style={{
                                marginLeft: "30px",
                                fontSize: "1.3em",
                                fontWeight: "blod",
                                color: "#1f2937",
                            }}
                        >
                            사용시간:{" "}
                            <span
                                id="sessionTime"
                                style={{
                                    color: "#667eea",
                                    fontWeight: "bold",
                                }}
                            >
                                {elapsedTime}
                            </span>

                        </span>

                        <span
                            style={{
                                marginLeft: "30px",
                                fontSize: "1.3em",
                                fontWeight: "bold",
                                color: "#1f2937",
                            }}
                        >
                            사용자 IP:{" "}
                            <span
                                id="sessionTime"
                                style={{
                                    color: "#667eea",
                                    fontWeight: "bold",
                                }}
                            >
                                {user.user_ip}
                            </span>

                        </span>

                    </div>
                    <div className="user-stats">
                        <div className="stat-item">
                            <div className="stat-value" id="totalUsers">{total.total_users}</div>
                            <div className="stat-label">총 사용자</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value" id="todayMeasurements">{total.today_measurements}</div>
                            <div className="stat-label">오늘 측정</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value" id="myMeasurements">{total.my_measurements}</div>
                            <div className="stat-label">내 측정 횟수</div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
