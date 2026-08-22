'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { prophecies, prophecyCategories, type ProphecyFulfillment } from '@/lib/prophecy-data';
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

function ProphecyCard({ item, onClick }: { item: ProphecyFulfillment; onClick: () => void }) {
  const cat = prophecyCategories.find(c => c.id === item.category);
  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all border-l-4"
      style={{ borderLeftColor: cat?.color || '#666' }}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span>{cat?.icon}</span>
          <Badge variant="outline" className="text-xs" style={{ borderColor: cat?.color, color: cat?.color }}>
            {cat?.name}
          </Badge>
          <Badge variant="secondary" className="text-xs">{item.theme}</Badge>
        </div>
        <h3 className="font-bold text-sm mb-1">{item.theme}</h3>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground mb-1">📖 예언 ({item.prophecy.date})</p>
            <p className="text-xs text-muted-foreground line-clamp-3">{item.prophecy.text}</p>
            <p className="text-[10px] font-medium mt-1">{item.prophecy.reference}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground mb-1">✅ 성취 ({item.fulfillment.date})</p>
            <p className="text-xs text-muted-foreground line-clamp-3">{item.fulfillment.text}</p>
            <p className="text-[10px] font-medium mt-1">{item.fulfillment.reference}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProphecyPage() {
  const [selectedItem, setSelectedItem] = useState<ProphecyFulfillment | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredItems = useMemo(() => {
    if (categoryFilter === 'all') return prophecies;
    return prophecies.filter(p => p.category === categoryFilter);
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
          <span className="text-sm font-semibold">🔗 예언-성취</span>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5">
            <Link href="/"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="메인 페이지"><span>🏠</span><span className="hidden md:inline">홈</span></Button></Link>
            <Link href="/reading"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="성경 읽기표 (통독일정)"><span>📅</span><span className="hidden md:inline">통독일정</span></Button></Link>
            <Link href="/topics"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="주제별 가이드"><span>📌</span><span className="hidden md:inline">주제별</span></Button></Link>
            <Link href="/characters"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="인물 관계도"><span>👥</span><span className="hidden md:inline">인물도</span></Button></Link>
            <Link href="/map"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="성경 지도"><span>🗺️</span><span className="hidden md:inline">지도</span></Button></Link>
            <Link href="/harmony"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="사복음서 조화"><span>📚</span><span className="hidden md:inline">사화조화</span></Button></Link>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-6 w-full">
        {/* Hero */}
        <div className="rounded-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-rose-700 to-red-900 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="text-xs bg-white/20 text-white border-white/30 backdrop-blur-sm">예언-성취</Badge>
              <Badge variant="outline" className="text-xs text-white border-white/40">{prophecies.length}쌍</Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">예언-성취 비교</h2>
            <p className="text-white/70 text-sm mt-1">Prophecy & Fulfillment</p>
            <p className="text-white/80 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              구약의 예언이 어떻게 신약에서 성취되었는지 나란히 비교합니다. 성경의 통일성과 하나님의 주권을 확인하세요.
            </p>
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
            전체 ({prophecies.length})
          </Button>
          {prophecyCategories.map(cat => (
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

        {/* Prophecy cards */}
        <div className="grid grid-cols-1 gap-4">
          {filteredItems.map(item => (
            <ProphecyCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
          ))}
        </div>
      </main>

      {/* Detail dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (() => {
            const cat = prophecyCategories.find(c => c.id === selectedItem.category);
            return (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{cat?.icon}</span>
                    <div>
                      <DialogTitle className="text-xl">{selectedItem.theme}</DialogTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge style={{ backgroundColor: cat?.color, color: 'white' }}>{cat?.name}</Badge>
                        <Badge variant="outline" className="text-xs">{selectedItem.prophecy.date} → {selectedItem.fulfillment.date}</Badge>
                      </div>
                    </div>
                  </div>
                </DialogHeader>
                <div className="mt-4">
                  {/* Split view */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Prophecy */}
                    <div className="rounded-xl border-2 p-4" style={{ borderColor: `${cat?.color}40` }}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${cat?.color}20` }}>
                          <span>📖</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">구약 예언</h4>
                          <p className="text-xs text-muted-foreground">{selectedItem.prophecy.book} · {selectedItem.prophecy.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs mb-3 font-mono">{selectedItem.prophecy.reference}</Badge>
                      <blockquote className="border-l-4 pl-4 py-2 text-sm italic leading-relaxed text-foreground/85" style={{ borderColor: cat?.color, backgroundColor: `${cat?.color}08` }}>
                        {selectedItem.prophecy.text}
                      </blockquote>
                    </div>

                    {/* Fulfillment */}
                    <div className="rounded-xl border-2 p-4" style={{ borderColor: `${cat?.color}40` }}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${cat?.color}20` }}>
                          <span>✅</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">신약 성취</h4>
                          <p className="text-xs text-muted-foreground">{selectedItem.fulfillment.book} · {selectedItem.fulfillment.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs mb-3 font-mono">{selectedItem.fulfillment.reference}</Badge>
                      <blockquote className="border-l-4 pl-4 py-2 text-sm italic leading-relaxed text-foreground/85" style={{ borderColor: cat?.color, backgroundColor: `${cat?.color}08` }}>
                        {selectedItem.fulfillment.text}
                      </blockquote>
                    </div>
                  </div>

                  {/* Arrow connector */}
                  <div className="flex justify-center my-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-xs">{selectedItem.prophecy.date}</span>
                      <svg width="60" height="20" viewBox="0 0 60 20">
                        <line x1="0" y1="10" x2="48" y2="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
                        <polygon points="48,5 58,10 48,15" fill="currentColor" />
                      </svg>
                      <span className="text-xs">{selectedItem.fulfillment.date}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Significance */}
                  <div className="mt-4 p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <span>💡</span> 영적 의미
                    </h4>
                    <p className="text-sm leading-relaxed text-foreground/85">{selectedItem.significance}</p>
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
