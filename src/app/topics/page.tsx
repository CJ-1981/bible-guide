'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  bibleTopics,
  topicCategories,
  type BibleTopic,
  type TopicVerse,
  type TopicCategory,
} from '@/lib/topics-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/components/theme-provider';

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

function CategoryHero({ category }: { category: TopicCategory & { topics: BibleTopic[] } }) {
  return (
    <div className="rounded-xl overflow-hidden mb-6 shadow-md" style={{ minHeight: '140px' }}>
      <div className={`bg-gradient-to-r ${category.gradient} p-6 md:p-8 text-white`}>
        <div className="flex items-center gap-2 mb-2">
          <Badge className="text-xs bg-white/20 text-white border-white/30 backdrop-blur-sm">
            {category.icon} {category.name}
          </Badge>
          <Badge variant="outline" className="text-xs text-white border-white/40">
            {category.topics.length}개 주제
          </Badge>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{category.name}</h2>
        <p className="text-white/75 text-sm mt-0.5 font-medium">{category.nameEn}</p>
        <p className="text-white/90 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          {category.description}
        </p>
      </div>
    </div>
  );
}

function TopicCard({ topic }: { topic: BibleTopic }) {
  const [open, setOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyVerse = (verse: TopicVerse, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `"${verse.text}" (${verse.reference})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card
          className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 overflow-hidden"
          style={{ borderLeftColor: topic.color }}
        >
          <CardContent className="p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${topic.color}15` }}
              >
                {topic.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-lg leading-tight">{topic.title}</h3>
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 font-normal"
                    style={{ borderColor: `${topic.color}60`, color: topic.color }}
                  >
                    {topic.categoryName}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-xs text-muted-foreground">{topic.titleEn}</span>
                  <span className="text-xs text-muted-foreground/50">·</span>
                  <span className="text-xs text-muted-foreground font-medium">{topic.verses.length}개 핵심구절</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <Badge variant="outline" className="text-xs font-semibold">{topic.passages.length}개 추천본문</Badge>
                  <Badge variant="secondary" className="text-xs">#{topic.keywords[0]}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                  {topic.summary}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
              style={{ backgroundColor: `${topic.color}15` }}
            >
              {topic.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <DialogTitle className="text-2xl">{topic.title}</DialogTitle>
                <Badge
                  variant="outline"
                  className="text-[10px] px-1.5 py-0"
                  style={{ borderColor: topic.color, color: topic.color }}
                >
                  {topic.categoryName}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{topic.titleEn} · 핵심 구절 {topic.verses.length}편</p>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-5">
          {/* 주제 개요 */}
          <div>
            <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full" style={{ backgroundColor: topic.color }} />
              주제 개요 및 메시지
            </h4>
            <p className="text-sm leading-relaxed text-foreground/90">{topic.summary}</p>
          </div>

          <Separator />

          {/* 핵심 구절 리스트 */}
          <div>
            <h4 className="font-semibold text-base mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full" style={{ backgroundColor: topic.color }} />
                핵심 성경 구절 ({topic.verses.length}개)
              </span>
              <span className="text-xs text-muted-foreground font-normal">버튼을 눌러 구절을 복사할 수 있습니다</span>
            </h4>
            <div className="space-y-3">
              {topic.verses.map((verse, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border bg-card/60 transition-all hover:bg-card relative group"
                  style={{ borderLeftColor: topic.color, borderLeftWidth: '4px' }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-semibold text-xs text-primary font-mono tracking-tight flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: topic.color }} />
                      {verse.reference}
                    </span>
                    <button
                      onClick={(e) => handleCopyVerse(verse, idx, e)}
                      className="opacity-70 hover:opacity-100 transition-opacity text-[11px] px-2 py-0.5 rounded border bg-muted/60 hover:bg-muted"
                      title="구절 복사"
                    >
                      {copiedIndex === idx ? '✓ 복사됨' : '구절 복사'}
                    </button>
                  </div>
                  <blockquote
                    className="text-sm italic leading-relaxed text-foreground/90 pl-2.5 border-l-2 my-1"
                    style={{ borderColor: `${topic.color}40` }}
                  >
                    &ldquo;{verse.text}&rdquo;
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* 추천 성경 통독 본문 */}
          {topic.passages.length > 0 && (
            <div>
              <h4 className="font-semibold text-base mb-3 flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full" style={{ backgroundColor: topic.color }} />
                함께 묵상하기 좋은 추천 성경 본문
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topic.passages.map((p, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg border bg-muted/20">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-foreground">{p.title}</span>
                      <Badge variant="secondary" className="text-xs font-mono">{p.reference}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 키워드 태그 */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="text-xs text-muted-foreground mr-1">관련 키워드:</span>
            {topic.keywords.map((kw) => (
              <Badge key={kw} variant="secondary" className="text-[11px] px-2 py-0">
                #{kw}
              </Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CategorySection({ category }: { category: TopicCategory & { topics: BibleTopic[] } }) {
  return (
    <section id={category.id} className="mb-12 scroll-mt-20">
      <CategoryHero category={category} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {category.topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </section>
  );
}

export default function TopicsPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isMounted, setIsMounted] = useState(false);
  const [randomVerse, setRandomVerse] = useState<{ verse: TopicVerse; topic: BibleTopic } | null>(null);

  // Pick a random verse
  const pickRandomVerse = useCallback(() => {
    const allVerses: { verse: TopicVerse; topic: BibleTopic }[] = [];
    bibleTopics.forEach((t) => {
      t.verses.forEach((v) => {
        allVerses.push({ verse: v, topic: t });
      });
    });
    const randomIndex = Math.floor(Math.random() * allVerses.length);
    setRandomVerse(allVerses[randomIndex] || null);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    pickRandomVerse();
  }, [pickRandomVerse]);

  // Group topics by Category matching CategorySection structure
  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase();

    let targetCats = topicCategories;
    if (activeTab !== 'all') {
      targetCats = topicCategories.filter((c) => c.id === activeTab);
    }

    return targetCats
      .map((cat) => {
        let topics = bibleTopics.filter((t) => t.category === cat.id);

        if (q) {
          topics = topics.filter((t) => {
            const titleMatch = t.title.toLowerCase().includes(q) || t.titleEn.toLowerCase().includes(q);
            const summaryMatch = t.summary.toLowerCase().includes(q);
            const keywordMatch = t.keywords.some((k) => k.toLowerCase().includes(q));
            const verseMatch = t.verses.some((v) => v.text.toLowerCase().includes(q) || v.reference.toLowerCase().includes(q));
            return titleMatch || summaryMatch || keywordMatch || verseMatch;
          });
        }

        return {
          ...cat,
          topics,
        };
      })
      .filter((c) => c.topics.length > 0);
  }, [search, activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
            <span className="text-2xl">📖</span>
            <h1 className="text-lg font-bold hidden sm:block">성경 요약 가이드</h1>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <span className="text-sm font-semibold">📌 주제별 가이드</span>
          <div className="flex-1 max-w-xs">
            <Input
              placeholder="주제, 고민, 구절 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 text-xs"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Link href="/"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="메인 페이지"><span>🏠</span><span className="hidden md:inline">홈</span></Button></Link>
            <Link href="/reading"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="성경 읽기표"><span>📅</span><span className="hidden md:inline">읽기표</span></Button></Link>
            <Link href="/characters"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="인물 관계도"><span>👥</span><span className="hidden md:inline">인물도</span></Button></Link>
            <Link href="/map"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="성경 지도"><span>🗺️</span><span className="hidden md:inline">지도</span></Button></Link>
            <Link href="/prophecy"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="예언-성취 비교"><span>🔗</span><span className="hidden md:inline">예언-성취</span></Button></Link>
            <Link href="/harmony"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="사복음서 조화"><span>📚</span><span className="hidden md:inline">사화조화</span></Button></Link>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-6 w-full">
        {/* Banner */}
        <div className="rounded-xl overflow-hidden mb-8 shadow-md" style={{ minHeight: '100px' }}>
          <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-purple-950 p-6 md:p-8 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="text-xs bg-white/20 text-white border-white/30 backdrop-blur-sm">상황별·주제별 성경 말씀</Badge>
              <Badge variant="outline" className="text-xs text-white border-white/40">{bibleTopics.length}대 핵심 주제</Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">주제별 성경 말씀 가이드</h2>
            <p className="text-white/75 text-sm mt-1 font-medium">Topical Bible Verses & Spiritual Guidance</p>
            <p className="text-white/90 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              구원, 믿음, 위로와 평안, 고난의 극복, 기도와 감사, 가정과 청지기의 삶까지 인생의 다양한 상황과 신앙적 질문에 답하는 핵심 성경 구절을 찾아보세요.
            </p>
          </div>
        </div>

        {/* 오늘의 추천 묵상 말씀 카드 (SSR Hydration 안전 처리) */}
        {isMounted && randomVerse && (
          <div className="mb-8 p-5 md:p-6 rounded-xl border bg-card/80 backdrop-blur-sm shadow-sm relative overflow-hidden">
            <div
              className="absolute -right-8 -bottom-8 text-9xl opacity-5 pointer-events-none select-none"
            >
              {randomVerse.topic.icon}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">✨</span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">오늘의 묵상 말씀</span>
                <Badge variant="secondary" className="text-xs">
                  {randomVerse.topic.icon} {randomVerse.topic.title}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={pickRandomVerse}
                className="h-7 text-xs gap-1.5"
                title="다른 말씀 뽑기"
              >
                <span>🎲</span>
                <span>다른 말씀 뽑기</span>
              </Button>
            </div>
            <blockquote className="text-base md:text-lg font-medium leading-relaxed text-foreground/90 pl-3 border-l-3 border-primary italic">
              &ldquo;{randomVerse.verse.text}&rdquo;
            </blockquote>
            <p className="text-xs font-mono font-semibold text-muted-foreground mt-2 pl-3">
              — {randomVerse.verse.reference}
            </p>
          </div>
        )}

        {/* 필터 & 탭 */}
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-2xl">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">전체 ({bibleTopics.length})</TabsTrigger>
              <TabsTrigger value="faith">✝️ 믿음</TabsTrigger>
              <TabsTrigger value="comfort">🕊️ 위로</TabsTrigger>
              <TabsTrigger value="growth">🌱 성장</TabsTrigger>
              <TabsTrigger value="life">💖 삶과실천</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="text-xs text-muted-foreground">
            각 카드를 클릭하여 <strong>전체 말씀 및 추천 본문</strong>을 볼 수 있습니다.
          </div>
        </div>

        {/* Category Sections matching main page structure */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-lg text-muted-foreground">검색 결과가 없습니다</p>
            <p className="text-sm text-muted-foreground mt-1">다른 키워드(예: 사랑, 기도, 고난, 두려움 등)로 검색해보세요</p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t bg-muted/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 text-center text-sm text-muted-foreground">
          <p>성경 요약 가이드 — 상황별·주제별 성경 말씀 가이드</p>
          <p className="text-xs text-muted-foreground/80 mt-1">각 카드를 클릭하면 주제별 모든 핵심 구절과 추천 통독 본문을 확인할 수 있습니다.</p>
        </div>
      </footer>
    </div>
  );
}
