'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { bibleCategories, type BibleCategory, type BibleBook } from '@/lib/bible-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/components/theme-provider';

const STORAGE_KEY = 'bible_reading_tracker_v1';

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

interface ChapterTrackerProps {
  book: BibleBook;
  categoryColor: string;
  readChapters: Record<string, boolean>;
  onToggleChapter: (bookNameEn: string, chapter: number) => void;
  onBatchToggle: (bookNameEn: string, chapters: number[], targetState: boolean) => void;
}

function ReadingBookCard({
  book,
  categoryColor,
  readChapters,
  onToggleChapter,
  onBatchToggle,
}: ChapterTrackerProps) {
  const [open, setOpen] = useState(false);

  // Compute read count for this book
  const readCount = useMemo(() => {
    let count = 0;
    for (let ch = 1; ch <= book.chapters; ch++) {
      if (readChapters[`${book.nameEn}_${ch}`]) {
        count++;
      }
    }
    return count;
  }, [book.nameEn, book.chapters, readChapters]);

  const percent = Math.round((readCount / book.chapters) * 100);
  const isCompleted = readCount === book.chapters && book.chapters > 0;

  const handleToggleAll = (targetState: boolean) => {
    const allChs = Array.from({ length: book.chapters }, (_, i) => i + 1);
    onBatchToggle(book.nameEn, allChs, targetState);
  };

  const handleRangeToggle = (start: number, end: number, targetState: boolean) => {
    const rangeChs: number[] = [];
    for (let i = start; i <= Math.min(end, book.chapters); i++) {
      rangeChs.push(i);
    }
    onBatchToggle(book.nameEn, rangeChs, targetState);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card
          className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 overflow-hidden flex flex-col justify-between"
          style={{ borderLeftColor: categoryColor }}
        >
          <CardContent className="p-4 md:p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${categoryColor}15` }}
                  >
                    {book.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-lg leading-tight">{book.name}</h3>
                      <Badge className={`text-[10px] px-1.5 py-0 ${book.testament === 'old' ? 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300' : 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300'}`}>
                        {book.testament === 'old' ? '구약' : '신약'}
                      </Badge>
                      {isCompleted && (
                        <Badge className="text-[10px] px-1.5 py-0 bg-emerald-500 text-white border-emerald-600">
                          ✓ 완독
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-xs text-muted-foreground">{book.nameEn}</span>
                      <span className="text-xs text-muted-foreground/50">·</span>
                      <span className="text-xs text-muted-foreground font-medium">{book.writtenDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
                {book.summary}
              </p>
            </div>

            {/* Progress Section */}
            <div className="mt-4 pt-3 border-t">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-muted-foreground">
                  통독 진행: <strong className="text-foreground">{readCount}</strong> / {book.chapters}장
                </span>
                <span className={`font-semibold ${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
                  {percent}%
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${isCompleted ? 'bg-emerald-500' : 'bg-primary'}`}
                  style={{ width: `${percent}%` }}
                />
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
              style={{ backgroundColor: `${categoryColor}15` }}
            >
              {book.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <DialogTitle className="text-2xl">{book.name}</DialogTitle>
                <Badge className={`text-[10px] px-1.5 py-0 ${book.testament === 'old' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-sky-100 text-sky-800 border-sky-200'}`}>
                  {book.testament === 'old' ? '구약' : '신약'}
                </Badge>
                {isCompleted && (
                  <Badge className="text-xs px-2 py-0.5 bg-emerald-600 text-white border-none">
                    🏆 전 장 완독
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{book.nameEn} · 총 {book.chapters}장 · {book.keyTheme}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Progress Bar in Dialog */}
          <div className="bg-muted/40 p-4 rounded-xl border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">통독 체크리스트</span>
                <Badge variant="secondary" className="text-xs font-mono">
                  {readCount} / {book.chapters}장 ({percent}%)
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs px-2"
                  onClick={() => handleToggleAll(true)}
                >
                  ✓ 전체 완료
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs px-2 text-muted-foreground hover:text-foreground"
                  onClick={() => handleToggleAll(false)}
                >
                  초기화
                </Button>
              </div>
            </div>

            <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden mb-3">
              <div
                className={`h-full transition-all duration-300 ${isCompleted ? 'bg-emerald-500' : 'bg-primary'}`}
                style={{ width: `${percent}%` }}
              />
            </div>

            {/* Quick 10-chapter range buttons if book is long */}
            {book.chapters > 10 && (
              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-muted-foreground/15">
                <span className="text-[11px] text-muted-foreground self-center mr-1">구간 일괄:</span>
                {Array.from({ length: Math.ceil(book.chapters / 10) }, (_, idx) => {
                  const s = idx * 10 + 1;
                  const e = Math.min((idx + 1) * 10, book.chapters);
                  return (
                    <Button
                      key={s}
                      size="sm"
                      variant="outline"
                      className="h-6 text-[11px] px-1.5 py-0 font-mono"
                      onClick={() => handleRangeToggle(s, e, true)}
                      title={`${s}~${e}장 모두 완료`}
                    >
                      {s}~{e}장
                    </Button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Interactive Chapter Grid */}
          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full" style={{ backgroundColor: categoryColor }} />
                장별 체크 (각 장을 클릭하여 읽음 표시)
              </span>
              <span className="text-xs text-muted-foreground">클릭하여 토글</span>
            </h4>
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-1.5 max-h-60 overflow-y-auto p-1 border rounded-lg bg-background/50">
              {Array.from({ length: book.chapters }, (_, i) => i + 1).map((ch) => {
                const isRead = !!readChapters[`${book.nameEn}_${ch}`];
                return (
                  <button
                    key={ch}
                    onClick={() => onToggleChapter(book.nameEn, ch)}
                    className={`h-9 rounded-md text-xs font-mono font-medium transition-all duration-150 flex flex-col items-center justify-center border ${
                      isRead
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-card text-foreground hover:bg-muted/80 border-border'
                    }`}
                  >
                    <span className="text-[10px] leading-tight opacity-75">{book.name.slice(0, 1)}</span>
                    <span className="leading-tight font-bold">{ch}장</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full" style={{ backgroundColor: categoryColor }} />
              개요 및 핵심 메시지
            </h4>
            <p className="text-sm leading-relaxed text-foreground/90">{book.summary}</p>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full" style={{ backgroundColor: categoryColor }} />
              핵심 구절
            </h4>
            <blockquote
              className="border-l-4 pl-4 py-2 text-sm italic leading-relaxed text-foreground/85 rounded-r"
              style={{ borderColor: categoryColor, backgroundColor: `${categoryColor}08` }}
            >
              {book.keyVerse}
            </blockquote>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ReadingPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [readChapters, setReadChapters] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load reading progress from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setReadChapters(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  // Save changes to localStorage
  const saveProgress = useCallback((newRecord: Record<string, boolean>) => {
    setReadChapters(newRecord);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecord));
    } catch {
      // ignore
    }
  }, []);

  const handleToggleChapter = useCallback((bookNameEn: string, chapter: number) => {
    const key = `${bookNameEn}_${chapter}`;
    setReadChapters((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = true;
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const handleBatchToggle = useCallback((bookNameEn: string, chapters: number[], targetState: boolean) => {
    setReadChapters((prev) => {
      const next = { ...prev };
      chapters.forEach((ch) => {
        const key = `${bookNameEn}_${ch}`;
        if (targetState) {
          next[key] = true;
        } else {
          delete next[key];
        }
      });
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  // Calculate overall statistics
  const stats = useMemo(() => {
    let totalRead = 0;
    let oldRead = 0;
    let newRead = 0;
    let completedBooksCount = 0;

    bibleCategories.forEach((cat) => {
      cat.books.forEach((b) => {
        let bRead = 0;
        for (let ch = 1; ch <= b.chapters; ch++) {
          if (readChapters[`${b.nameEn}_${ch}`]) {
            bRead++;
            totalRead++;
            if (b.testament === 'old') oldRead++;
            else newRead++;
          }
        }
        if (bRead === b.chapters && b.chapters > 0) {
          completedBooksCount++;
        }
      });
    });

    return {
      totalRead,
      totalChapters: 1189,
      totalPercent: ((totalRead / 1189) * 100).toFixed(1),
      oldRead,
      oldChapters: 929,
      oldPercent: ((oldRead / 929) * 100).toFixed(1),
      newRead,
      newChapters: 260,
      newPercent: ((newRead / 260) * 100).toFixed(1),
      completedBooksCount,
      totalBooksCount: 66,
    };
  }, [readChapters]);

  const filteredCategories = useMemo(() => {
    let cats = bibleCategories;

    if (activeTab === 'old') {
      cats = cats.filter((c) => c.testament === 'old');
    } else if (activeTab === 'new') {
      cats = cats.filter((c) => c.testament === 'new');
    } else if (activeTab === 'reading') {
      // In progress
      cats = cats
        .map((cat) => ({
          ...cat,
          books: cat.books.filter((b) => {
            let bRead = 0;
            for (let ch = 1; ch <= b.chapters; ch++) {
              if (readChapters[`${b.nameEn}_${ch}`]) bRead++;
            }
            return bRead > 0 && bRead < b.chapters;
          }),
        }))
        .filter((c) => c.books.length > 0);
    } else if (activeTab === 'completed') {
      // Completed
      cats = cats
        .map((cat) => ({
          ...cat,
          books: cat.books.filter((b) => {
            let bRead = 0;
            for (let ch = 1; ch <= b.chapters; ch++) {
              if (readChapters[`${b.nameEn}_${ch}`]) bRead++;
            }
            return bRead === b.chapters && b.chapters > 0;
          }),
        }))
        .filter((c) => c.books.length > 0);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      cats = cats
        .map((cat) => ({
          ...cat,
          books: cat.books.filter(
            (b) =>
              b.name.includes(q) ||
              b.nameEn.toLowerCase().includes(q) ||
              b.keyTheme.includes(q) ||
              b.summary.includes(q) ||
              b.keyVerse.includes(q)
          ),
        }))
        .filter((c) => c.books.length > 0);
    }

    return cats;
  }, [search, activeTab, readChapters]);

  const handleResetAll = () => {
    if (confirm('모든 통독 체크 기록을 초기화하시겠습니까?')) {
      saveProgress({});
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
            <span className="text-2xl">📖</span>
            <h1 className="text-lg font-bold hidden sm:block">성경 요약 가이드</h1>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <span className="text-sm font-semibold">📅 성경 읽기표</span>
          <div className="flex-1 max-w-xs">
            <Input
              placeholder="서명, 주제 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 text-xs"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Link href="/"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="메인 페이지"><span>🏠</span><span className="hidden md:inline">홈</span></Button></Link>
            <Link href="/topics"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="주제별 가이드"><span>📌</span><span className="hidden md:inline">주제별</span></Button></Link>
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
        <div className="rounded-xl overflow-hidden mb-6" style={{ minHeight: '100px' }}>
          <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="text-xs bg-white/20 text-white border-white/30 backdrop-blur-sm">통독 체크리스트</Badge>
              <Badge variant="outline" className="text-xs text-white border-white/40">총 1,189장</Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">성경 읽기표 및 통독 체크</h2>
            <p className="text-white/70 text-sm mt-1">Bible Reading Tracker & Checklist Guide</p>
            <p className="text-white/80 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              성경 66권(구약 929장, 신약 260장)의 장별 읽기 현황을 직접 체크하고 나만의 통독 목표를 체계적으로 달성하세요. 진행 상황은 브라우저에 자동 저장됩니다.
            </p>
          </div>
        </div>

        {/* Dashboard Stat Cards */}
        {isLoaded && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            <Card className="p-4 bg-card/80 border-emerald-500/30 shadow-sm">
              <div className="text-xs text-muted-foreground font-medium">전체 통독 진행률</div>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {stats.totalPercent}%
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {stats.totalRead} / {stats.totalChapters}장 완료
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all" style={{ width: `${stats.totalPercent}%` }} />
              </div>
            </Card>

            <Card className="p-4 bg-card/80 border-amber-500/30 shadow-sm">
              <div className="text-xs text-muted-foreground font-medium">구약 (39권)</div>
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                {stats.oldPercent}%
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {stats.oldRead} / {stats.oldChapters}장
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-amber-500 transition-all" style={{ width: `${stats.oldPercent}%` }} />
              </div>
            </Card>

            <Card className="p-4 bg-card/80 border-sky-500/30 shadow-sm">
              <div className="text-xs text-muted-foreground font-medium">신약 (27권)</div>
              <div className="text-2xl font-bold text-sky-600 dark:text-sky-400 mt-1">
                {stats.newPercent}%
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {stats.newRead} / {stats.newChapters}장
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-sky-500 transition-all" style={{ width: `${stats.newPercent}%` }} />
              </div>
            </Card>

            <Card className="p-4 bg-card/80 border-purple-500/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs text-muted-foreground font-medium">완독한 성경 권수</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                  {stats.completedBooksCount} <span className="text-sm font-normal text-muted-foreground">/ 66권</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 pt-1 border-t">
                <span className="text-[11px] text-muted-foreground">기록 관리</span>
                <button
                  onClick={handleResetAll}
                  className="text-[11px] text-destructive hover:underline"
                >
                  기록 초기화
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-xl">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">전체 (66)</TabsTrigger>
              <TabsTrigger value="old">구약 (39)</TabsTrigger>
              <TabsTrigger value="new">신약 (27)</TabsTrigger>
              <TabsTrigger value="reading">읽는중</TabsTrigger>
              <TabsTrigger value="completed">완독</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="text-xs text-muted-foreground">
            각 카드를 클릭하여 <strong>장별 체크리스트</strong>를 열 수 있습니다.
          </div>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-lg text-muted-foreground">해당 조건의 성경 목록이 없습니다</p>
            <p className="text-sm text-muted-foreground mt-1">다른 탭을 선택하거나 검색어를 변경해보세요</p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map((category) => (
              <section key={category.id} className="mb-10">
                <div className="flex items-center gap-3 mb-4 border-b pb-2">
                  <div className="w-3 h-6 rounded-full" style={{ backgroundColor: category.color }} />
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <Badge variant="outline" className="text-xs">{category.books.length}권</Badge>
                  <span className="text-xs text-muted-foreground">{category.description}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.books.map((book) => (
                    <ReadingBookCard
                      key={book.nameEn}
                      book={book}
                      categoryColor={category.color}
                      readChapters={readChapters}
                      onToggleChapter={handleToggleChapter}
                      onBatchToggle={handleBatchToggle}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t bg-muted/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 text-center text-sm text-muted-foreground">
          <p>성경 요약 가이드 — 성경 읽기표 및 통독 체크리스트 (구약 39권 929장 · 신약 27권 260장)</p>
          <p className="text-xs text-muted-foreground/80 mt-1">체크한 통독 진행 상황은 브라우저(localStorage)에 안전하게 저장됩니다.</p>
        </div>
      </footer>
    </div>
  );
}
