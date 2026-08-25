import Header from "./header";
import Footer from "./footer";
import Puzzle from "./puzzle ";
import Section from "./section1";
import "../index.css"
import { api } from "../api";

import { useState, useEffect, useRef } from 'react';

function HomePage() {
    const [PuzzleStatus, setPuzzleStatus] = useState(1);

    const [total, settotal] = useState({
        total_users: null,
        today_measurements: null,
        my_measurements: null,
        user_id: null
    });

    const [user, setUser] = useState({
        randomNum: null,
        startTime: null,
        endTime: null,
        user_ip: null
    });

    const hasRun = useRef(false);

    const fetch_stats = async (client_ip) => {
        try {
            const data = await api.getStats(client_ip);
            settotal(data);
            console.log("stats :", data);
        } catch (err) {
            console.error("서버 요청 오류:", err);
        }
    };



    const createSession = async (user_number, user_ip, startTime) => {
        try {
            const data = await api.createSession({
                user_number: user_number,
                user_ip: user_ip,
                start_time: startTime
            });
            setUser(prev => ({
                ...prev,
                session_id: data.session_id
            }));
            console.log("Session created:", data.session_id);
        } catch (err) {
            console.error("세션 생성 실패:", err);
        }
    };


    useEffect(() => {
        if (hasRun.current) return;  // 이미 실행됐다면 막기
        hasRun.current = true;

        // 1) 랜덤 4자리 숫자 생성
        const randomNum = Math.floor(1000 + Math.random() * 9000);

        // 2) 사용자 IP 가져오기
        api.getClientIp()
            .then((ip) => {
                const startTime = new Date().toISOString();

                setUser({
                    randomNum,
                    user_ip: ip,
                    startTime,
                    endTime: null,
                    session_id: null
                });

                // 3) 세션 생성 API 호출
                createSession(randomNum, ip, startTime);
                fetch_stats(ip);
            })
            .catch((err) => console.error("IP 가져오기 실패:", err));
    }, []);

    const ScrollWrap = useRef(null);



    return (

        <>
            <div className="container">
                <Header user={user} total={total} />

                <div className="main-puzzle-container" ref={ScrollWrap}>
                    <Puzzle PuzzleStatus={PuzzleStatus} />

                    <Section PuzzleStatus={PuzzleStatus} setPuzzleStatus={setPuzzleStatus} setUser={setUser} user={user} ScrollWrap={ScrollWrap} />
                </div>

            </div>

            <Footer />
        </>

    );
}

export default HomePage;

