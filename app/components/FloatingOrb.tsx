'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function FloatingOrb() {
  const orbRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0.3, y: -0.2 });
  const targetRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const orb = orbRef.current;
    if (!container || !orb) return;

    const W = container.offsetWidth;
    const H = container.offsetHeight;
    const orbW = orb.offsetWidth;
    const orbH = orb.offsetHeight;

    // Start near top-right
    posRef.current = { x: W - orbW - 20, y: 20 };
    targetRef.current = { x: W / 2, y: H / 2 };

    // Physics constants
    const FRICTION = 0.985;
    const DRIFT_FORCE = 0.006;
    const MAX_SPEED = 1.2;
    const BOUNCE_DAMPING = 0.5;

    let time = 0;

    const animate = () => {
      time += 0.008;
      const { x, y } = posRef.current;
      let { x: vx, y: vy } = velRef.current;

      // Gentle sine-wave drift force — creates organic, floating feel
      vx += Math.sin(time * 0.7) * DRIFT_FORCE;
      vy += Math.cos(time * 0.5) * DRIFT_FORCE - 0.004; // slight upward bias (anti-gravity)

      // Friction / speed cap
      vx *= FRICTION;
      vy *= FRICTION;
      const speed = Math.sqrt(vx * vx + vy * vy);
      if (speed > MAX_SPEED) {
        vx = (vx / speed) * MAX_SPEED;
        vy = (vy / speed) * MAX_SPEED;
      }

      let nx = x + vx;
      let ny = y + vy;

      // Wall collisions with soft bounce
      if (nx < 0) { nx = 0; vx = Math.abs(vx) * BOUNCE_DAMPING; }
      if (nx > W - orbW) { nx = W - orbW; vx = -Math.abs(vx) * BOUNCE_DAMPING; }
      if (ny < 0) { ny = 0; vy = Math.abs(vy) * BOUNCE_DAMPING; }
      if (ny > H - orbH) { ny = H - orbH; vy = -Math.abs(vy) * BOUNCE_DAMPING; }

      posRef.current = { x: nx, y: ny };
      velRef.current = { x: vx, y: vy };

      if (orb) {
        orb.style.transform = `translate(${nx}px, ${ny}px)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    // Cursor proximity — gently nudge the orb away
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const orbCX = posRef.current.x + orbW / 2;
      const orbCY = posRef.current.y + orbH / 2;
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const dx = orbCX - cx;
      const dy = orbCY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 120;

      if (dist < radius && dist > 0) {
        const force = ((radius - dist) / radius) * 0.6;
        velRef.current.x += (dx / dist) * force;
        velRef.current.y += (dy / dist) * force;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => {
      cancelAnimationFrame(frameRef.current);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ pointerEvents: 'none' }}
    >
      {/* The floating orb itself */}
      <div
        ref={orbRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 72,
          height: 72,
          pointerEvents: 'auto',
          willChange: 'transform',
          transition: 'box-shadow 0.4s ease, opacity 0.4s ease',
        }}
      >
        {/* Outer glow ring */}
        <div
          style={{
            position: 'absolute',
            inset: -8,
            borderRadius: '50%',
            border: '1px solid rgba(201,168,108,0.25)',
            opacity: isHovered ? 1 : 0.5,
            transition: 'opacity 0.6s ease',
            animation: 'orbRingPulse 3s ease-in-out infinite',
          }}
        />
        {/* Second ring */}
        <div
          style={{
            position: 'absolute',
            inset: -18,
            borderRadius: '50%',
            border: '1px solid rgba(168,181,169,0.15)',
            opacity: isHovered ? 0.8 : 0.3,
            transition: 'opacity 0.6s ease',
            animation: 'orbRingPulse 4s ease-in-out infinite reverse',
          }}
        />
        {/* Core orb */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95), rgba(245,240,232,0.80) 60%, rgba(201,168,108,0.15) 100%)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.8)',
            boxShadow: isHovered
              ? '0 12px 40px rgba(201,168,108,0.35), 0 0 0 1px rgba(201,168,108,0.2), inset 0 1px 1px rgba(255,255,255,0.9)'
              : '0 8px 28px rgba(44,58,50,0.10), 0 2px 8px rgba(44,58,50,0.06), inset 0 1px 1px rgba(255,255,255,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'box-shadow 0.4s ease',
            position: 'relative',
          }}
        >
          {/* Inner dot accent */}
          <div style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'rgba(201,168,108,0.6)',
            boxShadow: '0 0 8px rgba(201,168,108,0.5)',
          }} />
          {/* Subtle highlight */}
          <div style={{
            position: 'absolute',
            top: 14,
            left: 18,
            width: 18,
            height: 8,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.7)',
            transform: 'rotate(-20deg)',
            filter: 'blur(2px)',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes orbRingPulse {
          0%, 100% { transform: scale(1); opacity: inherit; }
          50% { transform: scale(1.08); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
