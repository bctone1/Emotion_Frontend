import React, { useState, useEffect, useRef, useMemo } from 'react';
import './AdminDashboard.css';
import { api } from '../api';


function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState('--:--');
  const [activeTable, setActiveTable] = useState('sessions');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 20; // 페이지당 항목 수

  // 데이터 상태
  const [sessions, setSessions] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [performance, setPerformance] = useState([]);
  const [average, setAverage] = useState({
    session_total: 0,
    emotions_total: 0,
    contents_total: 0,
    metrics_total: 0
  });



  const fetchSessionData = async () => {
    const data = await api.getCompletedSessions();
    setSessions(data);
  }

  const fetchMeasurementData = async () => {
    const data = await api.getMeasurements();
    setMeasurements(data);
  }
  const fetchInteractionData = async () => {
    const data = await api.getContentData();
    setInteractions(data);
  }
  const fetchPerformanceData = async () => {
    const data = await api.getMetricsData();
    setPerformance(data);
  }
  const fetchAverage = async () => {
    const data = await api.getAdminDashboard();
    setAverage(data);
  }

  useEffect(() => {
    fetchAverage();
    fetchInteractionData();
    fetchMeasurementData();
    fetchSessionData();
    fetchPerformanceData();
  }, []);

  // 테이블 변경 시 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTable]);




  // 시간 업데이트
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
      });
      setCurrentTime(timeString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

 
  const showTable = (tableName) => {
    setActiveTable(tableName);
    setCurrentPage(1);
  };

  const filterTable = () => {
    setCurrentPage(1);
  };

  // 검색 필터링 함수
  const filterData = (data, searchQuery) => {
    if (!searchQuery.trim()) {
      return data;
    }

    const query = searchQuery.toLowerCase().trim();

    return data.filter((item) => {
      // 모든 필드의 값을 문자열로 변환하여 검색
      return Object.values(item).some((value) => {
        if (value === null || value === undefined) {
          return false;
        }
        // 숫자나 불린 값도 문자열로 변환하여 검색
        const stringValue = String(value).toLowerCase();
        return stringValue.includes(query);
      });
    });
  };

  // 필터링된 데이터 계산
  const filteredSessions = useMemo(() => {
    return filterData(sessions, searchQuery);
  }, [sessions, searchQuery]);

  const filteredMeasurements = useMemo(() => {
    return filterData(measurements, searchQuery);
  }, [measurements, searchQuery]);

  const filteredInteractions = useMemo(() => {
    return filterData(interactions, searchQuery);
  }, [interactions, searchQuery]);

  const filteredPerformance = useMemo(() => {
    return filterData(performance, searchQuery);
  }, [performance, searchQuery]);

  // const changeRowsPerPage = (e) => {
  //   const value = e.target.value;
  //   setRowsPerPage(value === 'all' ? Infinity : parseInt(value));
  //   setCurrentPage(1);
  // };

  const exportToCSV = () => {
    // CSV 내보내기 로직
    alert('CSV 다운로드 기능은 구현 중입니다.');
  };

  const refreshData = () => {
    // 데이터 새로고침 로직
    window.location.reload();
  };

  const sortTable = (tableType, columnIndex) => {
    // 정렬 로직
    console.log(`Sorting ${tableType} by column ${columnIndex}`);
  };

  // 현재 활성 테이블의 필터링된 데이터 가져오기
  const getCurrentFilteredData = () => {
    switch (activeTable) {
      case 'sessions':
        return filteredSessions;
      case 'measurements':
        return filteredMeasurements;
      case 'interactions':
        return filteredInteractions;
      case 'performance':
        return filteredPerformance;
      default:
        return [];
    }
  };

  // 페이지네이션된 데이터 계산
  const getPaginatedData = () => {
    const filteredData = getCurrentFilteredData();
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  };

  // 총 페이지 수 계산
  const getTotalPages = () => {
    const filteredData = getCurrentFilteredData();
    return Math.ceil(filteredData.length / ROWS_PER_PAGE);
  };

  // 페이지네이션 UI 컴포넌트
  const Pagination = () => {
    const totalPages = getTotalPages();
    const filteredData = getCurrentFilteredData();
    
    if (totalPages <= 1) return null;

    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const renderPageNumbers = () => {
      const pages = [];
      const totalPagesCount = totalPages;
      const maxVisiblePages = 5;
      
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPagesCount, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`page-number ${currentPage === i ? 'active' : ''}`}
          >
            {i}
          </button>
        );
      }

      return pages;
    };

    return (
      <div className="pagination-container">
        <div className="pagination-info">
          <span>
            {filteredData.length > 0 
              ? `${(currentPage - 1) * ROWS_PER_PAGE + 1} - ${Math.min(currentPage * ROWS_PER_PAGE, filteredData.length)} / ${filteredData.length}개`
              : '0개'
            }
          </span>
        </div>
        <div className="pagination-buttons">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-button"
          >
            ◀ 이전
          </button>
          {currentPage > 3 && (
            <>
              <button onClick={() => handlePageChange(1)} className="page-number">1</button>
              {currentPage > 4 && <span className="page-ellipsis">...</span>}
            </>
          )}
          {renderPageNumbers()}
          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && <span className="page-ellipsis">...</span>}
              <button onClick={() => handlePageChange(totalPages)} className="page-number">
                {totalPages}
              </button>
            </>
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-button"
          >
            다음 ▶
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>💙 Emotion Care | 관리자 대시보드</h1>
        <p style={{ fontSize: '1.3em', opacity: 0.9 }}>감정 분석 시스템 데이터 관리</p>

        <div className="admin-info">
          <div>
            <span style={{ fontSize: '1.4em', fontWeight: 'bold', color: '#fbbf24' }}>
              관리자 모드
            </span>
            <span style={{ marginLeft: '30px', fontSize: '1.2em', color: '#0369a1' }}>
              접속 시간: <span style={{ color: '#667eea', fontWeight: 'bold' }}>{currentTime}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 통계 요약 섹션 */}
      <div className="stats-summary">
        <div className="summary-card">
          <div className="summary-icon">👥</div>
          <div className="summary-value">{average.session_total}</div>
          <div className="summary-label">총 세션 수</div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">😊</div>
          <div className="summary-value">{average.emotions_total}</div>
          <div className="summary-label">총 감정 측정</div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">🎨</div>
          <div className="summary-value">{average.contents_total}</div>
          <div className="summary-label">콘텐츠 상호작용</div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">📈</div>
          <div className="summary-value">{average.metrics_total.toFixed(2) * 100}%</div>
          <div className="summary-label">평균 신뢰도</div>
        </div>
      </div>

      {/* 데이터 테이블 섹션 */}
      <div className="data-section active">
        {/* 탭 네비게이션 */}
        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTable === 'sessions' ? 'active' : ''}`}
            onClick={() => showTable('sessions')}
          >
            📋 세션 데이터
          </button>
          <button
            className={`tab-button ${activeTable === 'measurements' ? 'active' : ''}`}
            onClick={() => showTable('measurements')}
          >
            😊 감정 측정
          </button>
          <button
            className={`tab-button ${activeTable === 'interactions' ? 'active' : ''}`}
            onClick={() => showTable('interactions')}
          >
            🎨 콘텐츠 상호작용
          </button>
          <button
            className={`tab-button ${activeTable === 'performance' ? 'active' : ''}`}
            onClick={() => showTable('performance')}
          >
            📊 성능 지표
          </button>
        </div>

        {/* 검색 및 필터 섹션 */}
        <div className="filter-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="데이터 검색..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  filterTable();
                }
              }}
            />
            {/* <button onClick={filterTable}>🔍 검색</button> */}
          </div>
          <div className="filter-actions">
            <button onClick={exportToCSV}>📥 CSV 다운로드</button>
            <button onClick={refreshData}>🔄 새로고침</button>
            {/* <select value={rowsPerPage} onChange={changeRowsPerPage}>
              <option value={10}>10개씩 보기</option>
              <option value={25}>25개씩 보기</option>
              <option value={50}>50개씩 보기</option>
              <option value={100}>100개씩 보기</option>
              <option value="all">전체 보기</option>
            </select> */}
          </div>
        </div>

        {/* 세션 데이터 테이블 */}
        {activeTable === 'sessions' && (
          <div className="table-container active">
            <h3>📋 세션 데이터</h3>
            <div className="table-info">
              <span>총 <strong>{filteredSessions.length}</strong>개의 레코드</span>
              {searchQuery && (
                <span style={{ marginLeft: '10px', color: '#667eea' }}>
                  (검색 결과: {filteredSessions.length}개)
                </span>
              )}
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th onClick={() => sortTable('sessions', 0)}>세션 ID ↕</th>
                    <th onClick={() => sortTable('sessions', 1)}>사용자 IP ↕</th>
                    <th onClick={() => sortTable('sessions', 2)}>사용자 번호 ↕</th>
                    <th onClick={() => sortTable('sessions', 3)}>시작 시간 ↕</th>
                    <th onClick={() => sortTable('sessions', 4)}>종료 시간 ↕</th>
                    <th onClick={() => sortTable('sessions', 5)}>총 시간(초) ↕</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSessions.length === 0 ? (
                    <tr>
                      <td colSpan="10" style={{ textAlign: 'center', padding: '50px' }}>
                        <div className="empty-message">
                          {searchQuery ? '검색 결과가 없습니다.' : '표시할 데이터가 없습니다.'}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    getPaginatedData().map((session, index) => (
                      <tr key={index}>
                        <td>{session.session_id || '-'}</td>
                        <td>{session.user_ip || '-'}</td>
                        <td>{session.user_number || '-'}</td>
                        <td>{session.start_time.split('T')[0] || '-'}</td>
                        <td>{session.end_time.split('T')[0] || '-'}</td>
                        <td>{session.total_duration || '-'} </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Pagination />
          </div>
        )}

        {/* 감정 측정 데이터 테이블 */}
        {activeTable === 'measurements' && (
          <div className="table-container active">
            <h3>😊 감정 측정 데이터</h3>
            <div className="table-info">
              <span>총 <strong>{filteredMeasurements.length}</strong>개의 레코드</span>
              {searchQuery && (
                <span style={{ marginLeft: '10px', color: '#667eea' }}>
                  (검색 결과: {filteredMeasurements.length}개)
                </span>
              )}
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th onClick={() => sortTable('measurements', 0)}>측정 ID ↕</th>
                    <th onClick={() => sortTable('measurements', 1)}>세션 ID ↕</th>
                    <th onClick={() => sortTable('measurements', 2)}>측정 유형 ↕</th>
                    <th onClick={() => sortTable('measurements', 3)}>감정명 ↕</th>
                    <th onClick={() => sortTable('measurements', 4)}>신뢰도(%) ↕</th>
                    <th onClick={() => sortTable('measurements', 5)}>측정 시간 ↕</th>
                    {/* <th onClick={() => sortTable('measurements', 6)}>얼굴 감지 ↕</th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredMeasurements.length === 0 ? (
                    <tr>
                      <td colSpan="10" style={{ textAlign: 'center', padding: '50px' }}>
                        <div className="empty-message">
                          {searchQuery ? '검색 결과가 없습니다.' : '표시할 데이터가 없습니다.'}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    getPaginatedData().map((measurement, index) => (
                      <tr key={index}>
                        <td>{measurement.measurement_id || '-'}</td>
                        <td>{measurement.session_id || '-'}</td>
                        <td>{measurement.measurement_type || '-'}</td>
                        <td>{measurement.emotion_name || '-'}</td>
                        <td>{measurement.confidence_score || '-'}</td>
                        <td>{measurement.timestamp.split('T')[0] || '-'}</td>
                        {/* <td>{measurement.face_detection_success || '-'}</td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Pagination />
          </div>
        )}

        {/* 콘텐츠 상호작용 데이터 테이블 */}
        {activeTable === 'interactions' && (
          <div className="table-container active">
            <h3>🎨 콘텐츠 상호작용 데이터</h3>
            <div className="table-info">
              <span>총 <strong>{filteredInteractions.length}</strong>개의 레코드</span>
              {searchQuery && (
                <span style={{ marginLeft: '10px', color: '#667eea' }}>
                  (검색 결과: {filteredInteractions.length}개)
                </span>
              )}
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th onClick={() => sortTable('interactions', 0)}>상호작용 ID ↕</th>
                    <th onClick={() => sortTable('interactions', 1)}>세션 ID ↕</th>
                    <th onClick={() => sortTable('interactions', 2)}>추천 감정 ↕</th>
                    <th onClick={() => sortTable('interactions', 3)}>콘텐츠 유형 ↕</th>
                    <th onClick={() => sortTable('interactions', 4)}>콘텐츠 제목 ↕</th>
                    <th onClick={() => sortTable('interactions', 5)}>시청 완료 ↕</th>
                    <th onClick={() => sortTable('interactions', 6)}>조기 종료 ↕</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInteractions.length === 0 ? (
                    <tr>
                      <td colSpan="10" style={{ textAlign: 'center', padding: '50px' }}>
                        <div className="empty-message">
                          {searchQuery ? '검색 결과가 없습니다.' : '표시할 데이터가 없습니다.'}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    getPaginatedData().map((interaction, index) => (
                      <tr key={index}>
                        <td>{interaction.interaction_id || '-'}</td>
                        <td>{interaction.session_id || '-'}</td>
                        <td>{interaction.recommended_emotion || '-'}</td>
                        <td>{interaction.content_type || '-'}</td>
                        <td>{interaction.content_title || '-'}</td>
                        <td>{interaction.viewing_completed ? "완료" : ""}</td>
                        <td>{interaction.stopped_early ? "true" : ""}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Pagination />
          </div>
        )}

        {/* 성능 지표 데이터 테이블 */}
        {activeTable === 'performance' && (
          <div className="table-container active">
            <h3>📊 성능 지표 데이터</h3>
            <div className="table-info">
              <span>총 <strong>{filteredPerformance.length}</strong>개의 레코드</span>
              {searchQuery && (
                <span style={{ marginLeft: '10px', color: '#667eea' }}>
                  (검색 결과: {filteredPerformance.length}개)
                </span>
              )}
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th onClick={() => sortTable('performance', 0)}>지표 ID ↕</th>
                    <th onClick={() => sortTable('performance', 1)}>세션 ID ↕</th>
                    <th onClick={() => sortTable('performance', 2)}>정확도 ↕</th>
                    <th onClick={() => sortTable('performance', 3)}>평균 신뢰도 ↕</th>
                    <th onClick={() => sortTable('performance', 4)}>유효 측정률 ↕</th>
                    {/* <th onClick={() => sortTable('performance', 5)}>처리 시간(초) ↕</th> */}
                    <th onClick={() => sortTable('performance', 5)}>API 성공률 ↕</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPerformance.length === 0 ? (
                    <tr>
                      <td colSpan="10" style={{ textAlign: 'center', padding: '50px' }}>
                        <div className="empty-message">
                          {searchQuery ? '검색 결과가 없습니다.' : '표시할 데이터가 없습니다.'}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    getPaginatedData().map((perf, index) => (
                      <tr key={index}>
                        <td>{perf.metric_id || '-'}</td>
                        <td>{perf.session_id || '-'}</td>
                        <td>{perf.face_detection_accuracy ? perf.face_detection_accuracy * 100 : '-'}</td>
                        <td>{perf.emotion_confidence_avg ? perf.emotion_confidence_avg * 100 : '-'}</td>
                        <td>{perf.valid_measurement_rate ? perf.valid_measurement_rate.toFixed(2) * 100 : '-'}</td>
                        {/* <td>{perf.processing_time || '0'}</td> */}
                        <td>{perf.api_success_rate ? perf.api_success_rate * 100 : '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Pagination />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

