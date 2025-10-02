import Header from "./components/header";
import Footer from "./components/footer";
import Puzzle from "./components/puzzle ";
import Section from "./components/section1";
import "../src/index.css"

import { useState, useEffect, useRef } from 'react';

function App() {
  const [PuzzleStatus, setPuzzleStatus] = useState(1);

  const [total, settotal] = useState({
    total_users: null,
    today_users: null,
    my_count: null
  });

  const [user, setUser] = useState({
    randomNum: null,
    startTime: null,
    endTime: null,
    user_ip: null
  });

  const hasRun = useRef(false);

  const fetch_total = () => {

  }

  const createSession = async (user_number, user_ip, startTime) => {
    try {
      const response = await fetch("http://localhost:5000/session/session_create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_number: user_number,
          user_ip: user_ip,
          start_time: startTime
        })
      });

      const data = await response.json();

      if (response.ok) {
        setUser(prev => ({
          ...prev,
          session_id: data.session_id
        }));
        console.log("Session created:", data.session_id);
      } else {
        console.error("세션 생성 실패:", data);
      }
    } catch (err) {
      console.error("서버 요청 오류:", err);
    }
  };


  useEffect(() => {
    if (hasRun.current) return;  // 이미 실행됐다면 막기
    hasRun.current = true;

    // 1) 랜덤 4자리 숫자 생성
    const randomNum = Math.floor(1000 + Math.random() * 9000);

    // 2) 사용자 IP 가져오기
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        const ip = data.ip;
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
      })
      .catch((err) => console.error("IP 가져오기 실패:", err));
  }, []);



  return (

    <>
      <div className="container">
        <Header user={user} />

        <div className="main-puzzle-container">
          <Puzzle PuzzleStatus={PuzzleStatus} />

          <Section PuzzleStatus={PuzzleStatus} setPuzzleStatus={setPuzzleStatus} setUser={setUser} user={user}/>
        </div>

      </div>

      <Footer />
    </>

  );
}

export default App;
