'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { gospelEvents, gospelCategories, gospelInfo, type GospelEvent } from '@/lib/harmony-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTheme } from '@/components/theme-provider';

function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleTheme} title={theme === 'dark' ? '라이트 모드' : '다크 모드'} aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}>
      {theme === 'dark' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
      )}
    </Button>
  );
}

type GospelKey = 'matthew' | 'mark' | 'luke' | 'john';

function GospelPassageCard({
  gospelKey,
  passage,
  isPresent,
}: {
  gospelKey: GospelKey;
  passage?: { reference: string; text: string };
  isPresent: boolean;
}) {
  const info = gospelInfo[gospelKey];
  return (
    <div
      className={`rounded-xl border-2 p-3 transition-all ${isPresent ? 'opacity-100' : 'opacity-30'}`}
      style={{ borderColor: isPresent ? `${info.color}60` : 'var(--border)' }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: info.color }}
        >
          {info.icon}
        </div>
        <div>
          <h5 className="font-bold text-xs">{info.name}</h5>
          <p className="text-[10px] text-muted-foreground">{info.nameEn} · {info.audience} · {info.theme}</p>
        </div>
      </div>
      {isPresent && passage ? (
        <>
          <Badge variant="outline" className="text-[10px] mb-2 font-mono">{passage.reference}</Badge>
          <p className="text-xs leading-relaxed text-foreground/85 line-clamp-6">{passage.text}</p>
        </>
      ) : (
        <p className="text-xs text-muted-foreground italic">기록 없음</p>
      )}
    </div>
  );
}

function HarmonyCard({ event, onClick }: { event: GospelEvent; onClick: () => void }) {
  const cat = gospelCategories.find(c => c.id === event.category);
  const presentGospels = Object.keys(event.passages) as GospelKey[];

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all border-l-4"
      style={{ borderLeftColor: cat?.color || '#666' }}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span>{cat?.icon}</span>
          <Badge variant="outline" className="text-xs" style={{ borderColor: cat?.color, color: cat?.color }}>
            {cat?.name}
          </Badge>
          <Badge variant="secondary" className="text-xs">{event.era}</Badge>
          {/* 복음서 존재 표시 */}
          <div className="flex gap-1 ml-auto">
            {(['matthew', 'mark', 'luke', 'john'] as GospelKey[]).map(key => {
              const info = gospelInfo[key];
              const present = !!event.passages[key];
              return (
                <div
                  key={key}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                  style={{
                    backgroundColor: present ? info.color : 'var(--muted)',
                    color: present ? 'white' : 'var(--muted-foreground)',
                  }}
                >
                  {info.icon}
                </div>
              );
            })}
          </div>
        </div>
        <h3 className="font-bold text-sm mb-1">{event.title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{event.significance}</p>

        {/* 미리보기: 마태복음 구절 */}
        {event.passages.matthew && (
          <p className="text-[10px] text-muted-foreground mt-2 line-clamp-2 border-t pt-2">
            <span className="font-medium">마태: </span>{event.passages.matthew.text.slice(0, 80)}...
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function HarmonyPage() {
  const [selectedEvent, setSelectedEvent] = useState<GospelEvent | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredEvents = useMemo(() => {
    if (categoryFilter === 'all') return gospelEvents;
    return gospelEvents.filter(e => e.category === categoryFilter);
  }, [categoryFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
            <span className="text-2xl">📖</span>
            <h1 className="text-lg font-bold hidden sm:block">성경 요약 가이드</h1>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <span className="text-sm font-semibold">📚 사화조화</span>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5">
            <Button asChild variant="ghost" size="sm" className="text-xs gap-1 h-8" title="메인 페이지"><Link href="/"><span>🏠</span><span className="hidden md:inline">홈</span></Link></Button>
            <Button asChild variant="ghost" size="sm" className="text-xs gap-1 h-8" title="주제별 가이드"><Link href="/topics"><span>📌</span><span className="hidden md:inline">주제별</span></Link></Button>
            <Button asChild variant="ghost" size="sm" className="text-xs gap-1 h-8" title="성경 읽기표"><Link href="/reading"><span>📅</span><span className="hidden md:inline">읽기표</span></Link></Button>
            <Button asChild variant="ghost" size="sm" className="text-xs gap-1 h-8" title="인물 관계도"><Link href="/characters"><span>👥</span><span className="hidden md:inline">인물도</span></Link></Button>
            <Button asChild variant="ghost" size="sm" className="text-xs gap-1 h-8" title="성경 지도"><Link href="/map"><span>🗺️</span><span className="hidden md:inline">지도</span></Link></Button>
            <Button asChild variant="ghost" size="sm" className="text-xs gap-1 h-8" title="예언-성취 비교"><Link href="/prophecy"><span>🔗</span><span className="hidden md:inline">예언-성취</span></Link></Button>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-6 w-full">
        {/* Hero */}
        <div className="rounded-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-indigo-700 to-blue-900 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="text-xs bg-white/20 text-white border-white/30 backdrop-blur-sm">사화조화</Badge>
              <Badge variant="outline" className="text-xs text-white border-white/40">{gospelEvents.length}사건</Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">사화조화 — 병렬 복음서</h2>
            <p className="text-white/70 text-sm mt-1">Gospel Harmony — Parallel Gospels</p>
            <p className="text-white/80 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              네 복음서에 기록된 동일 사건을 나란히 비교합니다. 각 복음서의 독특한 관점과 강조점을 발견하세요.
            </p>
            {/* 복음서 소개 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {(['matthew', 'mark', 'luke', 'john'] as GospelKey[]).map(key => {
                const info = gospelInfo[key];
                return (
                  <div key={key} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: info.color }}
                      >
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-white font-bold text-xs">{info.name}</p>
                        <p className="text-white/60 text-[10px]">{info.audience} · {info.theme}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={categoryFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            className="text-xs"
            onClick={() => setCategoryFilter('all')}
          >
            전체 ({gospelEvents.length})
          </Button>
          {gospelCategories.map(cat => (
            <Button
              key={cat.id}
              variant={categoryFilter === cat.id ? 'default' : 'outline'}
              size="sm"
              className="text-xs"
              style={categoryFilter === cat.id ? { backgroundColor: cat.color } : { borderColor: cat.color, color: cat.color }}
              onClick={() => setCategoryFilter(cat.id)}
            >
              {cat.icon} {cat.name}
            </Button>
          ))}
        </div>

        {/* Event cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map(event => (
            <HarmonyCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
          ))}
        </div>
      </main>

      {/* Detail dialog - parallel view */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {selectedEvent && (() => {
            const cat = gospelCategories.find(c => c.id === selectedEvent.category);
            return (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{cat?.icon}</span>
                    <div>
                      <DialogTitle className="text-xl">{selectedEvent.title}</DialogTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge style={{ backgroundColor: cat?.color, color: 'white' }}>{cat?.name}</Badge>
                        <Badge variant="outline" className="text-xs">{selectedEvent.era}</Badge>
                      </div>
                    </div>
                  </div>
                </DialogHeader>
                <div className="mt-4">
                  {/* Significance */}
                  <div className="p-3 rounded-lg bg-muted/50 mb-4">
                    <p className="text-sm leading-relaxed text-foreground/85">{selectedEvent.significance}</p>
                  </div>

                  {/* Parallel Gospel view */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(['matthew', 'mark', 'luke', 'john'] as GospelKey[]).map(key => (
                      <GospelPassageCard
                        key={key}
                        gospelKey={key}
                        passage={selectedEvent.passages[key]}
                        isPresent={!!selectedEvent.passages[key]}
                      />
                    ))}
                  </div>

                  {/* Coverage summary */}
                  <Separator className="my-4" />
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs text-muted-foreground">기록 복음서:</span>
                    {(['matthew', 'mark', 'luke', 'john'] as GospelKey[]).map(key => {
                      const info = gospelInfo[key];
                      const present = !!selectedEvent.passages[key];
                      return (
                        <div
                          key={key}
                          className="flex items-center gap-1.5 text-xs"
                          style={{ opacity: present ? 1 : 0.3 }}
                        >
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                            style={{ backgroundColor: present ? info.color : 'var(--muted)' }}
                          >
                            {info.icon}
                          </div>
                          <span className="font-medium">{info.name}</span>
                          <span className="text-muted-foreground">
                            {present ? '✓' : '—'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
