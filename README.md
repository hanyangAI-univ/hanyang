# Market Pulse - 실시간 종합 금융 대시보드

**Market Pulse**는 실시간 주요 환율, 글로벌/국내 시장 지수 및 ETF, 사용자 맞춤 관심종목(TradingView 차트 모달 연동), 그리고 **38커뮤니케이션/KIND 기준 7일 이내 공모주(IPO) 청약 일정 및 상세 공시**를 한눈에 확인할 수 있는 모던 인터랙티브 대시보드입니다.

---

## 📁 프로젝트 파일 구조

```text
market-pulse-dashboard/
├── api/
│   └── ipo.js          # [서버리스 백엔드] 38커뮤니케이션 실시간 크롤링 & CORS 우회 API
├── public/
│   └── index.html      # [프론트엔드] 대시보드 UI, TradingView 차트 & 모달 & 테마
├── package.json        # Node.js 프로젝트 설정 및 패키지 의존성
├── vercel.json         # Vercel 서버리스 & 정적 파일 배포 설정
└── README.md           # 안내 문서
```

---

## 🚀 빠른 시작 (Local Development)

### 1. 패키지 설치
```bash
npm install
```

### 2. 로컬 실행 (Vercel CLI 사용 시)
```bash
npx vercel dev
```
브라우저에서 `http://localhost:3000`으로 접속하여 확인합니다.

---

## ☁️ Vercel 1분 배포 방법

1. GitHub에 본 프로젝트 저장소를 생성 후 코드를 업로드합니다.
2. [Vercel Dashboard](https://vercel.com) 접속 후 `Add New Project` 클릭.
3. GitHub 저장소를 선택하고 `Deploy` 버튼을 클릭합니다.
4. 완성된 고유 URL(`https://your-project.vercel.app`)을 통해 어디서나 즉시 접속 가능합니다.

---

## ✨ 핵심 제공 기능

1. **1번째 줄 (주요 환율):** 달러인덱스(DXY), USD/KRW, EUR/KRW, JPY/KRW, GBP/KRW, CNY/KRW
2. **2번째 줄 (시장지수·ETF):** 코스피, 코스닥, VOO, QQQ
3. **3번째 줄 (관심종목 동적 관리):**
   - HMM, 현대제철 기본 탑재
   - 사용자 종목 추가/삭제 기능 (브라우저 `localStorage` 자동 저장)
4. **4번째 줄 (IPO 공모주):**
   - 한국시간(KST) 기준 7일 이내 청약/상장 일정 실시간 필터링
   - 클릭 시 주관사, 확정공모가, 희망밴드, 기관경쟁률, 의무보유확약비율 상세 표 출력
5. **UI/UX Polish:**
   - Inline SVG Market Pulse 로고
   - 다크모드 / 라이트모드 1-Click 토글
   - 수동 새로고침 버튼
   - 모바일 반응형 CSS Grid/Flexbox 지원
