import { useState } from 'react';

export default function Section1({ PuzzleStatus, setPuzzleStatus }) {

    const actualEmotionContent = {
        '행복': {
            type: 'video',
            title: '건강 체조 영상',
            videoUrl: '/video/happy.mp4',
            fallbackContent: {
                type: 'images',
                images: [
                    { text: '🏔️ 아름다운 산 풍경', color: '#4f46e5' },
                    { text: '🌊 평화로운 바다', color: '#059669' },
                    { text: '🌸 예쁜 벚꽃길', color: '#dc2626' },
                    { text: '🌅 따뜻한 일출', color: '#ea580c' }
                ]
            }
        },
        '중립': {
            type: 'video',
            title: '그림 영상',
            videoUrl: '/video/neutral.mp4',
            fallbackContent: {
                type: 'meditation',
                content: {
                    icon: '🧘‍♀️',
                    guide: '깊게 숨을 들이마시고... 천천히 내쉬세요...',
                    steps: ['편안히 앉으세요', '눈을 감고 호흡에 집중하세요', '마음을 비우고 현재에 집중하세요']
                }
            }
        },
        '슬픔': {
            type: 'video',
            title: '따뜻한 시',
            videoUrl: '/video/sad.mp4',
            fallbackContent: {
                type: 'music',
                content: {
                    icon: '🎵',
                    description: '부드럽고 따뜻한 멜로디가 마음을 위로해드립니다',
                    tracks: ['Peaceful Piano', 'Gentle Strings', 'Warm Embrace']
                }
            }
        },
        '화남': {
            type: 'video',
            title: '미디어 아트',
            videoUrl: '/video/angry.mp4',
            fallbackContent: {
                type: 'meditation',
                content: {
                    icon: '🌊',
                    guide: '화를 물처럼 흘려보내세요...',
                    steps: ['긴장을 풀고 앉으세요', '분노를 인정하고 받아들이세요', '차분한 호흡으로 마음을 가라앉히세요']
                }
            }
        },
        '놀람': {
            type: 'video',
            title: '스마트폰 사용법',
            videoUrl: '/video/surprised.mp4',
            fallbackContent: {
                type: 'images',
                images: [
                    { text: '🐶 귀여운 강아지', color: '#f59e0b' },
                    { text: '🐱 장난꾸러기 고양이', color: '#8b5cf6' },
                    { text: '🐼 사랑스러운 팬다', color: '#10b981' },
                    { text: '🐘 우아한 코끼리', color: '#6b7280' }
                ]
            }
        },
        '두려움': {
            type: 'video',
            title: '따뜻한 시',
            videoUrl: '/video/fearful.mp4',
            fallbackContent: {
                type: 'images',
                images: [
                    { text: '🌅 희망의 일출', color: '#f59e0b' },
                    { text: '☀️ 따뜻한 빛', color: '#eab308' },
                    { text: '🌤️ 평화로운 하늘', color: '#3b82f6' },
                    { text: '🌈 무지개의 기적', color: '#10b981' }
                ]
            }
        },
        '역겨움': {
            type: 'video',
            title: '스마트폰 사용법',
            videoUrl: '/video/disgusted.mp4',
            fallbackContent: {
                type: 'images',
                images: [
                    { text: '🌸 벚꽃의 아름다움', color: '#ec4899' },
                    { text: '🌹 우아한 장미', color: '#dc2626' },
                    { text: '🌻 밝은 해바라기', color: '#f59e0b' },
                    { text: '🌺 다채로운 꽃다발', color: '#8b5cf6' }
                ]
            }
        },
        '혼란': {
            type: 'video',
            title: '아름다운 시',
            videoUrl: '/video/confused.mp4',
            fallbackContent: {
                type: 'meditation',
                content: {
                    icon: '🌙',
                    guide: '혼란스러운 마음을 차분히 정리해보세요...',
                    steps: ['깊게 호흡하며 긴장을 풀어보세요', '생각들을 구름처럼 흘려보내세요', '고요한 마음의 중심을 찾아보세요']
                }
            }
        }
    };


    const [emotionMonitorVisible, setemotionMonitorVisible] = useState(true);
    const [actualContentVisible, setactualContentVisible] = useState(false);
    const [stopMeasureVisible, setstopMeasureVisible] = useState(true);

    // 감정 → 라벨
    const emotionLabelMap = (emotion) => {
        const emotionMapping = {
            happy: "행복",
            sad: "슬픔",
            angry: "화남",
            fearful: "두려움",
            disgusted: "역겨움",
            surprised: "놀람",
            neutral: "중립",
        };
        return emotionMapping[emotion] || "";
    };

    // 감정 → 이모지
    const emotionEmojiMap = (emotion) => {
        const emotionEmojiMapping = {
            happy: "😊",
            sad: "😢",
            angry: "😠",
            fearful: "😨",
            disgusted: "🤢",
            surprised: "😲",
            neutral: "😐",
        };
        return emotionEmojiMapping[emotion] || "";
    };

    const [firstEmotionData, setfirstEmotionData] = useState({
        name: "혼란",
    });
    const [Videocontent, setVideocontent] = useState("");

    const showContent = (emotionName) => {
        setactualContentVisible(true)
        setVideocontent(actualEmotionContent[emotionName]);


    }

    return (
        <>
            {/* 1단계: 준비 */}
            <div className={`step-content ${PuzzleStatus === 1 ? "active" : ""}`} id="step1">
                <div className="preparation-step">
                    <div className="camera-setup">
                        <div className="camera-icon">📷</div>
                        <h3 style={{ fontSize: "2.2em", marginBottom: "20px", color: "#0c4a6e" }}>
                            카메라 준비하기
                        </h3>
                        <p style={{ fontSize: "1.4em", color: "#0369a1", marginBottom: "25px" }}>
                            감정 인식을 위해 카메라를 준비해주세요
                        </p>

                        {/* 카메라 사용 동의 및 안내 */}
                        <div style={{
                            background: "#fef3c7",
                            border: "2px solid #f59e0b",
                            borderRadius: "15px",
                            padding: "20px",
                            margin: "20px 0",
                            textAlign: "left"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                                <span style={{ fontSize: "1.5em" }}>📷</span>
                                <strong style={{ color: "#92400e", fontSize: "1.2em" }}>카메라 사용 동의</strong>
                            </div>
                            <div style={{ color: "#92400e", lineHeight: 1.5, fontSize: "1.1em" }}>
                                <div style={{ marginBottom: "10px" }}>✅ <strong>데이터 처리 방식:</strong></div>
                                <ul style={{ margin: "10px 0 15px 20px" }}>
                                    <li>웹캠 영상은 <strong>실시간으로만</strong> 분석됩니다</li>
                                    <li>어떠한 영상이나 이미지도 <strong>저장되지 않습니다</strong></li>
                                    <li>모든 처리는 브라우저 내에서만 이루어집니다</li>
                                    <li>서버로 전송되는 데이터는 없습니다</li>
                                </ul>
                                <div style={{
                                    background: "rgba(239, 68, 68, 0.1)",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    borderLeft: "4px solid #ef4444"
                                }}>
                                    <strong>⚠️ 중요:</strong> 카메라 연결을 진행하시면 위 내용에 동의하는 것으로 간주됩니다.
                                </div>
                            </div>
                        </div>

                        <div style={{ fontSize: "1.2em", color: "#0284c7", lineHeight: 1.8 }}>
                            밝은 곳에서 진행해주세요<br />
                            얼굴이 잘 보이도록 위치를 조정해주세요<br />
                            편안한 자세로 앉아주세요
                        </div>
                    </div>

                    {/* 버튼 이벤트 핸들러도 onClick으로 수정 */}
                    <button
                        className="action-button primary-button"
                        onClick={() => setPuzzleStatus(2)}
                    >
                        동의하고 카메라 연결하기
                    </button>
                </div>
            </div>

            {/* 2단계: 첫 번째 감정 측정 */}
            <div className={`step-content ${PuzzleStatus === 2 ? "active" : ""}`} id="step2">
                <div className="webcam-section">
                    <h3
                        style={{
                            fontSize: "2.2em",
                            marginBottom: "25px",
                            color: "#1f2937",
                            textAlign: "center",
                        }}
                    >
                        첫 번째 감정 측정
                    </h3>

                    <div className="camera-emotion-container">
                        <div className="webcam-container">
                            <div className="webcam-display" id="webcamDisplay">
                                <span id="webcamText">웹캠 연결을 기다리는 중...</span>
                                <video
                                    id="webcamVideo"
                                    autoPlay
                                    muted
                                    playsInline
                                // style={{ display: "none" }}
                                ></video>
                                <div className="loading-indicator" id="loadingIndicator">
                                    <div className="loading-spinner"></div>
                                    <div>AI 모델 로딩 중...</div>
                                </div>
                            </div>
                            <canvas
                                className="face-overlay"
                                id="overlay"
                                width="500"
                                height="350"
                            ></canvas>
                        </div>

                        {/* 실시간 감정 모니터 */}
                        <div
                            className="emotion-monitor"
                            id="emotionMonitor"
                        // style={{ display: "none" }}
                        >
                            <h4>실시간 감정 분석</h4>
                            <div className="current-emotion-display">
                                <span className="emotion-emoji-large" id="currentEmotionEmoji">
                                    😐
                                </span>
                                <div className="emotion-name-large" id="currentEmotionName">
                                    감지 중...
                                </div>
                            </div>

                            <div className="emotion-bars-grid">
                                <div className="emotion-bar-item">
                                    <div className="emotion-bar-emoji">😊</div>
                                    <div className="emotion-bar-label">행복</div>
                                    <div className="emotion-bar-container">
                                        <div className="emotion-bar-fill" id="happyBar"></div>
                                    </div>
                                    <div className="emotion-bar-value" id="happyValue">0%</div>
                                </div>
                                <div className="emotion-bar-item">
                                    <div className="emotion-bar-emoji">😢</div>
                                    <div className="emotion-bar-label">슬픔</div>
                                    <div className="emotion-bar-container">
                                        <div className="emotion-bar-fill" id="sadBar"></div>
                                    </div>
                                    <div className="emotion-bar-value" id="sadValue">0%</div>
                                </div>
                                <div className="emotion-bar-item">
                                    <div className="emotion-bar-emoji">😠</div>
                                    <div className="emotion-bar-label">화남</div>
                                    <div className="emotion-bar-container">
                                        <div className="emotion-bar-fill" id="angryBar"></div>
                                    </div>
                                    <div className="emotion-bar-value" id="angryValue">0%</div>
                                </div>
                                <div className="emotion-bar-item">
                                    <div className="emotion-bar-emoji">😐</div>
                                    <div className="emotion-bar-label">중립</div>
                                    <div className="emotion-bar-container">
                                        <div className="emotion-bar-fill" id="neutralBar"></div>
                                    </div>
                                    <div className="emotion-bar-value" id="neutralValue">0%</div>
                                </div>
                                <div className="emotion-bar-item">
                                    <div className="emotion-bar-emoji">😲</div>
                                    <div className="emotion-bar-label">놀람</div>
                                    <div className="emotion-bar-container">
                                        <div className="emotion-bar-fill" id="surprisedBar"></div>
                                    </div>
                                    <div className="emotion-bar-value" id="surprisedValue">0%</div>
                                </div>
                                <div className="emotion-bar-item">
                                    <div className="emotion-bar-emoji">😨</div>
                                    <div className="emotion-bar-label">두려움</div>
                                    <div className="emotion-bar-container">
                                        <div className="emotion-bar-fill" id="fearfulBar"></div>
                                    </div>
                                    <div className="emotion-bar-value" id="fearfulValue">0%</div>
                                </div>
                                <div className="emotion-bar-item">
                                    <div className="emotion-bar-emoji">🤢</div>
                                    <div className="emotion-bar-label">역겨움</div>
                                    <div className="emotion-bar-container">
                                        <div className="emotion-bar-fill" id="disgustedBar"></div>
                                    </div>
                                    <div className="emotion-bar-value" id="disgustedValue">0%</div>
                                </div>
                                <div className="emotion-bar-item">
                                    <div className="emotion-bar-emoji">😵</div>
                                    <div className="emotion-bar-label">혼란</div>
                                    <div className="emotion-bar-container">
                                        <div className="emotion-bar-fill" id="confusedBar"></div>
                                    </div>
                                    <div className="emotion-bar-value" id="confusedValue">0%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        id="emotionStatus"
                        style={{
                            fontSize: "1.4em",
                            color: "#4b5563",
                            margin: "20px 0",
                            textAlign: "center",
                        }}
                    >
                        자연스러운 표정으로 화면을 보고 있어주세요
                    </div>

                    <div className="emotion-result" id="emotionResult1">
                        <div className="emotion-emoji" id="emotionEmoji1">
                            😊
                        </div>
                        <div className="emotion-name" id="emotionName1">
                            행복
                        </div>
                        <div className="emotion-confidence" id="emotionConfidence1">
                            신뢰도 85%
                        </div>
                    </div>

                    <div style={{ textAlign: "center" }}>
                        <button
                            className="action-button"
                            id="measureButton1"
                        // onClick={() => setPuzzleStatus(3)}
                        >
                            감정 측정하기
                        </button>
                        <button
                            className="action-button stop-button hidden"
                            id="stopMeasureButton1"
                        // onClick={() => stopEmotionMeasurement(1)}
                        >
                            측정 중지
                        </button>
                        <button
                            className="action-button primary-button"
                            id="proceedToContentButton"
                            onClick={() => setPuzzleStatus(3)}
                        >
                            콘텐츠 감상하러 가기
                        </button>
                    </div>
                </div>
            </div>


            {/* 3단계: 콘텐츠 추천 및 실제 감상 */}
            <div className={`step-content ${PuzzleStatus === 3 ? "active" : ""}`} id="step3">
                <div className={`content-recommendation ${actualContentVisible ? "hidden" : ""}`} >
                    <h3
                        style={{
                            fontSize: "2.2em",
                            marginBottom: "25px",
                            color: "#581c87",
                            textAlign: "center",
                        }}
                    >
                        맞춤 콘텐츠 추천
                    </h3>
                    <div className="content-preview" id="contentPreview">
                        <div className="content-icon" id="contentIcon">🌈</div>
                        <div className="content-title" id="contentTitle">기분 좋은 자연 풍경</div>
                        <div className="content-description" id="contentDescription">
                            아름다운 자연의 모습을 감상하며 마음을 편안하게 해보세요
                        </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button
                            className="action-button primary-button"
                            id="viewContentButton"
                            onClick={() => showContent(firstEmotionData.name)} // React 방식
                        >
                            콘텐츠 감상 시작
                        </button>
                    </div>
                </div>

                <div className={`actual-content ${actualContentVisible ? "" : "hidden"}`} id="actualContent">
                    <h3
                        style={{
                            fontSize: "2em",
                            marginBottom: "20px",
                            color: "#1f2937",
                            textAlign: "center",
                        }}
                    >
                        콘텐츠 감상 중
                    </h3>

                    <div className="content-display" id="contentDisplay">
                        <div className="video-content">
                            <video
                                // ref={videoRef}
                                className="video-player"
                                src={Videocontent.videoUrl}
                                autoPlay
                                loop
                                muted
                                controls={false}
                            // onClick={() => videoRef.current.paused && handleManualPlay()}
                            // style={{ width: '100%', display: loading ? 'none' : 'block' }}
                            />
                        </div>
                    </div>

                    <div className="button-group" style={{ textAlign: "center", marginTop: "30px" }}>
                        <button
                            className="action-button stop-button"
                            id="stopViewingButton"
                        // onClick={stopContentViewing}
                        >
                            감상 중지
                        </button>
                        <button
                            className="action-button primary-button"
                            id="finishViewingButton"
                            onClick={() => setPuzzleStatus(4)}
                        >
                            감상 완료
                        </button>
                    </div>
                </div>
            </div>

            {/* 4단계: 두 번째 감정 측정 */}
            <div className={`step-content ${PuzzleStatus === 4 ? "active" : ""}`} id="step4">
                <div className="webcam-section">
                    <h3
                        style={{
                            fontSize: "2.2em",
                            marginBottom: "25px",
                            color: "#1f2937",
                            textAlign: "center",
                        }}
                    >
                        두 번째 감정 측정
                    </h3>

                    <div className="camera-emotion-container">
                        <div className="webcam-container">
                            <div className="webcam-display" id="webcamDisplay2">
                                <span>콘텐츠 감상 후 변화된 감정을 측정합니다</span>
                                <video
                                    id="webcamVideo2"
                                    autoPlay
                                    muted
                                    playsInline
                                    style={{ display: "none" }}
                                />
                            </div>
                            <canvas className="face-overlay" id="overlay2" width={500} height={350} />
                        </div>

                        <div className="emotion-monitor" id="emotionMonitor2" style={{ display: emotionMonitorVisible ? "block" : "none" }}>
                            <h4>실시간 감정 분석</h4>
                            <div className="current-emotion-display">
                                <span className="emotion-emoji-large" id="currentEmotionEmoji2">😐</span>
                                <div className="emotion-name-large" id="currentEmotionName2">감지 중...</div>
                            </div>

                            <div className="emotion-bars-grid">
                                {["happy", "sad", "angry", "neutral", "surprised", "fearful", "disgusted", "confused"].map((emotion) => (
                                    <div className="emotion-bar-item" key={emotion}>
                                        <div className="emotion-bar-emoji">{emotionEmojiMap[emotion]}</div>
                                        <div className="emotion-bar-label">{emotionLabelMap[emotion]}</div>
                                        <div className="emotion-bar-container">
                                            <div className="emotion-bar-fill" id={`${emotion}Bar2`} />
                                        </div>
                                        <div className="emotion-bar-value" id={`${emotion}Value2`}>0%</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="emotion-result" id="emotionResult2">
                        <div className="emotion-emoji" id="emotionEmoji2">😊</div>
                        <div className="emotion-name" id="emotionName2">행복</div>
                        <div className="emotion-confidence" id="emotionConfidence2">신뢰도 90%</div>
                    </div>

                    <div style={{ textAlign: "center", marginBottom: "30px" }}>
                        <button className="action-button" id="measureButton2"
                        // onClick={measureSecondEmotion}
                        >
                            다시 측정하기
                        </button>
                        <button
                            className={`action-button stop-button ${!stopMeasureVisible ? "hidden" : ""}`}
                            id="stopMeasureButton2"
                        // onClick={() => stopEmotionMeasurement(2)}
                        >
                            측정 중지
                        </button>
                    </div>
                </div>
            </div >

            {/* 최종 완성 및 통계 */}
            < div className={`step-content ${PuzzleStatus === 4 ? "active" : ""}`} id="finalResult" >
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                    <h2
                        style={{
                            fontSize: "2.5em",
                            color: "#1f2937",
                            marginBottom: "20px",
                        }}
                    >
                        퍼즐 완성!
                    </h2>
                    <p
                        style={{
                            fontSize: "1.4em",
                            color: "#4b5563",
                        }}
                    >
                        모든 단계를 완료했습니다! 감정 변화 분석을 확인해보세요.
                    </p>

                    <div
                        style={{
                            background: "linear-gradient(145deg, #f0f9ff, #e0f2fe)",
                            padding: "20px",
                            borderRadius: "15px",
                            margin: "20px 0",
                            border: "3px solid #0ea5e9",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "1.2em",
                                color: "#0c4a6e",
                                marginBottom: "10px",
                            }}
                        >
                            총 소요 시간: <span id="totalTime">03:45</span>
                        </div>
                        <div style={{ fontSize: "1em", color: "#0369a1" }}>
                            측정 결과가 데이터베이스에 저장되었습니다 (ID: #
                            <span id="measurementId">2024001247</span>)
                        </div>
                    </div>
                </div>

                <div className="statistics-section">
                    <h3
                        style={{
                            fontSize: "2.5em",
                            marginBottom: "30px",
                            color: "#1f2937",
                            textAlign: "center",
                        }}
                    >
                        감정 변화 통계 분석
                    </h3>

                    <div className="stats-grid">
                        <div className="stat-card" id="emotionChangeCard">
                            <div className="stat-icon">🔄</div>
                            <div className="stat-title">감정 변화</div>
                            <div className="card-stat-value" id="emotionChangeValue">
                                감정 유지
                            </div>
                            <div className="stat-description" id="emotionChangeDesc">
                                동일한 감정이 유지되었습니다
                            </div>
                        </div>

                        <div className="stat-card" id="confidenceChangeCard">
                            <div className="stat-icon">📈</div>
                            <div className="stat-title">신뢰도 변화</div>
                            <div className="card-stat-value" id="confidenceChangeValue">
                                +5%
                            </div>
                            <div className="stat-description" id="confidenceChangeDesc">
                                신뢰도가 증가했습니다
                            </div>
                        </div>

                        <div className="stat-card" id="beforeCard">
                            <div className="stat-icon" id="beforeEmoji">
                                😊
                            </div>
                            <div className="stat-title">측정 전</div>
                            <div className="card-stat-value" id="beforeName">
                                행복
                            </div>
                            <div className="stat-description" id="beforeConfidence">
                                신뢰도 85%
                            </div>
                        </div>

                        <div className="stat-card" id="afterCard">
                            <div className="stat-icon" id="afterEmoji">
                                😊
                            </div>
                            <div className="stat-title">측정 후</div>
                            <div className="card-stat-value" id="afterName">
                                행복
                            </div>
                            <div className="stat-description" id="afterConfidence">
                                신뢰도 90%
                            </div>
                        </div>
                    </div>

                    <div
                        id="finalAnalysis"
                        style={{
                            textAlign: "center",
                            margin: "30px 0",
                            fontSize: "1.6em",
                            color: "#1f2937",
                            background: "linear-gradient(145deg, #f0fdf4, #dcfce7)",
                            padding: "30px",
                            borderRadius: "20px",
                            border: "3px solid #16a34a",
                        }}
                    >놀람에서 역겨움으로 감정이 변화했습니다. 다양한 감정을 경험하는 것도 의미있는 과정입니다.</div>
                </div>

                {/* 정량적 지표 평가 섹션 */}
                <div
                    className="statistics-section"
                    style={{
                        border: "4px solid #8b5cf6",
                        background: "linear-gradient(145deg, #faf5ff, #f3e8ff)",
                    }}
                >
                    <h3
                        style={{
                            fontSize: "2.5em",
                            marginBottom: "30px",
                            color: "#7c3aed",
                            textAlign: "center",
                        }}
                    >
                        📊 정량적 성능 지표 (KPI)
                    </h3>

                    <div className="stats-grid">
                        <div className="stats-grid">
                            <div className="stat-card" id="kpiCard1">
                                <div className="stat-icon">🎯</div>
                                <div className="stat-title">얼굴 감출 정수</div>
                                <div className="card-stat-value" id="kpiValue1">0.85</div>
                                <div className="stat-description" id="kpiDesc1">목표: ≥ 0.7 (적정 확률)</div>
                            </div>

                            <div className="stat-card" id="kpiCard2">
                                <div className="stat-icon">🎪</div>
                                <div className="stat-title">감정 신뢰도</div>
                                <div className="card-stat-value" id="kpiValue2">0.75</div>
                                <div className="stat-description" id="kpiDesc2">목표: ≥ 0.6 (적정 확률)</div>
                            </div>

                            <div className="stat-card" id="kpiCard3">
                                <div className="stat-icon">📈</div>
                                <div className="stat-title">유효 측정률</div>
                                <div className="card-stat-value" id="kpiValue3">78%</div>
                                <div className="stat-description" id="kpiDesc3">목표: ≥ 70% (목표 달성)</div>
                            </div>

                            <div className="stat-card" id="kpiCard4">
                                <div className="stat-icon">⚡</div>
                                <div className="stat-title">처리 응답 시간</div>
                                <div className="card-stat-value" id="kpiValue4">1.2초</div>
                                <div className="stat-description" id="kpiDesc4">목표: ≤ 2초 (목표 달성)</div>
                            </div>

                            <div className="stat-card" id="kpiCard5">
                                <div className="stat-icon">🌐</div>
                                <div className="stat-title">API 접속 성공률</div>
                                <div className="card-stat-value" id="kpiValue5">99%</div>
                                <div className="stat-description" id="kpiDesc5">목표: ≥ 98% (서비스 정상)</div>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            textAlign: "center",
                            margin: "30px 0",
                            padding: "25px",
                            background: "linear-gradient(145deg, #eff6ff, #dbeafe)",
                            borderRadius: "15px",
                            border: "3px solid #3b82f6",
                        }}
                    >
                        <h4
                            style={{
                                color: "#1e40af",
                                fontSize: "1.4em",
                                marginBottom: "15px",
                            }}
                        >
                            📋 종합 평가 결과
                        </h4>
                        <div
                            id="kpiSummary"
                            style={{
                                color: "#1e3a8a",
                                fontSize: "1.2em",
                                lineHeight: "1.6",
                            }}
                        >
                            모든 KPI 지표가 목표 기준을 충족하여 시스템이 정상적으로 작동하고 있습니다.
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: "center", marginTop: "40px" }}>
                    <button
                        className="action-button primary-button"
                        id="newUserButton"
                    // onClick={() => newUser()}
                    >
                        다시 시작하기
                    </button>
                </div>
            </div >

        </>
    )
}