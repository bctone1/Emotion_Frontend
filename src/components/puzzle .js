
export default function Puzzle({ PuzzleStatus }) {
    // 단계별 텍스트 정의
    const stepTexts = {
        1: "1단계: 감정 측정을 위한 준비를 시작해보세요!",
        2: "2단계: 첫 감정을 측정해보세요!",
        3: "3단계: 추천 콘텐츠를 감상해보세요!",
        4: "4단계: 두 번째 측정 및 변화를 확인해보세요!",
    };

    // 단계별 상태 반환 함수
    const getStatusClass = (step) => {
        if (PuzzleStatus === step) return "active";
        if (PuzzleStatus > step) return "completed";
        return "pending";
    };

    return (
        <>
            <div className="api-status" id="apiStatus" style={{ display: "none" }}>
                Face-api.js 라이브러리를 CDN에서 로드하여 실제 감정 인식을 시도합니다.
            </div>

            <div className="step-internal-puzzle" id="globalPuzzleProgress">
                <div className="puzzle-board" id="puzzleBoard">
                    <div className="progress-line">
                        <div className="progress-line-fill" id="progressLineFill"></div>
                    </div>


                    <div className={`mini-puzzle-piece ${getStatusClass(1)}`}>
                        <div className="mini-piece-icon">📷</div>
                        <div className="mini-piece-text">카메라 준비</div>
                    </div>
                    <div className={`mini-puzzle-piece ${getStatusClass(2)}`}>
                        <div className="mini-piece-icon">😊</div>
                        <div className="mini-piece-text">첫 감정 측정</div>
                    </div>
                    <div className={`mini-puzzle-piece ${getStatusClass(3)}`}>
                        <div className="mini-piece-icon">🎨</div>
                        <div className="mini-piece-text">콘텐츠 감상</div>
                    </div>

                    <div className={`mini-puzzle-piece ${getStatusClass(4)}`}>
                        <div className="mini-piece-icon">😊</div>
                        <div className="mini-piece-text">두 감정 측정</div>
                    </div>

                    <div className={`mini-puzzle-piece ${getStatusClass(5)}`}>
                        <div className="mini-piece-icon">📊</div>
                        <div className="mini-piece-text">변화 분석</div>
                    </div>



                </div>
            </div>
        </>
    );
}

