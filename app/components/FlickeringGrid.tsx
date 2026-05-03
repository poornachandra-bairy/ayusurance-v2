"use client";

import React, { useMemo, useEffect, useRef, useState } from "react";

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  maxOpacity?: number;
}

export function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "#6B7280",
  width,
  height,
  className,
  maxOpacity = 0.5,
  ...props
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 });

  const colorRGB = useMemo(() => {
    let hex = color.replace("#", "");
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    return `${r}, ${g}, ${b}`;
  }, [color]);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setGridSize({
          width: width || containerRef.current.clientWidth,
          height: height || containerRef.current.clientHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || gridSize.width === 0 || gridSize.height === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    // Scale for high DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = gridSize.width * dpr;
    canvas.height = gridSize.height * dpr;
    ctx.scale(dpr, dpr);

    const cols = Math.ceil(gridSize.width / (squareSize + gridGap));
    const rows = Math.ceil(gridSize.height / (squareSize + gridGap));
    const squares = new Float32Array(cols * rows);

    for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
    }

    const draw = () => {
      ctx.clearRect(0, 0, gridSize.width, gridSize.height);
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
           const idx = i * rows + j;
           if (Math.random() < flickerChance) {
               squares[idx] += (Math.random() - 0.5) * 0.1;
               if (squares[idx] < 0) squares[idx] = 0;
               if (squares[idx] > maxOpacity) squares[idx] = maxOpacity;
           }
           ctx.fillStyle = `rgba(${colorRGB}, ${Math.max(0, squares[idx])})`;
           ctx.fillRect(
             i * (squareSize + gridGap),
             j * (squareSize + gridGap),
             squareSize,
             squareSize
           );
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [gridSize, squareSize, gridGap, flickerChance, colorRGB, maxOpacity]);

  return (
    <div ref={containerRef} className={className} {...props}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: "block", pointerEvents: "none" }}
      />
    </div>
  );
}
