import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

// GitHub Pages basePath — 로컬 개발 시에는 빈 값, 배포 시 리포지토리 경로
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
};

export const metadata: Metadata = {
  title: "성경 요약 가이드 — Bible Summary Guide",
  description: "구약 39권, 신약 27권 — 성경 66권의 핵심 메시지를 한눈에 이해하세요. 인물 관계도, 성경 지도, 예언-성취 비교, 사화조화 제공.",
  keywords: ["성경", "Bible", "구약", "신약", "요약", "인물관계도", "성경지도", "예언성취", "사화조화"],
  manifest: `${basePath}/manifest.json`,
  icons: {
    icon: [
      { url: `${basePath}/favicon-16.png`, sizes: "16x16", type: "image/png" },
      { url: `${basePath}/favicon-32.png`, sizes: "32x32", type: "image/png" },
      { url: `${basePath}/favicon.ico`, sizes: "32x32" },
    ],
    apple: [
      { url: `${basePath}/apple-touch-icon.png`, sizes: "180x180", type: "image/png" },
      { url: `${basePath}/icon-152.png`, sizes: "152x152", type: "image/png" },
      { url: `${basePath}/icon-120.png`, sizes: "120x120", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "성경가이드",
  },
  openGraph: {
    title: "성경 요약 가이드",
    description: "성경 66권의 핵심 메시지를 한눈에 이해하세요",
    type: "website",
    locale: "ko_KR",
  },
};

function ServiceWorkerRegistration() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              var basePath = '${basePath}';
              var swPath = basePath + '/sw.js';
              navigator.serviceWorker.register(swPath, { scope: basePath + '/' }).catch(function() {});
            });
          }
        `,
      }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ServiceWorkerRegistration />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
