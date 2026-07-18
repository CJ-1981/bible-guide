# 📖 성경 요약 가이드 — Bible Summary Guide

구약 39권, 신약 27권 — 성경 66권의 핵심 메시지를 한눈에 이해하세요.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-222?logo=github)

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 📖 **서별 요약** | 66권 각 책의 핵심 메시지, 주요 구절, 주제 정리 |
| 🏷️ **구약/신약 구분** | 각 서별로 구약·신약 뱃지 표시 |
| 🕐 **연대별 타임라인** | 기록 연대순으로 66권 정렬 |
| 👥 **인물 관계도** | 성경 주요 27인물의 관계를 SVG 그래프로 시각화 |
| 🗺️ **성경 지도** | 19개 주요 장소와 4개 사건 경로를 지도로 표시 |
| 🔗 **예언-성취 비교** | 구약 예언과 신약 성취를 나란히 비교 |
| 📚 **사화조화** | 마태·마가·누가·요한 복음서의 동일 사건 병렬 비교 |
| 🌙 **다크 모드** | 라이트/다크 테마 전환 (localStorage 저장) |
| 📱 **PWA 지원** | 오프라인 접속, 홈화면 추가, iOS 앱 아이콘 |
| ⬆️ **스크롤 단축 버튼** | 페이지 상단/하단 빠른 이동 |

## 🚀 로컬 개발

```bash
# 의존성 설치
bun install

# 개발 서버 실행
bun run dev

# 정적 빌드 (basePath 없음)
bun run build

# GitHub Pages용 빌드 (basePath 포함)
bun run build:gh-pages
```

## 🌐 GitHub Pages 배포

### 자동 배포 (GitHub Actions)

`main` 브랜치에 푸시하면 자동으로 빌드 및 배포됩니다.

1. GitHub 리포지토리 **Settings → Pages → Source**를 **GitHub Actions**로 설정
2. 코드를 `main` 브랜치에 푸시
3. 자동으로 `https://<username>.github.io/<repo-name>/` 에 배포

### 수동 배포 (gh-pages 브랜치)

```bash
# 1. GitHub Token 환경변수 설정
export GH_TOKEN=your_github_token_here

# 2. 배포 스크립트 실행
bun run deploy
```

### basePath 설정

리포지토리 이름에 따라 `NEXT_PUBLIC_BASE_PATH`를 설정하세요:

| 배포 대상 | basePath | 예시 URL |
|-----------|----------|----------|
| `username.github.io` 리포지토리 | (빈 값) | `https://username.github.io/` |
| 일반 리포지토리 | `/<repo-name>` | `https://username.github.io/bible-guide/` |

`.env` 파일에 설정:
```
NEXT_PUBLIC_BASE_PATH=/bible-guide
```

또는 GitHub Actions 워크플로우에서 자동으로 리포지토리 이름을 감지합니다.

## 🔑 GitHub Token 생성

배포를 위한 Personal Access Token 생성:

👉 **[토큰 생성하러 가기](https://github.com/settings/tokens/new?scopes=repo,workflow&description=Bible%20Guide%20Deploy)**

> ⚠️ Fine-grained token을 사용하는 경우: [Fine-grained 토큰 생성](https://github.com/settings/personal-access-tokens/new)
> 권한: Repository → Read/Write (Contents, Actions, Pages)

필요 권한:
- `repo` — 리포지토리 접근
- `workflow` — GitHub Actions 워크플로우 업데이트

## 🛠️ 기술 스택

- **Framework**: Next.js 16 (App Router, Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Deployment**: GitHub Pages (Static HTML)
- **PWA**: Service Worker + Web App Manifest
- **Package Manager**: Bun

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (ThemeProvider, PWA)
│   ├── page.tsx            # 메인 페이지 (서별 요약, 타임라인)
│   ├── characters/page.tsx # 인물 관계도
│   ├── map/page.tsx        # 성경 지도
│   ├── prophecy/page.tsx   # 예언-성취 비교
│   └── harmony/page.tsx    # 사화조화
├── components/
│   └── theme-provider.tsx  # 다크모드 테마 프로바이더
├── lib/
│   ├── bible-data.ts       # 66권 성경 데이터
│   ├── character-data.ts   # 인물 관계 데이터
│   ├── map-data.ts         # 지도/경로 데이터
│   ├── prophecy-data.ts    # 예언-성취 데이터
│   └── harmony-data.ts     # 사화조화 데이터
public/
├── manifest.json           # PWA 매니페스트
├── sw.js                   # 서비스 워커
├── icon-*.png              # 앱 아이콘 (iOS/Android)
├── bible-images/           # 카테고리별 이미지
└── .nojekyll               # GitHub Pages Jekyll 무시
.github/
└── workflows/
    └── deploy.yml          # 자동 배포 워크플로우
```

## 📜 라이선스

MIT License
