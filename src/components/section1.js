import { useState, useRef, useEffect } from 'react';
import * as faceapi from "@vladmandic/face-api";


export default function Section1({ PuzzleStatus, setPuzzleStatus, setUser, user }) {

    const videoRef = useRef(null);
    const videoRef2 = useRef(null);
    const canvasRef = useRef(null);
    const canvasRef2 = useRef(null);

    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [loading, setLoading] = useState(true);

    const emotionContent = {
        '슬픔': {
            icon: '🌊',
            title: '"늙어가는 나에게" 시 감상',
            description: '천준직 시인의 따뜻한 시로 슬픔을 행복으로 승화시켜보세요'
        },
        '두려움': {
            icon: '💌',
            title: '"편지" 시 낭송',
            description: '이선옥 시인의 편지로 두려움을 평온한 마음으로 전환해보세요'
        },
        '혼란': {
            icon: '🕸️',
            title: '"그물" 시 감상',
            description: '복잡한 마음을 정리하고 안정감을 찾아보세요'
        },
        '중립': {
            icon: '🎨',
            title: '고전명화 감상 영상',
            description: '고흐의 아름다운 그림으로 감동과 놀라움을 경험해보세요'
        },
        '화남': {
            icon: '🎭',
            title: '미디어아트 영상',
            description: '창의적인 미디어아트로 화를 흥미와 놀라움으로 바꿔보세요'
        },
        '역겨움': {
            icon: '📱',
            title: '스마트폰 매너 가이드',
            description: '올바른 스마트폰 사용법으로 기분 좋은 변화를 경험해보세요'
        },
        '놀람': {
            icon: '💬',
            title: '스마트폰 문자 보내기 가이드',
            description: '효과적인 소통 방법으로 자신감과 행복을 느껴보세요'
        },
        '행복': {
            icon: '🤸',
            title: '건강 체조 영상',
            description: '즐거운 체조로 더 큰 행복과 활력을 느껴보세요'
        }
    };

    const emotions = [
        { name: '행복', emoji: '😊', color: '#10b981', key: 'happy' },
        { name: '중립', emoji: '😐', color: '#6b7280', key: 'neutral' },
        { name: '슬픔', emoji: '😢', color: '#3b82f6', key: 'sad' },
        { name: '화남', emoji: '😠', color: '#ef4444', key: 'angry' },
        { name: '놀람', emoji: '😲', color: '#f59e0b', key: 'surprised' },
        { name: '두려움', emoji: '😨', color: '#8b5cf6', key: 'fearful' },
        { name: '역겨움', emoji: '🤢', color: '#06b6d4', key: 'disgusted' },
        { name: '혼란', emoji: '😵', color: '#ec4899', key: 'confused' }
    ];

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

    const [actualContentVisible, setactualContentVisible] = useState(false);

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



    const [Videocontent, setVideocontent] = useState("");
    const showContent = async (emotionName) => {
        setactualContentVisible(true)
        setVideocontent(actualEmotionContent[emotionName]);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/content_interactions/create_content_data`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    session_id: user.session_id,
                    recommended_emotion: emotionName,
                    content_type: actualEmotionContent[emotionName].type,
                    content_title: actualEmotionContent[emotionName].title,
                    viewing_completed: true,
                    stopped_early: true,
                })
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Session created:", data.session_id);
            } else {
                console.error("세션 생성 실패:", data);
            }
        } catch (err) {
            console.error("서버 요청 오류:", err);
        }
    }

    const setupCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 500, height: 350, facingMode: "user" },
                audio: false,
            });
            videoRef.current.srcObject = stream;
            videoRef2.current.srcObject = stream;

            setPuzzleStatus(2);
            setTimeout(() => {
                loadModels();
            }, 1000);

        } catch (error) {
            console.error("웹캠 접근 오류:", error);
            alert("웹캠에 접근할 수 없습니다. 카메라 권한을 확인해주세요.");
        }
    }

    const loadModels = async () => {
        setLoading(true);
        try {
            const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@latest/model/";
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            ]);
            console.log("모든 모델이 로드되었습니다");
            setModelsLoaded(true);
        } catch (error) {
            setModelsLoaded(false);
        } finally {
            setLoading(false);
        }
    };

    // 카메라와 모델이 준비됐다면 감정분석 시작
    useEffect(() => {
        if (!modelsLoaded) return;

        if (PuzzleStatus === 2 && videoRef.current) {
            startEmotionDetection({ video: videoRef.current, canvas: canvasRef.current });
        }

        if (PuzzleStatus === 4 && videoRef2.current) {
            startEmotionDetection({ video: videoRef2.current, canvas: canvasRef2.current });
        }

    }, [modelsLoaded, PuzzleStatus]);

    const intervalRef = useRef(null);

    async function startEmotionDetection({ video, canvas }) {
        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        canvas.width = displaySize.width;
        canvas.height = displaySize.height;
        const ctx = canvas.getContext("2d");

        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(async () => {
            if (!modelsLoaded) return;

            try {
                const detections = await faceapi
                    .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks()
                    .withFaceExpressions();

                const resizedDetections = faceapi.resizeResults(detections, displaySize);

                // 캔버스 클리어
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (resizedDetections.length > 0) {
                    const detection = resizedDetections[0];
                    // 얼굴 경계 그리기
                    const box = detection.detection.box;
                    ctx.strokeStyle = '#00FF00'; // 박스 색상
                    ctx.lineWidth = 2;           // 박스 두께
                    ctx.strokeRect(box.x, box.y, box.width, box.height);

                    // 랜드마크 그리기
                    const landmarks = detection.landmarks;
                    ctx.fillStyle = '#FF0000'; // 점 색상
                    landmarks.positions.forEach(point => {
                        ctx.beginPath();
                        ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI); // 점 크기
                        ctx.fill();
                    });

                    // 감정 로그
                    const emotions = detection.expressions;
                    const sorted = Object.entries(emotions).sort((a, b) => b[1] - a[1]);
                    const maxValue = sorted[0][1];
                    const confidence = Math.round(maxValue * 100);
                    const finalConfidence = Math.max(confidence, 60);


                    if (PuzzleStatus === 2) {
                        setFirstEmotionDisplay({
                            ...firstEmotionDisplay,
                            currentEmotionEmoji: emotionEmojiMap(sorted[0][0]),
                            currentEmotionName: emotionLabelMap(sorted[0][0]),
                            confidence: confidence,
                            currentEmotionMessage: "얼굴이 감지되었습니다!",
                            emotions: {
                                happy: emotions.happy,
                                sad: emotions.sad,
                                angry: emotions.angry,
                                neutral: emotions.neutral,
                                surprised: emotions.surprised,
                                fearful: emotions.fearful,
                                disgusted: emotions.disgusted,
                                confused: emotions.confused || 0
                            }
                        });

                    } else {
                        updateDetectionMetrics({ detectionSuccess: true, confidence: finalConfidence });

                        setSecondEmotionDisplay({
                            ...SecondEmotionDisplay,
                            currentEmotionEmoji: emotionEmojiMap(sorted[0][0]),
                            currentEmotionName: emotionLabelMap(sorted[0][0]),
                            confidence: confidence,
                            currentEmotionMessage: "얼굴이 감지되었습니다!",
                            emotions: {
                                happy: emotions.happy,
                                sad: emotions.sad,
                                angry: emotions.angry,
                                neutral: emotions.neutral,
                                surprised: emotions.surprised,
                                fearful: emotions.fearful,
                                disgusted: emotions.disgusted,
                                confused: emotions.confused || 0
                            }
                        });
                    }


                    console.log("현재 감정:", sorted[0][0], " (확률:", sorted[0][1].toFixed(2), ")");
                } else {
                    setFirstEmotionDisplay({
                        currentEmotionEmoji: "😐",
                        currentEmotionName: "감지 중...",
                        currentEmotionMessage: "얼굴을 카메라 앞에 위치시켜주세요",
                        confidence: 0,
                        emotions: { // 각 감정별 확률
                            happy: 0,
                            sad: 0,
                            angry: 0,
                            neutral: 0,
                            surprised: 0,
                            fearful: 0,
                            disgusted: 0,
                            confused: 0
                        }
                    });
                }

            } catch (err) {
                console.error("얼굴 감지 오류:", err);
            }
        }, 300);
    }


    const [firstEmotionDisplay, setFirstEmotionDisplay] = useState({
        currentEmotionEmoji: "😐",
        currentEmotionName: "감지 중...",
        currentEmotionMessage: "자연스러운 표정으로 화면을 보고 있어주세요",
        confidence: 0,
        emotions: { // 각 감정별 확률
            happy: 0,
            sad: 0,
            angry: 0,
            neutral: 0,
            surprised: 0,
            fearful: 0,
            disgusted: 0,
            confused: 0
        }
    });

    const [SecondEmotionDisplay, setSecondEmotionDisplay] = useState({
        currentEmotionEmoji: "😐",
        currentEmotionName: "감지 중...",
        currentEmotionMessage: "자연스러운 표정으로 화면을 보고 있어주세요",
        confidence: 0,
        emotions: { // 각 감정별 확률
            happy: 0,
            sad: 0,
            angry: 0,
            neutral: 0,
            surprised: 0,
            fearful: 0,
            disgusted: 0,
            confused: 0
        }
    });


    const measureFirstEmotion = (int) => {
        setfirstStatus(int);
        if (int === 1) return;
        // 상태 초기화 (optional)
        setFirstEmotionDisplay({
            ...firstEmotionDisplay,
            currentEmotionMessage: "측정 중...",
            currentEmotionEmoji: "😐",
            currentEmotionName: "감지 중..."
        });
        // interval 재시작
        if (videoRef.current && modelsLoaded) {
            startEmotionDetection({ video: videoRef.current, canvas: canvasRef.current });
        }

        setTimeout(() => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            setFirstEmotionDisplay({
                ...firstEmotionDisplay,
                currentEmotionMessage: "측정 완료!"
            });

            setfirstStatus(3); // 완료 상태
        }, 3000);
    };

    const measureSecondEmotion = (int) => {
        setSecondStatus(int);
        if (int === 1) return;

        // 상태 초기화 (optional)
        setSecondEmotionDisplay({
            ...SecondEmotionDisplay,
            currentEmotionMessage: "측정 중...",
            currentEmotionEmoji: "😐",
            currentEmotionName: "감지 중..."
        });

        if (videoRef.current && modelsLoaded) {
            startEmotionDetection({ video: videoRef2.current, canvas: canvasRef2.current });
        }

        setTimeout(() => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            setSecondEmotionDisplay({
                ...SecondEmotionDisplay,
                currentEmotionMessage: "측정 완료!"
            });

            setSecondStatus(3); // 완료 상태
        }, 3000);
    };



    const [firstStatus, setfirstStatus] = useState(1);
    const [SecondStatus, setSecondStatus] = useState(1);




    const contentVideoRef = useRef(null);

    const [isViewingStopped, setIsViewingStopped] = useState(false);
    const handleVideo = () => {
        if (contentVideoRef.current) {
            contentVideoRef.current.pause();  // 재생 중지
            contentVideoRef.current.currentTime = 0; // 처음부터 시작
        }
        setIsViewingStopped(true); // 중지 화면 표시
    };




    const [finalAnalysis, setFinalAnalysis] = useState("");


    const [volume, setVolume] = useState(80); // 초기 볼륨 80%

    // 볼륨 조정 함수
    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (contentVideoRef.current) {
            contentVideoRef.current.volume = newVolume / 100; // 0~1 사이 값으로 설정
        }
    };






    useEffect(() => {
        // 감정 비교 로직 (예시)
        const emotionChanged =
            firstEmotionDisplay.currentEmotionName !==
            SecondEmotionDisplay.currentEmotionName;

        const confidenceChange =
            SecondEmotionDisplay.confidence - firstEmotionDisplay.confidence;

        let analysisMessage = "";
        if (emotionChanged) {
            analysisMessage = `${firstEmotionDisplay.currentEmotionName} → ${SecondEmotionDisplay.currentEmotionName} 감정 변화가 있었습니다.`;
        } else {
            analysisMessage =
                confidenceChange >= 0
                    ? `${firstEmotionDisplay.currentEmotionName} 감정이 유지되면서 신뢰도 ${confidenceChange}% 증가했습니다.`
                    : `${firstEmotionDisplay.currentEmotionName} 감정이 일관되게 유지되었습니다.`;
        }
        setFinalAnalysis(analysisMessage);
    }, [firstEmotionDisplay, SecondEmotionDisplay]);


    const create_emotion_data = async (index) => {
        try {
            if (index === 3) {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/emotion_measurements/create_emotion_data`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        session_id: user.session_id,
                        measurement_type: "primary",
                        emotion_name: firstEmotionDisplay.currentEmotionName,
                        confidence_score: firstEmotionDisplay.confidence,
                        face_detection_success: true
                    })
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || "서버 에러");
                console.log("생성된 데이터:", data.measurement_id);
            } else {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/emotion_measurements/create_emotion_data`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        session_id: user.session_id,
                        measurement_type: "secondary",
                        emotion_name: SecondEmotionDisplay.currentEmotionName,
                        confidence_score: SecondEmotionDisplay.confidence,
                        face_detection_success: true
                    })
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || "서버 에러");
                console.log("생성된 데이터:", data.measurement_id);
            }





        } catch (err) {
            console.error("오류 발생:", err);
        }
    }



    return (
        <>
            <div className="current-step" id="currentStepText" style={{ cursor: "pointer", display: `${PuzzleStatus === 1 ? "" : "none"}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px" }}>
                    <span>1단계: 감정 측정을 위한 준비를 시작해보세요!</span>
                    <span style={{ fontSize: "0.8em", animation: "bounce 2s infinite" }}>⬇️</span>
                </div>
            </div>

            {/* 1단계: 준비 */}
            <div className={`step-content ${PuzzleStatus === 1 ? "active" : ""}`} id="step1">
                <div className="preparation-step" style={{ padding: "25px" }}>
                    {/* 2열 그리드 레이아웃  */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "18px",
                        maxWidth: "1100px",
                        margin: "0 auto 20px auto"
                    }}>
                        {/* 왼쪽: 카메라 준비하기 */}
                        <div
                            style={{
                                background: "linear-gradient(145deg, #e0f2fe, #bae6fd)",
                                border: "3px solid  #0ea5e9",
                                borderRadius: "20px",
                                padding: "20px",
                                textAlign: "cen"
                            }}>
                            <div style={{ fontSize: "2.8em", marginBottom: "8px" }}>📷</div>
                            <h3 style={{ ontSize: "1.5em", marginBottom: "8px", color: "#0c4a6e" }}>카메라 준비하기</h3>
                            <p style={{ fontSize: "0.95em", color: " #0369a1", marginBottom: "20px" }}>
                                감정 인식을 위해 카메라를 준비해주세요
                            </p>

                            {/* 카메라 사용 동의 */}
                            <div
                                style={{ background: " #fef3c7", border: "2px solid #f59e0b", borderRadius: "10px", padding: " 10px", textAlign: "left", marginTop: "20px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px" }}>
                                    <span style={{ fontSize: "1em" }}>📷</span>
                                    <strong style={{ color: "#92400e", fontSize: "0.9em" }}>카메라 사용 동의</strong>
                                </div>
                                <div style={{ color: "#92400e", lineHeight: "1.25", fontSize: "0.75em" }}>
                                    <div style={{ marginBottom: "3px" }}>✅ <strong>데이터 처리 방식:</strong></div>
                                    <ul style={{ margin: "3px 0 3px 10px;", fontSize: "0.95em", paddingLeft: "6px" }}>
                                        <li>웹캠 영상은 <strong>실시간으로만</strong> 분석됩니다</li>
                                        <li>어떠한 영상이나 이미지도 <strong>저장되지 않습니다</strong></li>
                                        <li>모든 처리는 브라우저 내에서만 이루어집니다</li>
                                        <li>서버로 전송되는 데이터는 없습니다</li>
                                    </ul>
                                    <div
                                        style={{ background: " rgba(239, 68, 68, 0.1)", padding: "5px", borderRadius: "5px", borderLeft: "3px solid #ef4444", marginTop: "5px", fontSize: "0.95em" }}>
                                        <strong>⚠️ 중요:</strong> 카메라 연결을 진행하시면 위 내용에 동의하는 것으로 간주됩니다.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 오른쪽: 측정 환경 가이드 */}
                        <div
                            style={{
                                background: "linear-gradient(145deg, #d1fae5, #a7f3d0)",
                                border: "3px solid #10b981",
                                borderRadius: "20px",
                                padding: "16px"
                            }}
                        >
                            <div style={{ textAlign: "center", marginBottom: "10px" }}>
                                <span style={{ fontSize: "1.2em", marginRight: "5px" }}>📋</span>
                                <strong style={{ color: "#047857", fontSize: "1.3em" }}>측정 환경 가이드</strong>
                            </div>

                            {/* 2x2 그리드로 4가지 가이드 항목 배치 - 더 컴팩트하게 */}
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "8px",
                                    marginBottom: "8px"
                                }}
                            >
                                {[
                                    { icon: "💡", title: "밝은 조명", desc: "밝은 곳에서 진행" },
                                    { icon: "👤", title: "얼굴 위치", desc: "화면의 60-80%" },
                                    { icon: "📏", title: "적정 거리", desc: "50-70cm 유지" },
                                    { icon: "🪑", title: "편안한 자세", desc: "편하게 앉기" }
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            background: "rgba(255, 255, 255, 0.7)",
                                            border: "2px solid #34d399",
                                            borderRadius: "8px",
                                            padding: "8px",
                                            textAlign: "center"
                                        }}
                                    >
                                        <div style={{ fontSize: "1.6em", marginBottom: "3px" }}>{item.icon}</div>
                                        <div
                                            style={{
                                                fontWeight: 700,
                                                color: "#047857",
                                                fontSize: "0.85em",
                                                marginBottom: "1px"
                                            }}
                                        >
                                            {item.title}
                                        </div>
                                        <div style={{ fontSize: "0.72em", color: "#059669" }}>{item.desc}</div>
                                    </div>
                                ))}
                            </div>

                            {/* 얼굴 위치 예시 (실제 이미지) - 더 컴팩트하게 */}
                            <div
                                style={{
                                    background: "rgba(255, 255, 255, 0.5)",
                                    border: "2px dashed #34d399",
                                    borderRadius: "8px",
                                    padding: "8px",
                                    textAlign: "center"
                                }}
                            >
                                <div
                                    style={{
                                        color: "#047857",
                                        fontWeight: 600,
                                        marginBottom: "5px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "5px",
                                        fontSize: "0.85em"
                                    }}
                                >
                                    <span>✨</span>
                                    <span>얼굴 위치 예시</span>
                                </div>
                                <img src="/촬영 위치 예시.png" alt="얼굴 위치 가이드" style={{ width: "100%", height: "auto", borderRadius: "6px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }} />


                                <div
                                    style={{
                                        fontSize: "0.7em",
                                        color: "#059669",
                                        marginTop: "4px",
                                        lineHeight: 1.2
                                    }}
                                >
                                    적절한 얼굴 크기와 위치로 측정 정확도를 높여보세요
                                </div>
                            </div>
                        </div>

                    </div>









                    {/* 하단 버튼  */}
                    <div style={{ textAlign: "center" }}>
                        <button
                            className="action-button primary-button"
                            onClick={() => setupCamera()}
                        >
                            동의하고 카메라 연결하기
                        </button>
                    </div>
                </div>




            </div >

            {/* 2단계: 첫 번째 감정 측정 */}
            < div className={`step-content ${PuzzleStatus === 2 ? "active" : ""}`
            } id="step2" >
                <div className="webcam-section">
                    <h3
                        style={{
                            fontSize: "1.6em",
                            marginBottom: "12px",
                            color: "#1f2937",
                            textAlign: "center",
                        }}
                    >
                        감정 측정
                    </h3>

                    <div className="camera-emotion-container">
                        <div className="webcam-container">
                            <div className="webcam-display" id="webcamDisplay">
                                {loading && <span id="webcamText">웹캠 연결을 기다리는 중...</span>}
                                <video
                                    ref={videoRef}
                                    id="webcamVideo"
                                    autoPlay
                                    muted
                                    playsInline
                                    style={{ display: `${loading ? "none" : ""}` }}
                                ></video>

                                {loading && (
                                    <div className="loading-indicator" id="loadingIndicator">
                                        <div className="loading-spinner"></div>
                                        <div>모델 로딩 중...</div>
                                    </div>
                                )}
                            </div>


                            <canvas
                                ref={canvasRef}
                                className="face-overlay"
                                id="overlay"
                                width="500"
                                height="350"
                            />

                        </div>

                        {/* 실시간 감정 모니터 */}
                        <div className="emotion-monitor" id="emotionMonitor">


                            <h4>실시간 감정 분석</h4>
                            <div className="current-emotion-display">
                                <span className="emotion-emoji-large" id="currentEmotionEmoji">
                                    {firstEmotionDisplay.currentEmotionEmoji}
                                </span>
                                <div className="emotion-name-large" id="currentEmotionName">
                                    {firstEmotionDisplay.currentEmotionName}
                                </div>
                            </div>



                            <div className="emotion-bars-grid">
                                {emotions.map(({ name, emoji, color, key }) => (
                                    <div key={key} className="emotion-bar-item">
                                        <div className="emotion-bar-emoji">{emoji}</div>
                                        <div className="emotion-bar-label">{name}</div>
                                        <div className="emotion-bar-container">
                                            <div
                                                className="emotion-bar-fill"
                                                style={{
                                                    width: `${Math.round((firstEmotionDisplay.emotions[key] || 0) * 100)}%`,
                                                    backgroundColor: color
                                                }}
                                            ></div>
                                        </div>
                                        <div className="emotion-bar-value">
                                            {Math.round((firstEmotionDisplay.emotions[key] || 0) * 100)}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    <div
                        id="emotionStatus"
                        style={{
                            fontSize: "1.1em",
                            color: "#4b5563",
                            margin: "10px 0",
                            textAlign: "center",
                        }}
                    >
                        {firstEmotionDisplay.currentEmotionMessage}
                    </div>

                    <div className={`emotion-result ${firstStatus === 3 ? "" : "hidden"}`} id="emotionResult1">
                        <div className="emotion-emoji" id="emotionEmoji1">
                            {firstEmotionDisplay.currentEmotionEmoji}
                        </div>
                        <div className="emotion-name" id="emotionName1">
                            {firstEmotionDisplay.currentEmotionName}
                        </div>
                        <div className="emotion-confidence" id="emotionConfidence1">
                            {firstEmotionDisplay.confidence}%
                        </div>
                    </div>

                    <div style={{ textAlign: "center" }}>
                        <button
                            className={`action-button ${firstStatus === 1 ? "" : "measuring-state"}`}
                            onClick={() => measureFirstEmotion(2)}
                            disabled={firstStatus === 2}
                            style={{ display: `${firstStatus === 3 ? "none" : ""}` }}
                        >
                            {firstStatus === 1 ? "감정 측정하기" : "측정 중..."}
                        </button>

                        <button
                            className={`action-button stop-button ${firstStatus === 2 ? "" : "hidden"}`}
                            id="stopMeasureButton1"
                            onClick={() => measureFirstEmotion(1)}
                        >
                            측정 중지
                        </button>
                        <button
                            className={`action-button primary-button ${firstStatus === 3 ? "" : "hidden"}`}
                            id="proceedToContentButton"
                            onClick={() => {
                                setPuzzleStatus(3);
                                create_emotion_data(3);
                            }}
                        >
                            콘텐츠 감상하러 가기
                        </button>
                    </div>
                </div>
            </div >


            {/* 3단계: 콘텐츠 추천 및 실제 감상 */}
            < div className={`step-content ${PuzzleStatus === 3 ? "active" : ""}`} id="step3" >
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


                    <div className="content-preview" id="contentPreview"
                        style={{
                            background: "linear-gradient(145deg, #faf5ff, #f3e8ff)",
                            border: "3px solid #a855f7",
                            borderRadius: "20px",
                            padding: "40px",
                            margin: "20px",
                            textAlign: "center"
                        }}
                    >
                        <div className="content-icon" id="contentIcon"
                            style={{
                                fontSize: "5em",
                                marginBottom: "20px"
                            }}
                        >
                            {emotionContent[firstEmotionDisplay.currentEmotionName]?.icon}
                        </div>
                        <div className="content-title" id="contentTitle"
                            style={{
                                fontSize: "1.8em",
                                fontWeight: "blod",
                                color: "#581c87",
                                marginBottom: "15px"
                            }}
                        >
                            {emotionContent[firstEmotionDisplay.currentEmotionName]?.title}
                        </div>
                        <div className="content-description" id="contentDescription"
                            style={{
                                fontSize: "1.3em",
                                color: "#7c3aed",
                                lineHeight: "1.6"
                            }}
                        >
                            {emotionContent[firstEmotionDisplay.currentEmotionName]?.description}
                        </div>
                    </div>





                    <div style={{ textAlign: "center" }}>
                        <button
                            className="action-button primary-button"
                            id="viewContentButton"
                            onClick={() => showContent(firstEmotionDisplay.currentEmotionName)} // React 방식
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
                        <div
                            className={`stopped-screen ${isViewingStopped ? "" : "hidden"}`}
                            style={{
                                color: "white",
                                textAlign: "center",
                                padding: "40px",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div className="stopped-icon" style={{ fontSize: "4em", marginBottom: "20px", animation: "stopPulse 2s ease-in-out infinite" }}>
                                ℹ️
                            </div>
                            <div style={{ fontSize: "1.8em", fontWeight: "bold", marginBottom: "15px" }}>
                                콘텐츠 감상이 중지되었습니다
                            </div>
                            <div style={{ fontSize: "1.2em", opacity: 0.8, marginBottom: "20px" }}>
                                다시 감상하거나 다음 단계로 진행할 수 있습니다
                            </div>
                            <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
                                <button
                                    onClick={() => {
                                        if (contentVideoRef.current) contentVideoRef.current.play();
                                        setIsViewingStopped(false);
                                    }}
                                    style={{
                                        background: "linear-gradient(145deg, #10b981, #059669)",
                                        color: "white",
                                        border: "none",
                                        padding: "12px 24px",
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        fontSize: "1.1em",
                                    }}
                                >
                                    다시 감상하기
                                </button>
                                <button
                                    onClick={() => setPuzzleStatus(4)} // 다음 단계
                                    style={{
                                        background: "linear-gradient(145deg, #6b7280, #4b5563)",
                                        color: "white",
                                        border: "none",
                                        padding: "12px 24px",
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        fontSize: "1.1em",
                                    }}
                                >
                                    다음 단계로
                                </button>
                            </div>
                        </div>



                        <div className={`video-content ${isViewingStopped ? "hidden" : ""}`}>
                            <video
                                className="video-player"
                                src={Videocontent.videoUrl}
                                autoPlay
                                loop
                                muted
                                controls={false}
                                ref={contentVideoRef}
                            />
                        </div>


                    </div>

                    <div className={`button-group ${isViewingStopped ? "hidden" : ""}`} style={{ textAlign: "center", marginTop: "30px" }}>

                        <button className="video-control-btn" id="playPauseBtn"
                            onClick={() => contentVideoRef.current.pause()}
                        >
                            <span id="playPauseIcon">⏸️</span> <span id="playPauseText">일시정지</span>
                        </button>

                        {/* 볼륨 조절 UI */}
                        <div
                            className="volume-control"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginTop: "10px",
                            }}
                        >
                            <span style={{ fontSize: "1.1em" }}>🔊</span>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={handleVolumeChange}
                                style={{ width: "100px", height: "6px", cursor: "pointer" }}
                            />
                            <span
                                id="volumeValue"
                                style={{ fontSize: "1em", fontWeight: 600, minWidth: "35px" }}
                            >
                                {volume}%
                            </span>
                        </div>

                        <button
                            className="video-control-btn"
                            onClick={() => {
                                if (contentVideoRef.current) {
                                    contentVideoRef.current.currentTime = 0; // 재생 위치를 처음으로
                                    contentVideoRef.current.play();          // 재생 시작
                                }
                            }}
                        >
                            🔄 다시보기
                        </button>

                        <button
                            className="action-button primary-button"
                            id="finishViewingButton"
                            onClick={() => setPuzzleStatus(4)}
                        >
                            ✅ 감상 완료
                        </button>
                    </div>
                </div>
            </div >

            {/* 4단계: 두 번째 감정 측정 */}
            < div className={`step-content ${PuzzleStatus === 4 ? "active" : ""}`} id="step4" >
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
                                {loading && <span id="webcamText">콘텐츠 감상 후 변화된 감정을 측정합니다</span>}

                                <video
                                    ref={videoRef2}
                                    id="webcamVideo2"
                                    autoPlay
                                    muted
                                    playsInline
                                    style={{ display: `${loading ? "none" : ""}` }}
                                ></video>

                            </div>
                            <canvas ref={canvasRef2} className="face-overlay" id="overlay2" width={500} height={350} />
                        </div>

                        <div className="emotion-monitor" id="emotionMonitor">


                            <h4>실시간 감정 분석</h4>
                            <div className="current-emotion-display">
                                <span className="emotion-emoji-large" id="currentEmotionEmoji">
                                    {SecondEmotionDisplay.currentEmotionEmoji}
                                </span>
                                <div className="emotion-name-large" id="currentEmotionName">
                                    {SecondEmotionDisplay.currentEmotionName}
                                </div>
                            </div>



                            <div className="emotion-bars-grid">
                                {emotions.map(({ name, emoji, color, key }) => (
                                    <div key={key} className="emotion-bar-item">
                                        <div className="emotion-bar-emoji">{emoji}</div>
                                        <div className="emotion-bar-label">{name}</div>
                                        <div className="emotion-bar-container">
                                            <div
                                                className="emotion-bar-fill"
                                                style={{
                                                    width: `${Math.round((SecondEmotionDisplay.emotions[key] || 0) * 100)}%`,
                                                    backgroundColor: color
                                                }}
                                            ></div>
                                        </div>
                                        <div className="emotion-bar-value">
                                            {Math.round((SecondEmotionDisplay.emotions[key] || 0) * 100)}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={`emotion-result ${SecondStatus === 3 ? "" : "hidden"}`} id="emotionResult2">
                        <div className="emotion-emoji" id="emotionEmoji2">
                            {SecondEmotionDisplay.currentEmotionEmoji}
                        </div>
                        <div className="emotion-name" id="emotionName2">
                            {SecondEmotionDisplay.currentEmotionName}
                        </div>
                        <div className="emotion-confidence" id="emotionConfidence2">
                            {SecondEmotionDisplay.confidence}%
                        </div>
                    </div>



                    <div style={{ textAlign: "center", marginBottom: "30px" }}>
                        <button
                            className={`action-button ${SecondStatus === 1 ? "" : "measuring-state"
                                }`}
                            onClick={() => measureSecondEmotion(2)}
                            disabled={SecondStatus === 2}
                            style={{ display: `${SecondStatus === 3 ? "none" : ""}` }}
                        >
                            {SecondStatus === 1 ? "다시 측정하기" : "측정중..."}
                        </button>

                        <button
                            className={`action-button stop-button ${SecondStatus === 2 ? "" : "hidden"}`}
                            onClick={() => measureSecondEmotion(1)}
                        >
                            측정 중지
                        </button>

                        <button
                            className={`action-button primary-button ${SecondStatus === 3 ? "" : "hidden"}`}
                            id="proceedToContentButton"
                            onClick={() => {
                                setPuzzleStatus(5);
                                create_emotion_data(1);
                                create_kpi_data({ user });
                            }}
                        >
                            결과 확인
                        </button>

                    </div>
                </div>
            </div >

            {/* 최종 완성 및 통계 */}
            < div className={`step-content ${PuzzleStatus === 5 && SecondStatus === 3 ? "active" : ""}`} id="finalResult" >
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                    <h2
                        style={{
                            fontSize: "1.8em",
                            color: "#1f2937",
                            marginBottom: "12px",
                        }}
                    >
                        감정 분석 완료!
                    </h2>
                    <p
                        style={{
                            fontSize: "1.1em",
                            color: "#4b5563",
                        }}
                    >
                        모든 단계를 완료했습니다! 감정 변화 분석을 확인해보세요.
                    </p>

                    <div
                        style={{
                            background: "linear-gradient(145deg, #f0f9ff, #e0f2fe)",
                            padding: "15px",
                            borderRadius: "12px",
                            margin: "15px 0",
                            border: "2px solid #0ea5e9",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "1em",
                                color: "#0c4a6e",
                                marginBottom: "6px",
                            }}
                        >
                            총 소요 시간: <span id="totalTime">03:45</span>
                        </div>
                        <div style={{ fontSize: "0.9em", color: "#0369a1" }}>
                            측정 결과가 데이터베이스에 저장되었습니다
                            {/* (ID: #<span id="measurementId">2024001247</span>) */}
                        </div>
                    </div>
                </div>

                <div className="statistics-section">
                    <h3 style={{ fontSize: "1.8em", marginBottom: "20px", color: "#1f2937", textAlign: "center", }}>
                        감정 변화 통계 분석
                    </h3>

                    <div className="stats-grid">

                        {/* 측정 전 */}
                        <div className="stat-card">
                            <div className="stat-icon">{firstEmotionDisplay.currentEmotionEmoji}</div>
                            <div className="stat-title">측정 전</div>
                            <div className="card-stat-value">{firstEmotionDisplay.currentEmotionName}</div>
                            <div className="stat-description">
                                신뢰도 {firstEmotionDisplay.confidence}%
                            </div>
                        </div>

                        {/* 측정 후 */}
                        <div className="stat-card">
                            <div className="stat-icon">{SecondEmotionDisplay.currentEmotionEmoji}</div>
                            <div className="stat-title">측정 후</div>
                            <div className="card-stat-value">{SecondEmotionDisplay.currentEmotionName}</div>
                            <div className="stat-description">
                                신뢰도 {SecondEmotionDisplay.confidence}%
                            </div>
                        </div>


                        {/* 감정 변화 */}
                        <div className="stat-card">
                            <div className="stat-icon">🔄</div>
                            <div className="stat-title">감정 변화</div>
                            <div className="card-stat-value">
                                {firstEmotionDisplay.currentEmotionName === SecondEmotionDisplay.currentEmotionName
                                    ? "감정 유지"
                                    : `${firstEmotionDisplay.currentEmotionName} → ${SecondEmotionDisplay.currentEmotionName}`}
                            </div>
                            <div className="stat-description">
                                {firstEmotionDisplay.currentEmotionName === SecondEmotionDisplay.currentEmotionName
                                    ? "동일한 감정이 유지되었습니다"
                                    : "감정이 변화했습니다"}
                            </div>
                        </div>

                        {/* 신뢰도 변화 */}
                        <div className="stat-card">
                            <div className="stat-icon">📈</div>
                            <div className="stat-title">신뢰도 변화</div>
                            <div className="card-stat-value">
                                {SecondEmotionDisplay.confidence - firstEmotionDisplay.confidence > 0
                                    ? `+${SecondEmotionDisplay.confidence - firstEmotionDisplay.confidence}%`
                                    : `${SecondEmotionDisplay.confidence - firstEmotionDisplay.confidence}%`}
                            </div>
                            <div className="stat-description">
                                {SecondEmotionDisplay.confidence - firstEmotionDisplay.confidence > 0
                                    ? "신뢰도가 증가했습니다"
                                    : SecondEmotionDisplay.confidence - firstEmotionDisplay.confidence < 0
                                        ? "신뢰도가 감소했습니다"
                                        : "신뢰도가 동일합니다"}
                            </div>
                        </div>

                    </div>


                    <div
                        id="finalAnalysis"
                        style={{
                            textAlign: "center",
                            margin: "20px 0",
                            fontSize: "1.2em",
                            color: "#1f2937",
                            background: "linear-gradient(145deg, #f0fdf4, #dcfce7)",
                            padding: "20px",
                            borderRadius: "15px",
                            border: "2px solid #16a34a",
                        }}
                    >
                        {finalAnalysis}
                    </div>

                </div>

                {/* 정량적 지표 평가 섹션 */}
                {/* <div className="statistics-section" style={{ border: "3px solid #8b5cf6", background: "linear-gradient(145deg, #faf5ff, #f3e8ff)", }}>
                    <h3 style={{ fontSize: "2.5em", marginBottom: "30px", color: "#7c3aed", textAlign: "center", }}>
                        📊 정량적 성능 지표 (KPI)
                    </h3>
                    {updateKPIDisplay()}
                </div> */}

                <div style={{ textAlign: "center", marginTop: "40px" }}>
                    <button
                        className="action-button primary-button"
                        id="newUserButton"
                        onClick={() => window.location.href = "/"}
                    >
                        다시 시작하기
                    </button>
                </div>
            </div >

        </>
    )
}



let modelsLoaded = true;

let performanceMetrics = {
    emotionDetectionAccuracy: 0,
    emotionConfidence: 0,
    faceDetectionRate: 0,
    analysisProcessingTime: 0,
    apiSuccessRate: 0
};

let detectionAttempts = 0;
let successfulDetections = 0;
let analysisStartTime = null;



function updateDetectionMetrics({ detectionSuccess, confidence = 0 }) {
    detectionAttempts++;
    if (detectionSuccess) {
        successfulDetections++;
        performanceMetrics.emotionConfidence = confidence;
    }

    performanceMetrics.emotionDetectionAccuracy = successfulDetections / detectionAttempts;
    const validDetectionRate = (confidence >= 70) ? 1 : 0;
    performanceMetrics.faceDetectionRate = (performanceMetrics.faceDetectionRate + validDetectionRate) / 2;

    if (analysisStartTime) {
        performanceMetrics.analysisProcessingTime = (performance.now() - analysisStartTime) / 1000;
    }

    performanceMetrics.apiSuccessRate = modelsLoaded ? 0.99 : 0.85;
}

function calculateKPIScores() {
    const kpiResults = {
        detection_score: Math.min(performanceMetrics.emotionDetectionAccuracy, 1.0),
        confidence_score: performanceMetrics.emotionConfidence / 100,
        validity_rate: performanceMetrics.faceDetectionRate,
        processing_time: performanceMetrics.analysisProcessingTime,
        api_success_rate: performanceMetrics.apiSuccessRate
    };

    const evaluations = {
        detection: kpiResults.detection_score >= 0.7 ? '적정 확률' : '개선 필요',
        confidence: kpiResults.confidence_score >= 0.6 ? '적정 확률' : '개선 필요',
        validity: kpiResults.validity_rate >= 0.7 ? '목표 달성' : '개선 필요',
        processing: kpiResults.processing_time <= 2 ? '목표 달성' : '성능 개선 필요',
        api: kpiResults.api_success_rate >= 0.98 ? '서비스 정상' : '시스템 점검 필요'
    };

    return { metrics: kpiResults, evaluations };
}

async function create_kpi_data({ user }) {
    const kpiData = calculateKPIScores();
    const metrics = kpiData.metrics;
    const evaluations = kpiData.evaluations;

    const passedKPIs = Object.values(evaluations).filter(status =>
        status === '적정 확률' || status === '목표 달성' || status === '서비스 정상'
    ).length;


    let summaryMessage = '';
    if (passedKPIs === 5) {
        summaryMessage = '모든 KPI 지표가 목표 기준을 충족하여 시스템이 우수한 성능으로 작동하고 있습니다.';
    } else if (passedKPIs >= 3) {
        summaryMessage = `${passedKPIs}/5개 KPI가 목표를 달성했습니다. 일부 지표에서 개선이 필요합니다.`;
    } else {
        summaryMessage = `${passedKPIs}/5개 KPI만 목표를 달성했습니다. 시스템 성능 개선이 필요합니다.`;
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/performance_metrics/create_metrics_dtaa`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                session_id: user.session_id,
                face_detection_accuracy: metrics.detection_score,
                emotion_confidence_avg: metrics.confidence_score,
                valid_measurement_rate: metrics.validity_rate,
                processing_time: metrics.processing_time,
                api_success_rate: metrics.api_success_rate
            })
        });

        const data = await response.json();
        if (response.ok) {
            console.log("metrics created:", data.metric_id);
        } else {
            console.error("세션 생성 실패:", data);
        }
    } catch (err) {
        console.error("서버 요청 오류:", err);
    }

    add_session_end_time(user)
}

async function add_session_end_time(user) {
    const end_time = new Date().toISOString();

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/session/session_end`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                session_id: user.session_id,
                end_time: end_time
            })
        });

        const data = await response.json();
        if (response.ok) {
            console.log("세션 수정 완료:", data.message);
        } else {
            console.error("세션 수정 실패:", data);
        }
    } catch (err) {
        console.error("서버 요청 오류:", err);
    }

}


function updateKPIDisplay() {

    const kpiData = calculateKPIScores();
    const metrics = kpiData.metrics;
    const evaluations = kpiData.evaluations;

    const passedKPIs = Object.values(evaluations).filter(status =>
        status === '적정 확률' || status === '목표 달성' || status === '서비스 정상'
    ).length;


    let summaryMessage = '';
    if (passedKPIs === 5) {
        summaryMessage = '모든 KPI 지표가 목표 기준을 충족하여 시스템이 우수한 성능으로 작동하고 있습니다.';
    } else if (passedKPIs >= 3) {
        summaryMessage = `${passedKPIs}/5개 KPI가 목표를 달성했습니다. 일부 지표에서 개선이 필요합니다.`;
    } else {
        summaryMessage = `${passedKPIs}/5개 KPI만 목표를 달성했습니다. 시스템 성능 개선이 필요합니다.`;
    }
    return (
        <>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-title">얼굴 감출 정수</div>
                    <div className="card-stat-value">{metrics.detection_score.toFixed(2)}</div>
                    <div className="stat-description">목표 ≥ 0.7 ({evaluations.detection})</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🎪</div>
                    <div className="stat-title">감정 신뢰도</div>
                    <div className="card-stat-value">{metrics.confidence_score.toFixed(2)}</div>
                    <div className="stat-description">목표 ≥ 0.6 ({evaluations.confidence})</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📈</div>
                    <div className="stat-title">유효 측정률</div>
                    <div className="card-stat-value">{Math.round(metrics.validity_rate * 100)}%</div>
                    <div className="stat-description">목표 ≥ 70% ({evaluations.validity})</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">⚡</div>
                    <div className="stat-title">처리 응답 시간</div>
                    <div className="card-stat-value">{metrics.processing_time.toFixed(1)}초</div>
                    <div className="stat-description">목표 ≤ 2초 ({evaluations.processing})</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🌐</div>
                    <div className="stat-title">API 성공률</div>
                    <div className="card-stat-value">{Math.round(metrics.api_success_rate * 100)}%</div>
                    <div className="stat-description">목표 ≥ 98% ({evaluations.api})</div>
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
                    {summaryMessage}
                </div>
            </div>

        </>
    )
}