# 미래로부터 온 포토카드 메이커

20년 뒤의 나를 그려 특별한 포토카드를 만들어보는 웹 애플리케이션입니다. 업로드한 사진과 메시지, 타임라인을 실시간으로 미리 보고 뒷면 배경색과 타이틀 글꼴 크기를 빠르게 조정할 수 있습니다.  
청소년 AI 교육을 목적으로 제작되었습니다.  

<img width="977" height="700" alt="Image" src="https://github.com/user-attachments/assets/66adc948-6349-4f06-9924-e8e0d5e48f47" />
<img width="930" height="721" alt="Image" src="https://github.com/user-attachments/assets/72cb0b5c-d33e-4edc-b90b-1f80be170f08" />

## 주요 기능

- **실시간 미리보기** : 사진·텍스트를 입력하면 즉시 카드에 반영
- **앞 / 뒷면 플립** : 버튼 하나로 카드 뒤집기
- **타이틀 글꼴 크기 선택** : 작게 / 중간 / 크게 라디오 버튼으로 조정
- **뒷면 배경 그라디언트** : 5가지 프리셋 색상 중 선택
- **화이트스페이스 보존** : 여러 줄 타임라인과 메시지에서도 줄바꿈·공백 유지
- **실물 비율 매칭** : 일반적인 포토카드가 5.5 x 8.5 cm 임을 감안하여, 화면상 11 × 17 cm(414 × 640 px) 크기로 렌더링

## 폴더 구조

```
ai_dream_sharing/
├── index.html      # 메인 페이지
├── styles.css      # 스타일시트
├── script.js       # 인터랙션 로직
└── README.md       # 프로젝트 정보 (현재 파일)
```

## 로컬 실행 방법

1. 저장소를 클론합니다.
   ```bash
   git clone https://github.com/muniv/ai_dream_sharing.git
   cd ai_dream_sharing
   ```
2. 로컬 웹 서버를 실행합니다. (Python 예시)
   ```bash
   python3 -m http.server 8000
   ```
3. 브라우저에서 `http://localhost:8000` 열기.
