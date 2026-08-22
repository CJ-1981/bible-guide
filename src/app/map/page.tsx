'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { bibleLocations, bibleRoutes, type BibleLocation, type BibleRoute } from '@/lib/map-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/components/theme-provider';
import ZoomPanContainer from '@/components/zoom-pan-container';

function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
      title={theme === 'dark' ? '라이트 모드' : '다크 모드'}
    >
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
      )}
    </Button>
  );
}

// 지도 배경 - 지중해와 중동 지역의 간소화된 윤곽
function MapBackground() {
  return (
    <g>
      {/* 바다 배경 */}
      <rect x={0} y={0} width={1000} height={700} fill="var(--background)" />

      {/* 지중해 */}
      <path
        d="M 180,150 C 200,120 250,100 300,110 C 350,120 380,130 420,120 C 460,110 480,125 510,130 C 540,135 560,140 580,150 C 600,160 620,170 640,180 C 660,190 670,210 660,230 C 650,250 630,260 620,280 C 610,300 590,310 570,320 C 550,330 530,340 510,345 C 490,350 470,355 450,350 C 430,345 410,340 390,335 C 370,330 350,325 330,320 C 310,315 290,310 270,300 C 250,290 230,280 210,270 C 190,260 175,240 170,220 C 165,200 170,170 180,150 Z"
        fill="var(--muted)"
        opacity={0.4}
      />

      {/* 유프라테스 강 */}
      <path
        d="M 580,80 C 570,120 560,160 550,200 C 540,240 535,280 540,320 C 545,360 550,400 560,440"
        fill="none"
        stroke="var(--muted-foreground)"
        strokeWidth={1.5}
        strokeDasharray="4 2"
        opacity={0.3}
      />
      {/* 나일 강 */}
      <path
        d="M 320,200 C 325,250 330,300 335,350 C 340,400 345,450 350,500"
        fill="none"
        stroke="var(--muted-foreground)"
        strokeWidth={1.5}
        strokeDasharray="4 2"
        opacity={0.3}
      />
      {/* 요단 강 */}
      <path
        d="M 440,275 C 442,290 445,310 448,330 C 450,350 452,370 455,390"
        fill="none"
        stroke="var(--muted-foreground)"
        strokeWidth={1}
        strokeDasharray="3 2"
        opacity={0.3}
      />

      {/* 지역 라벨 */}
      <text x={300} y={230} style={{ fontSize: '14px', fill: 'var(--muted-foreground)', opacity: 0.25, fontWeight: 'bold' }}>EGYPT</text>
      <text x={500} y={160} style={{ fontSize: '14px', fill: 'var(--muted-foreground)', opacity: 0.25, fontWeight: 'bold' }}>MESOPOTAMIA</text>
      <text x={380} y={340} style={{ fontSize: '14px', fill: 'var(--muted-foreground)', opacity: 0.25, fontWeight: 'bold' }}>ARABIA</text>
      <text x={150} y={200} style={{ fontSize: '12px', fill: 'var(--muted-foreground)', opacity: 0.25, fontWeight: 'bold' }}>MEDITERRANEAN</text>
      <text x={170} y={220} style={{ fontSize: '12px', fill: 'var(--muted-foreground)', opacity: 0.25, fontWeight: 'bold' }}>SEA</text>
      <text x={370} y={280} style={{ fontSize: '11px', fill: 'var(--muted-foreground)', opacity: 0.25, fontWeight: 'bold' }}>CANAAN</text>
      <text x={230} y={190} style={{ fontSize: '11px', fill: 'var(--muted-foreground)', opacity: 0.25, fontWeight: 'bold' }}>ASIA MINOR</text>
      <text x={160} y={320} style={{ fontSize: '11px', fill: 'var(--muted-foreground)', opacity: 0.25, fontWeight: 'bold' }}>GREECE</text>
      <text x={120} y={220} style={{ fontSize: '11px', fill: 'var(--muted-foreground)', opacity: 0.25, fontWeight: 'bold' }}>ROME</text>

      {/* 갈릴리 바다 */}
      <ellipse cx={425} cy={275} rx={12} ry={8} fill="var(--muted)" opacity={0.3} />
      {/* 사해 */}
      <ellipse cx={450} cy={340} rx={10} ry={18} fill="var(--muted)" opacity={0.3} />
    </g>
  );
}

function LocationMarker({
  location,
  isSelected,
  highlightedRoute,
  onClick,
}: {
  location: BibleLocation;
  isSelected: boolean;
  highlightedRoute: string | null;
  onClick: () => void;
}) {
  const isInRoute = highlightedRoute
    ? bibleRoutes.find(r => r.id === highlightedRoute)?.locations.includes(location.id)
    : false;
  const dimmed = highlightedRoute && !isInRoute;

  return (
    <g
      onClick={onClick}
      className="cursor-pointer"
      style={{ opacity: dimmed ? 0.2 : 1, transition: 'opacity 0.3s' }}
    >
      {/* 펄스 효과 (선택된 위치) */}
      {isSelected && (
        <circle
          cx={location.x}
          cy={location.y}
          r={20}
          fill={location.color}
          opacity={0.2}
        >
          <animate attributeName="r" from="14" to="24" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite" />
        </circle>
      )}

      {/* 메인 마커 */}
      <circle
        cx={location.x}
        cy={location.y}
        r={isSelected ? 10 : 7}
        fill={isSelected ? location.color : `${location.color}60`}
        stroke={location.color}
        strokeWidth={isSelected ? 2.5 : 1.5}
        style={{ transition: 'all 0.3s' }}
      />

      {/* 내부 점 */}
      <circle
        cx={location.x}
        cy={location.y}
        r={2.5}
        fill="white"
      />

      {/* 이름 라벨 */}
      <text
        x={location.x}
        y={location.y - (isSelected ? 16 : 12)}
        textAnchor="middle"
        pointerEvents="none"
        style={{
          fontSize: isSelected ? '12px' : '10px',
          fill: 'var(--foreground)',
          fontWeight: isSelected ? 'bold' : '600',
          transition: 'all 0.3s',
        }}
      >
        {location.name}
      </text>
      {isSelected && (
        <text
          x={location.x}
          y={location.y + 20}
          textAnchor="middle"
          pointerEvents="none"
          style={{ fontSize: '8px', fill: 'var(--muted-foreground)' }}
        >
          {location.nameEn}
        </text>
      )}
    </g>
  );
}

function RoutePath({
  route,
  locations,
  highlighted,
}: {
  route: BibleRoute;
  locations: BibleLocation[];
  highlighted: boolean;
}) {
  const locMap = new Map(locations.map(l => [l.id, l]));
  const points = route.locations
    .map(id => locMap.get(id))
    .filter(Boolean) as BibleLocation[];

  if (points.length < 2) return null;

  const pathData = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  return (
    <g style={{ opacity: highlighted ? 0.8 : 0.08, transition: 'opacity 0.3s' }}>
      <path
        d={pathData}
        fill="none"
        stroke={route.color}
        strokeWidth={highlighted ? 3 : 2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="8 4"
      />
      {/* 방향 화살표 */}
      {highlighted && points.length >= 2 && (
        <>
          {points.slice(0, -1).map((p, i) => {
            const next = points[i + 1];
            const midX = (p.x + next.x) / 2;
            const midY = (p.y + next.y) / 2;
            const angle = Math.atan2(next.y - p.y, next.x - p.x) * (180 / Math.PI);
            return (
              <g key={i} transform={`translate(${midX}, ${midY}) rotate(${angle})`}>
                <polygon points="-4,-3 4,0 -4,3" fill={route.color} />
              </g>
            );
          })}
        </>
      )}
    </g>
  );
}

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<BibleLocation | null>(null);
  const [filter, setFilter] = useState<'all' | 'old' | 'new'>('all');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const filteredLocations = useMemo(() => {
    if (filter === 'all') return bibleLocations;
    if (filter === 'old') return bibleLocations.filter(l => l.testament === 'old' || l.testament === 'both');
    return bibleLocations.filter(l => l.testament === 'new' || l.testament === 'both');
  }, [filter]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
            <span className="text-2xl">📖</span>
            <h1 className="text-lg font-bold hidden sm:block">성경 요약 가이드</h1>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <span className="text-sm font-semibold">🗺️ 성경 지도</span>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5">
            <Link href="/"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="메인 페이지"><span>🏠</span><span className="hidden md:inline">홈</span></Button></Link>
            <Link href="/reading"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="성경 읽기표 (통독일정)"><span>📅</span><span className="hidden md:inline">통독일정</span></Button></Link>
            <Link href="/topics"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="주제별 가이드"><span>📌</span><span className="hidden md:inline">주제별</span></Button></Link>
            <Link href="/characters"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="인물 관계도"><span>👥</span><span className="hidden md:inline">인물도</span></Button></Link>
            <Link href="/prophecy"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="예언-성취 비교"><span>🔗</span><span className="hidden md:inline">예언-성취</span></Button></Link>
            <Link href="/harmony"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="사복음서 조화"><span>📚</span><span className="hidden md:inline">사화조화</span></Button></Link>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-6 w-full">
        {/* 설명 카드 */}
        <div className="rounded-xl overflow-hidden mb-6" style={{ minHeight: '100px' }}>
          <div className="bg-gradient-to-r from-teal-700 to-cyan-900 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="text-xs bg-white/20 text-white border-white/30 backdrop-blur-sm">지도</Badge>
              <Badge variant="outline" className="text-xs text-white border-white/40">{bibleLocations.length}곳</Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">성경 지도</h2>
            <p className="text-white/70 text-sm mt-1">Bible Map</p>
            <p className="text-white/80 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              성경 주요 사건이 일어난 장소를 지도에서 확인하세요. 여정 경로를 선택하면 이동 동선을 볼 수 있습니다.
            </p>
          </div>
        </div>

        {/* 필터 & 여정 선택 */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as 'all' | 'old' | 'new')}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="old">구약</TabsTrigger>
              <TabsTrigger value="new">신약</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs text-muted-foreground mr-1">여정:</span>
            <Button
              variant={selectedRoute === null ? 'default' : 'outline'}
              size="sm"
              className="text-xs h-7"
              onClick={() => setSelectedRoute(null)}
            >
              전체
            </Button>
            {bibleRoutes.map(route => (
              <Button
                key={route.id}
                variant={selectedRoute === route.id ? 'default' : 'outline'}
                size="sm"
                className="text-xs h-7"
                style={selectedRoute === route.id ? { backgroundColor: route.color } : { borderColor: route.color, color: route.color }}
                onClick={() => setSelectedRoute(prev => prev === route.id ? null : route.id)}
              >
                {route.name}
              </Button>
            ))}
          </div>
        </div>

        {/* 여정 설명 */}
        {selectedRoute && (() => {
          const route = bibleRoutes.find(r => r.id === selectedRoute);
          if (!route) return null;
          return (
            <Card className="mb-4 border-l-4" style={{ borderLeftColor: route.color }}>
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 rounded" style={{ backgroundColor: route.color }} />
                  <span className="font-semibold text-sm">{route.name}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{route.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {route.locations.map(locId => {
                    const loc = bibleLocations.find(l => l.id === locId);
                    return loc ? (
                      <Badge key={locId} variant="outline" className="text-xs" style={{ borderColor: route.color, color: route.color }}>
                        {loc.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })()}

        {/* SVG 지도 with Zoom/Pan */}
        <div className="mb-8">
          <ZoomPanContainer contentWidth={1000} contentHeight={700}>
            <svg
              width={1000}
              height={700}
              viewBox="0 0 1000 700"
              style={{ minWidth: 800, display: 'block' }}
            >
              {/* 지도 배경 */}
              <MapBackground />

              {/* 여정 경로 */}
              {bibleRoutes.map(route => (
                <RoutePath
                  key={route.id}
                  route={route}
                  locations={filteredLocations}
                  highlighted={!selectedRoute || selectedRoute === route.id}
                />
              ))}

              {/* 위치 마커 */}
              {filteredLocations.map(loc => (
                <LocationMarker
                  key={loc.id}
                  location={loc}
                  isSelected={selectedLocation?.id === loc.id}
                  highlightedRoute={selectedRoute}
                  onClick={() => setSelectedLocation(prev => prev?.id === loc.id ? null : loc)}
                />
              ))}
            </svg>
          </ZoomPanContainer>
        </div>

        {/* 위치 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLocations.map(loc => (
            <Card
              key={loc.id}
              className="cursor-pointer hover:shadow-lg transition-all border-l-4"
              style={{ borderLeftColor: loc.color }}
              onClick={() => setSelectedLocation(loc)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${loc.color}30`, border: `2px solid ${loc.color}` }}
                  >
                    <span className="text-sm">📍</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm">{loc.name}</h3>
                      <Badge className={`text-[10px] px-1.5 py-0 ${loc.testament === 'old' ? 'bg-amber-100 text-amber-800 border-amber-200' : loc.testament === 'new' ? 'bg-sky-100 text-sky-800 border-sky-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'}`}>
                        {loc.testament === 'old' ? '구약' : loc.testament === 'new' ? '신약' : '구·신약'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{loc.nameEn}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{loc.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {loc.events.slice(0, 2).map((ev, i) => (
                    <Badge key={i} variant="secondary" className="text-[10px]">{ev.title}</Badge>
                  ))}
                  {loc.events.length > 2 && (
                    <Badge variant="outline" className="text-[10px]">+{loc.events.length - 2}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* 위치 상세 다이얼로그 */}
      <Dialog open={!!selectedLocation} onOpenChange={() => setSelectedLocation(null)}>
        <DialogContent className="max-w-lg">
          {selectedLocation && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${selectedLocation.color}30`, border: `3px solid ${selectedLocation.color}` }}
                  >
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{selectedLocation.name}</DialogTitle>
                    <p className="text-sm text-muted-foreground">{selectedLocation.nameEn}</p>
                  </div>
                </div>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">장소 소개</h4>
                  <p className="text-sm leading-relaxed text-foreground/85">{selectedLocation.description}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-sm mb-2">주요 사건</h4>
                  <div className="space-y-2">
                    {selectedLocation.events.map((ev, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span
                          className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: selectedLocation.color }}
                        />
                        <div>
                          <p className="text-sm font-medium">{ev.title}</p>
                          <p className="text-xs text-muted-foreground">{ev.book} · {ev.era}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-sm mb-2">관련 여정</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {bibleRoutes
                      .filter(r => r.locations.includes(selectedLocation.id))
                      .map(r => (
                        <Badge
                          key={r.id}
                          className="text-xs text-white"
                          style={{ backgroundColor: r.color }}
                        >
                          {r.name}
                        </Badge>
                      ))}
                    {!bibleRoutes.some(r => r.locations.includes(selectedLocation.id)) && (
                      <span className="text-xs text-muted-foreground">해당 여정 없음</span>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
