server {
    listen 80;
    server_name emotioncare.bizoneai.com;

    # 프론트엔드 (React 정적 빌드, serve -s build -l 7003)
    location / {
        proxy_pass http://localhost:7003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 감정별 콘텐츠 영상(mp4) 전송용
    client_max_body_size 50m;
    proxy_read_timeout 300s;
}
