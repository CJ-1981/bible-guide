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

function BookCard({ book, categoryColor }: { book: BibleBook; categoryColor: string }) {
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
                  <Badge variant="outline" className="text-xs">{book.chapters}장</Badge>
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
              <p className="text-sm text-muted-foreground">{book.nameEn} · {book.chapters}장</p>
            </div>
          </div>
        </DialogHeader>
        <div className="mt-4 space-y-5">
          <div>
            <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full" style={{ backgroundColor: categoryColor }} />
              책 개요
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
          <Separator />
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <h4 className="font-semibold text-base flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full" style={{ backgroundColor: categoryColor }} />
                핵심 주제
              </h4>
            </div>
            <Badge className="text-sm" style={{ backgroundColor: categoryColor, color: 'white' }}>
              {book.keyTheme}
            </Badge>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <h4 className="font-semibold text-base flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full" style={{ backgroundColor: categoryColor }} />
                기록 연대
              </h4>
            </div>
            <Badge variant="outline" className="text-sm font-mono">
              {book.writtenDate}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CategorySection({ category }: { category: BibleCategory }) {
  return (
    <section id={category.id} className="mb-12 scroll-mt-20">
      <div className="relative w-full overflow-hidden rounded-xl mb-6" style={{ minHeight: '180px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH || ''}${category.image}')` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-75`} />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex flex-col justify-end px-6 md:px-8 py-6 min-h-[180px]">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="text-xs bg-white/20 text-white border-white/30 backdrop-blur-sm">
              {category.testament === 'old' ? '구약' : '신약'}
            </Badge>
            <Badge variant="outline" className="text-xs text-white border-white/40">
              {category.books.length}권
            </Badge>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">{category.name}</h2>
          <p className="text-white/70 text-sm mt-1">{category.nameEn}</p>
          <p className="text-white/80 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.books.map((book) => (
          <BookCard key={book.nameEn} book={book} categoryColor={category.color} />
        ))}
      </div>
    </section>
  );
}

export default function TopicsPage() {
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
              b.keyVerse.includes(q) ||
              b.writtenDate.toLowerCase().includes(q) ||
              cat.name.includes(q) ||
              cat.nameEn.toLowerCase().includes(q)
          ),
        }))
        .filter((c) => c.books.length > 0);
    }

    return cats;
  }, [search, activeTab]);

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
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
          <span className="text-sm font-semibold">📌 주제별 가이드</span>
          <div className="flex-1 max-w-xs">
            <Input
              placeholder="주제, 서명, 연도 검색..."
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
        {/* 헤더 가이드 Card */}
        <div className="rounded-xl overflow-hidden mb-6" style={{ minHeight: '100px' }}>
          <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="text-xs bg-white/20 text-white border-white/30 backdrop-blur-sm">주제별 분류</Badge>
              <Badge variant="outline" className="text-xs text-white border-white/40">10개 주요 주제</Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">성경 주제별 가이드</h2>
            <p className="text-white/70 text-sm mt-1">Bible Topics & Categorized Guides</p>
            <p className="text-white/80 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              모세오경, 역사서, 시가서, 대선지서, 소선지서, 복음서, 사도행전, 바울 서신, 공동 서신, 예언서까지 10가지 성경 주제 카테고리를 한눈에 살펴보세요.
            </p>
          </div>
        </div>

        {/* 필터 & 탭 */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {bibleCategories.map((cat) => (
              <Button
                key={cat.id}
                variant="outline"
                size="sm"
                className="text-xs"
                style={{ borderColor: cat.color, color: cat.color }}
                onClick={() => scrollToCategory(cat.id)}
              >
                <span className="mr-1">{cat.books[0]?.icon}</span>
                {cat.name} ({cat.books.length})
              </Button>
            ))}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all">전체 (10개 주제 / 66권)</TabsTrigger>
              <TabsTrigger value="old">구약 (5개 주제)</TabsTrigger>
              <TabsTrigger value="new">신약 (5개 주제)</TabsTrigger>
            </TabsList>
          </Tabs>
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
              <CategorySection key={category.id} category={category} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t bg-muted/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 text-center text-sm text-muted-foreground">
          <p>성경 요약 가이드 — 주제별 분류 (구약 5개 주제 · 신약 5개 주제)</p>
        </div>
      </footer>
    </div>
  );
}
