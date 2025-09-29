export default function Footer() {
    return (
        <>
            {/* 푸터 개인정보 처리방침 */}
            <div
                style={{
                    maxWidth: "1400px",
                    margin: "20px auto",
                    padding: "25px",
                    background: "#ffffff",
                    borderRadius: "15px",
                    fontSize: "1em",
                    color: "#1f2937",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    border: "2px solid #e5e7eb",
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <strong style={{ color: "#1f2937", fontSize: "1.3em" }}>
                        📋 개인정보 처리방침
                    </strong>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "25px",
                    }}
                >
                    {/* 데이터 보안 */}
                    <div
                        style={{
                            background: "#f8fafc",
                            padding: "20px",
                            borderRadius: "10px",
                            borderLeft: "4px solid #3b82f6",
                        }}
                    >
                        <strong style={{ color: "#1e40af", fontSize: "1.1em" }}>
                            🔒 데이터 보안
                        </strong>
                        <br />
                        <br />
                        <div style={{ color: "#374151", lineHeight: 1.6 }}>
                            • 웹캠 영상은 실시간 분석만 진행 <br />
                            • <strong>서버 저장 및 전송 없음</strong> <br />
                            • 브라우저 내 로컬 처리만 수행
                        </div>
                    </div>

                    {/* 수집 정보 */}
                    <div
                        style={{
                            background: "#f0fdf4",
                            padding: "20px",
                            borderRadius: "10px",
                            borderLeft: "4px solid #10b981",
                        }}
                    >
                        <strong style={{ color: "#047857", fontSize: "1.1em" }}>
                            📊 수집 정보
                        </strong>
                        <br />
                        <br />
                        <div style={{ color: "#374151", lineHeight: 1.6 }}>
                            • 감정 분석 결과 (익명) <br />
                            • 사용 시간 통계 <br />
                            • <strong>개인 식별 정보 수집 안함</strong>
                        </div>
                    </div>

                    {/* 사용자 권리 */}
                    <div
                        style={{
                            background: "#fefbff",
                            padding: "20px",
                            borderRadius: "10px",
                            borderLeft: "4px solid #8b5cf6",
                        }}
                    >
                        <strong style={{ color: "#7c3aed", fontSize: "1.1em" }}>
                            ⚖️ 사용자 권리
                        </strong>
                        <br />
                        <br />
                        <div style={{ color: "#374151", lineHeight: 1.6 }}>
                            • 언제든 카메라 사용 중단 가능 <br />
                            • 브라우저 종료 시 모든 데이터 삭제 <br />
                            • <strong>개인정보보호법 준수</strong>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        textAlign: "center",
                        marginTop: "20px",
                        paddingTop: "20px",
                        borderTop: "2px solid #e5e7eb",
                        color: "#4b5563",
                        background: "#f9fafb",
                        padding: "15px",
                        borderRadius: "8px",
                    }}
                >
                    <strong>
                        📞 문의사항이 있으시면 언제든지 연락해 주세요. 안전하고 투명한 서비스를 제공합니다.
                    </strong>
                </div>
            </div>
        </>
    );
}
