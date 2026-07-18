import type { NextConfig } from "next";

// GitHub Pages 배포를 위한 basePath 설정
// 리포지토리 이름이 'bible-guide'인 경우: NEXT_PUBLIC_BASE_PATH=/bible-guide
// 루트 도메인(username.github.io)에 배포하는 경우: NEXT_PUBLIC_BASE_PATH= (빈 값)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  images: {
    unoptimized: true, // GitHub Pages는 Next.js 이미지 최적화 미지원
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  trailingSlash: true, // GitHub Pages에서 디렉토리 인덱스 매핑을 위해 필요
};

export default nextConfig;
