'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { bibleCategories, type BibleCategory, type BibleBook } from '@/lib/bible-data';
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

function ReadingBookCard({ book, categoryColor }: { book: BibleBook; categoryColor: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card
          className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 overflow-hidden"
          style={{ borderLeftColor: categoryColor }}
        >
          <CardContent className="p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${categoryColor}15` }}
              >
                {book.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-lg leading-tight">{book.name}</h3>
                  <Badge className={`text-[10px] px-1.5 py-0 ${book.testament === 'old' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-sky-100 text-sky-800 border-sky-200'}`}>
                    {book.testament === 'old' ? '구약' : '신약'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-xs text-muted-foreground">{book.nameEn}</span>
                  <span className="text-xs text-muted-foreground/50">·</span>
                  <span className="text-xs text-muted-foreground font-medium">{book.writtenDate}</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant="outline" className="text-xs font-semibold">{book.chapters}장</Badge>
                  <Badge variant="secondary" className="text-xs">{book.keyTheme}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                  {book.summary}
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
              style={{ backgroundColor: `${categoryColor}15` }}
            >
              {book.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <DialogTitle className="text-2xl">{book.name}</DialogTitle>
                <Badge className={`text-[10px] px-1.5 py-0 ${book.testament === 'old' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-sky-100 text-sky-800 border-sky-200'}`}>
                  {book.testament === 'old' ? '구약' : '신약'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{book.nameEn} · 총 {book.chapters}장</p>
            </div>
          </div>
        </DialogHeader>
        <div className="mt-4 space-y-5">
          <div>
            <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full" style={{ backgroundColor: categoryColor }} />
              장별 구성 ({book.chapters}장)
            </h4>
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-2 border rounded-md">
              {Array.from({ length: book.chapters }, (_, i) => i + 1).map((ch) => (
                <span
                  key={ch}
                  className="px-2 py-1 text-xs border rounded bg-muted/40 font-mono"
                >
                  {book.name} {ch}장
                </span>
              ))}
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
              className="border-l-4 pl-4 py-2 text-sm italic leading-relaxed text-foreground/85"
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

  const filteredCategories = useMemo(() => {
    let cats = bibleCategories;

    if (activeTab === 'old') {
      cats = cats.filter((c) => c.testament === 'old');
    } else if (activeTab === 'new') {
      cats = cats.filter((c) => c.testament === 'new');
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
  }, [search, activeTab]);

  const totalChapters = useMemo(() => {
    return filteredCategories.reduce(
      (sum, c) => sum + c.books.reduce((bSum, b) => bSum + b.chapters, 0),
      0
    );
  }, [filteredCategories]);

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
        <div className="rounded-xl overflow-hidden mb-6" style={{ minHeight: '100px' }}>
          <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="text-xs bg-white/20 text-white border-white/30 backdrop-blur-sm">통독 가이드</Badge>
              <Badge variant="outline" className="text-xs text-white border-white/40">총 1,189장</Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">성경 읽기표 가이드</h2>
            <p className="text-white/70 text-sm mt-1">Bible Reading Chart & Plan Guide</p>
            <p className="text-white/80 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              구약 929장, 신약 260장 — 총 1,189장의 성경 66권 분량 및 권별 장 구성을 한눈에 확인하며 체계적으로 통독을 계획하세요.
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">전체 (66권 / 1,189장)</TabsTrigger>
              <TabsTrigger value="old">구약 (39권 / 929장)</TabsTrigger>
              <TabsTrigger value="new">신약 (27권 / 260장)</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="text-sm text-muted-foreground font-medium">
            현재 선택된 분량: <span className="text-foreground font-bold">{totalChapters}장</span>
          </div>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-lg text-muted-foreground">검색 결과가 없습니다</p>
            <p className="text-sm text-muted-foreground mt-1">다른 검색어로 시도해보세요</p>
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
                    <ReadingBookCard key={book.nameEn} book={book} categoryColor={category.color} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t bg-muted/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 text-center text-sm text-muted-foreground">
          <p>성경 요약 가이드 — 성경 읽기표 (구약 39권 929장 · 신약 27권 260장)</p>
        </div>
      </footer>
    </div>
  );
}
