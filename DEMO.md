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

## 운영 서버 실행 (7003 포트)

```bash
cp .env.demo .env        # REACT_APP_USE_MOCK=true, PORT=7003
npm install
npm run build
npm run serve            # npx serve -s build -l 7003  (SPA fallback 포함)
```

- 개발 서버로 띄우려면 `npm start` (PORT=7003, .env 값 사용).
- **웹캠은 HTTPS에서만 동작**합니다 (`getUserMedia` 보안 제약). `http://host:7003`로 직접 접속하면 카메라 단계에서 실패하므로
  nginx 등 리버스 프록시에서 TLS를 종단하고 7003으로 넘기세요. 예:

```nginx
server {
    listen 443 ssl;
    server_name demo.example.com;
    # ssl_certificate / ssl_certificate_key ...
    location / {
        proxy_pass http://127.0.0.1:7003;
        proxy_set_header Host $host;
    }
}
```
- 앱은 도메인 루트(`/`)에 배치되어야 합니다. 정적 자산 경로가 `/video/...`, `/이모션 로고-Photoroom.png` 처럼 루트 기준이라 서브 경로(`/demo/`) 배포 시 `package.json`에 `homepage` 설정과 경로 수정이 필요합니다.

## 실제 백엔드로 전환

```
REACT_APP_USE_MOCK=false
REACT_APP_API_URL=http://<backend-host>
```

API 함수 목록은 `src/api/realApi.js`, 진입점은 `src/api/index.js` 입니다.
