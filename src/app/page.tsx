'use client';

import { useState, useMemo } from 'react';
import { bibleCategories, testamentInfo, type BibleCategory, type BibleBook } from '@/lib/bible-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl mb-8" style={{ minHeight: '340px' }}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bible-images/hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      <div className="relative z-10 flex flex-col items-start justify-center px-8 md:px-16 py-12 min-h-[340px]">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">📖</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              성경 요약 가이드
            </h1>
            <p className="text-lg md:text-xl text-white/80 mt-2">
              Bible Summary Guide
            </p>
          </div>
        </div>
        <p className="text-white/70 text-base md:text-lg max-w-2xl mt-2 leading-relaxed">
          구약 39권, 신약 27권 — 성경 66권의 핵심 메시지를 한눈에 이해하세요.
          <br />
          각 서별 요약, 핵심 구절, 주제와 함께 이미지로 쉽게 배워보세요.
        </p>
        <div className="flex gap-3 mt-6">
          <Badge variant="secondary" className="text-sm py-1.5 px-4 bg-amber-600/90 text-white hover:bg-amber-600">
            구약 39권
          </Badge>
          <Badge variant="secondary" className="text-sm py-1.5 px-4 bg-sky-600/90 text-white hover:bg-sky-600">
            신약 27권
          </Badge>
          <Badge variant="secondary" className="text-sm py-1.5 px-4 bg-emerald-600/90 text-white hover:bg-emerald-600">
            총 66권
          </Badge>
        </div>
      </div>
    </div>
  );
}

function CategoryHero({ category }: { category: BibleCategory }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl mb-6" style={{ minHeight: '200px' }}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${category.image}')` }}
      />
      <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-75`} />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex flex-col justify-end px-6 md:px-8 py-6 min-h-[200px]">
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
                  <span className="text-xs text-muted-foreground">{book.nameEn}</span>
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
              <DialogTitle className="text-2xl">{book.name}</DialogTitle>
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
          <div className="flex items-center gap-3">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CategorySection({ category }: { category: BibleCategory }) {
  return (
    <section id={category.id} className="mb-12 scroll-mt-20">
      <CategoryHero category={category} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.books.map((book) => (
          <BookCard key={book.nameEn} book={book} categoryColor={category.color} />
        ))}
      </div>
    </section>
  );
}

function TestamentOverview({ testament }: { testament: 'old' | 'new' }) {
  const info = testamentInfo[testament];
  const cats = bibleCategories.filter((c) => c.testament === testament);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">{info.name}</h2>
        <p className="text-muted-foreground text-sm mt-1">{info.nameEn} · {info.bookCount}권</p>
        <p className="text-muted-foreground text-base mt-2 max-w-lg mx-auto">{info.description}</p>
      </div>
      {cats.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}
    </div>
  );
}

export default function Home() {
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

  const totalBooks = filteredCategories.reduce((sum, c) => sum + c.books.length, 0);

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
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl">📖</span>
            <h1 className="text-lg font-bold hidden sm:block">성경 요약 가이드</h1>
          </div>
          <div className="flex-1 max-w-md">
            <Input
              placeholder="책 이름, 주제 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          {search && (
            <Badge variant="secondary" className="text-xs">
              {totalBooks}권 검색됨
            </Badge>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-6 w-full">
        <HeroSection />

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
              <TabsTrigger value="all">전체 (66)</TabsTrigger>
              <TabsTrigger value="old">구약 (39)</TabsTrigger>
              <TabsTrigger value="new">신약 (27)</TabsTrigger>
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
          <p>성경 요약 가이드 — 구약 39권 · 신약 27권 · 총 66권</p>
          <p className="mt-1 text-xs">각 서별 핵심 메시지를 한눈에 이해할 수 있도록 정리했습니다.</p>
        </div>
      </footer>
    </div>
  );
}
