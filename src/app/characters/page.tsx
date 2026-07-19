'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { bibleCharacters, characterRelations, relationColors, type BibleCharacter, type CharacterRelation } from '@/lib/character-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// ─── 줌/팬 상수 ───
const ZOOM_MIN = 0.3;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.2;
const PAN_STEP = 80;

// 노드 위치를 수동으로 배치 (그리드 레이아웃)
function getCharPositions(chars: BibleCharacter[]): Record<string, { x: number; y: number }> {
  const positions: Record<string, { x: number; y: number }> = {};
  const oldChars = chars.filter(c => c.testament === 'old');
  const newChars = chars.filter(c => c.testament === 'new');

  const cols = 6;
  oldChars.forEach((c, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    positions[c.id] = { x: 80 + col * 170, y: 80 + row * 150 };
  });

  const newStartY = 80 + Math.ceil(oldChars.length / cols) * 150 + 120;
  newChars.forEach((c, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    positions[c.id] = { x: 80 + col * 170, y: newStartY + row * 150 };
  });

  return positions;
}

function CharacterNode({
  character,
  position,
  isSelected,
  relatedIds,
  onClick,
}: {
  character: BibleCharacter;
  position: { x: number; y: number };
  isSelected: boolean;
  relatedIds: Set<string>;
  onClick: () => void;
}) {
  const isRelated = relatedIds.has(character.id);
  const dimmed = !isSelected && !isRelated && relatedIds.size > 0;

  return (
    <g
      onClick={onClick}
      className="cursor-pointer"
      style={{ opacity: dimmed ? 0.25 : 1, transition: 'opacity 0.3s' }}
    >
      <circle
        cx={position.x}
        cy={position.y}
        r={isSelected ? 38 : 32}
        fill={isSelected ? character.color : `${character.color}30`}
        stroke={character.color}
        strokeWidth={isSelected ? 3 : 1.5}
        style={{ transition: 'all 0.3s' }}
      />
      <text
        x={position.x}
        y={position.y - 4}
        textAnchor="middle"
        dominantBaseline="middle"
        className="font-bold pointer-events-none"
        style={{ fontSize: isSelected ? '12px' : '10px', fill: 'var(--foreground)' }}
      >
        {character.name.length > 4 ? character.name.slice(0, 4) : character.name}
      </text>
      <text
        x={position.x}
        y={position.y + 12}
        textAnchor="middle"
        dominantBaseline="middle"
        className="pointer-events-none"
        style={{ fontSize: '8px', fill: 'var(--muted-foreground)' }}
      >
        {character.nameEn.split(' ')[0]}
      </text>
    </g>
  );
}

function RelationEdge({
  relation,
  fromPos,
  toPos,
  highlighted,
}: {
  relation: CharacterRelation;
  fromPos: { x: number; y: number };
  toPos: { x: number; y: number };
  highlighted: boolean;
}) {
  const color = relationColors[relation.type] || '#666';
  const midX = (fromPos.x + toPos.x) / 2;
  const midY = (fromPos.y + toPos.y) / 2;

  return (
    <g style={{ opacity: highlighted ? 1 : 0.15, transition: 'opacity 0.3s' }}>
      <line
        x1={fromPos.x}
        y1={fromPos.y}
        x2={toPos.x}
        y2={toPos.y}
        stroke={color}
        strokeWidth={highlighted ? 2.5 : 1}
        strokeDasharray={relation.type === '조상-후손' ? '6 3' : relation.type === '선택-부름' ? '3 3' : 'none'}
      />
      {highlighted && (
        <g>
          <rect
            x={midX - 28}
            y={midY - 9}
            width={56}
            height={18}
            rx={9}
            fill={color}
            opacity={0.9}
          />
          <text
            x={midX}
            y={midY + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: '8px', fill: 'white', fontWeight: 'bold' }}
          >
            {relation.label}
          </text>
        </g>
      )}
    </g>
  );
}

// ─── 줌 컨트롤 플로팅 버튼 ───
function ZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
  onFit,
}: {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFit: () => void;
}) {
  const zoomPercent = Math.round(zoom * 100);

  return (
    <div className="absolute bottom-4 left-4 z-40 flex flex-col gap-1.5">
      <button
        onClick={onZoomIn}
        disabled={zoom >= ZOOM_MAX}
        className="w-10 h-10 rounded-lg bg-background/90 hover:bg-muted border border-border shadow-md flex items-center justify-center text-lg font-bold transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="확대"
        title="확대 (+)"
      >
        +
      </button>
      <button
        onClick={onZoomOut}
        disabled={zoom <= ZOOM_MIN}
        className="w-10 h-10 rounded-lg bg-background/90 hover:bg-muted border border-border shadow-md flex items-center justify-center text-lg font-bold transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="축소"
        title="축소 (-)"
      >
        −
      </button>
      <div className="text-center text-[10px] font-mono text-muted-foreground py-0.5 select-none">
        {zoomPercent}%
      </div>
      <button
        onClick={onReset}
        className="w-10 h-10 rounded-lg bg-background/90 hover:bg-muted border border-border shadow-md flex items-center justify-center transition-all duration-150"
        aria-label="원본 크기"
        title="100% (0)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>
      <button
        onClick={onFit}
        className="w-10 h-10 rounded-lg bg-background/90 hover:bg-muted border border-border shadow-md flex items-center justify-center transition-all duration-150"
        aria-label="화면에 맞추기"
        title="화면 맞춤 (F)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="m21 3-7 7" /><path d="m3 21 7-7" />
        </svg>
      </button>
    </div>
  );
}

export default function CharactersPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailChar, setDetailChar] = useState<BibleCharacter | null>(null);
  const [filter, setFilter] = useState<'all' | 'old' | 'new'>('all');
  const [filterRelType, setFilterRelType] = useState<string>('all');

  // ─── 줌 & 팬 상태 ───
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const filteredChars = useMemo(() => {
    if (filter === 'all') return bibleCharacters;
    return bibleCharacters.filter(c => c.testament === filter);
  }, [filter]);

  const positions = useMemo(() => getCharPositions(filteredChars), [filteredChars]);

  const filteredRelations = useMemo(() => {
    let rels = characterRelations;
    if (filterRelType !== 'all') {
      rels = rels.filter(r => r.type === filterRelType);
    }
    const charIds = new Set(filteredChars.map(c => c.id));
    return rels.filter(r => charIds.has(r.from) && charIds.has(r.to));
  }, [filterRelType, filteredChars]);

  const relatedIds = useMemo(() => {
    if (!selectedId) return new Set<string>();
    const ids = new Set<string>();
    ids.add(selectedId);
    filteredRelations.forEach(r => {
      if (r.from === selectedId) ids.add(r.to);
      if (r.to === selectedId) ids.add(r.from);
    });
    return ids;
  }, [selectedId, filteredRelations]);

  const svgWidth = 1120;
  const svgHeight = useMemo(() => {
    const maxY = Math.max(...Object.values(positions).map(p => p.y));
    return maxY + 100;
  }, [positions]);

  const relationTypes = [...new Set(characterRelations.map(r => r.type))];

  // ─── 줌 핸들러 ───
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + ZOOM_STEP, ZOOM_MAX));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - ZOOM_STEP, ZOOM_MIN));
  }, []);

  const handleReset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleFit = useCallback(() => {
    if (!svgContainerRef.current) return;
    const container = svgContainerRef.current;
    const containerWidth = container.clientWidth - 16; // padding
    const fitZoom = Math.min(containerWidth / svgWidth, 1);
    setZoom(fitZoom);
    setPan({ x: 0, y: 0 });
  }, [svgWidth]);

  // ─── 마우스 휠 줌 ───
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP / 2 : ZOOM_STEP / 2;
    setZoom(prev => {
      const next = Math.min(Math.max(prev + delta, ZOOM_MIN), ZOOM_MAX);
      return Math.round(next * 100) / 100; // 부동소수점 정리
    });
  }, []);

  // ─── 팬(드래그) 핸들러 ───
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // 우클릭이나 특수키는 무시
    if (e.button !== 0) return;
    // 인물 노드 클릭 시 패닝하지 않음
    const target = e.target as SVGElement;
    if (target.closest('.cursor-pointer')) return;

    setIsPanning(true);
    setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y,
    });
  }, [isPanning, panStart]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // ─── 키보드 단축키 ───
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key) {
        case '+': case '=': handleZoomIn(); break;
        case '-': handleZoomOut(); break;
        case '0': handleReset(); break;
        case 'f': case 'F': handleFit(); break;
        case 'ArrowUp': setPan(p => ({ ...p, y: p.y + PAN_STEP })); break;
        case 'ArrowDown': setPan(p => ({ ...p, y: p.y - PAN_STEP })); break;
        case 'ArrowLeft': setPan(p => ({ ...p, x: p.x + PAN_STEP })); break;
        case 'ArrowRight': setPan(p => ({ ...p, x: p.x - PAN_STEP })); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleZoomIn, handleZoomOut, handleReset, handleFit]);

  // 필터 변경 시 줌/팬 초기화
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [filter, filterRelType]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
            <span className="text-2xl">📖</span>
            <h1 className="text-lg font-bold hidden sm:block">성경 요약 가이드</h1>
          </a>
          <Separator orientation="vertical" className="h-6" />
          <span className="text-sm font-semibold">👥 인물 관계도</span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-6 w-full">
        {/* 설명 카드 */}
        <div className="rounded-xl overflow-hidden mb-6" style={{ minHeight: '100px' }}>
          <div className="bg-gradient-to-r from-violet-700 to-purple-900 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="text-xs bg-white/20 text-white border-white/30 backdrop-blur-sm">인물</Badge>
              <Badge variant="outline" className="text-xs text-white border-white/40">{bibleCharacters.length}인</Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">성경 인물 관계도</h2>
            <p className="text-white/70 text-sm mt-1">Bible Character Relationship Map</p>
            <p className="text-white/80 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              성경 주요 인물들의 관계를 시각적으로 확인하세요. 인물을 클릭하면 관련 관계가 강조됩니다.
              마우스 휠로 확대/축소, 드래그로 이동할 수 있습니다.
            </p>
          </div>
        </div>

        {/* 필터 */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Tabs value={filter} onValueChange={(v) => { setFilter(v as 'all' | 'old' | 'new'); setSelectedId(null); }}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="old">구약</TabsTrigger>
              <TabsTrigger value="new">신약</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs text-muted-foreground mr-1">관계:</span>
            <Button
              variant={filterRelType === 'all' ? 'default' : 'outline'}
              size="sm"
              className="text-xs h-7"
              onClick={() => setFilterRelType('all')}
            >
              전체
            </Button>
            {relationTypes.map(type => (
              <Button
                key={type}
                variant={filterRelType === type ? 'default' : 'outline'}
                size="sm"
                className="text-xs h-7"
                style={filterRelType === type ? { backgroundColor: relationColors[type] } : { borderColor: relationColors[type], color: relationColors[type] }}
                onClick={() => setFilterRelType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* 관계도 범례 */}
        <div className="flex flex-wrap gap-3 mb-4">
          {Object.entries(relationColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1.5 text-xs">
              <span className="w-3 h-0.5 rounded" style={{ backgroundColor: color }} />
              <span className="text-muted-foreground">{type}</span>
            </div>
          ))}
        </div>

        {/* SVG 관계도 — 줌 & 팬 가능 */}
        <Card className="overflow-hidden mb-8 relative">
          <CardContent className="p-0">
            <div
              ref={svgContainerRef}
              className="overflow-hidden relative"
              style={{ cursor: isPanning ? 'grabbing' : 'grab', minHeight: '400px' }}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <svg
                width={svgWidth}
                height={svgHeight}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin: '0 0',
                  transition: isPanning ? 'none' : 'transform 0.15s ease-out',
                  minWidth: svgWidth,
                }}
              >
                {/* 구약/신약 구분선 */}
                {filter === 'all' && (() => {
                  const oldChars = filteredChars.filter(c => c.testament === 'old');
                  const cols = 6;
                  const dividerY = 80 + Math.ceil(oldChars.length / cols) * 150 + 60;
                  return (
                    <g>
                      <line x1={40} y1={dividerY} x2={svgWidth - 40} y2={dividerY} stroke="var(--border)" strokeWidth={1} strokeDasharray="8 4" />
                      <rect x={svgWidth / 2 - 50} y={dividerY - 12} width={100} height={24} rx={12} fill="var(--background)" stroke="var(--border)" strokeWidth={1} />
                      <text x={svgWidth / 2} y={dividerY + 1} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '10px', fill: 'var(--muted-foreground)' }}>구약 ↑ | 신약 ↓</text>
                    </g>
                  );
                })()}

                {/* 관계 선 */}
                {filteredRelations.map((rel, i) => {
                  const fromPos = positions[rel.from];
                  const toPos = positions[rel.to];
                  if (!fromPos || !toPos) return null;
                  const highlighted = !selectedId || rel.from === selectedId || rel.to === selectedId;
                  return (
                    <RelationEdge
                      key={`${rel.from}-${rel.to}-${i}`}
                      relation={rel}
                      fromPos={fromPos}
                      toPos={toPos}
                      highlighted={highlighted}
                    />
                  );
                })}

                {/* 인물 노드 */}
                {filteredChars.map(char => (
                  <CharacterNode
                    key={char.id}
                    character={char}
                    position={positions[char.id]}
                    isSelected={selectedId === char.id}
                    relatedIds={relatedIds}
                    onClick={() => {
                      setSelectedId(prev => prev === char.id ? null : char.id);
                    }}
                  />
                ))}
              </svg>

              {/* 줌 컨트롤 플로팅 버튼 */}
              <ZoomControls
                zoom={zoom}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onReset={handleReset}
                onFit={handleFit}
              />

              {/* 줌 힌트 배지 */}
              <div className="absolute top-3 right-3 flex items-center gap-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-border/50 select-none">
                <span>🖱️ 휠: 줌</span>
                <span className="text-border">|</span>
                <span>✋ 드래그: 이동</span>
                <span className="text-border">|</span>
                <span>⌨️ +/-/0/F</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 인물 목록 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChars.map(char => (
            <Card
              key={char.id}
              className={`cursor-pointer hover:shadow-lg transition-all border-l-4 ${selectedId === char.id ? 'ring-2 ring-offset-2' : ''}`}
              style={{ borderLeftColor: char.color, ...(selectedId === char.id ? { ringColor: char.color } : {}) }}
              onClick={() => setDetailChar(char)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: char.color }}
                  >
                    {char.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm">{char.name}</h3>
                      <Badge className={`text-[10px] px-1.5 py-0 ${char.testament === 'old' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-sky-100 text-sky-800 border-sky-200'}`}>
                        {char.testament === 'old' ? '구약' : '신약'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{char.nameEn} · {char.era}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{char.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* 인물 상세 다이얼로그 */}
      <Dialog open={!!detailChar} onOpenChange={() => setDetailChar(null)}>
        <DialogContent className="max-w-lg">
          {detailChar && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                    style={{ backgroundColor: detailChar.color }}
                  >
                    {detailChar.name[0]}
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{detailChar.name}</DialogTitle>
                    <p className="text-sm text-muted-foreground">{detailChar.nameEn} · {detailChar.era}</p>
                  </div>
                </div>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">인물 소개</h4>
                  <p className="text-sm leading-relaxed text-foreground/85">{detailChar.description}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-sm mb-2">관련 성경책</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {detailChar.books.map(book => (
                      <Badge key={book} variant="outline" className="text-xs">{book}</Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold text-sm mb-2">관련 인물</h4>
                  <div className="space-y-1.5">
                    {characterRelations
                      .filter(r => r.from === detailChar.id || r.to === detailChar.id)
                      .map((r, i) => {
                        const otherId = r.from === detailChar.id ? r.to : r.from;
                        const otherChar = bibleCharacters.find(c => c.id === otherId);
                        if (!otherChar) return null;
                        return (
                          <div key={i} className="flex items-center gap-2 text-xs">
                            <span
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: relationColors[r.type] }}
                            />
                            <span className="font-medium">{otherChar.name}</span>
                            <span className="text-muted-foreground">— {r.type} ({r.label})</span>
                          </div>
                        );
                      })}
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
