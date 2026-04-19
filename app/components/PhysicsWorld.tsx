'use client';

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const WORDS = [
  'Healing', 'Balance', 'Nature', 'Trust', 'Care',
  'Holistic', 'Authentic', 'Wellness', 'Journey', 'Ayusurance'
];

interface PhysicsWorldProps {
  floorStates: boolean[]; // [floor1_active, floor2_active]
}

export default function PhysicsWorld({ floorStates }: PhysicsWorldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Matter.Engine.create());
  const wordsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const floorsRef = useRef<Matter.Body[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const { current: engine } = engineRef;
    const world = engine.world;
    engine.gravity.y = 1.2;

    const width = window.innerWidth;
    const height = document.documentElement.scrollHeight;

    // Walls (left/right)
    const leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true });
    
    // Floors (3 tiers)
    // Tier 1 is roughly at 1/3 of the page, Tier 2 at 2/3, Tier 3 at bottom
    const sectionHeight = window.innerHeight; 
    
    const floor1 = Matter.Bodies.rectangle(width / 2, sectionHeight * 0.9, width, 40, { 
      isStatic: true,
      render: { visible: false },
      label: 'floor1'
    });
    
    const floor2 = Matter.Bodies.rectangle(width / 2, sectionHeight * 1.9, width, 40, { 
      isStatic: true,
      render: { visible: false },
      label: 'floor2'
    });

    const permanentFloor = Matter.Bodies.rectangle(width / 2, height - 20, width, 40, { 
      isStatic: true,
      render: { visible: false },
      label: 'permaFloor'
    });

    floorsRef.current = [floor1, floor2, permanentFloor];
    Matter.World.add(world, [leftWall, rightWall, floor1, floor2, permanentFloor]);

    // Create Word Bodies
    const bodies = WORDS.map((word, i) => {
      // Estimate width based on characters (approx 12px per char at 20px font)
      const w = word.length * 14 + 40;
      const h = 45;
      const x = (width * 0.2) + (Math.random() * width * 0.6);
      const y = -100 - (i * 150); // Rain from top

      const body = Matter.Bodies.rectangle(x, y, w, h, {
        restitution: 0.5,
        friction: 0.1,
        chamfer: { radius: 10 },
        label: `word-${i}`
      });
      
      return body;
    });

    bodiesRef.current = bodies;
    Matter.World.add(world, bodies);

    // Mouse Interaction
    const mouse = Matter.Mouse.create(containerRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    
    // Crucial: Don't capture scroll
    // @ts-ignore
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    // @ts-ignore
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    Matter.World.add(world, mouseConstraint);

    // Runner
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Sync Loop
    const sync = () => {
      bodies.forEach((body, i) => {
        const el = wordsRefs.current[i];
        if (el) {
          const { x, y } = body.position;
          const rotation = body.angle;
          el.style.transform = `translate(${x - body.bounds.max.x + body.position.x}px, ${y - body.bounds.max.y + body.position.y}px) rotate(${rotation}rad)`;
          // Since we use translate, we need to center the el
          // Actually, let's just use direct centering
          const w = (body.bounds.max.x - body.bounds.min.x);
          const h = (body.bounds.max.y - body.bounds.min.y);
          el.style.left = `${x - w/2}px`;
          el.style.top = `${y - h/2}px`;
          el.style.transform = `rotate(${rotation}rad)`;
        }
      });
      requestAnimationFrame(sync);
    };

    const frameId = requestAnimationFrame(sync);

    return () => {
      cancelAnimationFrame(frameId);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      Matter.World.clear(world, false);
    };
  }, []);

  // Handle floor state changes (opening floors)
  useEffect(() => {
    const floors = floorsRef.current;
    if (floors.length < 2) return;

    // Floor 1 (between Section 1 and 2)
    if (!floorStates[0]) {
      // Deactivate floor 1
      floors[0].collisionFilter = { group: -1, category: 0, mask: 0 };
    } else {
      floors[0].collisionFilter = { group: 0, category: 1, mask: 0xFFFFFFFF };
    }

    // Floor 2 (between Section 2 and 3)
    if (!floorStates[1]) {
      // Deactivate floor 2
      floors[1].collisionFilter = { group: -1, category: 0, mask: 0 };
    } else {
      floors[1].collisionFilter = { group: 0, category: 1, mask: 0xFFFFFFFF };
    }
  }, [floorStates]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'absolute', 
        inset: 0, 
        pointerEvents: 'none', 
        zIndex: 5,
        overflow: 'hidden'
      }}
    >
      {WORDS.map((word, i) => (
        <div
          key={i}
          ref={el => { wordsRefs.current[i] = el; }}
          className="physics-word"
          style={{
            position: 'absolute',
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '25px',
            color: '#2b2722',
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            pointerEvents: 'auto',
            cursor: 'grab',
            userSelect: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'background 0.2s',
          }}
          onMouseDown={(e) => { e.currentTarget.style.cursor = 'grabbing'; }}
          onMouseUp={(e) => { e.currentTarget.style.cursor = 'grab'; }}
        >
          {word}
        </div>
      ))}
    </div>
  );
}
