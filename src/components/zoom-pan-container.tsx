'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ZoomPanContainerProps {
  children: React.ReactNode;
  /** Minimum zoom scale (default 0.3) */
  minZoom?: number;
  /** Maximum zoom scale (default 5) */
  maxZoom?: number;
  /** Initial zoom scale (default 1) */
  initialZoom?: number;
  /** Content natural width for scroll calculation */
  contentWidth?: number;
  /** Content natural height for scroll calculation */
  contentHeight?: number;
}

export default function ZoomPanContainer({
  children,
  minZoom = 0.3,
  maxZoom = 5,
  initialZoom = 1,
}: ZoomPanContainerProps) {
  const [zoom, setZoom] = useState(initialZoom);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });
  const lastTouchDistRef = useRef<number | null>(null);
  const lastTouchCenterRef = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 줌 + 팬을 함께 업데이트하는 함수 (커서/중앙 기준 줌)
  const zoomTo = useCallback((
    newZoom: number,
    pivotX: number, // 컨테이너 내에서의 기준점 X
    pivotY: number, // 컨테이너 내에서의 기준점 Y
    currentZoom: number,
    currentPan: { x: number; y: number },
  ) => {
    const clampedZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
    // 기준점 아래의 콘텐츠 좌표
    const contentX = (pivotX - currentPan.x) / currentZoom;
    const contentY = (pivotY - currentPan.y) / currentZoom;
    // 새 줌에서 같은 콘텐츠 점이 기준점에 오도록 팬 보정
    const newPanX = pivotX - contentX * clampedZoom;
    const newPanY = pivotY - contentY * clampedZoom;
    return { zoom: clampedZoom, pan: { x: newPanX, y: newPanY } };
  }, [minZoom, maxZoom]);

  // 상태를 동시 업데이트하기 위한 ref
  const stateRef = useRef({ zoom, pan });
  stateRef.current = { zoom, pan };

  const handleZoomIn = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    // 뷰포트 중앙을 기준으로 줌
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const result = zoomTo(stateRef.current.zoom + 0.2, centerX, centerY, stateRef.current.zoom, stateRef.current.pan);
    setZoom(result.zoom);
    setPan(result.pan);
  }, [zoomTo]);

  const handleZoomOut = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const result = zoomTo(stateRef.current.zoom - 0.2, centerX, centerY, stateRef.current.zoom, stateRef.current.pan);
    setZoom(result.zoom);
    setPan(result.pan);
  }, [zoomTo]);

  const handleReset = useCallback(() => {
    setZoom(initialZoom);
    setPan({ x: 0, y: 0 });
  }, [initialZoom]);

  // ─── Mouse events ─────────────────────────────────────────
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...stateRef.current.pan };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy,
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ─── Wheel zoom (cursor-centered) ────────────────────────
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    // 마우스 커서의 컨테이너 내 상대 좌표
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const result = zoomTo(
      stateRef.current.zoom + delta,
      cursorX,
      cursorY,
      stateRef.current.zoom,
      stateRef.current.pan,
    );
    setZoom(result.zoom);
    setPan(result.pan);
  }, [zoomTo]);

  // ─── Touch events (mobile) ──────────────────────────────
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      panStartRef.current = { ...stateRef.current.pan };
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      lastTouchDistRef.current = dist;
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      lastTouchCenterRef.current = { x: cx, y: cy };
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.touches.length === 1 && isDragging) {
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      setPan({
        x: panStartRef.current.x + dx,
        y: panStartRef.current.y + dy,
      });
    } else if (e.touches.length === 2 && lastTouchDistRef.current !== null) {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();

      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      const scale = dist / lastTouchDistRef.current;
      const newZoom = Math.max(minZoom, Math.min(maxZoom, stateRef.current.zoom * scale));
      lastTouchDistRef.current = dist;

      // 핀치 중심점 (컨테이너 내 상대 좌표)
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;

      const result = zoomTo(newZoom, cx, cy, stateRef.current.zoom, stateRef.current.pan);
      setZoom(result.zoom);
      setPan(result.pan);

      // 추가 드래그 팬 보정
      if (lastTouchCenterRef.current) {
        const dragCx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const dragCy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const dragDx = dragCx - lastTouchCenterRef.current.x;
        const dragDy = dragCy - lastTouchCenterRef.current.y;
        setPan(prev => ({ x: prev.x + dragDx, y: prev.y + dragDy }));
        lastTouchCenterRef.current = { x: dragCx, y: dragCy };
      }
    }
  }, [isDragging, minZoom, maxZoom, zoomTo]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    lastTouchDistRef.current = null;
    lastTouchCenterRef.current = null;
  }, []);

  // ─── Keyboard shortcuts ────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === '-') {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === '0') {
        e.preventDefault();
        handleReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleZoomIn, handleZoomOut, handleReset]);

  // ─── Prevent default touch behavior on the container ───
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const preventTouchDefault = (e: TouchEvent) => {
      e.preventDefault();
    };
    el.addEventListener('touchmove', preventTouchDefault, { passive: false });
    return () => el.removeEventListener('touchmove', preventTouchDefault);
  }, []);

  const zoomPercent = Math.round(zoom * 100);

  return (
    <div className="relative">
      {/* ── Zoom controls (top-left) ── */}
      <div className="absolute top-2 left-2 z-20 flex flex-col gap-1.5">
        <Button
          variant="secondary"
          size="sm"
          className="w-9 h-9 p-0 shadow-md bg-background/90 backdrop-blur-sm border"
          onClick={handleZoomIn}
          title="확대 (+)"
          aria-label="확대"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="w-9 h-9 p-0 shadow-md bg-background/90 backdrop-blur-sm border"
          onClick={handleZoomOut}
          title="축소 (-)"
          aria-label="축소"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="w-9 h-9 p-0 shadow-md bg-background/90 backdrop-blur-sm border text-[10px] font-mono"
          onClick={handleReset}
          title="초기화 (0)"
          aria-label="크기 초기화"
        >
          {zoomPercent}%
        </Button>
      </div>

      {/* ── SVG Container ── */}
      <div
        ref={containerRef}
        className="overflow-hidden rounded-lg border bg-muted/20 select-none"
        style={{
          touchAction: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
          }}
        >
          {children}
        </div>
      </div>

      {/* ── Help text ── */}
      <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
        드래그: 이동 | 스크롤/핀치: 확대/축소 | 키보드: +/-/0
      </p>
    </div>
  );
}
