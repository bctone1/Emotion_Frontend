
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
        return "inactive";
    };

    return (
        <>
            <div className="puzzle-board" id="puzzleBoard">
                <div className={`mini-puzzle-piece piece-1 ${getStatusClass(1)}`} id="miniPiece1">
                    <div className="mini-piece-icon">📷</div>
                    <div className="mini-piece-text">카메라 준비</div>
                </div>
                <div className={`mini-puzzle-piece piece-2 ${getStatusClass(2)}`} id="miniPiece2">
                    <div className="mini-piece-icon">😊</div>
                    <div className="mini-piece-text">첫 감정 측정</div>
                </div>
                <div className={`mini-puzzle-piece piece-3 ${getStatusClass(3)}`} id="miniPiece3">
                    <div className="mini-piece-icon">🎨</div>
                    <div className="mini-piece-text">콘텐츠 감상</div>
                </div>
                <div className={`mini-puzzle-piece piece-4 ${getStatusClass(4)}`} id="miniPiece4">
                    <div className="mini-piece-icon">📊</div>
                    <div className="mini-piece-text">변화 분석</div>
                </div>
            </div>

            <div className="current-step" id="currentStepText">
                {stepTexts[PuzzleStatus] || "모든 단계를 완료했습니다! 🎉"}
            </div>
        </>
    );
}

