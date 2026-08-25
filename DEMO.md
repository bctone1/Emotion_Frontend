# 데모 모드 (mock 데이터)

`REACT_APP_USE_MOCK=true` 이면 백엔드 없이 동작합니다. 모든 API 호출은 `src/api/mockApi.js`가 처리하고,
관리자 페이지 데이터는 `src/api/mockData.js`에서 생성한 시드(세션 50건)를 사용합니다.
데모 중 측정한 결과는 메모리에 누적되어 `/admin`에서 바로 확인할 수 있습니다(새로고침 시 초기화).

face-api 모델은 기존처럼 jsdelivr CDN에서 로드하므로 배포 서버에서 외부망 접근이 필요합니다.

## 빌드

```bash
npm install
REACT_APP_USE_MOCK=true npm run build   # 또는: cp .env.demo .env && npm run build
```

`build/` 폴더를 정적 서버에 올리면 됩니다. SPA이므로 `/admin` 직접 접근을 위해 모든 경로를 `index.html`로 fallback 하도록 설정하세요.

## 실제 백엔드로 전환

```
REACT_APP_USE_MOCK=false
REACT_APP_API_URL=http://<backend-host>
```

API 함수 목록은 `src/api/realApi.js`, 진입점은 `src/api/index.js` 입니다.
