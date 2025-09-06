# 뉴스레터 구독 시스템

## 📋 프로젝트 개요

AI 뉴스레터 구독을 위한 풀스택 웹 애플리케이션입니다. 프론트엔드와 백엔드가 완전히 분리된 아키텍처로 설계되어 있으며, CloudFlare 플랫폼에서 호스팅됩니다.

## 🏗️ 아키텍처

- **Frontend**: React 18.3.1 + TypeScript + Tailwind CSS
- **Backend**: CloudFlare Workers + Hono.js + TypeScript  
- **Database**: CloudFlare D1 (SQLite)
- **Deployment**: CloudFlare Pages (Frontend) + CloudFlare Workers (Backend)

## 📁 프로젝트 구조

```
├── frontend/              # React 웹 애플리케이션
│   ├── src/
│   │   ├── components/    # 재사용 가능한 UI 컴포넌트
│   │   ├── sections/      # 랜딩페이지 섹션들
│   │   ├── hooks/         # 커스텀 React 훅
│   │   ├── utils/         # 유틸리티 함수
│   │   └── types/         # TypeScript 타입 정의
│   ├── package.json
│   └── CLAUDE.md         # Frontend 개발 규칙
│
├── backend/              # CloudFlare Workers API
│   ├── src/
│   │   └── index.ts      # API 엔드포인트
│   ├── schema.sql        # D1 데이터베이스 스키마
│   ├── wrangler.toml     # CloudFlare 배포 설정
│   ├── package.json
│   └── CLAUDE.md         # Backend 개발 규칙
│
├── CLAUDE.md             # 전체 프로젝트 규칙
└── README.md
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+ 
- npm 또는 yarn
- CloudFlare 계정 (배포용)
- Wrangler CLI

### 로컬 개발 환경 설정

#### 1. 프론트엔드 설정

```bash
cd frontend
npm install
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

#### 2. 백엔드 설정

```bash
cd backend
npm install
npm run dev
```

CloudFlare Workers 개발 서버가 로컬에서 실행됩니다.

#### 3. 데이터베이스 설정

```bash
cd backend

# D1 데이터베이스 생성 (개발용)
npm run db:create

# 스키마 마이그레이션
npm run db:migrate
```

## 🛠️ 개발 명령어

### Frontend
```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 결과 미리보기
npm run lint         # ESLint 실행
```

### Backend
```bash
npm run dev          # 로컬 개발 서버
npm run deploy       # 프로덕션 배포
npm run deploy:prod  # 프로덕션 환경 배포
npm run type-check   # TypeScript 타입 검사
```

## 📡 API 엔드포인트

- `POST /api/v1/subscribe` - 이메일 구독
- `GET /api/v1/health` - 헬스 체크
- `DELETE /api/v1/unsubscribe` - 구독 취소

## 🗄️ 데이터베이스 스키마

```sql
CREATE TABLE subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: #000000 (검정)
- **Secondary**: #6B7280 (회색)
- **Background**: #FFFFFF (흰색)
- **Accent**: #007AFF (Apple Blue)
- **Success**: #34C759 (녹색)

### 스타일 가이드
- Apple 스타일의 미니멀한 디자인
- 깔끔한 타이포그래피
- 적절한 여백과 간격
- 완전 반응형 디자인

## 🚦 배포

### Frontend (CloudFlare Pages)
```bash
cd frontend
npm run build
# CloudFlare Pages에 dist 폴더 배포
```

### Backend (CloudFlare Workers)
```bash
cd backend
npm run deploy:prod
```

### 데이터베이스 (프로덕션)
```bash
cd backend
npm run db:create:prod
npm run db:migrate:prod
```

## 🔐 보안 기능

- **CORS**: 허용된 도메인만 접근 가능
- **Rate Limiting**: IP별 요청 제한
- **이메일 검증**: 유효한 이메일 형식 검사
- **중복 방지**: 이미 구독된 이메일 체크
- **IP/User-Agent 로깅**: 구독자 추적 및 분석

## 🧪 테스트

프로젝트는 Puppeteer MCP를 사용하여 브라우저 기반 테스트를 수행합니다.

## 📋 주요 기능

- ✅ 이메일 구독 시스템
- ✅ 반응형 랜딩 페이지
- ✅ 실시간 유효성 검증
- ✅ 구독 취소 기능
- ✅ 관리자 대시보드 (추후 추가 예정)
- ✅ 이메일 발송 시스템 (추후 추가 예정)

## 🤝 개발 규칙

- **완전 분리**: 프론트엔드와 백엔드는 독립적으로 개발
- **API 통신**: REST API를 통한 데이터 교환
- **Git 관리**: 사용자가 직접 Git 명령어 수행
- **타입 안전성**: TypeScript 엄격 모드 사용
- **코드 품질**: ESLint + Prettier 적용

## 📝 라이센스

이 프로젝트는 개인 학습 목적으로 작성되었습니다.

---

**개발 환경**: Node.js 18+ | **배포 플랫폼**: CloudFlare | **데이터베이스**: CloudFlare D1
