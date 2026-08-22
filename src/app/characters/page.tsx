'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { bibleCharacters, characterRelations, relationColors, type BibleCharacter, type CharacterRelation } from '@/lib/character-data';
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
  edgeIndex = 0,
}: {
  relation: CharacterRelation;
  fromPos: { x: number; y: number };
  toPos: { x: number; y: number };
  highlighted: boolean;
  edgeIndex?: number;
}) {
  const color = relationColors[relation.type] || '#666';
  const NODE_RADIUS = 34; // 원 외곽선에 맞추기 위한 반경 (기본 32 + 여유 2)

  // 두 중심점 사이의 방향 벡터로 원 외곽 교차점 계산
  const dx = toPos.x - fromPos.x;
  const dy = toPos.y - fromPos.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const safeDist = Math.max(dist, 1); // 0으로 나누기 방지
  const ux = dx / safeDist;
  const uy = dy / safeDist;

  // fromPos 원의 외곽선에서 시작
  const x1 = fromPos.x + NODE_RADIUS * ux;
  const y1 = fromPos.y + NODE_RADIUS * uy;
  // toPos 원의 외곽선에서 끝
  const x2 = toPos.x - NODE_RADIUS * ux;
  const y2 = toPos.y - NODE_RADIUS * uy;

  // 라벨 위치: 중간점 + 수직 방향 오프셋 (겹침 방지)
  // 선에 수직인 방향: (-uy, ux)
  // edgeIndex를 이용해 번갈아가며 위/아래로 벌림
  const LABEL_OFFSET_BASE = 14; // 기본 오프셋 간격
  const offsetSign = edgeIndex % 2 === 0 ? 1 : -1; // 홀짝 번갈아 위/아래
  const offsetDist = LABEL_OFFSET_BASE * (Math.floor(edgeIndex / 2) + 1); // 1, 1, 2, 2, 3, 3 ...
  const perpX = -uy * offsetSign * offsetDist;
  const perpY = ux * offsetSign * offsetDist;

  const midX = (x1 + x2) / 2 + perpX;
  const midY = (y1 + y2) / 2 + perpY;

  // 라벨 너비를 텍스트 길이에 맞게 계산
  const labelLen = relation.label.length;
  const labelWidth = Math.max(40, labelLen * 8 + 12);

  return (
    <g style={{ opacity: highlighted ? 1 : 0.15, transition: 'opacity 0.3s' }}>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={highlighted ? 2.5 : 1}
        strokeDasharray={relation.type === '조상-후손' ? '6 3' : relation.type === '선택-부름' ? '3 3' : 'none'}
      />
      {highlighted && (
        <g>
          {/* 라벨 연결선 (중간점에서 오프셋된 라벨 위치로) */}
          {offsetDist > 0 && (
            <line
              x1={(x1 + x2) / 2}
              y1={(y1 + y2) / 2}
              x2={midX}
              y2={midY}
              stroke={color}
              strokeWidth={1}
              opacity={0.5}
            />
          )}
          <rect
            x={midX - labelWidth / 2}
            y={midY - 10}
            width={labelWidth}
            height={20}
            rx={10}
            fill={color}
            opacity={0.92}
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

export default function CharactersPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailChar, setDetailChar] = useState<BibleCharacter | null>(null);
  const [filter, setFilter] = useState<'all' | 'old' | 'new'>('all');
  const [filterRelType, setFilterRelType] = useState<string>('all');

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
            <span className="text-2xl">📖</span>
            <h1 className="text-lg font-bold hidden sm:block">성경 요약 가이드</h1>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <span className="text-sm font-semibold">👥 인물 관계도</span>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5">
            <Link href="/"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="메인 페이지"><span>🏠</span><span className="hidden md:inline">홈</span></Button></Link>
            <Link href="/reading"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="성경 읽기표 (통독일정)"><span>📅</span><span className="hidden md:inline">통독일정</span></Button></Link>
            <Link href="/topics"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="주제별 가이드"><span>📌</span><span className="hidden md:inline">주제별</span></Button></Link>
            <Link href="/map"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="성경 지도"><span>🗺️</span><span className="hidden md:inline">지도</span></Button></Link>
            <Link href="/prophecy"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="예언-성취 비교"><span>🔗</span><span className="hidden md:inline">예언-성취</span></Button></Link>
            <Link href="/harmony"><Button variant="ghost" size="sm" className="text-xs gap-1 h-8" title="사복음서 조화"><span>📚</span><span className="hidden md:inline">사화조화</span></Button></Link>
            <DarkModeToggle />
          </div>
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

        {/* SVG 관계도 with Zoom/Pan */}
        <div className="mb-8">
          <ZoomPanContainer contentWidth={svgWidth} contentHeight={svgHeight}>
            <svg
              width={svgWidth}
              height={svgHeight}
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              style={{ minWidth: svgWidth, display: 'block' }}
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
              {(() => {
                // 같은 출발 노드(from) 기준으로 그룹화하여 로컬 인덱스 부여
                const fromGroupIndex: Record<string, number> = {};
                return filteredRelations.map((rel, i) => {
                  const fromPos = positions[rel.from];
                  const toPos = positions[rel.to];
                  if (!fromPos || !toPos) return null;
                  const highlighted = !selectedId || rel.from === selectedId || rel.to === selectedId;
                  const key = `${rel.from}-${rel.to}-${i}`;
                  const localIdx = fromGroupIndex[rel.from] ?? 0;
                  fromGroupIndex[rel.from] = localIdx + 1;
                  return (
                    <RelationEdge
                      key={key}
                      relation={rel}
                      fromPos={fromPos}
                      toPos={toPos}
                      highlighted={highlighted}
                      edgeIndex={localIdx}
                    />
                  );
                });
              })()}

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
          </ZoomPanContainer>
        </div>

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
