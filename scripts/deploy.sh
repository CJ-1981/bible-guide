#!/bin/bash
# =============================================================
# 성경 요약 가이드 — GitHub Pages 수동 배포 스크립트
# =============================================================
# 사용법:
#   export GH_TOKEN=your_github_token
#   bun run deploy
#
# 또는:
#   GH_TOKEN=xxx bun run deploy
# =============================================================

set -e

# --- 설정 ---
REPO_NAME="bible-guide"  # ← 리포지토리 이름으로 변경하세요
GH_USERNAME=""           # ← GitHub 사용자명 (빈 값이면 자동 감지)
BRANCH="main"
DEPLOY_BRANCH="gh-pages"

# --- GH_TOKEN 확인 ---
if [ -z "$GH_TOKEN" ]; then
  echo "❌ GH_TOKEN 환경변수가 설정되지 않았습니다."
  echo ""
  echo "   토큰 생성: https://github.com/settings/tokens/new?scopes=repo,workflow&description=Bible%20Guide%20Deploy"
  echo ""
  echo "   설정 방법:"
  echo "     export GH_TOKEN=ghp_your_token_here"
  echo "     bun run deploy"
  exit 1
fi

# --- 사용자명 자동 감지 ---
if [ -z "$GH_USERNAME" ]; then
  GH_USERNAME=$(gh api user --jq '.login' 2>/dev/null || echo "")
  if [ -z "$GH_USERNAME" ]; then
    echo "❌ GitHub 사용자명을 감지할 수 없습니다."
    echo "   스크립트 상단의 GH_USERNAME을 수동으로 설정하거나 gh CLI에 로그인하세요."
    echo "   gh auth login"
    exit 1
  fi
fi

REPO_URL="https://${GH_TOKEN}@github.com/${GH_USERNAME}/${REPO_NAME}.git"
BASE_PATH="/${REPO_NAME}"

echo "📖 성경 요약 가이드 — GitHub Pages 배포"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  리포지토리: ${GH_USERNAME}/${REPO_NAME}"
echo "  배포 URL:   https://${GH_USERNAME}.github.io/${REPO_NAME}/"
echo "  basePath:   ${BASE_PATH}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# --- 리포지토리 존재 확인 & 생성 ---
echo "📦 리포지토리 확인 중..."
if ! gh repo view "${GH_USERNAME}/${REPO_NAME}" &>/dev/null; then
  echo "  리포지토리가 없습니다. 새로 생성합니다..."
  gh repo create "${REPO_NAME}" --public --description "성경 요약 가이드 — Bible Summary Guide" 2>/dev/null || {
    echo "❌ 리포지토리 생성 실패. 수동으로 생성 후 다시 시도하세요."
    echo "   https://github.com/new"
    exit 1
  }
  echo "  ✅ 리포지토리 생성 완료"
else
  echo "  ✅ 리포지토리 확인 완료"
fi

# --- 빌드 ---
echo ""
echo "🔨 정적 사이트 빌드 중 (basePath: ${BASE_PATH})..."
NEXT_PUBLIC_BASE_PATH="${BASE_PATH}" bun run build

# .nojekyll 추가
touch out/.nojekyll

echo "  ✅ 빌드 완료 (out/ 디렉토리)"

# --- 기존 git 초기화 & 배포 ---
echo ""
echo "🚀 GitHub Pages에 배포 중..."

# out 디렉토리에서 별도 git 작업
cd out

# 기존 gh-pages 브랜치 내용 가져오기
git init -b ${DEPLOY_BRANCH} 2>/dev/null || git init 2>/dev/null
git config user.name "GitHub Pages Deploy"
git config user.email "deploy@bible-guide.dev"

# CNAME 파일이 있으면 유지 (커스텀 도메인)
if git ls-remote --heads "${REPO_URL}" "${DEPLOY_BRANCH}" 2>/dev/null | grep -q "${DEPLOY_BRANCH}"; then
  echo "  기존 gh-pages 브랜치에서 CNAME 복구 중..."
  git fetch "${REPO_URL}" "${DEPLOY_BRANCH}" 2>/dev/null || true
  git show "FETCH_HEAD:CNAME" > CNAME 2>/dev/null || true
fi

git add -A
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" --allow-empty

# gh-pages 브랜치에 푸시
git push --force "${REPO_URL}" "${DEPLOY_BRANCH}" 2>&1 | grep -v "${GH_TOKEN}" || true

cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ 배포 완료!"
echo ""
echo "🌐 사이트 URL:"
echo "   https://${GH_USERNAME}.github.io/${REPO_NAME}/"
echo ""
echo "⚙️  GitHub Pages 설정 확인:"
echo "   https://github.com/${GH_USERNAME}/${REPO_NAME}/settings/pages"
echo ""
echo "⏱️  배포 반영까지 1~3분 소요될 수 있습니다."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
